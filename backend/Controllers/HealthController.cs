using MarketplaceEnxoval.DTOs.Responses;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceEnxoval.Controllers;

/// <summary>
/// Verificação de saúde da API.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class HealthController : ControllerBase
{
    /// <summary>
    /// Retorna o status de saúde da API.
    /// </summary>
    /// <returns>Status "healthy" e timestamp UTC.</returns>
    /// <response code="200">API funcionando normalmente.</response>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    public IActionResult Get()
    {
        var data = new { Status = "healthy", Timestamp = DateTime.UtcNow };
        return Ok(ApiResponse<object>.Ok(data));
    }
}
