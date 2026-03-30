namespace MarketplaceEnxoval.DTOs.Responses;

public class AuthResponse
{
    public required string Token { get; set; }
    public required UserInfo User { get; set; }
}

public class UserInfo
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Role { get; set; }
}
