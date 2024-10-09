import useUsersService from "@/services/users";

const useAdminsFeatures = () => {
	const { useGetAllUsers, demoteAdminToUser } = useUsersService();

	const demoteUserToUserHandler = (userId: string) => {
		demoteAdminToUser.mutate(userId);
	};

	return { useGetAllUsers, demoteUserToUserHandler };
};

export default useAdminsFeatures;
