using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace nimble.Data.CompanyData.Item
{
    public class Item
    {
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("type")]
        public string Type { get; set; }
        
        [BsonElement("image")]
        public string Image { get; set; }
        
        [BsonElement("colors")]
        public List<string> Colors { get; set; }
        
        [BsonElement("sizes")]
        public List<string> Sizes { get; set; }
        
        [BsonElement("url")]
        public string Url { get; set; }
        
        [BsonElement("price")]
        public int Price { get; set; }
        
        [BsonElement("display")]
        public bool Display { get; set; }
    }
}