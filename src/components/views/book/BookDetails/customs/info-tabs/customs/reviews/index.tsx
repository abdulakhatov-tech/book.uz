import { FC } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import Rating from "@/generic/rating";
import { formatDate } from "@/helpers";
import { ReviewI, UserI } from "@/types";
import useReviewFeatures from "./features";
import LoadingSkeleton from "../loading-skeleton";

const Reviews: FC = () => {
	const user: UserI | null = useAuthUser();
	const { loading, reviews, handleDelete, handleUpdate } = useReviewFeatures();

	return (
		<div className="max-h-[500px] thin-scrollbar">
			{loading ? (
				<LoadingSkeleton />
			) : (
				<ul className="flex flex-col gap-3">
					{reviews?.reverse()?.map((review: ReviewI) => {
						if (user?._id === review?.user?._id) {
							return (
								<li className="border-b pb-3 bg-white p-4 rounded-[8px]">
									<div className="flex items-center justify-between">
										<h3 className="text-[16px] md:text-[18px] font-bold leading-[24px] text-[#5E5E5E] italic underline">
											{review?.user?.name} {review?.user?.surname}
										</h3>

										<div className="flex items-center gap-2">
											<MdEdit
												onClick={() => handleUpdate(review)}
												className="text-[19px] text-[#5E5E5E] hover:text-gray transition-all duration-75 active:scale-[0.97]"
											/>
											<FaRegTrashAlt
												onClick={() => handleDelete(review?._id)}
												className="text-[16px] text-[#5E5E5E] hover:text-crimson transition-all duration-75 active:scale-[0.97]"
											/>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<Rating
											rating={review?.rating}
											disabled={true}
											className="w-5 h-5"
										/>
										<span className="text-[14px] font-medium text-[#5E5E5E] italic">
											{formatDate(review?.createdAt)}
										</span>
									</div>
									<p className="text-[14px] font-medium leading-[20px] text-secondary-black italic">
										{review?.message}
									</p>
								</li>
							);
						}
						return (
							<li className="border-b pb-3 bg-white p-4 rounded-[8px]">
								<h3 className="text-[16px] md:text-[18px] font-semibold leading-[24px] text-[#5E5E5E] italic">
									{review?.user?.name} {review?.user?.surname}
								</h3>
								<div className="flex items-center gap-4">
									<Rating
										rating={review?.rating}
										disabled={true}
										className="w-5 h-5"
									/>
									<span className="text-[14px] font-medium text-[#5E5E5E] italic">
										{formatDate(review?.createdAt)}
									</span>
								</div>
								<p className="text-[14px] font-medium leading-[20px] text-secondary-black italic">
									{review?.message}
								</p>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Reviews;
