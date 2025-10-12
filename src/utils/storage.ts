import {
	BuyRequest,
	SellRequest,
	RentRequest,
	RentOutRequest,
	ActivityLog,
} from "../types";
import { STORAGE_KEYS, MAX_ACTIVITY_LOGS } from "../constants";

export const storage = {
	getBuyRequests: (): BuyRequest[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.BUY_REQUESTS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading buy requests:", error);
			return [];
		}
	},

	saveBuyRequest: (request: BuyRequest): void => {
		try {
			const requests = storage.getBuyRequests();
			requests.push(request);
			localStorage.setItem(STORAGE_KEYS.BUY_REQUESTS, JSON.stringify(requests));
		} catch (error) {
			console.error("Error saving buy request:", error);
		}
	},

	getSellRequests: (): SellRequest[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.SELL_REQUESTS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading sell requests:", error);
			return [];
		}
	},

	saveSellRequest: (request: SellRequest): void => {
		try {
			const requests = storage.getSellRequests();
			requests.push(request);
			localStorage.setItem(
				STORAGE_KEYS.SELL_REQUESTS,
				JSON.stringify(requests)
			);
		} catch (error) {
			console.error("Error saving sell request:", error);
		}
	},

	getRentRequests: (): RentRequest[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.RENT_REQUESTS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading rent requests:", error);
			return [];
		}
	},

	saveRentRequest: (request: RentRequest): void => {
		try {
			const requests = storage.getRentRequests();
			requests.push(request);
			localStorage.setItem(
				STORAGE_KEYS.RENT_REQUESTS,
				JSON.stringify(requests)
			);
		} catch (error) {
			console.error("Error saving rent request:", error);
		}
	},

	getActivityLogs: (): ActivityLog[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading activity logs:", error);
			return [];
		}
	},

	getRentOutRequests: (): RentOutRequest[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.RENT_OUT_REQUESTS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading rent out requests:", error);
			return [];
		}
	},

	saveRentOutRequest: (request: RentOutRequest): void => {
		try {
			const requests = storage.getRentOutRequests();
			requests.push(request);
			localStorage.setItem(
				STORAGE_KEYS.RENT_OUT_REQUESTS,
				JSON.stringify(requests)
			);
		} catch (error) {
			console.error("Error saving rent out request:", error);
		}
	},

	saveActivityLog: (log: ActivityLog): void => {
		try {
			let logs = storage.getActivityLogs();
			logs.push(log);

			if (logs.length > MAX_ACTIVITY_LOGS) {
				logs = logs.slice(-MAX_ACTIVITY_LOGS);
			}

			localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify(logs));
		} catch (error) {
			console.error("Error saving activity log:", error);
		}
	},
};
