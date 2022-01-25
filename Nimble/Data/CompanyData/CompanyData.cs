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
        
        [BsonElement("logo")]
        public string Logo { get; set; }
        
        [BsonElement("brands")]
        public List<Brand.Brand> Brands { get; set; }
        
        [BsonElement("print-price")]
        public int PrintPrice { get; set; }
        
        [BsonElement("print-color-price")]
        public int ColorPrice { get; set; }
        
        [BsonElement("max-print-height")]
        public int MaxPrintHeight { get; set; }
        
        [BsonElement("max-print-width")]
        public int MaxPrintWidth { get; set; }
        
        [BsonElement("minimum-units")]
        public int MinimumUnits { get; set; }

    }
}