using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using nimble.Async;
using nimble.Data.Merch;
using RestSharp;

namespace nimble.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MerchController : ControllerBase
    {
        private static IMongoCollection<Merch> _merch;
        
        public MerchController(IMongoClient client)
        {
            IMongoDatabase database = client.GetDatabase("nimble");
            _merch = database.GetCollection<Merch>("merch");
        }

        [Route("/api/Merch")]
        [HttpPost]
        public bool Post([FromForm] IFormCollection data)
        {
            Checkout[] checkouts = new Checkout[] { };
            
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
                Console.WriteLine(response.Content);
                Console.ReadLine();
                
            }
            return true;
        }
    }
}


