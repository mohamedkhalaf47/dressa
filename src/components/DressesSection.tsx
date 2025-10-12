import React, { useEffect, useRef } from "react";
import { DressCard } from "./DressCard";
import { dresses } from "../data/dresses";
import { logActivity, ACTIVITY_ACTIONS } from "../utils/activity";

export const DressesSection: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						logActivity(ACTIVITY_ACTIONS.SECTION_VIEW, { section: "dresses" });
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	return (
		<section id="dresses" ref={sectionRef} className="py-20 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">
						Our Collection
					</h2>
					<p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
						Each piece has been carefully curated to bring elegance and
						sustainability together
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{dresses.map((dress, index) => (
						<div
							key={dress.id}
							className="animate-fadeInUp"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<DressCard dress={dress} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
