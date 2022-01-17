using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;
using nimble.Data.Users.Items;

namespace nimble.Data.Users
{
    public class User
    {
        [BsonId]
        public ObjectId Id { get; set; }
        
        [BsonElement("userId")]
        public string UserId { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("brand")]
        public string Brand { get; set; }
        
        [BsonElement("instagram")]
        public string Instagram { get; set; }
        
        [BsonElement("addresss")]
        public string Address { get; set; }
        
        [BsonElement("address2")]
        public string Address2 { get; set; }
        
        [BsonElement("country")]
        public string Country { get; set; }
        
        [BsonElement("phone")]
        public string Phone { get; set; }
        
        [BsonElement("itemIds")]
        [BsonDictionaryOptions(DictionaryRepresentation.ArrayOfArrays)]
        public Dictionary<string, List<string>> ItemIds { get; set; }
        
        [BsonElement("items")]
        public List<Item> Items { get; set; }
    }
}