

export const paginate = (data: any[], page: number, limit: number, totalRecords: number) => {
    const totalPages = Math.ceil(totalRecords / limit);
    return {
        data,
        currentPage: page,
        totalPages,
        totalRecords,
        limit
    };
}