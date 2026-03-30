using System.ComponentModel.DataAnnotations;

namespace MarketplaceEnxoval.DTOs.Requests;

public class RegisterRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }

    [Required]
    [StringLength(100)]
    public required string FirstName { get; set; }

    [Required]
    [StringLength(100)]
    public required string LastName { get; set; }

    [Required]
    [StringLength(11, MinimumLength = 11)]
    public required string Cpf { get; set; }

    public string? Phone { get; set; }

    public DateTime? BirthDate { get; set; }
}
