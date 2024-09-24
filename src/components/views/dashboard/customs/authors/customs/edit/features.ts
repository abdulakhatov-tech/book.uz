import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
const useEditAuthorFeatures = () => {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { getAuthorById, updateAuthorById } = useAuthorsService();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataI>({
    fullName: "",
    dateOfbirth: "",
    biography: "",
    dateOfdeath: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const { data: author, isLoading, isError } = getAuthorById;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "date" ? formatDate(value) : value, // Format date fields if necessary
    }));
  };
  const isFormValid = () => {
    return (
      formData?.fullName?.trim() &&
      formData?.dateOfbirth?.trim() &&
      formData?.biography &&
      formData?.dateOfdeath?.trim() &&
      imageUrl
    );
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
    updateAuthorById.mutate({
      ...author,
      fullName: formData.fullName,
      dateOfbirth: formatDate(formData.dateOfbirth),
      biography: formData.biography,
      dateOfdeath: formatDate(formData.dateOfdeath),
      imgUrl: imageUrl,
    });
    navigate("/dashboard/authors");
  };
  return {
    preview,
    formData,
    isLoading,
    isError,
    onInputChange,
    selectImageHandler,
    isFormValid,
    uploading,
    onSubmit,
  };
};
export default useEditAuthorFeatures;
