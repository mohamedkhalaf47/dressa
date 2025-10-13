import React from "react";
import { Button } from "./Button";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

export const Hero: React.FC = () => {
	const handleExploreClick = () => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, { button: "explore_dresses" });
		const dressesSection = document.getElementById("dresses");
		if (dressesSection) {
			dressesSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-soft-beige to-white overflow-hidden"
		>
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-20 left-10 w-72 h-72 bg-rose-gold rounded-full filter blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-gold rounded-full filter blur-3xl animate-pulse delay-1000"></div>
			</div>

			<div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
				<div className="animate-fadeInUp">
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-charcoal mb-6 leading-tight">
						Pre-Loved, Re-Imagined.
					</h1>
				</div>

				<div className="animate-fadeInUp delay-200">
					<p className="text-xl md:text-2xl font-poppins text-gray-700 max-w-2xl mx-auto">
						Giving every dress a second story.
					</p>
					<p className="text-sm md:text-md font-poppins text-red-700 mb-7">
						Caution: All Dresses Here Are Pre-Owned
					</p>
				</div>

				<div className="animate-fadeInUp delay-400">
					<Button
						onClick={handleExploreClick}
						variant="primary"
						className="text-lg px-10 py-4"
					>
						Explore Dresses
					</Button>
				</div>

				<div className="mt-16 animate-bounce">
					<div className="w-6 h-10 border-2 border-rose-gold rounded-full mx-auto flex items-start justify-center p-2">
						<div className="w-1.5 h-2 bg-rose-gold rounded-full animate-pulse"></div>
					</div>
				</div>
			</div>
		</section>
	);
};
