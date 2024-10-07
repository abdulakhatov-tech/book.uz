import { toast } from "@/components/ui/use-toast";

export const loadState = (key: string): any | undefined => {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (error: any) {
		toast({
			title: "Error saving state to localStorage",
			description: error?.message,
		});
		return undefined;
	}
};

export const saveState = (key: string, state: any): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (error: any) {
		toast({
			title: "Error saving state to localStorage",
			description: error?.message,
		});
	}
};

export const clearLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};