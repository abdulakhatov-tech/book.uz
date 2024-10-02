import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosInstance from "@/api";
import useBooksService from "@/services/books";
import { toast } from "@/components/ui/use-toast";
import { FormDataI, ImageUrlsI } from "./interface";

const initialPreview: ImageUrlsI = {
	thumbnail: "",
	additionalImage1: "",
	additionalImage2: "",
	additionalImage3: "",
	additionalImage4: "",
};

const initialFormData: FormDataI = {
	name: "",
	genre: "",
	author: "",
	amount: 0,
	bookPrice: 0,
	language: "uz",
	cover: "hard",
	discount: 0,
	numberOfPages: 0,
	state: "new",
	year: 2024,
	barcode: "",
	description: "",
};

const useCreateBookFeatures = () => {
	const { slug } = useParams()
	const navigate = useNavigate();
	const axios = useAxiosInstance();
	const { bookId } = useParams<{ bookId: string }>();
	const { createBook, useGetBookById, updateBookById } = useBooksService();

	// states
	const [uploading, setUploading] = useState<boolean>(false);
	const [preview, setPreview] = useState<ImageUrlsI>(initialPreview);
	const [formData, setFormData] = useState<FormDataI>(initialFormData);
	const [imageUrls, setImageUrls] = useState<ImageUrlsI>(initialPreview);

	const { data: book, isLoading, isError } = useGetBookById(slug);

	const loading = isLoading || isError;

	useEffect(() => {
		if (book) {
			setFormData({
				name: book.name || "",
				genre: book.genre._id || "",
				author: book.author._id || "",
				amount: book.amount,
				bookPrice: book.bookPrice,
				language: book.language,
				cover: book.cover,
				discount: book.discount || 0,
				numberOfPages: book.numberOfPage,
				state: book.state,
				year: book.year,
				barcode: book.barcode,
				description: book.description,
			});

			const images = {
				thumbnail: book.imgUrl,
				additionalImage1: book.additionalImages[0] || "",
				additionalImage2: book.additionalImages[1] || "",
				additionalImage3: book.additionalImages[2] || "",
				additionalImage4: book.additionalImages[3] || "",
			};

			setPreview(images);
			setImageUrls(images);
		}
	}, [book]);

	const onInputChange = (
		e:
			| React.ChangeEvent<
					HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			  >
			| string,
		fieldName?: string,
	) => {
		if (typeof e === "string" && fieldName) {
			setFormData((prevState) => ({
				...prevState,
				[fieldName]: e,
			}));
		} else if (typeof e !== "string") {
			const { name, value } = e.target;
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const selectImageHandler = async (
		e: React.ChangeEvent<HTMLInputElement>,
		imageType: string,
	) => {
		setUploading(true);
		const file = e.target.files?.[0];

		if (!file) {
			setUploading(false);
			return;
		}

		// Setting the preview image immediately
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview((prev) => ({
				// Dynamically update the image URL based on the imageType
				...prev,
				[imageType]: reader.result as string,
			})); // Set preview image
		};
		reader.readAsDataURL(file);

		try {
			const formData = new FormData();
			formData.append("image", file);

			const response = await axios({
				method: "POST",
				url: `${import.meta.env.VITE_API_BASE_URL}/upload`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const { imageUrl } = response.data;
			// Update the appropriate image URL based on the imageType
			setImageUrls((prev) => ({
				...prev,
				[imageType]: imageUrl, // Dynamically set the image URL
			}));
		} catch (error) {
			toast({
				title: "Upload Error",
				description: "An error occurred while uploading author profile image.",
			});
		} finally {
			setUploading(false);
		}
	};

	const isFormValid = () => {
		const requiredFields = [
			formData.name.trim(),
			formData.genre.trim(),
			formData.author.trim(),
			formData.language.trim(),
			formData.cover.trim(),
			formData.state.trim(),
			formData.barcode.trim(),
			formData.description.trim(),
		];

		const isFilled = requiredFields.every(Boolean);
		const isValidNumbers =
			+formData.amount > 0 &&
			+formData.bookPrice > 0 &&
			+formData.numberOfPages > 0 &&
			+formData.year > 0 &&
			formData.discount !== null &&
			+formData.discount >= 0;

		console.log(isFilled, isValidNumbers, formData, "isFilled");
		return isFilled && isValidNumbers;
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormValid()) {
			toast({
				title: "Form Error",
				description:
					"Please fill in all required fields and ensure the data is valid.",
			});
			return;
		}

		const payload = {
			...formData,
			amount: +formData.amount,
			bookPrice: +formData.bookPrice,
			discount: formData.discount ? +formData.discount : 0,
			numberOfPage: +formData.numberOfPages,
			year: +formData.year,
			imgUrl: imageUrls.thumbnail,
			additionalImages: [
				imageUrls.additionalImage1,
				imageUrls.additionalImage2,
				imageUrls.additionalImage3,
				imageUrls.additionalImage4,
			],
		};

		if (bookId) {
			updateBookById.mutate({
				_id: bookId,
				...payload,
			});
			toast({
				title: "Book Updated",
				description: "The book has been updated successfully.",
			});
		} else {
			createBook.mutate(payload);

			toast({
				title: "Book Created",
				description: "The book has been created successfully.",
			});
		}

		navigate("/dashboard/products");
	};

	console.log(!isFormValid(), uploading);

	return {
		formData,
		onInputChange,
		selectImageHandler,
		preview,
		uploading,
		isFormValid,
		onSubmit,
		loading,
	};
};

export default useCreateBookFeatures;
