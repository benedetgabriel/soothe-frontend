namespace MarketplaceEnxoval.Models;

public class Address : BaseEntity
{
    public int UserId { get; set; }
    public string? Label { get; set; }
    public required string Street { get; set; }
    public required string Number { get; set; }
    public string? Complement { get; set; }
    public required string Neighborhood { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string ZipCode { get; set; }
    public string Country { get; set; } = "BR";
    public bool IsDefault { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
}
