import React from "react";

import Section from "@/layout/section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useSettingFeatures from "./features";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
	const { t } = useTranslation();
	const { handleSubmit, formData, handleInputChange, loading } =
		useSettingFeatures();

	return (
		<Section id="settings">
			<h2 className="text-[24px] font-semibold leading-[29.26px] text-black mb-6">
				{t("profile.settings.title")}
			</h2>

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<Label htmlFor="name" className="text-[#828282] flex flex-col gap-2">
						{t("profile.settings.name")}:
						<Input
							type="text"
							name="name"
							value={formData.name} // Set default value from user data
							onChange={handleInputChange}
						/>
					</Label>
					<Label
						htmlFor="surname"
						className="text-[#828282] flex flex-col gap-2"
					>
						{t("profile.settings.surname")}:
						<Input
							type="text"
							name="surname"
							value={formData.surname} // Set default value from user data
							onChange={handleInputChange}
						/>
					</Label>
					<Label
						htmlFor="phoneNumber"
						className="text-[#828282] flex flex-col gap-2"
					>
						{t("profile.settings.phoneNumber")}:
						<Input
							type="text"
							name="phoneNumber"
							value={formData.phoneNumber} // Set default value from user data
							onChange={handleInputChange}
						/>
					</Label>
					<Label htmlFor="email" className="text-[#828282] flex flex-col gap-2">
						{t("profile.settings.email")}:
						<Input
							type="email"
							name="email"
							value={formData.email} // Set default value from user data
							onChange={handleInputChange}
						/>
					</Label>
					<Label htmlFor="bio" className="text-[#828282] flex flex-col gap-2">
						{t("profile.settings.bio")}:
						<Textarea
							name="bio"
							value={formData.bio} // Set default value from user data
							rows={6} // Set default number of rows for textarea
							onChange={handleInputChange}
						/>
					</Label>
				</div>
				<Button type="submit" className="bg-[#EF7F1A] hover:bg-[#EF7F1A] mt-4">
					{loading
						? `${t("profile.settings.save")}...`
						: t("profile.settings.save")}
				</Button>
			</form>
		</Section>
	);
};

export default Settings;
