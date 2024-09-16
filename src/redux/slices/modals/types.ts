export interface IInitialState {
	menuModalVisibility: boolean;
	authModalVisibility: {
		authType: "sign-in" | "sign-up" | "verify-otp";
		open: boolean;
		data: any;
	};
	categoryDropdownVisibility: boolean;
}
