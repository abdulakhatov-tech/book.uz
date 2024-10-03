export interface GetAllBooksParams {
	page?: number;
	limit?: number;
	genreIds?: string;
	fromPrice?: number;
	toPrice?: number;
	language?: string;
	authorIds?: string;
	sort?: string;
	asc?: number;
}
