import type { FC } from "react";

export interface ContainerPropsI {
	children: React.ReactNode;
	id?: string;
	className?: string;
}

const Section: FC<ContainerPropsI> = ({ children, id, className, ...props }) => {
	return (
		<section id={id} className={className} {...props}>
			{children}
		</section>
	);
};

export default Section;
