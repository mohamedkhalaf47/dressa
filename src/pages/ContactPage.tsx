import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { FormInput } from "../components/FormInput";
import { mockDataManager } from "../utils/mockData";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { WHATSAPP_LINK } from "../constants";

export const ContactPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			newErrors.email = "Invalid email format";

		if (!formData.subject.trim()) newErrors.subject = "Subject is required";
		if (!formData.message.trim()) newErrors.message = "Message is required";

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);

		setTimeout(() => {
			mockDataManager.addContactSubmission({
				name: formData.name,
				email: formData.email,
				subject: formData.subject,
				message: formData.message,
			});

			logActivity(ACTIVITY_ACTIONS.FORM_OPEN, {
				form: "contact",
				subject: formData.subject,
			});

			setShowSuccess(true);
			setIsLoading(false);

			setTimeout(() => {
				setFormData({ name: "", email: "", subject: "", message: "" });
				setShowSuccess(false);
			}, 3000);
		}, 800);
	};

	const contactInfo = [
		{
			icon: Mail,
			label: "Email",
			value: "hello@dressa.com",
			href: "mailto:hello@dressa.com",
		},
		{
			icon: Phone,
			label: "Phone",
			value: "+1 (555) 123-4567",
			href: "tel:+15551234567",
		},
		{
			icon: MapPin,
			label: "Location",
			value: "New York, USA",
			href: "#",
		},
	];

	const socialLinks = [
		{
			icon: Instagram,
			label: "Instagram",
			url: "https://instagram.com",
			color: "text-pink-600",
		},
		{
			icon: Facebook,
			label: "Facebook",
			url: "https://facebook.com",
			color: "text-blue-600",
		},
		{
			icon: MessageCircle,
			label: "WhatsApp",
			url: WHATSAPP_LINK,
			color: "text-green-600",
		},
	];

	const faqs = [
		{
			question: "What is your return policy?",
			answer:
				"We offer a 7-day return policy from the date of delivery. The dress must be unworn and in original condition.",
		},
		{
			question: "How do you ensure dress quality?",
			answer:
				"Every dress is professionally cleaned, inspected for damage, and quality-checked before being listed and shipped to you.",
		},
		{
			question: "Do you offer rental services?",
			answer:
				"Yes! We offer both buying and renting options. Rental periods are flexible, typically ranging from 3-30 days.",
		},
		{
			question: "How long does shipping take?",
			answer: "Standard shipping takes 3-5 business days. We also offer express shipping options for faster delivery.",
		},
		{
			question: "Can I request a specific dress?",
			answer:
				"Absolutely! Use our 'Request a Dress' feature to tell us exactly what you're looking for, and we'll help you find it.",
		},
		{
			question: "What payment methods do you accept?",
			answer:
				"We accept all major credit cards, UPI, net banking, and digital wallets for your convenience.",
		},
	];

	return (
		<div className="min-h-screen bg-white pt-24">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-playfair font-bold text-charcoal mb-4">
						Get in Touch
					</h1>
					<p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
						Have questions? We'd love to hear from you. Reach out to our team and we'll respond
						as soon as possible.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
					{contactInfo.map((info, index) => {
						const Icon = info.icon;
						return (
							<a
								key={index}
								href={info.href}
								className="bg-soft-beige p-8 rounded-lg text-center hover:shadow-lg transition-shadow group animate-fadeInUp"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className="flex justify-center mb-4">
									<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-rose-gold transition-colors">
										<Icon className="w-6 h-6 text-rose-gold group-hover:text-white transition-colors" />
									</div>
								</div>
								<h3 className="text-lg font-playfair font-bold text-charcoal mb-2">
									{info.label}
								</h3>
								<p className="text-gray-600 font-poppins">{info.value}</p>
							</a>
						);
					})}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					<div className="animate-fadeInUp">
						<h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">
							Send us a Message
						</h2>

						{showSuccess ? (
							<div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
								<h3 className="text-xl font-playfair font-bold text-charcoal mb-2">
									Message Sent!
								</h3>
								<p className="text-gray-600 font-poppins">
									Thank you for reaching out. We'll get back to you within 24 hours.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<FormInput
									label="Your Name *"
									name="name"
									type="text"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={handleInputChange}
									error={errors.name}
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
								<FormInput
									label="Subject *"
									name="subject"
									type="text"
									placeholder="What is this about?"
									value={formData.subject}
									onChange={handleInputChange}
									error={errors.subject}
								/>

								<div>
									<label className="block text-charcoal font-poppins font-medium mb-3">
										Message *
									</label>
									<textarea
										name="message"
										placeholder="Tell us your message..."
										value={formData.message}
										onChange={handleInputChange}
										rows={5}
										className="w-full px-4 py-3 border-2 border-rose-gold border-opacity-20 rounded-lg font-poppins text-charcoal placeholder-gray-400 focus:outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold focus:ring-opacity-20 transition-colors"
									/>
									{errors.message && (
										<p className="text-red-500 font-poppins text-sm mt-1">{errors.message}</p>
									)}
								</div>

								<button
									type="submit"
									disabled={isLoading}
									className="w-full bg-rose-gold text-white font-poppins font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading ? "Sending..." : "Send Message"}
								</button>
							</form>
						)}
					</div>

					<div className="animate-fadeInUp delay-200">
						<h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">
							Connect With Us
						</h2>

						<div className="bg-soft-beige rounded-lg p-8 mb-8">
							<p className="text-gray-700 font-poppins mb-6">
								Follow us on social media for the latest collections, styling tips, and exclusive
								offers.
							</p>
							<div className="flex gap-4">
								{socialLinks.map((social, index) => {
									const Icon = social.icon;
									return (
										<a
											key={index}
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-charcoal hover:bg-rose-gold hover:text-white transition-all transform hover:scale-110"
											aria-label={social.label}
										>
											<Icon className="w-6 h-6" />
										</a>
									);
								})}
							</div>
						</div>

						<div className="bg-soft-beige rounded-lg p-8">
							<h3 className="text-xl font-playfair font-bold text-charcoal mb-4">
								Business Hours
							</h3>
							<div className="space-y-2 font-poppins text-gray-700">
								<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
								<p>Saturday: 10:00 AM - 4:00 PM</p>
								<p>Sunday: Closed</p>
								<p className="text-sm text-gray-600 mt-4">
									(Except holidays)
								</p>
							</div>
						</div>
					</div>
				</div>

				<section className="mb-16">
					<h2 className="text-4xl font-playfair font-bold text-charcoal mb-12 text-center">
						Frequently Asked Questions
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="border-2 border-rose-gold border-opacity-20 rounded-lg p-6 hover:border-opacity-100 transition-colors animate-fadeInUp"
								style={{ animationDelay: `${(index % 2) * 100}ms` }}
							>
								<h3 className="text-lg font-playfair font-bold text-charcoal mb-3">
									{faq.question}
								</h3>
								<p className="text-gray-600 font-poppins">{faq.answer}</p>
							</div>
						))}
					</div>
				</section>
			</div>

			<Footer />
			<WhatsAppButton />
		</div>
	);
};
