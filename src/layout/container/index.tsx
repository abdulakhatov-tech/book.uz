import type { FC } from "react";

export interface ContainerPropsI {
	children: React.ReactNode;
	size?: "fluid";
}

const Container: FC<ContainerPropsI> = ({ children, size }) => {
	if (size === "fluid") {
		return <div className="container-fluid mx-auto">{children}</div>;
	}

	return <div className="container mx-auto">{children}</div>;
};

export default Container;
