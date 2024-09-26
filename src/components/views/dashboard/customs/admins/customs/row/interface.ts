import { UserI } from "@/types";

export interface UserRowPropsI {
	user: UserI;
	index: number;
	onDemote: () => void;
	canDemote: boolean;
}
