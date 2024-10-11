import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserI } from "@/types";
import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

// Define a constant for the auth state cookie key
const AUTH_STATE_COOKIE_KEY = "_auth_state";

interface QueryParamsI {
	page: number;
	limit: number;
}

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

	const useGetAllUsers = (params?: QueryParamsI) =>
		useQueryHandler({
			queryKey: ["users", params],
			queryFn: async () => {
				const response = await axios.get("/users", { params });
				return response?.data?.data || [];
			},
		});

	const useGetUserById = (userId: string) =>
		useQueryHandler({
			queryKey: ["user", { userId }],
			queryFn: async () => {
				const response = await axios.get(`/users/${userId}`);
				return response?.data?.data || null;
			},
		});

	const updateUserById = useMutation({
		mutationFn: async (user: {
			_id: string;
			name?: string;
			surname?: string;
			phoneNumber?: string;
			email?: string;
			bio?: string;
			profilePhoto?: string;
			balance?: number;
			frozenBalance?: number;
			lastEnteredAt?: Date;
			billingAddress?: {
				region?: string;
				district?: string;
				extraAddress?: string;
			};
		}) => {
			const response = await axios.put(`/users/${user._id}`, user);
			return response.data.data;
		},
		onSuccess: (updatedUser: UserI) => {
			// Updating the user data in the cookie after a successful mutation
			updateUserCookie(updatedUser);

			// Invalidate the query related to the user data to trigger a refetch
			queryClient.invalidateQueries({
				queryKey: ["user", { userId: updatedUser?._id }],
			});

			queryClient.invalidateQueries({
				queryKey: ["users"],
			});

			toast({
				title: t("Ma'lumotlaringiz yangilandi"),
			});
		},
		onError: (error) => {
			toast({
				title: t("Ma'lumotlaringizni yangilaydigan xatolik"),
				description: error.message,
			});
		},
	});

	const promoteUserToAdmin = useMutation({
		mutationFn: async (userId: string) => {
			const response = await axios.put(`/users/promote/${userId}`);
			return response?.data?.data;
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
			return response?.data?.data;
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
		useGetUserById,
		useGetAllUsers,
		demoteAdminToUser,
		promoteUserToAdmin,
	};
};

export default useUsersService;
