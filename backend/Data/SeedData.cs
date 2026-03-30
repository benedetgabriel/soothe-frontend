using MarketplaceEnxoval.Models;
using MarketplaceEnxoval.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace MarketplaceEnxoval.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        if (await context.Users.AnyAsync())
            return;

        var admin = new User
        {
            Email = "admin@marketplace.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = UserRole.Admin,
            FirstName = "Admin",
            LastName = "System",
            Cpf = "00000000000",
            IsActive = true
        };

        context.Users.Add(admin);
        await context.SaveChangesAsync();
    }
}
