using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
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
        public IEnumerable<Merch> Post([FromForm] String name)
        {
            return _merch.Find(m => m.Name == name).ToList();
        }
    }
}


