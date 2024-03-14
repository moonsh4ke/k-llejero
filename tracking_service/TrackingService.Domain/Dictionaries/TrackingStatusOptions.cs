namespace TrackingService.Domain.Dictionaries
{
    public static class TrackingStatusOptions
    {
        public static readonly Dictionary<int, string> Options = new()
        {
            { 1, "Creada" },
            { 2, "Borrada" }
        };
    }
}
