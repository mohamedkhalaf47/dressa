import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DressDetails } from "../components/DressDetails";
import { dresses } from "../data/dresses";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";
import { DressesSection } from "../components/DressesSection";

interface DressPageProps {
	openModal: (type: "buy" | "sell" | "rent" | "rentout") => void;
}

export const DressPage: React.FC<DressPageProps> = ({ openModal }) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const dress = dresses.find((d) => d.id === id);

	if (!dress) {
		return (
			<div className="min-h-screen bg-white flex flex-col items-center justify-center">
				<h1 className="text-4xl font-playfair font-bold text-charcoal mb-4">
					Dress Not Found
				</h1>
				<p className="text-gray-600 font-poppins mb-8">
					The dress you're looking for doesn't exist.
				</p>
				<button
					onClick={() => navigate("/")}
					className="bg-rose-gold text-white px-6 py-3 rounded-lg font-poppins hover:bg-opacity-90 transition-all"
				>
					Back to Collection
				</button>
			</div>
		);
	}

	const handleBuyClick = () => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "buy",
			dressId: dress.id,
			from: "details",
		});
		openModal("buy");
	};

	const handleRentClick = () => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "rent",
			dressId: dress.id,
			from: "details",
		});
		openModal("rent");
	};

	const handleViewOtherDress = (selectedDress: typeof dress) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "view_details",
			dressId: selectedDress.id,
			from: "related",
		});
		navigate(`/dress/${selectedDress.id}`);
	};

	// Filter out current dress and get 3 random dresses for suggestions
	const otherDresses = dresses
		.filter((d) => d.id !== dress.id)
		.sort(() => Math.random() - 0.5)
		.slice(0, 3);

	return (
		<div className="min-h-screen bg-white">
			<DressDetails
				dress={dress}
				onClose={() => {
					navigate("/");
					logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
						action: "close_details",
					});
				}}
				onBuyClick={handleBuyClick}
				onRentClick={handleRentClick}
			/>

			{/* You May Also Like Section */}
			<section className="py-20 px-4 bg-soft-beige">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-12 text-center">
						You May Also Like
					</h2>
					<DressesSection
						dresses={otherDresses}
						onBuyDress={() => openModal("buy")}
						onRentDress={() => openModal("rent")}
						onViewDetails={handleViewOtherDress}
					/>
				</div>
			</section>

			<Footer />
			<WhatsAppButton />
		</div>
	);
};
