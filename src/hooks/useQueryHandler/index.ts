import { useQuery, QueryKey } from "@tanstack/react-query";

interface QueryHandlerProps {
	queryKey: QueryKey;
	queryFn: (_id?: string) => any;
	onError?: (err: Error) => void;
	options?: object;
	retry?: number;
	onSuccess?: () => void;
	enabled?: any;
	staleTime?: number;
	select?: any;
	refetchInterval?: any;
}

const useQueryHandler = ({
	queryKey,
	queryFn,
	options = {},
	staleTime,
	select,
	refetchInterval,
}: QueryHandlerProps) => {
	const queryRequest = useQuery({
		queryKey,
		queryFn,
		...{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			...options,
		},
		staleTime,
		select,
		refetchInterval,
	});

	return { ...queryRequest };
};

export default useQueryHandler;
