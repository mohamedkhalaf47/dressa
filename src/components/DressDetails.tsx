import React from "react";
import { Dress } from "../types";
import { Button } from "./Button";

interface DressDetailsProps {
	dress: Dress;
	onClose: () => void;
	onBuyClick: (dress: Dress) => void;
	onRentClick: (dress: Dress) => void;
}

export const DressDetails: React.FC<DressDetailsProps> = ({
	dress,
	onClose,
	onBuyClick,
	onRentClick,
}) => {
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Back button */}
				<button
					onClick={onClose}
					className="flex items-center text-gray-600 hover:text-rose-gold mb-8 transition-colors"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to Collection
				</button>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Image Section */}
					<div className="relative flex justify-center">
						<img
							src={dress.image}
							alt={dress.name}
							className="w-[350px] h-auto rounded-2xl shadow-lg"
						/>
						<div className="absolute top-4 right-4 bg-rose-gold text-white px-3 py-1 rounded-full text-sm font-poppins font-medium shadow-lg">
							{dress.id}
						</div>
					</div>

					{/* Details Section */}
					<div className="space-y-6">
						<h1 className="text-4xl font-playfair font-bold text-charcoal">
							{dress.name}
						</h1>

						<div className="text-3xl font-playfair font-bold text-rose-gold">
							{dress.price} EGP
						</div>

						<div className="prose max-w-none">
							<p className="text-gray-600 font-poppins text-lg leading-relaxed">
								{dress.description}
							</p>
						</div>

						{/* Size Guide or Additional Info can be added here */}
						<div className="bg-soft-beige rounded-xl p-6">
							<h3 className="text-lg font-playfair font-bold text-charcoal mb-3">
								Care Instructions
							</h3>
							<ul className="space-y-2 text-gray-600 font-poppins">
								<li>• Dry clean only</li>
								<li>• Store in a cool, dry place</li>
								<li>• Handle with care</li>
								<li>• Do not bleach</li>
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 pt-6">
							<Button onClick={() => onBuyClick(dress)} fullWidth>
								Buy Now
							</Button>
							<Button
								onClick={() => onRentClick(dress)}
								variant="outline"
								fullWidth
							>
								Rent
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
