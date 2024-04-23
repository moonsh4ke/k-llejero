namespace TrackingService.Domain.DTOs;

public class ResponseDto<T>
{
    public int StatusCode { get; set; }
    public bool IsSuccessful { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
}
