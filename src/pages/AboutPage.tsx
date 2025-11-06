import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Button } from "../components/Button";
import { Leaf, Heart, Globe } from "lucide-react";

export const AboutPage: React.FC = () => {
	const navigate = useNavigate();

	const benefits = [
		{
			icon: Leaf,
			title: "Sustainable Fashion",
			description:
				"By choosing pre-loved dresses, you're reducing textile waste and supporting circular economy practices.",
		},
		{
			icon: Heart,
			title: "Quality Assured",
			description:
				"Every dress is professionally cleaned, quality-checked, and beautifully packaged to guarantee freshness and reliability.",
		},
		{
			icon: Globe,
			title: "Affordable Luxury",
			description:
				"Access beautiful designer and premium dresses at a fraction of the original price without compromising on quality.",
		},
	];

	const impactStats = [
		{ label: "Dresses Saved", value: "500+" },
		{ label: "Happy Customers", value: "1200+" },
		{ label: "CO2 Prevented", value: "2.5T" },
		{ label: "Water Conserved", value: "15M L" },
	];

	return (
		<div className="min-h-screen bg-white">
			<div className="pt-24">
				<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-soft-beige to-white overflow-hidden px-4">
					<div className="absolute inset-0 opacity-5">
						<div className="absolute top-20 left-10 w-72 h-72 bg-rose-gold rounded-full filter blur-3xl animate-pulse"></div>
						<div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-gold rounded-full filter blur-3xl animate-pulse delay-1000"></div>
					</div>

					<div className="relative z-10 text-center max-w-4xl mx-auto">
						<div className="animate-fadeInUp">
							<h1 className="text-5xl md:text-7xl font-playfair font-bold text-charcoal mb-6">
								Our Mission
							</h1>
						</div>
						<div className="animate-fadeInUp delay-200">
							<p className="text-xl md:text-2xl font-poppins text-gray-700 max-w-2xl mx-auto">
								Pre-Loved, Re-Imagined. Giving every dress a second story.
							</p>
							<p className="text-lg font-poppins text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
								At Dressa, we believe that sustainability and style go hand-in-hand. We're
								dedicated to making luxury fashion accessible while reducing environmental
								impact through the circular fashion economy.
							</p>
						</div>
					</div>
				</section>

				<section className="py-20 px-4 bg-white">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{benefits.map((benefit, index) => {
								const Icon = benefit.icon;
								return (
									<div
										key={index}
										className="text-center animate-fadeInUp"
										style={{ animationDelay: `${index * 100}ms` }}
									>
										<div className="flex justify-center mb-6">
											<div className="w-16 h-16 bg-soft-beige rounded-full flex items-center justify-center">
												<Icon className="w-8 h-8 text-rose-gold" />
											</div>
										</div>
										<h3 className="text-2xl font-playfair font-bold text-charcoal mb-3">
											{benefit.title}
										</h3>
										<p className="text-gray-600 font-poppins leading-relaxed">
											{benefit.description}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				<section className="py-20 px-4 bg-soft-beige">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<div className="animate-fadeInUp">
								<h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">
									Our Story
								</h2>
								<p className="text-lg font-poppins text-gray-700 mb-4 leading-relaxed">
									Dressa was born from a simple observation: beautiful dresses deserve multiple
									lives. What started as a passion project has grown into a movement.
								</p>
								<p className="text-lg font-poppins text-gray-700 mb-4 leading-relaxed">
									Every dress in our collection represents a commitment to quality, sustainability,
									and the belief that luxury fashion shouldn't come at the expense of our planet.
									We carefully curate each piece, ensuring it meets our rigorous standards for
									quality and beauty.
								</p>
								<p className="text-lg font-poppins text-gray-700 leading-relaxed">
									Our team takes pride in professionally cleaning, quality-checking, and beautifully
									packaging every dress. We want our customers to feel as confident wearing a Dressa
									dress as the original owner did on their special day.
								</p>
							</div>
							<div className="animate-fadeInUp delay-200">
								<div className="bg-white rounded-lg p-8 shadow-lg">
									<h3 className="text-2xl font-playfair font-bold text-charcoal mb-8 text-center">
										Our Impact
									</h3>
									<div className="grid grid-cols-2 gap-6">
										{impactStats.map((stat, index) => (
											<div key={index} className="text-center">
												<div className="text-3xl font-playfair font-bold text-rose-gold mb-2">
													{stat.value}
												</div>
												<p className="text-sm font-poppins text-gray-600">{stat.label}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-20 px-4 bg-white">
					<div className="max-w-7xl mx-auto">
						<h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-12 text-center">
							Why Choose Dressa?
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							{[
								{
									title: "Professionally Curated",
									description:
										"Every dress undergoes rigorous quality checks to ensure you're getting the best.",
								},
								{
									title: "Eco-Conscious",
									description: "Reduce your fashion footprint while looking absolutely stunning.",
								},
								{
									title: "Fair Pricing",
									description:
										"Access luxury at affordable prices. We believe everyone deserves beautiful dresses.",
								},
								{
									title: "Trusted Service",
									description:
										"Over 1200+ happy customers trust us for their special occasions.",
								},
							].map((item, index) => (
								<div
									key={index}
									className="border-2 border-rose-gold border-opacity-20 rounded-lg p-6 hover:border-opacity-100 transition-colors animate-fadeInUp"
									style={{ animationDelay: `${index * 100}ms` }}
								>
									<h3 className="text-xl font-playfair font-bold text-charcoal mb-3">
										{item.title}
									</h3>
									<p className="text-gray-600 font-poppins">{item.description}</p>
								</div>
							))}
						</div>

						<div className="text-center animate-fadeInUp">
							<h3 className="text-2xl font-playfair font-bold text-charcoal mb-4">
								Ready to Find Your Perfect Dress?
							</h3>
							<p className="text-gray-600 font-poppins mb-8">
								Explore our collection and discover timeless elegance at sustainable prices.
							</p>
							<Button
								onClick={() => navigate("/dresses")}
								variant="primary"
								className="text-lg px-10 py-4"
							>
								Explore Collection
							</Button>
						</div>
					</div>
				</section>
			</div>

			<Footer />
			<WhatsAppButton />
		</div>
	);
};
