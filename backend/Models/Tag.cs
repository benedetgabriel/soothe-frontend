namespace MarketplaceEnxoval.Models;

public class Tag : BaseEntity
{
    public required string Name { get; set; }
    public required string Slug { get; set; }

    // Navigation properties
    public ICollection<ProductTag> ProductTags { get; set; } = [];
}
