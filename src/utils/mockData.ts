import { DressRequest, ContactSubmission, Dress } from "../types";
import { STORAGE_KEYS } from "../constants";
import { dresses } from "../data/dresses";

const generateId = (): string => {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const initializeMockDresses = (): void => {
	const existing = localStorage.getItem(STORAGE_KEYS.ADMIN_DRESSES);
	if (!existing) {
		localStorage.setItem(STORAGE_KEYS.ADMIN_DRESSES, JSON.stringify(dresses));
	}
};

export const mockDataManager = {
	getDressRequests: (): DressRequest[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.DRESS_REQUESTS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading dress requests:", error);
			return [];
		}
	},

	addDressRequest: (request: Omit<DressRequest, "id" | "timestamp">): DressRequest => {
		const dressRequest: DressRequest = {
			...request,
			id: generateId(),
			timestamp: new Date().toISOString(),
		};

		try {
			const requests = mockDataManager.getDressRequests();
			requests.push(dressRequest);
			localStorage.setItem(STORAGE_KEYS.DRESS_REQUESTS, JSON.stringify(requests));
			console.log("Dress request added:", dressRequest);
		} catch (error) {
			console.error("Error adding dress request:", error);
		}

		return dressRequest;
	},

	updateDressRequest: (id: string, updates: Partial<DressRequest>): void => {
		try {
			const requests = mockDataManager.getDressRequests();
			const index = requests.findIndex((r) => r.id === id);
			if (index !== -1) {
				requests[index] = { ...requests[index], ...updates };
				localStorage.setItem(STORAGE_KEYS.DRESS_REQUESTS, JSON.stringify(requests));
				console.log("Dress request updated:", requests[index]);
			}
		} catch (error) {
			console.error("Error updating dress request:", error);
		}
	},

	deleteDressRequest: (id: string): void => {
		try {
			const requests = mockDataManager.getDressRequests();
			const filtered = requests.filter((r) => r.id !== id);
			localStorage.setItem(STORAGE_KEYS.DRESS_REQUESTS, JSON.stringify(filtered));
			console.log("Dress request deleted:", id);
		} catch (error) {
			console.error("Error deleting dress request:", error);
		}
	},

	getContactSubmissions: (): ContactSubmission[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEYS.CONTACT_SUBMISSIONS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading contact submissions:", error);
			return [];
		}
	},

	addContactSubmission: (submission: Omit<ContactSubmission, "id" | "timestamp">): ContactSubmission => {
		const contactSubmission: ContactSubmission = {
			...submission,
			id: generateId(),
			timestamp: new Date().toISOString(),
		};

		try {
			const submissions = mockDataManager.getContactSubmissions();
			submissions.push(contactSubmission);
			localStorage.setItem(STORAGE_KEYS.CONTACT_SUBMISSIONS, JSON.stringify(submissions));
			console.log("Contact submission added:", contactSubmission);
		} catch (error) {
			console.error("Error adding contact submission:", error);
		}

		return contactSubmission;
	},

	deleteContactSubmission: (id: string): void => {
		try {
			const submissions = mockDataManager.getContactSubmissions();
			const filtered = submissions.filter((s) => s.id !== id);
			localStorage.setItem(STORAGE_KEYS.CONTACT_SUBMISSIONS, JSON.stringify(filtered));
			console.log("Contact submission deleted:", id);
		} catch (error) {
			console.error("Error deleting contact submission:", error);
		}
	},

	getAdminDresses: (): Dress[] => {
		try {
			initializeMockDresses();
			const data = localStorage.getItem(STORAGE_KEYS.ADMIN_DRESSES);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error reading admin dresses:", error);
			return [];
		}
	},

	addAdminDress: (dress: Omit<Dress, "id">): Dress => {
		const newDress: Dress = {
			...dress,
			id: `DR-${String(Math.floor(Math.random() * 10000)).padStart(3, "0")}`,
		};

		try {
			const dresses = mockDataManager.getAdminDresses();
			dresses.push(newDress);
			localStorage.setItem(STORAGE_KEYS.ADMIN_DRESSES, JSON.stringify(dresses));
			console.log("Dress added:", newDress);
		} catch (error) {
			console.error("Error adding dress:", error);
		}

		return newDress;
	},

	updateAdminDress: (id: string, updates: Partial<Dress>): void => {
		try {
			const dresses = mockDataManager.getAdminDresses();
			const index = dresses.findIndex((d) => d.id === id);
			if (index !== -1) {
				dresses[index] = { ...dresses[index], ...updates };
				localStorage.setItem(STORAGE_KEYS.ADMIN_DRESSES, JSON.stringify(dresses));
				console.log("Dress updated:", dresses[index]);
			}
		} catch (error) {
			console.error("Error updating dress:", error);
		}
	},

	deleteAdminDress: (id: string): void => {
		try {
			const dresses = mockDataManager.getAdminDresses();
			const filtered = dresses.filter((d) => d.id !== id);
			localStorage.setItem(STORAGE_KEYS.ADMIN_DRESSES, JSON.stringify(filtered));
			console.log("Dress deleted:", id);
		} catch (error) {
			console.error("Error deleting dress:", error);
		}
	},

	getStatistics: () => {
		const dressRequests = mockDataManager.getDressRequests();
		const contactSubmissions = mockDataManager.getContactSubmissions();
		const adminDresses = mockDataManager.getAdminDresses();

		return {
			totalDresses: adminDresses.length,
			pendingRequests: dressRequests.filter((r) => r.status === "pending").length,
			contactedRequests: dressRequests.filter((r) => r.status === "contacted").length,
			completedRequests: dressRequests.filter((r) => r.status === "completed").length,
			totalContactMessages: contactSubmissions.length,
		};
	},
};
