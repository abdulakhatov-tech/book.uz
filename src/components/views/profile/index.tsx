import Container from "@/layout/container";
import React from "react";
import { Main, Sidebar } from "./customs";

const Profile: React.FC = () => {
  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-[289px_1fr] gap-[23px] pb-[100px]'>
        <Sidebar />
        <Main />
      </div>
    </Container>
  );
};

export default Profile;
