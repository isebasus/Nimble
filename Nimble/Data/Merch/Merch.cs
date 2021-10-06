using System;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace nimble.Data.Merch
{
    
    public class Merch
    {
        public ObjectId Id { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("caption")]
        public string Caption { get; set; }
        
        [BsonElement("matchPath")]
        public string[] MatchPaths { get; set; }
        
        [BsonElement("merch")]
        private readonly Dictionary<string, string[]> MerchTypes = new Dictionary<string, string[]>();

        public string[] this[string key]
        {
            get { return MerchTypes[key]; }
            set { MerchTypes[key] = value; }
        }
    }
}