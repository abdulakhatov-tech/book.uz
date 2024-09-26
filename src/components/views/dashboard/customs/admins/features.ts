import useUsersService from "@/services/users";

const useAdminsFeatures = () => {
	const { getAllUsers, demoteAdminToUser } =
		useUsersService();

	const demoteUserToUserHandler = (userId: string) => {
		demoteAdminToUser.mutate(userId);
	};

	return { getAllUsers, demoteUserToUserHandler };
};

export default useAdminsFeatures;
