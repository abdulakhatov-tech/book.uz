import React from "react";

import { Separator } from "@/components/ui/separator";
import { Admins, AllUsers } from "./customs";

const Users: React.FC = () => {
	return (
		<div>
			<Admins />

			<Separator className="my-8" />

			<AllUsers />
		</div>
	);
};

export default Users;
