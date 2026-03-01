export const paginateData = (
  totalRecords: number,
  page: number,
  perPage: number,
) => {
  const safePerPage = Math.max(1, perPage);
  const totalPages =
    totalRecords === 0 ? 0 : Math.ceil(totalRecords / safePerPage);
  const safePage =
    totalPages === 0 ? 1 : Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * safePerPage;
  const from = totalRecords === 0 ? 0 : offset + 1;
  const to = Math.min(totalRecords, offset + safePerPage);

  return {
    totalRecords,
    totalPages,
    currentPage: safePage,
    perPage: safePerPage,
    offset, 
    limit: safePerPage,
    from,
    to,
    hasPrevious: safePage > 1,
    hasNext: safePage < totalPages,
    previous: safePage > 1 ? safePage - 1 : null,
    next: safePage < totalPages ? safePage + 1 : null,
  };
};
