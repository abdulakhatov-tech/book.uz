import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOrdersService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();

	const useGetAllOrders = () =>
		useQueryHandler({
			queryKey: ["all-orders"],
			queryFn: async () => {
				const response = await axios.get("/orders");
				return response.data.data || [];
			},
			onError: (error) => {
				toast({
					title: "Error fetching orders",
					description: error.message,
				});
			},
		});

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
			status: "pending" | "processing" | "delivered" | "canceled";
		}) => {
			const response = await axios.put(`/orders/${orderId}/status`, { status });
			queryClient.setQueryData(["all-orders"], (oldOrders: any) => {
				return oldOrders.map((order: any) =>
					order._id === orderId ? { ...order, status } : order,
				);
			});
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["all-orders"],
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
		createOrder,
		useGetAllOrders,
		useGetUserOrders,
		updateOrderStatus,
	};
};

export default useOrdersService;
