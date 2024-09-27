import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

const useCategoriesService = () => {
  const axios = useAxiosInstance();

  const handleError = (error: any, action: string) => {
    toast({
      title: `Error ${action}`,
      description: error.message,
    });
  };

  const getNewAgeLibrary = useQueryHandler({
    queryKey: ["newAgeLibrary"],
    queryFn: async () => {
      const response = await axios.get("/category/new-age-library");
      return response.data?.data || [];
    },
    refetchInterval: 60 * 60 * 1000, // 1 hour
    onError: (error) => handleError(error, "fetching new age library"),
  });

  const getRecentlyPublishedBooks = useQueryHandler({
    queryKey: ["recentlyPublishedBooks"],
    queryFn: async () => {
      const response = await axios.get("/category/recently-published");
      return response.data?.data || [];
    },
    refetchInterval: 60 * 60 * 1000, // 1 hour
    onError: (error) => handleError(error, "fetching recently published books"),
  });

  const getNewlyArrivedBooks = useQueryHandler({
    queryKey: ["newlyArrivedBooks"],
    queryFn: async () => {
      const response = await axios.get("/category/newly-arrived");
      return response.data?.data || [];
    },
    refetchInterval: 60 * 60 * 1000, // 1 hour
    onError: (error) => handleError(error, "fetching newly arrived books"),
  });

  return {
    getNewAgeLibrary,
    getNewlyArrivedBooks,
    getRecentlyPublishedBooks,
  };
};

export default useCategoriesService;
