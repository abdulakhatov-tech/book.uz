import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { UserI } from "@/types";
import useAxiosInstance from "@/api";
import useUsersService from "@/services/users";
import { toast } from "@/components/ui/use-toast";

const useProfileImageFeatures = () => {
  const axios = useAxiosInstance();
  const user: UserI | null = useAuthUser();
  const { updateUserById } = useUsersService();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file directly
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set preview image
      };
      reader.readAsDataURL(file); // Preview the selected image
    }
  
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile image.",
      });
      return;
    }
  
    if (!file) return; // Ensure a file is selected before proceeding
  
    const formData = new FormData();
    formData.append("image", file); // Use the file directly here, not selectedFile
  
    try {
      setUploading(true);
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const { imageUrl } = response.data;
  
      // Update the user profile with the new image URL
      updateUserById.mutate({
        ...user,
        profilePhoto: imageUrl,
      });
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "An error occurred while uploading your profile image.",
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    user,
    preview,
    uploading,
    handleFileChange,
  };
};

export default useProfileImageFeatures;
