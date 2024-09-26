export interface CoverTypeI {
	label: string;
	value: string;
}

export interface SelectCoverPropsI {
	value: string;
	onChange: (value: string, type: string) => void;
}
