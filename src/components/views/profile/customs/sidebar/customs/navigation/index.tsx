import { MockData } from "@/utils";
import React from "react";
import classnames from 'classnames';
import { NavLink } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UserI } from "@/types";

const Navigation: React.FC = () => {
    const { profileNavigation } = MockData();
    const user: UserI | null = useAuthUser();

    // const filteredNavigation = profileNavigation.filter((item: any) => item.roles.includes(user?.role))

  return <div className="border-t-[1px] border-b-[1px] border-[#DBDBDB] py-5">
    <ul className="flex flex-col gap-5">
        {
            profileNavigation.map((item) => (
                <li key={item.path}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) => classnames("flex items-center gap-2 text-[#000] text-[16px] font-medium hover:text-[#333]", {
                            "text-[#EF7F1A]": isActive,
                            "hover:text-[#EF7F1A]": !isActive,
                        })}
                    >
                        <item.icon className="text-[18px]" />
                        {item.label}
                    </NavLink>
                </li>
            ))
        }

    </ul>
  </div>;
};

export default Navigation;
