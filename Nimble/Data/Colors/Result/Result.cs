using Newtonsoft.Json;

namespace nimble.Data.Colors.Result
{
    public class Result
    {
        [JsonProperty("colors")]
        public Colors.Colors Colors { get; set; }
    }
}