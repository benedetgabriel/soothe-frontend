using MarketplaceEnxoval.DTOs.Requests;
using MarketplaceEnxoval.DTOs.Responses;

namespace MarketplaceEnxoval.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
}
