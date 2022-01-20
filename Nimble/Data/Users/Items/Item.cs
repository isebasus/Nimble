using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;

namespace nimble.Data.Users.Items
{
    public class Item
    {
        [BsonElement("merchId")]
        public string MerchId { get; set; }
        
        [BsonElement("brand")]
        public string Brand { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("color")]
        public string Color { get; set; }
        
        [BsonElement("mockup")]
        public string Mockup { get; set; }
        
        [BsonElement("vector")]
        public string Vector { get; set; }
        
        [BsonElement("mockupPrice")]
        public int MockupPrice { get; set; }
        
        [BsonElement("merchPrice")]
        public int MerchPrice { get; set; }
        
        [BsonElement("totalQuantity")]
        public int TotalQuantity { get; set; }
        
        [BsonElement("totalPrice")]
        public int TotalPrice { get; set; }

        [BsonElement("notes")]
        [BsonDictionaryOptions(DictionaryRepresentation.ArrayOfArrays)]
        public Dictionary<string, string> Notes { get; set; }
        
        [BsonElement("sizes")]
        [BsonDictionaryOptions(DictionaryRepresentation.ArrayOfArrays)]
        public Dictionary<string, int> Sizes { get; set;  }
    }
}