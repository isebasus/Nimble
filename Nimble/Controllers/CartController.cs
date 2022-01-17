using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net.Mime;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using nimble.Data.Colors;
using nimble.Data.Colors.Result.Colors;
using nimble.Data.CompanyData;
using nimble.Data.CompanyData.Brand;
using nimble.Data.CompanyData.Item;
using nimble.Data.Users.Items;
using System.Drawing.Imaging;
using System.Net;
using System.Xml;
using nimble.Data.Merch;
using nimble.Data.Users;
using RestSharp;
using Item = nimble.Data.Users.Items.Item;

namespace nimble.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private static IMongoCollection<User> _data;
        private static IMongoCollection<CompanyData> _merch;

        public CartController(IMongoClient client)
        {
            IMongoDatabase database = client.GetDatabase("nimble");
            _data = database.GetCollection<User>("carts");
            _merch = database.GetCollection<CompanyData>("merch");
        }

        [Route("/api/addVectorFile")]
        [HttpPost]
        public bool PostVector([FromForm] IFormCollection data)
        {
            var vector = JsonConvert.DeserializeObject<string[]>(data["data"]);
            Console.WriteLine(vector[0]);
            return true;
        }

        [Route("/api/addUserItemCart")]
        [HttpPost]
        public bool Post([FromForm] IFormCollection data)
        {
            var item = JsonConvert.DeserializeObject<Cart>(data["data"]);
            Checkout checkout = new Checkout();
            
            User user = _data.Find(user => user.UserId == item.userId).FirstOrDefault();
            if (user == null)
            {
                user = new User();
                user.UserId = item.userId;

                Item cartItem = createItem(item);
                if (item.mockup != null)
                {
                    if (setMockupPrice(item, checkout) != true) return false;
                }

                cartItem.MockupPrice = checkout.MockupPrice;
                cartItem.MerchPrice = checkout.TShirtPrice;
                cartItem.TotalPrice = checkout.TotalPrice;

                user.ItemIds = new Dictionary<string, List<string>>();
                List<string> itemData = new List<string>();
                itemData.Add(cartItem.MerchId);
                itemData.Add(item.size);
                itemData.Add(item.quantity.ToString());

                user.ItemIds.Add(item.id, itemData);

                user.Items = new List<Item>();
                user.Items.Add(cartItem);
                
                _data.InsertOne(user);
            }
            else
            {
                var items = user.Items;

                if (user.ItemIds.ContainsKey(item.id))
                {
                    var itemData = user.ItemIds[item.id];
                    Item cItem = items.Find(i => i.MerchId == itemData[0]);

                    string currentUrl = getBase64Image(item.mockup);
                    string saveUrl = getBase64Image(cItem.Mockup);

                    if (currentUrl == saveUrl)
                    {
                        return true;
                    }

                    if (!populateData(items, item, user, checkout))
                    {
                        return false;
                    }
                    cItem.Sizes.Remove(item.size);

                    if (cItem.Sizes.Count == 0)
                    {
                        user.Items.Remove(cItem);
                    }
                    _data.ReplaceOne(x => x.UserId == item.userId, user);
                    return true;
                }
                if (!populateData(items, item, user, checkout))
                {
                    return false;
                }
                _data.ReplaceOne(x => x.UserId == item.userId, user);
            }
            return true;
        }

        private string getBase64Image(string url)
        {
            using (var client = new WebClient())
            {
                byte[] dataBytes = client.DownloadData(new Uri(url));
                return Convert.ToBase64String(dataBytes);
            }
        }

        private Item createItem(Cart cart)
        {
            Guid uuid = Guid.NewGuid();
            Item item = new Item();
            item.MerchId = uuid.ToString();
            item.Brand = cart.brand;
            item.Name = cart.name;
            item.Color = cart.color;
            item.Mockup = cart.mockup;
            item.Vector = cart.vector;
            item.TotalQuantity = cart.quantity;
            item.Sizes = new Dictionary<string, int>();
            item.Sizes.Add(cart.size, cart.quantity);
            return item;
        }

        private bool populateData(List<Item> items, Cart item, User user, Checkout checkout)
        {
            Item cartItem = items.Find(i =>
            {
                string currentUrl = getBase64Image(item.mockup);
                string saveUrl = getBase64Image(i.Mockup);
                return i.Name == item.name && i.Color == item.color && currentUrl == saveUrl;
            });
                

            if (cartItem == null)
            {
                cartItem = createItem(item);
                if (item.mockup != null)
                {
                    if (setMockupPrice(item, checkout) != true) return false;
                }

                if (user.ItemIds.ContainsKey(item.id))
                {
                    user.ItemIds[item.id][0] = cartItem.MerchId;
                }
                else
                {
                    List<string> itemData = new List<string>();
                    itemData.Add(cartItem.MerchId);
                    itemData.Add(item.size);
                    itemData.Add(item.quantity.ToString());

                    user.ItemIds.Add(item.id, itemData);
                }
                cartItem.MockupPrice = checkout.MockupPrice;
                cartItem.MerchPrice = checkout.TShirtPrice;
                cartItem.TotalPrice = checkout.TotalPrice;
                    
                items.Add(cartItem);
            }
            else
            {
                if (cartItem.Sizes.ContainsKey(item.size))
                {
                    cartItem.Sizes[item.size] += item.quantity;
                }
                else
                {
                    cartItem.Sizes.Add(item.size, item.quantity);
                }
                cartItem.TotalQuantity += item.quantity;
                cartItem.TotalPrice += checkout.TotalPrice;

                if (!user.ItemIds.ContainsKey(item.id))
                {
                    List<string> itemData = new List<string>();
                    itemData.Add(cartItem.MerchId);
                    itemData.Add(item.size);
                    itemData.Add(item.quantity.ToString());
                    
                    user.ItemIds.Add(item.id, itemData);
                }
                
                user.ItemIds[item.id][0] = cartItem.MerchId;
            }
            return true;
        }

        private bool setMockupPrice(Cart item, Checkout checkout)
        {
            string apiKey = "acc_d5bc47bf6dfdb01";
            string apiSecret = "f93851609f98cdccfa864d73ef9110a0";
            string imageUrl = item.mockup;

            string basicAuthValue = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(String.Format("{0}:{1}", apiKey, apiSecret)));
            
            var client =  new RestClient("https://api.imagga.com");

            var request = new RestRequest("/v2/colors");
            request.AddParameter("image_url", imageUrl);
            request.AddHeader("Authorization", String.Format("Basic {0}", basicAuthValue));

            var response = client.Execute(request);
            Parent result = JsonConvert.DeserializeObject<Parent>(response.Content);

            Colors colors = result.Result.Colors;
            int backgroundColors = colors.BackgroundColors.Count;
            int foregroundColors = colors.ForegroundColors.Count;
            int imageColors = colors.ImageColors.Count;

            int maximum = Math.Max(Math.Max(backgroundColors, foregroundColors), imageColors);

            CompanyData companyData = _merch.Find(company => company.Company == "madmerch").FirstOrDefault();

            checkout.MockupPrice = (maximum * companyData.ColorPrice) + companyData.PrintPrice - backgroundColors;
            checkout.TotalMockupPrice = item.quantity * checkout.MockupPrice;

            Brand brand = companyData.Brands.Find(brand => brand.Name == item.brand);
            Data.CompanyData.Item.Item merch = brand.Items.Find(x => x.Name == item.name);

            if (merch == null)
            {
                return false;
            }
                
            checkout.Id = item.id;
            checkout.TShirtPrice = merch.Price;
            checkout.TotalTShirtPrice = item.quantity * merch.Price;

            checkout.TotalPrice = checkout.TotalTShirtPrice + checkout.TotalMockupPrice;
            return true;
        }
    }
}