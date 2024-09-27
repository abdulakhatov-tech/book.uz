import type { FC } from "react";

import Container from "@/layout/container";
import { HeaderNavigation, TopBar } from "./customs";

const Header: FC = () => {
  return (
    <header className='mt-[24px]'>
      <Container>
        <TopBar />
        <HeaderNavigation />
      </Container>
    </header>
  );
};

export default Header;
