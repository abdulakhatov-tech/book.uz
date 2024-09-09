import React from "react";

import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import telegram from "@/assets/icons/telegram.svg";

type SocialLinkProps = {
  src: string;
  href: string;
  label: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, src }) => (
  <a href={href} aria-label={label} target='_blank' rel='noopener noreferrer'>
    <img src={src} alt={label} />
  </a>
);

const SocialLinks: React.FC = () => {
  return (
    <div className='flex items-center gap-2'>
      <SocialLink href='http://facebook.com/' src={facebook} label='Facebook' />
      <SocialLink
        href='http://instagram.com/'
        src={instagram}
        label='Instagram'
      />
      <SocialLink href='http://telegram.com/' src={telegram} label='Telegram' />
    </div>
  );
};

export default SocialLinks;
