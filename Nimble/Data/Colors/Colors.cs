using nimble.Data.Colors.Types;

namespace nimble.Data.Colors
{
    public class Colors
    {
        public BackgroundColors BackgroundColors { get; set; }
        
        public float ColorPercentThreshold { get; set; }
        
        public int ColorVariance { get; set; }

        public ForegroundColors ForegroundColors { get; set; }
        
        public ImageColors ImageColors { get; set; }
        
        public double ObjectPercentage { get; set; }
    }
}