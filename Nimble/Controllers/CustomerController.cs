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
    public class CustomerController : ControllerBase
    {
        private static IMongoCollection<User> _data;
        private static IMongoCollection<User> _carts;

        public CustomerController(IMongoClient client)
        {
            IMongoDatabase database = client.GetDatabase("nimble");
            _data = database.GetCollection<User>("customers");
            _carts = database.GetCollection<User>("carts");
        }
        
        [Route("/api/getCustomer")]
        [HttpPost]
        public string GetCustomer([FromForm] IFormCollection data)
        {
            string id = JsonConvert.DeserializeObject<string>(data["userId"]);
            if (id == null) return "none";
            
            var user = _data.Find(user => user.UserId == id).FirstOrDefault();
            if (user == null) return "none";
            return JsonConvert.SerializeObject(user);
        }

        [Route("/api/addCustomerInformation")]
        public bool AddInformation([FromForm] IFormCollection data)
        {
            var information = JsonConvert.DeserializeObject<UserInformation>(data["data"]);

            User user = _carts.Find(user => user.UserId == information.UserId).FirstOrDefault();
            if (user == null) return false;

            user.FirstName = information.FirstName;
            user.LastName = information.LastName;
            user.Brand = information.Brand;
            user.Instagram = information.Instagram;
            user.Address = information.Address;
            user.City = information.City;
            user.Country = information.Country;
            user.ZipCode = information.ZipCode;
            user.Phone = information.Phone;

            _carts.ReplaceOne(x => x.UserId == information.UserId, user);
            return true;
        }
    }
}