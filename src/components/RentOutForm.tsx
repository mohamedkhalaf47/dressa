import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";
import { RentOutRequest } from "../types";
import { storage } from "../utils/storage";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

interface RentOutFormProps {
	onSuccess: () => void;
}

export const RentOutForm: React.FC<RentOutFormProps> = ({ onSuccess }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		size: "",
		price: "",
		startDate: "",
		endDate: "",
		condition: "",
		contactName: "",
		email: "",
		phone: "",
		photos: [] as string[],
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

	const handleImageUpload = (images: string[]) => {
		setFormData((prev) => ({ ...prev, photos: images }));
		if (errors.photos) {
			setErrors((prev) => ({ ...prev, photos: "" }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.title.trim()) newErrors.title = "Title is required";
		if (!formData.description.trim())
			newErrors.description = "Description is required";
		if (!formData.size) newErrors.size = "Size is required";
		if (!formData.price) {
			newErrors.price = "Price is required";
		} else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
			newErrors.price = "Please enter a valid price";
		}
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
		if (!formData.condition) newErrors.condition = "Condition is required";
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
		if (formData.photos.length === 0)
			newErrors.photos = "At least one photo is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		const request: RentOutRequest = {
			id: `rentout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			...formData,
			price: Number(formData.price),
			timestamp: new Date().toISOString(),
		};

		storage.saveRentOutRequest(request);
		logActivity(ACTIVITY_ACTIONS.FORM_SUBMIT, {
			form: "rentout",
			size: formData.size,
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
		{ value: "likenew", label: "Like new" },
		{ value: "good", label: "Good" },
		{ value: "fair", label: "Fair" },
	];

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<FormInput
				label="Dress Title"
				name="title"
				value={formData.title}
				onChange={handleChange}
				placeholder="Enter a descriptive title for your dress"
				required
				error={errors.title}
			/>

			<FormInput
				label="Description"
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Describe your dress (style, color, material, etc.)"
				required
				multiline
				rows={3}
				error={errors.description}
			/>

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
					label="Condition"
					name="condition"
					value={formData.condition}
					onChange={handleChange}
					required
					error={errors.condition}
					options={conditionOptions}
				/>
			</div>

			<FormInput
				label="Rental Price (per day)"
				type="number"
				name="price"
				value={formData.price}
				onChange={handleChange}
				placeholder="Enter rental price per day"
				required
				error={errors.price}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					label="Available From"
					type="date"
					name="startDate"
					value={formData.startDate}
					onChange={handleChange}
					required
					error={errors.startDate}
				/>

				<FormInput
					label="Available Until"
					type="date"
					name="endDate"
					value={formData.endDate}
					onChange={handleChange}
					required
					error={errors.endDate}
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

			<ImageUpload
				images={formData.photos}
				onImagesChange={handleImageUpload}
				maxImages={5}
				error={errors.photos}
			/>

			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? "Submitting..." : "Submit Dress for Rent"}
			</Button>
		</form>
	);
};
