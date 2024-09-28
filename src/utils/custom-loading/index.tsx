import { useEffect, useState } from "react";
import useOnlineStatus from "@/hooks/useOnlineStatus";

interface UseLoadingOptions {
	delay?: number; // Optional custom delay time
}

const DEFAULT_LOADING_DELAY_MS = 1000;

const useLoading = ({
	delay = DEFAULT_LOADING_DELAY_MS,
}: UseLoadingOptions = {}) => {
	const isOnline = useOnlineStatus();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isOnline) {
			setIsLoading(true); // If offline, ensure loading state is true
			return;
		}

		const timerId = setTimeout(() => setIsLoading(false), delay);

		return () => clearTimeout(timerId); // Cleanup timer on component unmount or when delay changes
	}, [delay, isOnline]); // Depend on both delay and online status for reactivity

	return { isLoading };
};

export default useLoading;
