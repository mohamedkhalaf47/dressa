import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { DressesSection } from "../components/DressesSection";
import { ActionsSection } from "../components/ActionsSection";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Dress } from "../types";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

interface HomePageProps {
	openModal: (type: "buy" | "sell" | "rent" | "rentout") => void;
}

export const HomePage: React.FC<HomePageProps> = ({ openModal }) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Handle section scrolling when hash changes
		const sectionId = location.hash.slice(1); // Remove the # from the hash
		if (sectionId) {
			const element = document.getElementById(sectionId);
			if (element) {
				setTimeout(() => {
					element.scrollIntoView({ behavior: "smooth" });
					logActivity(ACTIVITY_ACTIONS.SECTION_VIEW, { section: sectionId });
				}, 100); // Small delay to ensure the page is ready
			}
		}
	}, [location.hash]);

	const handleBuyDress = (dress: Dress) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "buy",
			dressId: dress.id,
			from: "list",
		});
		openModal("buy");
	};

	const handleRentDress = (dress: Dress) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "rent",
			dressId: dress.id,
			from: "list",
		});
		openModal("rent");
	};

	const handleViewDetails = (dress: Dress) => {
		logActivity(ACTIVITY_ACTIONS.BUTTON_CLICK, {
			action: "view_details",
			dressId: dress.id,
			from: "list",
		});
		navigate(`/dress/${dress.id}`);
	};

	return (
		<>
			<Hero />
			<DressesSection
				onBuyDress={handleBuyDress}
				onRentDress={handleRentDress}
				onViewDetails={handleViewDetails}
			/>
			<ActionsSection
				onBuyClick={() => openModal("buy")}
				onSellClick={() => openModal("sell")}
				onRentClick={() => openModal("rent")}
				onRentOutClick={() => openModal("rentout")}
			/>
			<Footer />
			<WhatsAppButton />
		</>
	);
};
