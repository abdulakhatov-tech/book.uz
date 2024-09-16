import type { FC } from "react";

export interface ContainerPropsI {
	children: React.ReactNode;
	id?: string;
}

const Section: FC<ContainerPropsI> = ({ children, id, ...props }) => {
	return (
		<section id={id} {...props}>
			{children}
		</section>
	);
};

export default Section;
