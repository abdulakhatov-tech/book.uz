import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useAuthorsService from "@/services/authors";

const useCreateAuthorFeatures = () => {
	const axios = useAxiosInstance();
	const [imageUrl, setImageUrl] = useState("");
	const [preview, setPreview] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		fullName: "",
		dateOfbirth: "",
		biography: "",
		dateOfdeath: "",
	});
	const navigate = useNavigate();
	const [uploading, setUploading] = useState(false);
	const { createAuthor } = useAuthorsService();

	const selectImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploading(true);
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string); // Set preview image
			};
			reader.readAsDataURL(file);
		}

		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await axios({
				method: "POST",
				url: `${import.meta.env.VITE_API_BASE_URL}/upload`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const { imageUrl } = response.data;
			setImageUrl(imageUrl);
		} catch (error) {
			toast({
				title: "Upload Error",
				description: "An error occurred while uploading author profile image.",
			});
		}
		setUploading(false);
	};

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const isFormValid = () => {
		return (
			formData.fullName.trim() &&
			formData.dateOfbirth.trim() &&
			formData.biography.trim() &&
			formData.dateOfdeath.trim() &&
			imageUrl
		);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createAuthor.mutate({
			fullName: formData.fullName,
			dateOfbirth: formData.dateOfbirth,
			biography: formData.biography,
			dateOfdeath: formData.dateOfdeath,
			imgUrl: imageUrl,
		});

		navigate("/dashboard/authors");
	};

	return {
		selectImageHandler,
		onInputChange,
		isFormValid,
		onSubmit,
		imageUrl,
		preview,
		uploading,
		formData,
	};
};

export default useCreateAuthorFeatures;
