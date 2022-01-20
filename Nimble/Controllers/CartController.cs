using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json;
using nimble.Data.Colors;
using nimble.Data.Colors.Result.Colors;
using nimble.Data.CompanyData;
using nimble.Data.CompanyData.Brand;
using System.Net;
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

        [Route("/api/uploadNotes")]
        [HttpPost]
        public bool UploadNotes([FromForm] IFormCollection data)
        {
            var clientData = JsonConvert.DeserializeObject<string[][]>(data["data"]);
            string userId = JsonConvert.DeserializeObject<string>(data["userId"]);
            User user = _data.Find(user => user.UserId == userId).FirstOrDefault();
            if (user == null)
            {
                Console.WriteLine("Upload Notes: User is null."); 
                return false;
            }

            foreach (string[] entry in clientData)
            {
                string itemId = entry[0];
                string notes = entry[1];

                Item item = user.Items.Find(i => i.MerchId == user.ItemIds[itemId][0]);

                if (item == null) return false;
                if (item.Notes == null) item.Notes = new Dictionary<string, string>();

                if (!item.Notes.ContainsKey(itemId))
                {
                    item.Notes.Add(itemId, notes);
                }
                else
                {
                    item.Notes[itemId] = notes;
                }
            }
            _data.ReplaceOne(x => x.UserId == userId, user);
            return true;
        }
        
        [Route("/api/removeItem")]
        [HttpPost]
        public bool RemoveItem([FromForm] IFormCollection data)
        {
            
            var clientItem = JsonConvert.DeserializeObject<string[]>(data["data"]);
            string userId = clientItem[0];
            string cartId = clientItem[1];

            User user = _data.Find(user => user.UserId == userId).FirstOrDefault();
            if (user == null) return false;
            if (user.ItemIds[cartId] == null) return false;
            
            List<string> itemData = user.ItemIds[cartId];
            string merchId = itemData[0];
            string size = itemData[1];
            string quantity = itemData[2];
            string price = itemData[3];
            
            Item item = user.Items.Find(i => i.MerchId == merchId);
            if (item == null) return false;
            
            item.Sizes[size] -= Convert.ToInt32(quantity);
            item.TotalQuantity -= Convert.ToInt32(quantity);
            item.TotalPrice -= Convert.ToInt32(price);
            if (item.Sizes[size] == 0) item.Sizes.Remove(size);
            if (item.Sizes.Count == 0) user.Items.Remove(item);
            
            user.ItemIds.Remove(cartId);
            
            _data.ReplaceOne(x => x.UserId == userId, user);
            return true;
        }

        [Route("/api/addVectorFile")]
        [HttpPost]
        public bool PostVector([FromForm] IFormCollection data)
        {
            var vector = JsonConvert.DeserializeObject<string[]>(data["data"]);
            string vectorUrl = vector[0];
            string userId = vector[1];
            string cartId = vector[2];

            User user = _data.Find(user => user.UserId == userId).FirstOrDefault();
            List<string> itemData = user.ItemIds[cartId];
            string merchId = itemData[0]; // item data stores merch uuid to find item
            
            Item item = user.Items.Find(i => i.MerchId == merchId);
            if (item == null)
            {
                return false;
            }
            item.Vector = vectorUrl;
            
            _data.ReplaceOne(x => x.UserId == userId, user);
            return true;
        }

        [Route("/api/addUserItemCart")]
        [HttpPost]
        public bool Post([FromForm] IFormCollection data)
        {
            // Deserialize item from client cart
            var items = JsonConvert.DeserializeObject<Cart[]>(data["data"]);
            foreach (Cart item in items)
            {
                insertData(item);
            }

            return true;
        }

        private bool insertData(Cart item)
        {
            Checkout checkout = new Checkout();
            
            // Check if a user exists
            User user = _data.Find(user => user.UserId == item.userId).FirstOrDefault();
            if (user == null)
            {
                // Create new User 
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
                itemData.Add(checkout.TotalPrice.ToString());

                user.ItemIds.Add(item.id, itemData);

                user.Items = new List<Item>();
                user.Items.Add(cartItem);
                
                _data.InsertOne(user);
            }
            else
            {
                // Check if item from client already exists
                var items = user.Items;
                if (user.ItemIds.ContainsKey(item.id))
                {
                    var itemData = user.ItemIds[item.id];
                    Item cItem = items.Find(i => i.MerchId == itemData[0]);

                    string currentUrl = getBase64Image(item.mockup);
                    string saveUrl = getBase64Image(cItem.Mockup);
                    
                    // Do nothing if client uploads the same mockup on the same item
                    if (currentUrl == saveUrl)
                    {
                        return true;
                    }
                    populateData(items, item, user, checkout);

                    cItem.Sizes[item.size] -= item.quantity;
                    cItem.TotalQuantity -= item.quantity;
                    cItem.TotalPrice -= Convert.ToInt32(itemData[3]);
                    if (cItem.Sizes[item.size] == 0) cItem.Sizes.Remove(item.size);
                    if (cItem.Sizes.Count == 0) user.Items.Remove(cItem);
                    
                    _data.ReplaceOne(x => x.UserId == item.userId, user);
                    return true;
                }
                Console.WriteLine(item.mockup);
                populateData(items, item, user, checkout);
                _data.ReplaceOne(x => x.UserId == item.userId, user);
            }
            return true;
        }

        private void populateData(List<Item> items, Cart item, User user, Checkout checkout)
        {
            Item cartItem = items.Find(i =>
            {
                string currentUrl = getBase64Image(item.mockup);
                string saveUrl = getBase64Image(i.Mockup);
                return i.Name == item.name && i.Color == item.color && currentUrl == saveUrl;
            });
            
            // If item does not currently exist populate new item
            if (cartItem == null)
            {
                cartItem = createItem(item);
                if (item.mockup != null)
                {
                    if (setMockupPrice(item, checkout) != true) return;
                }

                if (user.ItemIds.ContainsKey(item.id))
                {
                    user.ItemIds[item.id][0] = cartItem.MerchId;
                    user.ItemIds[item.id][3] = checkout.TotalPrice.ToString();
                }
                else
                {
                    List<string> itemData = new List<string>();
                    itemData.Add(cartItem.MerchId);
                    itemData.Add(item.size);
                    itemData.Add(item.quantity.ToString());
                    itemData.Add(checkout.TotalPrice.ToString());

                    user.ItemIds.Add(item.id, itemData);
                }
                cartItem.MockupPrice = checkout.MockupPrice;
                cartItem.MerchPrice = checkout.TShirtPrice;
                cartItem.TotalPrice = checkout.TotalPrice;
                    
                items.Add(cartItem);
            }
            else
            {
                if (setMockupPrice(item, checkout) != true) return;
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
                    itemData.Add(checkout.TotalPrice.ToString());
                    
                    user.ItemIds.Add(item.id, itemData);
                }
                
                user.ItemIds[item.id][0] = cartItem.MerchId;
                user.ItemIds[item.id][3] = checkout.TotalPrice.ToString();
            }
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