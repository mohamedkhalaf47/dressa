export interface Dress {
	id: string;
	name: string;
	price: number;
	image: string;
	description: string;
}

export interface BuyRequest {
	id: string;
	dressId: string;
	customerName: string;
	email: string;
	phone: string;
	address: string;
	timestamp: string;
}

export interface SellRequest {
	id: string;
	title: string;
	description: string;
	size: string;
	condition: string;
	price: number;
	contactName: string;
	email: string;
	phone: string;
	photos: string[];
	timestamp: string;
}

export interface RentRequest {
	id: string;
	preferences: string;
	startDate: string;
	endDate: string;
	size: string;
	occasion: string;
	contactName: string;
	email: string;
	phone: string;
	timestamp: string;
}

export interface ActivityLog {
	id: string;
	action: string;
	metadata?: Record<string, unknown>;
	timestamp: string;
	userAgent: string;
}
