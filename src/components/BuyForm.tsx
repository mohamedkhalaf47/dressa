import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { dresses } from "../data/dresses";
import { BuyRequest } from "../types";
import { storage } from "../utils/storage";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

interface BuyFormProps {
	onSuccess: () => void;
}

export const BuyForm: React.FC<BuyFormProps> = ({ onSuccess }) => {
	const [formData, setFormData] = useState({
		dressId: "",
		customerName: "",
		email: "",
		phone: "",
		address: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.dressId) newErrors.dressId = "Please select a dress";
		if (!formData.customerName.trim())
			newErrors.customerName = "Name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		} else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
			newErrors.phone = "Please enter a valid phone number";
		}
		if (!formData.address.trim()) newErrors.address = "Address is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		const request: BuyRequest = {
			id: `buy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			...formData,
			timestamp: new Date().toISOString(),
		};

		storage.saveBuyRequest(request);
		logActivity(ACTIVITY_ACTIONS.FORM_SUBMIT, {
			form: "buy",
			dressId: formData.dressId,
		});

		setTimeout(() => {
			setIsSubmitting(false);
			onSuccess();
		}, 1000);
	};

	const dressOptions = dresses.map((dress) => ({
		value: dress.id,
		label: `${dress.name} - ${dress.price} EGP (${dress.id})`,
	}));

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<FormInput
				label="Select Dress"
				name="dressId"
				value={formData.dressId}
				onChange={handleChange}
				required
				error={errors.dressId}
				options={dressOptions}
			/>

			<FormInput
				label="Your Name"
				name="customerName"
				value={formData.customerName}
				onChange={handleChange}
				placeholder="Enter your full name"
				required
				error={errors.customerName}
			/>

			<FormInput
				label="Email"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="your.email@example.com"
				required
				error={errors.email}
			/>

			<FormInput
				label="Phone Number"
				type="tel"
				name="phone"
				value={formData.phone}
				onChange={handleChange}
				placeholder="+20 123 456 7890"
				required
				error={errors.phone}
			/>

			<FormInput
				label="Delivery Address"
				name="address"
				value={formData.address}
				onChange={handleChange}
				placeholder="Enter your full delivery address"
				required
				multiline
				rows={3}
				error={errors.address}
			/>

			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? "Processing..." : "Submit Purchase Request"}
			</Button>
		</form>
	);
};
