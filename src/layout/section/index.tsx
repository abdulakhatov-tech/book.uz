import { forwardRef, ReactNode } from "react";

export interface ContainerPropsI {
	children: ReactNode;
	id?: string;
	className?: string;
	"data-section"?: string;
}

// Using forwardRef to handle the ref prop
const Section = forwardRef<HTMLElement, ContainerPropsI>(
	({ children, id, className, ...props }, ref) => {
		return (
			<section id={id} className={className} {...props} ref={ref}>
				{children}
			</section>
		);
	},
);

export default Section;
