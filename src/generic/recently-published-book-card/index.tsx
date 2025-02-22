import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { GrSearch } from "react-icons/gr";
import { MdOutlineStar } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";

import { BookI } from "@/types";
import { formatPrice } from "@/helpers";

const RecentlyPublishedBookCard: React.FC<BookI> = ({
	_id,
	name,
	imgUrl,
	author,
	rating,
	discount,
	rateCount,
	bookPrice,
}) => {
	const { t } = useTranslation();

	const renderImages = () => {
		return (
			<PhotoProvider className="h-full">
				<PhotoView src={imgUrl}>
					<img
						src={imgUrl}
						className="w-full h-full object-cover aspect-[2/3] flex items-center justify-center"
						alt={author.fullName}
					/>
				</PhotoView>
			</PhotoProvider>
		);
	};

	const renderActionButton = (
		icon: React.ReactNode,
		additionalClasses = "",
	) => (
		<div
			className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange ${additionalClasses}`}
		>
			{icon}
		</div>
	);

	return (
		<div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] md:grid-cols-[190px_1fr] bg-secondary-blue rounded-[16px] h-full max-w-[480px]  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
			<div className="relative">
				<div className="md:absolute -top-[40px] left-[50%] md:-translate-x-[50%] w-full max-w-[164px] h-full max-h-[226px]  overflow-hidden rounded-[6px]">
					{renderImages()}
					{discount ? (
						<span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg cursor-pointer">
							{discount}% OFF
						</span>
					) : (
						""
					)}
					<div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1">
						{renderActionButton(
							<FaShoppingBasket className="text-[16px] md:text-[18px]" />,
							"text-black hover:text-white",
						)}
						{renderActionButton(
							<Link to={`/books/details/${_id}`}>
								<GrSearch className="text-[16px] md:text-[18px]" />
							</Link>,
							"text-black hover:text-white",
						)}
					</div>
				</div>
			</div>
			<div className="w-full px-[12px] md:pl-0 md:pr-[18px] py-[14px] md:py-[16px]">
				<h3 className="text-[16px] sm:text-[20px] md:text-[22px] font-semibold leading-[29.05px] text-blue truncate-two-lines">
					{name}
				</h3>
				<h4 className="text-[12px] md:text-[16px] font-medium leading-[19.36px] text-black md:mt-2 mb-2 md:mb-4 truncate-single-line">
					{author?.fullName}
				</h4>

				<div className="flex items-center gap-2">
					<MdOutlineStar className="text-black text-[18px]" />
					<span className="text-[12px] font-medium leading-[17.07px] text-black">
						{rating} ({rateCount} odam)
					</span>
				</div>
				<div className="mt-2 md:mt-4 flex items-center justify-between">
					<h3 className="text-[14px] md:text-[24px] font-semibold leading-[29.26px] text-black ">
						{formatPrice(bookPrice)}{" "}
						<span className="text-[16px] leading-[19.5px]">
							{t("home.new_arrivals.currency")}
						</span>
					</h3>
					{renderActionButton(
						<IoMdHeartEmpty className="text-[18px] md:text-[20px]" />,
						"text-crimson hover:text-white",
					)}
				</div>
			</div>
		</div>
	);
};

export default RecentlyPublishedBookCard;
