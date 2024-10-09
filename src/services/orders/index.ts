import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOrdersService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();

	const useGetUserOrders = (userId: string) =>
		useQueryHandler({
			queryKey: ["user-orders"],
			queryFn: async () => {
				const response = await axios.get(`/orders/${userId}`);
				return response.data.data || [];
			},
		});

	const createOrder = useMutation({
		mutationFn: async (order) => {
			const response = await axios.post("/orders", order);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user-orders"],
			});
			toast({
				title: "Order created",
				description: "Your order has been successfully created",
			});
		},
		onError: (error) => {
			toast({
				title: "Error creating order",
				description: error.message,
			});
		},
	});

	const updateOrderStatus = useMutation({
		mutationFn: async ({
			orderId,
			status,
		}: {
			orderId: string;
			status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
		}) => {
			const response = await axios.put(`/orders/${orderId}/status`, { status });
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["user-orders"],
			});
			toast({
				title: "Order updated",
				description: `Order status updated to ${data.status}`,
			});
		},
		onError: (error) => {
			toast({
				title: "Error updating order status",
				description: error.message,
			});
		},
	});

	return {
		useGetUserOrders,
		createOrder,
		updateOrderStatus,
	};
};

export default useOrdersService;
