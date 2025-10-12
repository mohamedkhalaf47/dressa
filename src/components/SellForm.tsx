import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { ImageUpload } from "./ImageUpload";
import { Button } from "./Button";
import { SellRequest } from "../types";
import { storage } from "../utils/storage";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

interface SellFormProps {
	onSuccess: () => void;
}

export const SellForm: React.FC<SellFormProps> = ({ onSuccess }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		size: "",
		condition: "",
		price: "",
		contactName: "",
		email: "",
		phone: "",
	});

	const [photos, setPhotos] = useState<string[]>([]);
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

		if (!formData.title.trim()) newErrors.title = "Title is required";
		if (!formData.description.trim())
			newErrors.description = "Description is required";
		if (!formData.size) newErrors.size = "Size is required";
		if (!formData.condition) newErrors.condition = "Condition is required";
		if (!formData.price) {
			newErrors.price = "Price is required";
		} else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
			newErrors.price = "Please enter a valid price";
		}
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
		if (photos.length === 0)
			newErrors.photos = "At least one photo is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		const request: SellRequest = {
			id: `sell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			...formData,
			price: Number(formData.price),
			photos,
			timestamp: new Date().toISOString(),
		};

		storage.saveSellRequest(request);
		logActivity(ACTIVITY_ACTIONS.FORM_SUBMIT, {
			form: "sell",
			title: formData.title,
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

	const conditionOptions = [
		{ value: "new", label: "New with tags" },
		{ value: "excellent", label: "Excellent" },
		{ value: "good", label: "Good" },
		{ value: "fair", label: "Fair" },
	];

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<ImageUpload images={photos} onImagesChange={setPhotos} />
			{errors.photos && (
				<p className="text-sm text-rose-gold font-poppins -mt-2">
					{errors.photos}
				</p>
			)}

			<FormInput
				label="Dress Title"
				name="title"
				value={formData.title}
				onChange={handleChange}
				placeholder="e.g., Elegant Evening Gown"
				required
				error={errors.title}
			/>

			<FormInput
				label="Description"
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Describe your dress, including brand, style, and any special features"
				required
				multiline
				rows={4}
				error={errors.description}
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
					label="Condition"
					name="condition"
					value={formData.condition}
					onChange={handleChange}
					required
					error={errors.condition}
					options={conditionOptions}
				/>

				<FormInput
					label="Price (EGP)"
					type="number"
					name="price"
					value={formData.price}
					onChange={handleChange}
					placeholder="1000"
					required
					error={errors.price}
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
				{isSubmitting ? "Submitting..." : "List My Dress"}
			</Button>
		</form>
	);
};
