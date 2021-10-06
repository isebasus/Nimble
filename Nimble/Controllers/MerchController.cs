using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Bson;
using nimble.Data;
using nimble.Data.Merch;

namespace nimble.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MerchController : ControllerBase
    {
        private IMongoDatabase _database;

        private static IMongoCollection<Merch> _merch;
        
        public MerchController(IMongoClient client)
        {
            _database = client.GetDatabase("nimble");
            _merch = _database.GetCollection<Merch>("merch");
        }

        [HttpGet]
        public IEnumerable<Merch> Get()
        {
            return null;
        }
    }
}


