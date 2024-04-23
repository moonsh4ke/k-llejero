namespace TrackingService.Domain.DTOs
{
    public class PaginationDto
    {
        public string UserId { get; set; }
        private int page = 1;
        private int recordsPerPage = 3;
        private readonly int maxRecordsPerPage = 10;

        public int Page
        {
            get
            {
                return page; 
            }
            set
            {
                page = (value == 0) ? page : value;
            }
        }
        public int RecordsPerPage
        {
            get
            {
                return recordsPerPage;
            }
            set
            {
                recordsPerPage = (value > maxRecordsPerPage) ? maxRecordsPerPage : value;
            }
        }
    }
}
