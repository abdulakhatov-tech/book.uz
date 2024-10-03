import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useAuthorsService from "@/services/authors";

interface FormDataI {
	fullName: string;
	dateOfbirth: string;
	biography: string;
	dateOfdeath: string;
}
// Utility function to format date to YYYY-MM-DD
const formatDate = (date: string) => {
	if (!date) return "";
	return new Date(date).toISOString().split("T")[0];
};

const useCreateAuthorFeatures = () => {
	const navigate = useNavigate();
	const { authorId } = useParams();
	const axios = useAxiosInstance();
	const { createAuthor, useGetAuthorById, updateAuthorById } =
		useAuthorsService();

	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>("");
	const [preview, setPreview] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormDataI>({
		fullName: "",
		dateOfbirth: "",
		biography: "",
		dateOfdeath: "",
	});

	const { data: author, isLoading, isError } = useGetAuthorById(authorId!);

	const loading = isLoading || isError;

	useEffect(() => {
		if (author) {
			setFormData({
				fullName: author.fullName || "",
				dateOfbirth: formatDate(author.dateOfbirth) || "",
				biography: author.biography || "",
				dateOfdeath: formatDate(author.dateOfdeath) || "",
			});
			setImageUrl(author.imgUrl || "");
			setPreview(author.imgUrl || "");
		}
	}, [author]);

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
		const { name, value, type } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "date" ? formatDate(value) : value, // Format date fields if necessary
		}));
	};

	const isFormValid = () => {
		return formData.fullName.trim() && formData.biography.trim();
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

		const payload = {
			fullName: formData.fullName,
			dateOfbirth: formatDate(formData.dateOfbirth),
			biography: formData.biography,
			dateOfdeath: formatDate(formData.dateOfdeath),
			imgUrl: imageUrl,
		};

		if (authorId) {
			updateAuthorById.mutate({
				...author,
				...payload,
			});
		} else {
			createAuthor.mutate(payload);
		}

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
		loading,
	};
};
export default useCreateAuthorFeatures;
