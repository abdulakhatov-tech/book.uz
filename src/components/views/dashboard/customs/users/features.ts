import useUsersService from "@/services/users";

const useUsersFeatures = () => {
	const { getAllUsers, promoteUserToAdmin } =
		useUsersService();

	const promoteUserToAdminHandler = (userId: string) => {
		promoteUserToAdmin.mutate(userId);
	};

	return { getAllUsers, promoteUserToAdminHandler };
};

export default useUsersFeatures;
