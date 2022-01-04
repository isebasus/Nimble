namespace nimble.Data.Merch
{
    public class Checkout
    {
        public string Id { get; set; }
        
        public int TShirtPrice { get; set; }
        
        public int MockupPrice { get; set; }
        
        public int TotalTShirtPrice { get; set; }
        
        public int TotalMockupPrice { get; set; }
        
        // Total price of units
        public int TotalPrice { get; set; }
    }
}