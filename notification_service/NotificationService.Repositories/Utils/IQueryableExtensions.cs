﻿using NotificationService.Domain.DTOs;

namespace NotificationService.Repositories.Utils
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Pagination<T>(this IQueryable<T> queryable, PaginationDto paginationDto)
        {
            return queryable
                .Skip((paginationDto.Page - 1) * paginationDto.RecordsPerPage)
                .Take(paginationDto.RecordsPerPage);
        }
    }
}
