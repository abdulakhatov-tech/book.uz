import Container from "@/layout/container";
import Section from "@/layout/section";
import { FC } from "react";
import successImage from "@/assets/images/checkout-success.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CheckoutSuccessComponent: FC = () => {
	return (
		<Section id="checkout-success" className="pb-10">
			<Container>
				<img
					src={successImage}
					alt="checkout-success"
					className="w-full object-fit"
				/>

				<div className="flex justify-center items-center gap-2 py-4">
					<Link to="/">
						<Button
							variant={"secondary"}
							className="text-[18px] font-semibold md:p-5"
						>
							Home
						</Button>
					</Link>
					<Link to="/profile/orders">
						<Button
							variant={"default"}
							className="bg-orange hover:bg-orange text-[18px] font-semibold md:p-5"
						>
							Orders
						</Button>
					</Link>
				</div>
			</Container>
		</Section>
	);
};

export default CheckoutSuccessComponent;
