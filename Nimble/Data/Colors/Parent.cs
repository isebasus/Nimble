using Newtonsoft.Json;

namespace nimble.Data.Colors
{
    public class Parent
    {
        [JsonProperty("result")]
        public Result.Result Result { get; set; }
        
        [JsonProperty("status")]
        public Status.Status Status { get; set; }
    }
}