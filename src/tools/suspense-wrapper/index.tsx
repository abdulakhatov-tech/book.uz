import { type FC, Suspense } from "react";
import Loader from "../loader";

type SuspenseWrapperPropT = {
	children: React.ReactNode;
};

const SuspenseWrapper: FC<SuspenseWrapperPropT> = ({ children }) => {
	return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
