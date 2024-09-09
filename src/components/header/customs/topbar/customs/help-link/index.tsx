import React from "react";

const HelpLink: React.FC<{className: string}> = ({ className }) => {
  return (
    <nav className={className}>
      <a
        href='/help'
        aria-label='How to purchase guide'
        className='text-[16px] font-normal text-[#6A6A6A] underline'
      >
        Qanday xarid qilinadi?
      </a>
    </nav>
  );
};

export default HelpLink;
