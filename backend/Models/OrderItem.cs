namespace MarketplaceEnxoval.Models;

public class OrderItem : BaseEntity
{
    public int OrderId { get; set; }
    public int VariantId { get; set; }
    public required string ProductName { get; set; }
    public required string VariantName { get; set; }
    public required string Sku { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }

    // Navigation properties
    public Order Order { get; set; } = null!;
    public ProductVariant Variant { get; set; } = null!;
}
