import React from "react";
import { useTranslation } from "react-i18next";

import { IoIosCamera } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Section from "@/layout/section";
import { Button } from "@/components/ui/button";
import useCreateGenreFeatures from "./features";
import noImage from "@/assets/images/no-image.png";

const CreateGenre: React.FC = () => {
	const { t } = useTranslation();
	const {
		selectImageHandler,
		onInputChange,
		isFormValid,
		onSubmit,
		preview,
		uploading,
		formData,
	} = useCreateGenreFeatures();

	return (
		<Section id="create-genre">
			<h2 className="text-[22px] text-black mb-4">
				{t("dashboard.genres.create")}
			</h2>
			<form onSubmit={onSubmit}>
				<div className="flex flex-col gap-4">
					<Label className="flex flex-col gap-2">
						{t("dashboard.genres.name")}
						<Input
							type="text"
							name="name"
							value={formData.name}
							onChange={onInputChange}
						/>
					</Label>
					<Label className="flex flex-col gap-2" id="image-upload">
						{t("dashboard.authors.image")}
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
					</Label>
				</div>
				<Button
					disabled={!isFormValid() || uploading}
					className="mt-6 bg-[#BC8E5B]"
				>
					{uploading
						? t("dashboard.genres.uploading")
						: t("dashboard.genres.create")}
				</Button>
			</form>
		</Section>
	);
};

export default CreateGenre;
