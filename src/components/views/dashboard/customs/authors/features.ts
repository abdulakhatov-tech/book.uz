import useAuthorsService from "@/services/authors";
const useAuthorsFeatures = () => {
	const { useGetAllAuthors } = useAuthorsService();
	return { useGetAllAuthors };
};
export default useAuthorsFeatures;
