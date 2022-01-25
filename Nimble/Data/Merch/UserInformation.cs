using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace nimble.Data.Merch
{
    public class UserInformation
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }
        
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        
        [JsonProperty("brand")]
        public string Brand { get; set; }
        
        [BsonElement("instagram")]
        public string Instagram { get; set; }
        
        [BsonElement("email")]
        public string Email { get; set; }
        
        
        [BsonElement("address")]
        public string Address { get; set; }
        
        [BsonElement("city")]
        public string City { get; set; }
        
        [BsonElement("country")]
        public string Country { get; set; }
        
        [BsonElement("zipCode")]
        public string ZipCode { get; set; }
        
        [BsonElement("phone")]
        public string Phone { get; set; }
    }
}