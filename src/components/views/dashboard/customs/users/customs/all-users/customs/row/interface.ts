import { UserI } from "@/types";

export interface UserRowPropsI {
    user: UserI;
    index: number;
    onPromote: () => void;
    canPromote: boolean;
  }
  