using Newtonsoft.Json;

namespace nimble.Data.Colors.Result.Colors.Color
{
    public class Color
    {
        [JsonProperty("b")]
        public int B { get; set; }
        
        [JsonProperty("closest_palette_color")]
        public string ClosestPaletteColor { get; set; }
        
        [JsonProperty("closest_palette_color_html_code")]
        public string ClosestPaletteColorHtmlCode { get; set; }
        
        [JsonProperty("closest_palette_color_parent")]
        public string ClosestPaletteColorParent { get; set; }
        
        [JsonProperty("closest_palette_distance")]
        public double ClosestPaletteDistance { get; set; }
        
        [JsonProperty("g")]
        public int G { get; set; }
        
        [JsonProperty("html_code")]
        public string HtmlCode { get; set; }
        
        [JsonProperty("percent")]
        public double Percent { get; set; }
        
        [JsonProperty("r")]
        public int R { get; set; }
    }
}