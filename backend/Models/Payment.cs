using MarketplaceEnxoval.Models.Enums;

namespace MarketplaceEnxoval.Models;

public class Payment : BaseEntity
{
    public int OrderId { get; set; }
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public PaymentGateway Gateway { get; set; }
    public string? GatewayTransactionId { get; set; }
    public decimal Amount { get; set; }
    public DateTime? PaidAt { get; set; }
    public DateTime? RefundedAt { get; set; }

    // Navigation properties
    public Order Order { get; set; } = null!;
}
