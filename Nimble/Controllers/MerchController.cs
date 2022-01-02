using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using nimble.Data.Merch;

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
            var cart = JsonConvert.DeserializeObject<Cart[]>(data["data"]);
            Console.WriteLine(cart[0].name);
            return true;
        }

        [Route("/api/Cart")]
        [HttpPost]
        public bool WriteCart(String data)
        {
            if (data == null)
            {
                return false;
            }

            Console.WriteLine(Startup._rootPath);
            return true;
            //System.IO.Directory.GetParent(System);
            //System.IO.File.WriteAllText("../../", data);
        }
    }
}


