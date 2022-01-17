using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace nimble.Data.Merch
{
    public class Cart
    {
        [JsonProperty("id")]
        public string id { get; set; }
        
        [JsonProperty("brand")]
        public string brand { get; set; }
        
        [JsonProperty("name")]
        public string name { get; set; }
        
        [JsonProperty("caption")]
        public string caption { get; set; }
        
        [JsonProperty("color")]
        public string color { get; set; }
        
        [JsonProperty("size")]
        public string size { get; set; }
        
        [JsonProperty("quantity")]
        public int quantity { get; set; }
        
        [JsonProperty("image")]
        public string image { get; set; }
        
        [JsonProperty("price")]
        public int price { get; set; }
        
        [JsonProperty("uploaded")]
        public bool uploaded { get; set; }
        
        [JsonProperty("mockup")]
        public string mockup { get; set; }
        
        [JsonProperty("vector")]
        public string vector { get; set; }

        [JsonProperty("userId")]
        public string userId { get; set; }
    }
}