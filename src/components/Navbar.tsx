import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";
import Logo from "../assets/dressa_logo.jpeg";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigate = useNavigate();

	const handleNavigation = (path: string, label: string) => {
		if (path === "/" || !path.includes("#")) {
			// Regular page navigation
			navigate(path);
		} else if (window.location.pathname === "/") {
			// We're already on the home page, just scroll to the section
			const sectionId = path.split("#")[1];
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			// Navigate to home page with hash
			navigate(path);
		}

		setIsMobileMenuOpen(false);
		logActivity(ACTIVITY_ACTIONS.PAGE_LOAD, { path, section: label });
	};

	const navLinks = [
		{ label: "Home", path: "/" },
		{ label: "Dresses", path: "/#dresses" },
		{ label: "Sell", path: "/#actions" },
		{ label: "Contact", path: "/#footer" },
	];

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
				isScrolled ? "bg-white shadow-md" : "bg-white bg-opacity-95"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<div
						className="flex items-center space-x-2 cursor-pointer"
						onClick={() => handleNavigation("/", "Home")}
					>
						<div className="rounded-full flex items-center justify-center gap-2">
							<img src={Logo} alt="Logo" className="w-14 h-14 rounded-full" />
							<span className="text-3xl font-playfair font-bold text-charcoal">
								Dressa
							</span>
						</div>
					</div>

					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<button
								key={link.path}
								onClick={() => handleNavigation(link.path, link.label)}
								className="text-charcoal font-poppins font-medium hover:text-rose-gold transition-colors duration-200"
							>
								{link.label}
							</button>
						))}
					</div>

					<button
						className="md:hidden p-2 text-charcoal"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
					<div className="px-4 py-6 space-y-4">
						{navLinks.map((link) => (
							<button
								key={link.path}
								onClick={() => handleNavigation(link.path, link.label)}
								className="block w-full text-left text-charcoal font-poppins font-medium py-2 hover:text-rose-gold transition-colors"
							>
								{link.label}
							</button>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};
