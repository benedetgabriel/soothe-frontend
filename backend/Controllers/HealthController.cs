using MarketplaceEnxoval.DTOs.Responses;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceEnxoval.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var data = new { Status = "healthy", Timestamp = DateTime.UtcNow };
        return Ok(ApiResponse<object>.Ok(data));
    }
}
