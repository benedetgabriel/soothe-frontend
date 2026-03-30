using MarketplaceEnxoval.Models.Enums;

namespace MarketplaceEnxoval.Models;

public class Shipment : BaseEntity
{
    public int OrderId { get; set; }
    public string? Carrier { get; set; }
    public string? TrackingCode { get; set; }
    public ShipmentStatus Status { get; set; } = ShipmentStatus.Preparing;
    public DateTime? ShippedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }

    // Navigation properties
    public Order Order { get; set; } = null!;
}
