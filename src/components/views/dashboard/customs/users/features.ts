import useUsersService from "@/services/users";

const useUsersFeatures = () => {
    const { getAllUsers, promoteUserToAdmin, demoteAdminToUser } = useUsersService();

    const promoteUserToAdminHandler = (userId: string) => {
         promoteUserToAdmin.mutate(userId)
    }

    const demoteUserToUserHandler = (userId: string) => {
        demoteAdminToUser.mutate(userId)
    }

  return { getAllUsers, promoteUserToAdminHandler, demoteUserToUserHandler };
};

export default useUsersFeatures;
