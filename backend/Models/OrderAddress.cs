using MarketplaceEnxoval.Models.Enums;

namespace MarketplaceEnxoval.Models;

public class OrderAddress : BaseEntity
{
    public int OrderId { get; set; }
    public AddressType Type { get; set; }
    public required string Street { get; set; }
    public required string Number { get; set; }
    public string? Complement { get; set; }
    public required string Neighborhood { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string ZipCode { get; set; }
    public string Country { get; set; } = "BR";

    // Navigation properties
    public Order Order { get; set; } = null!;
}
