import { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

interface ActionsPropsI {
	activeStatus: string;
	setActiveStatus: any;
}

const Actions: FC<ActionsPropsI> = ({ activeStatus, setActiveStatus }) => {
	const { t } = useTranslation();

	return (
		<div className="flex items-center gap-2 flex-wrap">
			{["all", "pending", "processing", "delivered", "canceled"].map(
				(status) => (
					<Button
						key={status}
						onClick={() => setActiveStatus(status as any)}
						className={classNames(
							"text-[16px] leading-[24px]",
							activeStatus === status
								? "bg-[#FCE5D1] hover:bg-[#FCE5D1] text-orange font-semibold"
								: "bg-[#F6F6F6] hover:bg-[#F6F6F6] text-secondary-black font-medium",
						)}
					>
						{t(`profile.orders.${status}`)}
					</Button>
				),
			)}
		</div>
	);
};

export default Actions;
