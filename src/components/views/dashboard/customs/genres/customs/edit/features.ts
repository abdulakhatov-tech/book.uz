import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useGenresService from "@/services/genres";

interface FormDataI {
	name: string;
}

const useEditGenreFeatures = () => {
	const navigate = useNavigate();
	const { genreId } = useParams();
	const axios = useAxiosInstance();
	const { useGetGenreById, updateGenreById } = useGenresService();

	const [imageUrl, setImageUrl] = useState<string>("");
	const [preview, setPreview] = useState<string | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormDataI>({ name: "" });

	const { data: genre, isLoading, isError } = useGetGenreById(genreId!);

	useEffect(() => {
		if (genre) {
			setFormData({
				name: genre.name || "",
			});
			setImageUrl(genre.imgUrl || "");
			setPreview(genre.imgUrl || "");
		}
	}, [genre]);

	const selectImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
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
			setImageUrl(imageUrl); // Set the new image URL
			setPreview(URL.createObjectURL(file)); // Set preview for the new image
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
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value, // Format date fields if necessary
		}));
	};

	const isFormValid = () => {
		return formData.name.trim();
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isFormValid()) {
			toast({
				title: "Invalid Form",
				description: "Please fill all fields and upload an image.",
			});
			return;
		}
		updateGenreById.mutate({
			...genre,
			name: formData.name,
			imgUrl: imageUrl,
		});
		navigate("/dashboard/genres");
	};

	return {
		isError,
		preview,
		formData,
		onSubmit,
		uploading,
		isLoading,
		isFormValid,
		onInputChange,
		selectImageHandler,
	};
};

export default useEditGenreFeatures;
