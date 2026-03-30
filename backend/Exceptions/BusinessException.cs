namespace MarketplaceEnxoval.Exceptions;

public class BusinessException : Exception
{
    public string? Field { get; }

    public BusinessException(string message, string? field = null) : base(message)
    {
        Field = field;
    }
}
