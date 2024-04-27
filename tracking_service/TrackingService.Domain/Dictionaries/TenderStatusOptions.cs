namespace TrackingService.Domain.Dictionaries;

public static class TenderStatusOptions
{
    public static readonly Dictionary<int, string> Options = new ()
    {
        {
            6, "Cerrada"
        },
        {
            7, "Desierta"
        },
        {
            8, "Adjudicada"
        },
        {
            18, "Revocada"
        },
        {
            19, "Suspendida"
        }
    };
}