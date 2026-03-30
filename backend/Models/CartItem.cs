namespace MarketplaceEnxoval.Models;

public class CartItem : BaseEntity
{
    public int CartId { get; set; }
    public int VariantId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    // Navigation properties
    public Cart Cart { get; set; } = null!;
    public ProductVariant Variant { get; set; } = null!;
}
