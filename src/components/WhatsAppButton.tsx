import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../constants";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

export const WhatsAppButton: React.FC = () => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleClick = () => {
		logActivity(ACTIVITY_ACTIONS.WHATSAPP_CLICK);
		window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			<div className="relative">
				{showTooltip && (
					<div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-charcoal text-white text-sm font-poppins rounded-lg whitespace-nowrap shadow-lg animate-fadeIn">
						Chat with us
						<div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-charcoal"></div>
					</div>
				)}

				<button
					onClick={handleClick}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					className="w-16 h-16 bg-rose-gold text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse-slow"
					aria-label="Chat on WhatsApp"
				>
					<MessageCircle className="w-8 h-8" />
				</button>
			</div>
		</div>
	);
};
