import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { FormInput } from "../components/FormInput";
import { mockDataManager } from "../utils/mockData";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";
import { ArrowLeft } from "lucide-react";

export const DressRequestPage: React.FC = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [formData, setFormData] = useState({
		dressId: "",
		dressName: "",
		customerName: "",
		email: "",
		phone: "",
		eventDate: "",
		preferences: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			newErrors.email = "Invalid email format";

		if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
		else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
			newErrors.phone = "Phone number must be 10 digits";

		if (!formData.eventDate) newErrors.eventDate = "Event date is required";

		if (!formData.dressName.trim()) newErrors.dressName = "Dress name/description is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		setFormData((prev) => ({ ...prev, phone: value.slice(0, 10) }));
		if (errors.phone) {
			setErrors((prev) => ({ ...prev, phone: "" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);

		setTimeout(() => {
			mockDataManager.addDressRequest({
				dressId: formData.dressId || `DR-${Date.now()}`,
				dressName: formData.dressName,
				customerName: formData.customerName,
				email: formData.email,
				phone: formData.phone,
				eventDate: formData.eventDate,
				preferences: formData.preferences,
				status: "pending",
			});

			logActivity(ACTIVITY_ACTIONS.FORM_OPEN, {
				form: "dress_request",
				dressName: formData.dressName,
			});

			setShowSuccess(true);
			setIsLoading(false);

			setTimeout(() => {
				navigate("/");
			}, 2000);
		}, 800);
	};

	if (showSuccess) {
		return (
			<div className="min-h-screen bg-white pt-24 flex items-center justify-center px-4">
				<div className="max-w-md w-full text-center">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg
							className="w-8 h-8 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h2 className="text-3xl font-playfair font-bold text-charcoal mb-3">
						Request Submitted!
					</h2>
					<p className="text-gray-600 font-poppins mb-2">
						Thank you for your interest in this dress.
					</p>
					<p className="text-gray-600 font-poppins text-sm">
						We'll review your request and contact you soon at the email or phone number provided.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white pt-24">
			<div className="max-w-3xl mx-auto px-4 py-12">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 text-rose-gold font-poppins font-medium mb-8 hover:gap-3 transition-all"
				>
					<ArrowLeft className="w-5 h-5" />
					Back
				</button>

				<div className="mb-12">
					<h1 className="text-5xl md:text-6xl font-playfair font-bold text-charcoal mb-4">
						Request a Dress
					</h1>
					<p className="text-lg font-poppins text-gray-600">
						Tell us about the dress you're looking for. We'll help you find the perfect fit for
						your special occasion.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="bg-soft-beige rounded-lg p-8 md:p-12">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<FormInput
							label="Your Name *"
							name="customerName"
							type="text"
							placeholder="Enter your full name"
							value={formData.customerName}
							onChange={handleInputChange}
							error={errors.customerName}
						/>
						<FormInput
							label="Email Address *"
							name="email"
							type="email"
							placeholder="your.email@example.com"
							value={formData.email}
							onChange={handleInputChange}
							error={errors.email}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<FormInput
							label="Phone Number *"
							name="phone"
							type="tel"
							placeholder="1234567890"
							value={formData.phone}
							onChange={handlePhoneChange}
							error={errors.phone}
						/>
						<FormInput
							label="Event Date *"
							name="eventDate"
							type="date"
							value={formData.eventDate}
							onChange={handleInputChange}
							error={errors.eventDate}
						/>
					</div>

					<div className="mb-6">
						<FormInput
							label="Dress Name/Description *"
							name="dressName"
							type="text"
							placeholder="Describe the dress you're looking for (color, style, etc.)"
							value={formData.dressName}
							onChange={handleInputChange}
							error={errors.dressName}
						/>
					</div>

					<div className="mb-8">
						<label className="block text-charcoal font-poppins font-medium mb-3">
							Additional Preferences
						</label>
						<textarea
							name="preferences"
							placeholder="Tell us about your specific preferences, budget, or any other details..."
							value={formData.preferences}
							onChange={handleInputChange}
							rows={5}
							className="w-full px-4 py-3 border-2 border-rose-gold border-opacity-20 rounded-lg font-poppins text-charcoal placeholder-gray-400 focus:outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold focus:ring-opacity-20 transition-colors"
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-rose-gold text-white font-poppins font-bold py-4 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Submitting..." : "Submit Request"}
					</button>

					<p className="text-gray-600 font-poppins text-xs text-center mt-4">
						We'll review your request and contact you within 24 hours
					</p>
				</form>
			</div>

			<Footer />
			<WhatsAppButton />
		</div>
	);
};
