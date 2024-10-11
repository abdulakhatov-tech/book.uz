import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const ErrorPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Something Went Wrong - Book Shop</title>
				<meta
					name="description"
					content="Oops! Something went wrong. Please try again later or contact support."
				/>
				<meta
					name="keywords"
					content="error, page not found, book shop, troubleshooting"
				/>
				<link rel="canonical" href="/error" />
			</Helmet>
			<div className="w-full h-screen flex items-center justify-center">
				<h1 className="text-[24px] md:text-[32px] font-semibold text-black">
					Oops! Something went wrong!
				</h1>
			</div>
		</>
	);
};

export default ErrorPage;
