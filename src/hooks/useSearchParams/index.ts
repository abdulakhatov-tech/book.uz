import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router-dom";

const useSearchParamsHook = () => {
	const { toast } = useToast();
	const [searchParams, setSearchParams] = useSearchParams();

	const setParam = (key: string, value: string) => {
		if (typeof key !== "string" || typeof value !== "string") {
			toast({
				variant: "destructive",
				title: `Invalid key or value: ${key} - ${value}`,
				description: "setParam() expects a string key and value",
			});
			return;
		}

		searchParams.set(key, value);
		setSearchParams(searchParams);
	};

	const getParam = (key: string): string | null => {
		if (typeof key !== "string" || !key) {
			toast({
				variant: "destructive",
				title: `Invalid key: ${key}`,
				description: "getParam() expects a string key",
			});
			return null;
		}

		return searchParams.get(key);
	};

	const setParams = (params: Record<string, string | number>) => {
		if (typeof params !== "object" || typeof params === "string") {
			toast({
				variant: "destructive",
				title: `Invalid params: ${params}`,
				description: "setParams() expects an object",
			});
			return;
		}

		Object.keys(params).forEach((key) => {
			if (
				typeof key !== "string" ||
				(typeof params[key] !== "string" && typeof params[key] !== "number")
			) {
				toast({
					variant: "destructive",
					title: `Invalid value for key: ${key} - ${params[key]}`,
					description:
						"setParams() expects string or number values for each key",
				});
				return;
			}

			searchParams.set(key, params[key].toString());
		});

		setSearchParams(searchParams);
	};

	const getParams = (): Record<string, string> => {
		const params: Record<string, string> = {};

		for (const [key, value] of searchParams.entries()) {
			params[key] = value;
		}

		return params;
	};

	const removeParam = (key: string) => {
		if (typeof key !== "string" || !key) {
			toast({
				variant: "destructive",
				title: `Invalid key: ${key}`,
				description: "removeParam() expects a string key",
			});
			return;
		}

		searchParams.delete(key);
		setSearchParams(searchParams);
	};

	const removeParams = (keys: string[]) => {
		if (!Array.isArray(keys) || keys.some((key) => typeof key !== "string")) {
			toast({
				variant: "destructive",
				title: "Keys must be an array of strings!",
				description: "removeParams() expects an array of string keys",
			});
			return;
		}

		// keys.forEach((key) => searchParams.delete(key));
		for (const key of keys) {
			searchParams.delete(key);
		}
		setSearchParams(searchParams);
	};

	const clearParams = () => {
		const allParams = getParams();

		// Object.keys(allParams).forEach((key) => searchParams.delete(key));
		for (const key of Object.keys(allParams)) {
			searchParams.delete(key);
		}
		setSearchParams(searchParams);
	};

	return {
		setParam,
		getParam,
		setParams,
		getParams,
		removeParam,
		removeParams,
		clearParams,
	};
};

export default useSearchParamsHook;
