import React from "react";
import { Tag, Calendar } from "lucide-react";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

interface ActionsSectionProps {
	onBuyClick: () => void;
	onSellClick: () => void;
	onRentClick: () => void;
	onRentOutClick: () => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({
	onSellClick,
	onRentOutClick,
}) => {
	const handleActionClick = (action: string, callback: () => void) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, { action });
		callback();
	};

	const actions = [
		{
			icon: Tag,
			title: "Sell Your Dress",
			description:
				"List your gently used dress and let someone else create memories",
			color: "bg-rose-gold",
			onClick: () => handleActionClick("sell", onSellClick),
		},
		{
			icon: Calendar,
			title: "Rent Out Your Dress",
			description:
				"Share your beautiful dress and earn while helping others shine",
			color: "bg-rose-gold",
			onClick: () => handleActionClick("rentout", onRentOutClick),
		},
	];

	return (
		<section
			id="actions"
			className="py-20 px-4 bg-gradient-to-b from-white to-soft-beige"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">
						What Would You Like To Do?
					</h2>
					<p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
						Choose how you'd like to be part of our sustainable fashion
						community
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{actions.map((action, index) => {
						const Icon = action.icon;
						return (
							<div
								key={action.title}
								className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
								onClick={action.onClick}
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div
									className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
								>
									<Icon className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-2xl font-playfair font-bold text-charcoal mb-3 group-hover:text-rose-gold transition-colors">
									{action.title}
								</h3>
								<p className="text-gray-600 font-poppins leading-relaxed">
									{action.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
