using System.Collections.Generic;
using Newtonsoft.Json;

namespace nimble.Data.Colors.Result.Colors
{
    public class Colors
    {
        [JsonProperty("background_colors")]
        public IList<Color.Color> BackgroundColors { get; set; }
        
        [JsonProperty("color_percent_threshold")]
        public float ColorPercentThreshold { get; set; }
        
        [JsonProperty("color_variance")]
        public int ColorVariance { get; set; }
        
        [JsonProperty("foreground_colors")]
        public IList<Color.Color> ForegroundColors { get; set; }
        
        [JsonProperty("image_colors")]
        public IList<Color.Color> ImageColors { get; set; }
        
        [JsonProperty("object_percentage")]
        public double ObjectPercentage { get; set; }
    }
}