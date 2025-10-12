import React from "react";
import { Dress } from "../types";

interface DressCardProps {
	dress: Dress;
	onBuyClick: (dress: Dress) => void;
	onRentClick: (dress: Dress) => void;
	onViewDetails: (dress: Dress) => void;
}

export const DressCard: React.FC<DressCardProps> = ({
	dress,
	onBuyClick,
	onRentClick,
	onViewDetails,
}) => {
	return (
		<div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
			<div
				className="relative overflow-hidden cursor-pointer"
				onClick={() => onViewDetails(dress)}
			>
				<img
					src={dress.image}
					alt={dress.name}
					className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
					loading="lazy"
				/>
				<div className="absolute top-4 right-4 bg-rose-gold text-white px-3 py-1 rounded-full text-sm font-poppins font-medium shadow-lg">
					{dress.id}
				</div>
				<div
					className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"
					onClick={() => scrollTo({ top: 0 })}
				>
					<span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-poppins font-medium">
						View Details
					</span>
				</div>
			</div>
			<div className="p-6">
				<h3
					className="text-xl font-playfair font-bold text-charcoal mb-2 cursor-pointer hover:text-rose-gold transition-colors"
					onClick={() => onViewDetails(dress)}
				>
					{dress.name}
				</h3>
				<p className="text-gray-600 font-poppins text-sm mb-4 line-clamp-2">
					{dress.description}
				</p>
				<div className="flex items-center justify-between">
					<span className="text-2xl font-playfair font-bold text-rose-gold">
						{dress.price} EGP
					</span>
				</div>
				<div className="flex gap-4 mt-4">
					<button
						onClick={() => onBuyClick(dress)}
						className="flex-1 bg-rose-gold text-white py-2 px-4 rounded-lg font-poppins font-medium hover:bg-opacity-90 transition-all duration-300"
					>
						Buy Now
					</button>
					<button
						onClick={() => onRentClick(dress)}
						className="flex-1 border-2 border-rose-gold text-rose-gold py-2 px-4 rounded-lg font-poppins font-medium hover:bg-rose-gold hover:text-white transition-all duration-300"
					>
						Rent
					</button>
				</div>
			</div>
		</div>
	);
};
