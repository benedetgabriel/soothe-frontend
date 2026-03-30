namespace MarketplaceEnxoval.Models;

public class AuditLog
{
    public int Id { get; set; }
    public required string TableName { get; set; }
    public int RecordId { get; set; }
    public required string Action { get; set; }
    public string? OldValues { get; set; }
    public string? NewValues { get; set; }
    public int? UserId { get; set; }
    public string? IpAddress { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public User? User { get; set; }
}
