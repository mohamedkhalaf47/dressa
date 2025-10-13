import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../constants";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";
import Logo from "../assets/dressa_logo.jpeg";

export const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	const handleSocialClick = (platform: string, url: string) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, { social: platform });
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const socialLinks = [
		{
			icon: Instagram,
			label: "Instagram",
			url: "/",
			color: "hover:text-pink-600",
		},
		{
			icon: Facebook,
			label: "Facebook",
			url: "/",
			color: "hover:text-blue-600",
		},
		{
			icon: MessageCircle,
			label: "WhatsApp",
			url: WHATSAPP_LINK,
			color: "hover:text-green-600",
		},
	];

	return (
		<footer
			id="footer"
			className="bg-soft-beige border-t border-rose-gold border-opacity-20 py-12 px-4"
		>
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col items-center space-y-6">
					<div className="flex items-center space-x-3">
						<div className="rounded-full flex items-center justify-center shadow-lg">
							<img src={Logo} alt="Logo" className="w-[220px] rounded-full" />
						</div>
					</div>

					<div className="flex items-center space-x-6">
						{socialLinks.map((social) => {
							const Icon = social.icon;
							return (
								<button
									key={social.label}
									onClick={() => handleSocialClick(social.label, social.url)}
									className={`w-12 h-12 bg-white rounded-full flex items-center justify-center text-charcoal transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
									aria-label={social.label}
								>
									<Icon className="w-6 h-6" />
								</button>
							);
						})}
					</div>

					<div className="pt-6 border-t border-rose-gold border-opacity-20 w-full text-center">
						<p className="text-gray-600 font-poppins text-sm">
							&copy; {currentYear} Dressa. All rights reserved.
						</p>
						<p className="text-gray-500 font-poppins text-xs mt-2">
							Sustainable fashion for a better tomorrow
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
