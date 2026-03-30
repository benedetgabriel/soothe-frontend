namespace MarketplaceEnxoval.Models;

public class ProductImage : BaseEntity
{
    public int ProductId { get; set; }
    public int? VariantId { get; set; }
    public required string Url { get; set; }
    public string? AltText { get; set; }
    public int SortOrder { get; set; }
    public bool IsCover { get; set; }

    // Navigation properties
    public Product Product { get; set; } = null!;
    public ProductVariant? Variant { get; set; }
}
