import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { dresses } from "../data/dresses";
import { Dress } from "../types";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";
import { ChevronDown } from "lucide-react";

export const DressesPage: React.FC = () => {
	const navigate = useNavigate();
	const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

	const filteredAndSortedDresses = useMemo(() => {
		let result = dresses.filter(
			(dress) => dress.price >= priceRange[0] && dress.price <= priceRange[1]
		);

		switch (sortBy) {
			case "price-low":
				result.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				result.sort((a, b) => b.price - a.price);
				break;
			case "name":
			default:
				result.sort((a, b) => a.name.localeCompare(b.name));
		}

		return result;
	}, [sortBy, priceRange]);

	const handleViewDetails = (dress: Dress) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "view_details",
			dressId: dress.id,
			from: "catalog",
		});
		navigate(`/dress/${dress.id}`);
	};

	const maxPrice = Math.max(...dresses.map((d) => d.price));

	return (
		<div className="min-h-screen bg-white pt-24">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="text-center mb-12">
					<h1 className="text-5xl md:text-6xl font-playfair font-bold text-charcoal mb-4">
						Our Collection
					</h1>
					<p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
						Explore our curated selection of pre-loved dresses for every occasion
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
					<div className="lg:col-span-1">
						<div className="bg-soft-beige p-6 rounded-lg sticky top-28">
							<h3 className="text-xl font-playfair font-bold text-charcoal mb-6">
								Filters
							</h3>

							<div className="mb-8">
								<label className="text-charcoal font-poppins font-medium mb-3 block">
									Sort by
								</label>
								<div className="relative">
									<select
										value={sortBy}
										onChange={(e) =>
											setSortBy(e.target.value as "name" | "price-low" | "price-high")
										}
										className="w-full px-4 py-3 border border-rose-gold border-opacity-30 rounded-lg font-poppins text-charcoal appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-gold"
									>
										<option value="name">Name A-Z</option>
										<option value="price-low">Price: Low to High</option>
										<option value="price-high">Price: High to Low</option>
									</select>
									<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
								</div>
							</div>

							<div>
								<label className="text-charcoal font-poppins font-medium mb-4 block">
									Price Range
								</label>
								<div className="space-y-4">
									<input
										type="range"
										min="0"
										max={maxPrice}
										value={priceRange[0]}
										onChange={(e) =>
											setPriceRange([parseInt(e.target.value), priceRange[1]])
										}
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-gold"
									/>
									<input
										type="range"
										min="0"
										max={maxPrice}
										value={priceRange[1]}
										onChange={(e) =>
											setPriceRange([priceRange[0], parseInt(e.target.value)])
										}
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-gold"
									/>
									<div className="flex justify-between text-charcoal font-poppins text-sm">
										<span>₹{priceRange[0].toLocaleString()}</span>
										<span>₹{priceRange[1].toLocaleString()}</span>
									</div>
								</div>
							</div>

							<button
								onClick={() => setPriceRange([0, maxPrice])}
								className="w-full mt-6 px-4 py-2 border border-rose-gold text-rose-gold rounded-lg font-poppins font-medium hover:bg-rose-gold hover:bg-opacity-10 transition-colors"
							>
								Reset Filters
							</button>
						</div>
					</div>

					<div className="lg:col-span-3">
						{filteredAndSortedDresses.length === 0 ? (
							<div className="text-center py-16">
								<h3 className="text-2xl font-playfair font-bold text-charcoal mb-2">
									No dresses found
								</h3>
								<p className="text-gray-600 font-poppins">
									Try adjusting your filters to see more results
								</p>
							</div>
						) : (
							<>
								<p className="text-gray-600 font-poppins mb-6">
									Showing {filteredAndSortedDresses.length} of {dresses.length} dresses
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{filteredAndSortedDresses.map((dress, index) => (
										<div
											key={dress.id}
											className="group animate-fadeInUp"
											style={{ animationDelay: `${index * 50}ms` }}
										>
											<div
												onClick={() => handleViewDetails(dress)}
												className="bg-soft-beige rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
											>
												<div className="relative overflow-hidden h-80 bg-gray-200">
													<img
														src={dress.image}
														alt={dress.name}
														className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
													/>
												</div>
												<div className="p-6">
													<h3 className="text-xl font-playfair font-bold text-charcoal mb-2 line-clamp-2">
														{dress.name}
													</h3>
													<p className="text-gray-600 font-poppins text-sm mb-4 line-clamp-2">
														{dress.description}
													</p>
													<div className="flex items-center justify-between">
														<div className="text-rose-gold font-playfair font-bold text-2xl">
															₹{dress.price.toLocaleString()}
														</div>
														<button
															onClick={(e) => {
																e.stopPropagation();
																handleViewDetails(dress);
															}}
															className="px-4 py-2 bg-rose-gold text-white rounded-lg font-poppins font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
														>
															View
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<Footer />
			<WhatsAppButton />
		</div>
	);
};
