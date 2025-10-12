import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { RentRequest } from "../types";
import { storage } from "../utils/storage";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

interface RentFormProps {
	onSuccess: () => void;
}

export const RentForm: React.FC<RentFormProps> = ({ onSuccess }) => {
	const [formData, setFormData] = useState({
		preferences: "",
		startDate: "",
		endDate: "",
		size: "",
		occasion: "",
		contactName: "",
		email: "",
		phone: "",
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

		if (!formData.preferences.trim())
			newErrors.preferences = "Preferences are required";
		if (!formData.startDate) {
			newErrors.startDate = "Start date is required";
		}
		if (!formData.endDate) {
			newErrors.endDate = "End date is required";
		} else if (
			formData.startDate &&
			new Date(formData.endDate) <= new Date(formData.startDate)
		) {
			newErrors.endDate = "End date must be after start date";
		}
		if (!formData.size) newErrors.size = "Size is required";
		if (!formData.occasion) newErrors.occasion = "Occasion is required";
		if (!formData.contactName.trim())
			newErrors.contactName = "Name is required";
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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		const request: RentRequest = {
			id: `rent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			...formData,
			timestamp: new Date().toISOString(),
		};

		storage.saveRentRequest(request);
		logActivity(ACTIVITY_ACTIONS.FORM_SUBMIT, {
			form: "rent",
			occasion: formData.occasion,
		});

		setTimeout(() => {
			setIsSubmitting(false);
			onSuccess();
		}, 1000);
	};

	const sizeOptions = [
		{ value: "xs", label: "XS" },
		{ value: "s", label: "S" },
		{ value: "m", label: "M" },
		{ value: "l", label: "L" },
		{ value: "xl", label: "XL" },
		{ value: "xxl", label: "XXL" },
	];

	const occasionOptions = [
		{ value: "wedding", label: "Wedding" },
		{ value: "party", label: "Party" },
		{ value: "gala", label: "Gala" },
		{ value: "prom", label: "Prom" },
		{ value: "graduation", label: "Graduation" },
		{ value: "other", label: "Other" },
	];

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<FormInput
				label="Dress Preferences"
				name="preferences"
				value={formData.preferences}
				onChange={handleChange}
				placeholder="Describe your ideal dress style, color, and any specific requirements"
				required
				multiline
				rows={3}
				error={errors.preferences}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					label="Rental Start Date"
					type="date"
					name="startDate"
					value={formData.startDate}
					onChange={handleChange}
					required
					error={errors.startDate}
				/>

				<FormInput
					label="Rental End Date"
					type="date"
					name="endDate"
					value={formData.endDate}
					onChange={handleChange}
					required
					error={errors.endDate}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					label="Size"
					name="size"
					value={formData.size}
					onChange={handleChange}
					required
					error={errors.size}
					options={sizeOptions}
				/>

				<FormInput
					label="Occasion"
					name="occasion"
					value={formData.occasion}
					onChange={handleChange}
					required
					error={errors.occasion}
					options={occasionOptions}
				/>
			</div>

			<FormInput
				label="Your Name"
				name="contactName"
				value={formData.contactName}
				onChange={handleChange}
				placeholder="Enter your full name"
				required
				error={errors.contactName}
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

			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? "Submitting..." : "Submit Rental Request"}
			</Button>
		</form>
	);
};
