import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { UserI } from "@/types";
import useUsersService from "@/services/users";

const useSettingFeatures = () => {
	const user: UserI | null = useAuthUser();
	const { updateUserById } = useUsersService();

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		phoneNumber: "",
		email: "",
		bio: "",
	});

	// Set form data when user data is available
	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				surname: user.surname || "",
				phoneNumber: user.phoneNumber || "",
				email: user.email || "",
				bio: user.bio || "",
			});
		}
	}, [user]);

	// Handle form inputs
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (user && user._id) {
			// Compare current form data with the user's original data
			const isDataChanged =
				formData.name !== user.name ||
				formData.surname !== user.surname ||
				formData.phoneNumber !== user.phoneNumber ||
				formData.email !== user.email ||
				formData.bio !== user.bio;

			if (isDataChanged) {
				setLoading(true);
				updateUserById.mutate({
					_id: user._id,
					name: formData.name,
					surname: formData.surname,
					phoneNumber: formData.phoneNumber,
					email: formData.email,
					bio: formData.bio,
				});
				setLoading(false);
			}
		}
	};

	return {
		formData,
		handleInputChange,
		handleSubmit,
		loading,
	};
};

export default useSettingFeatures;
