export interface GetAllBooksParams {
	page?: number;
	limit?: number;
	genreId?: string;
	fromPrice?: number;
	toPrice?: number;
	language?: string;
	authorId?: string;
	sort?: string;
	asc?: number;
}
