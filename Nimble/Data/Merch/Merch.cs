using System;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace nimble.Data.Merch
{
    
    public class Merch
    {
        [BsonId]
        public ObjectId Id { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("caption")]
        public string Caption { get; set; }
        
        [BsonElement("matchPath")]
        public string[] MatchPaths { get; set; }
        
        [BsonExtraElements]
        public object[] MerchTypes {get; set; }
        
    }
}