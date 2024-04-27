using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Note;

namespace TrackingService.Repositories.Utils
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Pagination<T>(this IQueryable<T> queryable, PaginationDto paginationDto)
        {
            return queryable
                .Skip((paginationDto.Page - 1) * paginationDto.RecordsPerPage)
                .Take(paginationDto.RecordsPerPage);
        }

        public static IQueryable<T> NotesPagination<T>(this IQueryable<T> queryable, NotePaginationDto paginationDto)
        {
            return queryable
                .Skip((paginationDto.Page - 1) * paginationDto.RecordsPerPage)
                .Take(paginationDto.RecordsPerPage);
        }
    }
}
