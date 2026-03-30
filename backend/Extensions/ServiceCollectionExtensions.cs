using MarketplaceEnxoval.Services;
using MarketplaceEnxoval.Services.Interfaces;

namespace MarketplaceEnxoval.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        // Register repositories here as the project grows
        return services;
    }
}
