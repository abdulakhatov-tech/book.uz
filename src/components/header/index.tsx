import React from "react";
import { HeaderNavigation, TopBar } from "./customs";
import Container from "@/layout/container";

const Header:React.FC = () => {
  return <header id='header' className="mt-[24px]">
    <Container>
        <TopBar />
        <HeaderNavigation />
    </Container>
  </header>;
};

export default Header;
