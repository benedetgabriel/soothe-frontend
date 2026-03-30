namespace MarketplaceEnxoval.Models;

public class Cart : BaseEntity
{
    public int? UserId { get; set; }
    public string? SessionId { get; set; }
    public DateTime? ExpiresAt { get; set; }

    // Navigation properties
    public User? User { get; set; }
    public ICollection<CartItem> Items { get; set; } = [];
}
