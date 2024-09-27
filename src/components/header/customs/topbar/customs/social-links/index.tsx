import type { FC } from "react";

import telegram from "@/assets/icons/telegram.svg";
import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";

type SocialLinkProps = {
	src: string;
	href: string;
	label: string;
};

const SocialLink: FC<SocialLinkProps> = ({ href, label, src }) => (
	<a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
		<img src={src} alt={`Visit us on ${label}`} width={24} height={24} />
	</a>
);

const SocialLinks: FC = () => {
	return (
		<div className="flex items-cente gap-2">
			<SocialLink href="https://facebook.com/" src={facebook} label="Facebook"  />
			<SocialLink
				href="https://instagram.com/"
				src={instagram}
				label="Instagram"
			/>
			<SocialLink href="https://telegram.org/" src={telegram} label="Telegram" />
		</div>
	);
};

export default SocialLinks;
