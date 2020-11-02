export const paginate = (
    totalItems,
    currentPage = 1,
    pageSize = 20,
) => {

    let totalPages = Math.ceil(totalItems / pageSize)
    
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    startPage = 1;
    endPage = totalPages;

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    return {
        totalItems,
        currentPage,
        pageSize,
        totalOfPages: totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
    };
}

export const getIdFromUrl = (url) => url.split("/").slice(-2)[0]
