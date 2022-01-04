using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace nimble.Data.CompanyData
{
    public class CompanyData
    {
        [BsonId]
        public ObjectId Id { get; set; }
        
        [BsonElement("company")]
        public string Company { get; set; }
        
        [BsonElement("description")]
        public string Description { get; set; }
        
        [BsonElement("log")]
        public string Logo { get; set; }
        
        [BsonElement("brands")]
        public List<Brand.Brand> Brands { get; set; }
        
        [BsonElement("print-price")]
        public int PrintPrice { get; set; }

    }
}