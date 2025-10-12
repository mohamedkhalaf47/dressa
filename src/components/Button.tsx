import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "outline";
	type?: "button" | "submit" | "reset";
	fullWidth?: boolean;
	disabled?: boolean;
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	variant = "primary",
	type = "button",
	fullWidth = false,
	disabled = false,
	className = "",
}) => {
	const baseStyles =
		"px-6 py-3 rounded-full font-poppins font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

	const variantStyles = {
		primary: "bg-rose-gold text-white hover:bg-opacity-90",
		secondary: "bg-soft-beige text-charcoal hover:bg-opacity-80",
		outline:
			"border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white",
	};

	const widthClass = fullWidth ? "w-full" : "";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
		>
			{children}
		</button>
	);
};
