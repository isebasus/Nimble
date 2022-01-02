using Microsoft.AspNetCore.Http;

namespace nimble.Data.Merch
{
    public class Cart
    {
        public string id { get; set; }
        
        public string name { get; set; }
        
        public string caption { get; set; }
        
        public string color { get; set; }
        
        public string size { get; set; }
        
        public int quantity { get; set; }
        
        public string image { get; set; }
        
        public int price { get; set; }
        
        public string mockup { get; set; }
        
        public string vector { get; set; }
    }
}