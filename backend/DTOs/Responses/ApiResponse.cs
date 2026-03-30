namespace MarketplaceEnxoval.DTOs.Responses;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public List<ApiError> Errors { get; set; } = [];

    public static ApiResponse<T> Ok(T data) => new()
    {
        Success = true,
        Data = data
    };

    public static ApiResponse<T> Fail(List<ApiError> errors) => new()
    {
        Success = false,
        Errors = errors
    };

    public static ApiResponse<T> Fail(string message, string? field = null) => new()
    {
        Success = false,
        Errors = [new ApiError { Field = field, Message = message }]
    };
}

public class ApiError
{
    public string? Field { get; set; }
    public required string Message { get; set; }
}
