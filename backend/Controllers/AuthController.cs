using MarketplaceEnxoval.DTOs.Requests;
using MarketplaceEnxoval.DTOs.Responses;
using MarketplaceEnxoval.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceEnxoval.Controllers;

/// <summary>
/// Autenticação e registro de usuários.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Registra um novo usuário.
    /// </summary>
    /// <param name="request">Dados de cadastro do usuário.</param>
    /// <returns>Token JWT e dados do usuário criado.</returns>
    /// <response code="201">Usuário criado com sucesso.</response>
    /// <response code="400">Dados inválidos ou e-mail/CPF já cadastrado.</response>
    [HttpPost("register")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);
        return Created("", ApiResponse<AuthResponse>.Ok(result));
    }

    /// <summary>
    /// Autentica um usuário existente.
    /// </summary>
    /// <param name="request">Credenciais de login (e-mail e senha).</param>
    /// <returns>Token JWT e dados do usuário.</returns>
    /// <response code="200">Login realizado com sucesso.</response>
    /// <response code="401">Credenciais inválidas.</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        return Ok(ApiResponse<AuthResponse>.Ok(result));
    }
}
