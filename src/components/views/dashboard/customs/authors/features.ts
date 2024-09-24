import useAuthorsService from "@/services/authors";
const useAuthorsFeatures = () => {
	const { getAllAuthors } = useAuthorsService();
	return { getAllAuthors };
};
export default useAuthorsFeatures;
