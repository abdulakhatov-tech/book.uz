import React from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import Section from "@/layout/section";
import { IoIosCamera } from "react-icons/io";
import useCreateAuthorFeatures from "./features";
import noImage from "@/assets/images/no-user.jpg";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const CreateAuthor: React.FC = () => {
	const { t } = useTranslation();
	const { authorId } = useParams();
	const {
		selectImageHandler,
		onInputChange,
		isFormValid,
		onSubmit,
		preview,
		uploading,
		formData,
		loading,
	} = useCreateAuthorFeatures();

	const loadingState = !loading && authorId;

	const loadingFn = (className?: string) => (
		<Skeleton className={`${className ? className : "w-full h-[40px]"}`} />
	);

	return (
		<Section id="create-author">
			<h2 className="text-[22px] text-black mb-4">
				{t("dashboard.authors.create")}
			</h2>
			<form onSubmit={onSubmit}>
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-3 gap-4">
						<Label className="flex flex-col gap-2">
							{t("dashboard.authors.full_name")}
							{loadingState ? (
								loadingFn()
							) : (
								<Input
									type="text"
									name="fullName"
									value={formData.fullName}
									onChange={onInputChange}
								/>
							)}
						</Label>
						<Label className="flex flex-col gap-2">
							{t("dashboard.authors.date_of_birth")}
							{loadingState ? (
								loadingFn()
							) : (
								<Input
									type="date"
									name="dateOfbirth"
									value={formData.dateOfbirth}
									onChange={onInputChange}
								/>
							)}
						</Label>
						<Label className="flex flex-col gap-2">
							{t("dashboard.authors.date_of_death")}
							{loadingState ? (
								loadingFn()
							) : (
								<Input
									type="date"
									name="dateOfdeath"
									value={formData.dateOfdeath}
									onChange={onInputChange}
								/>
							)}
						</Label>
					</div>
					<Label className="flex flex-col gap-2">
						{t("dashboard.authors.biography")}
						{loadingState ? (
							loadingFn("w-full h-[180px]")
						) : (
							<Textarea
								name="biography"
								value={formData.biography}
								onChange={onInputChange}
								rows={10}
							/>
						)}
					</Label>
					<Label className="flex flex-col gap-2" id="image-upload">
						{t("dashboard.authors.image")}
						{loadingState ? (
							loadingFn("w-[150px] h-[150px] rounded-full")
						) : (
							<div className="flex items-center">
								<div className="relative">
									<img
										src={preview || noImage}
										className="object-cover w-[120px] h-[120px] rounded-full"
										alt="Uploaded Preview"
									/>
									<div className="flex items-center justify-center absolute -right-0 bottom-1 z-10 w-7 h-7 rounded-full overflow-hidden bg-[#F6F6F6] custom-shadow">
										<IoIosCamera className="text-[22px] text-[#6C6C6C]" />
									</div>
								</div>
								<Input
									type="file"
									name="image-upload"
									onChange={selectImageHandler}
									className="hidden"
								/>
							</div>
						)}
					</Label>
				</div>
				{loadingState ? (
					loadingFn("w-[150px] h-[40px] mt-6")
				) : (
					<Button
						disabled={!isFormValid() || uploading}
						className="mt-6 bg-[#BC8E5B]"
					>
						{uploading
							? t("dashboard.authors.uploading")
							: t("dashboard.authors.create")}
					</Button>
				)}
			</form>
		</Section>
	);
};
export default CreateAuthor;
