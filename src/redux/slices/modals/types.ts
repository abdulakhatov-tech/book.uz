export interface AuthModalState {
	authType: "sign-in" | "sign-up" | "verify-otp";
	open: boolean;
	data: any;
}

export interface ReviewDropdownState {
	open: boolean;
	bookId: string;
	review: any;
	reviewType: "create" | "edit";
}

export interface IInitialState {
	menuModalVisibility: boolean;
	authModalVisibility: AuthModalState;
	categoryDropdownVisibility: boolean;
	reviewsDropdownVisibility: ReviewDropdownState;
	checkoutSuccessModalVisibility: boolean;
}
