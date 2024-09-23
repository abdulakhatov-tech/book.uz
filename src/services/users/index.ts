import Cookies from "js-cookie";
import { UserI } from "@/types";
import useAxiosInstance from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// Define a constant for the auth state cookie key
const AUTH_STATE_COOKIE_KEY = "_auth_state";

// Helper function to update user data in the cookie
const updateUserCookie = (updatedUser: UserI): void => {
	const existingUser = Cookies.get(AUTH_STATE_COOKIE_KEY);

	if (existingUser) {
		try {
			const parsedUser = JSON.parse(existingUser);
			const updatedUserData = { ...parsedUser, ...updatedUser };
			Cookies.set(AUTH_STATE_COOKIE_KEY, JSON.stringify(updatedUserData), {
				expires: 7,
			});
		} catch (error) {
			toast({
				title: "Update Error",
				description: "An error occurred while updating your profile image.",
			});
		}
	}
};

const useUsersService = () => {
	const { t } = useTranslation();
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();
	const user: UserI | null = useAuthUser();

	const getAllUsers = useQueryHandler({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await axios.get("/users");
			return response.data.data;
		},
		refetchInterval: 60 * 60 * 1000, // Refetch every hour
	});

	const getUserById = useQueryHandler({
		queryKey: ["user", { userId: user?._id }],
		queryFn: async () => {
			const response = await axios.get(`/users/${user?._id}`);
			return response.data?.data || null;
		},
		refetchInterval: 60 * 60 * 1000, // Refetch every hour
	});

	const updateUserById = useMutation({
		mutationFn: async (user: UserI) => {
			const response = await axios.put(`/users/${user._id}`, user);
			return response.data.data;
		},
		onSuccess: (updatedUser: UserI) => {
			// Update the user data in the cookie after a successful mutation
			updateUserCookie(updatedUser);

			// Invalidate the query related to the user data to trigger a refetch
			queryClient.invalidateQueries({
				queryKey: ["user", { userId: updatedUser?._id }],
			});

			queryClient.invalidateQueries({
				queryKey: ["users"],
			});

			toast({
				title: t("profile.message.profile_updated_title"),
				description: t("profile.message.profile_updated_description"),
			});
		},
		onError: (error) => {
			// Handle the error gracefully
			toast({
				title: t("profile.message.image_title"),
				description:
					(error as Error).message || t("profile.message.failed_to_update"),
			});
		},
	});

	const promoteUserToAdmin = useMutation({
		mutationFn: async (userId: string) => {
			const response = await axios.put(`/users/promote/${userId}`);
			return response.data.data;
		},
		onSuccess: (updatedUser: UserI) => {
			// Invalidate the query related to the user data to trigger a refetch
			queryClient.invalidateQueries({
				queryKey: ["user", { userId: updatedUser?._id }],
			});

			queryClient.invalidateQueries({
				queryKey: ["users"],
			});

			toast({
				title: t("admin.message.promotion_title"),
				description: t("admin.message.promotion_description"),
			});
		},
		onError: (error) => {
			// Handle the error gracefully
			toast({
				title: t("admin.message.promotion_error_title"),
				description:
					(error as Error).message ||
					t("admin.message.promotion_error_description"),
			});
		},
	});

	const demoteAdminToUser = useMutation({
		mutationFn: async (userId: string) => {
			const response = await axios.put(`/users/demote/${userId}`);
			return response.data.data;
		},
		onSuccess: (updatedUser: UserI) => {
			// Invalidate the query related to the user data to trigger a refetch
			queryClient.invalidateQueries({
				queryKey: ["user", { userId: updatedUser?._id }],
			});

			queryClient.invalidateQueries({
				queryKey: ["users"],
			});

			toast({
				title: t("admin.message.demotion_title"),
				description: t("admin.message.demotion_description"),
			});
		},
		onError: (error) => {
			// Handle the error gracefully
			toast({
				title: t("admin.message.demotion_error_title"),
				description:
					(error as Error).message ||
					t("admin.message.demotion_error_description"),
			});
		},
	});

	return {
		updateUserById,
		getUserById,
		getAllUsers,
		promoteUserToAdmin,
		demoteAdminToUser,
	};
};

export default useUsersService;
