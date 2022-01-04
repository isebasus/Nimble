using System;
using System.Collections.Generic;
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
using nimble.Data.Merch;
using RestSharp;

namespace nimble.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MerchController : ControllerBase
    {
        private static IMongoCollection<CompanyData> _data;
        
        public MerchController(IMongoClient client)
        {
            IMongoDatabase database = client.GetDatabase("nimble");
            _data = database.GetCollection<CompanyData>("merch");
        } 

        [Route("/api/Merch")]
        [HttpPost]
        public ActionResult<IEnumerable<Checkout>> Post([FromForm] IFormCollection data)
        {
            List<Checkout> checkouts = new List<Checkout>();
            
            var cart = JsonConvert.DeserializeObject<Cart[]>(data["data"]);

            foreach (Cart item in cart)
            {
                Checkout checkout = new Checkout();
                
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

                CompanyData companyData = _data.Find(company => company.Company == "madmerch").FirstOrDefault();

                checkout.MockupPrice = (maximum * companyData.ColorPrice) + companyData.PrintPrice - 2;
                checkout.TotalMockupPrice = item.quantity * checkout.MockupPrice;

                Brand brand = companyData.Brands.Find(brand => brand.Name == item.brand);
                Item merch = brand.Items.Find(x => x.Name == item.name);

                if (merch == null)
                {
                    return null;
                }
                
                checkout.Id = item.id;
                checkout.TShirtPrice = merch.Price;
                checkout.TotalTShirtPrice = item.quantity * merch.Price;

                checkout.TotalPrice = checkout.TotalTShirtPrice + checkout.TotalMockupPrice;
                checkouts.Add(checkout);
            }
            return Ok(checkouts);
        }
    }
}


