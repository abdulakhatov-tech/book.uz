import useUsersService from "@/services/users";

const useUsersFeatures = () => {
	const { useGetAllUsers, promoteUserToAdmin } = useUsersService();

	const promoteUserToAdminHandler = (userId: string) => {
		promoteUserToAdmin.mutate(userId);
	};

	return { useGetAllUsers, promoteUserToAdminHandler };
};

export default useUsersFeatures;
