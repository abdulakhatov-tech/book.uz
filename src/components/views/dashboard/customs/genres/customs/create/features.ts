import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosInstance from "@/api";
import useGenresService from "@/services/genres";
import { toast } from "@/components/ui/use-toast";

const useCreateGenreFeatures = () => {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { createGenre } = useGenresService();

  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [uploading, setUploading] = useState(false);

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
    return formData.name.trim();
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGenre.mutate({
        name: formData.name,
        imgUrl: imageUrl,
    });
    navigate("/dashboard/genres");
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

export default useCreateGenreFeatures;
