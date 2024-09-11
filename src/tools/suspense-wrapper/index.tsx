import { FC, Suspense } from "react";

type SuspenseWrapperPropT = {
    children: React.ReactNode;
}

const SuspenseWrapper:FC<SuspenseWrapperPropT> = ({ children }) => {
   return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};


export default SuspenseWrapper;