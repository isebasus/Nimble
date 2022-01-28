using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace nimble.Data.CompanyData.Brand
{
    public class Brand
    {
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("caption")]
        public string Caption { get; set; }
        
        [BsonElement("link")]
        public string Link { get; set; }
        
        [BsonElement("image")]
        public string Image { get; set; }
        
        [BsonElement("display")]
        public bool Display { get; set; }
        
        [BsonElement("merch")] 
        public List<Item.Item> Items { get; set; }
    }
}