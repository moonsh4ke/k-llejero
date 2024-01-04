using Microsoft.AspNetCore.Mvc;

namespace TrackingServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingsController : ControllerBase
    {
        public IActionResult Index()
        {
            return StatusCode(200, "Hello world!!!");
        }
    }
}
