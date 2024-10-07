import useAxiosInstance from "@/api";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useMutation } from "@tanstack/react-query";

export const useUserApi = () => {
	const axios = useAxiosInstance();

	const useGetDeliveryMethods = () =>
		useQueryHandler({
			queryKey: ["delivery-methods"],
			queryFn: async () => {
				const response = await axios.get("/user-api/delivery-methods");
				return response.data.data || [];
			},
		});

	const useGetPaymentMethods = () =>
		useQueryHandler({
			queryKey: ["payment-methods"],
			queryFn: async () => {
				const response = await axios.get("/user-api/payment-methods");
				return response.data.data || [];
			},
		});

	const useGetRegions = () =>
		useQueryHandler({
			queryKey: ["regions"],
			queryFn: async () => {
				const response = await axios.get("/user-api/regions");
				return response.data.data || [];
			},
		});

	const useGetDistricts = (regionId: string) =>
		useQueryHandler({
			queryKey: ["districts", { regionId }],
			queryFn: async () => {
				const response = await axios.get(`/user-api/districts/${regionId}`);
				return response.data.data || [];
			},
		});

	const applyCoupon = useMutation({
		mutationFn: async (couponCode: string) => {
			const response = await axios.post("/user-api/apply-coupon", {
				couponCode,
			});
			return response.data.data;
		},
	});

	return {
		useGetDeliveryMethods,
		useGetPaymentMethods,
		useGetDistricts,
		useGetRegions,
		applyCoupon,
	};
};
