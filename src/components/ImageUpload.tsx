import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
	images: string[];
	onImagesChange: (images: string[]) => void;
	maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	images,
	onImagesChange,
	maxImages = 5,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const newImages: string[] = [];
		const remainingSlots = maxImages - images.length;

		for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
			const file = files[i];
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onloadend = () => {
					newImages.push(reader.result as string);
					if (newImages.length === Math.min(files.length, remainingSlots)) {
						onImagesChange([...images, ...newImages]);
					}
				};
				reader.readAsDataURL(file);
			}
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const removeImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		onImagesChange(newImages);
	};

	return (
		<div className="mb-4">
			<label className="block text-charcoal font-poppins font-medium mb-2">
				Dress Photos
				<span className="text-rose-gold ml-1">*</span>
				<span className="text-sm text-gray-500 ml-2">
					(Max {maxImages} images)
				</span>
			</label>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
				{images.map((image, index) => (
					<div key={index} className="relative group">
						<img
							src={image}
							alt={`Upload ${index + 1}`}
							className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
						/>
						<button
							type="button"
							onClick={() => removeImage(index)}
							className="absolute top-2 right-2 p-1 bg-rose-gold text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				))}
			</div>

			{images.length < maxImages && (
				<div
					onClick={() => fileInputRef.current?.click()}
					className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-rose-gold hover:bg-soft-beige transition-all"
				>
					<Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
					<p className="text-charcoal font-poppins">Click to upload images</p>
					<p className="text-sm text-gray-500 mt-1">
						{images.length > 0
							? `${images.length}/${maxImages} uploaded`
							: "PNG, JPG up to 10MB"}
					</p>
				</div>
			)}

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
				className="hidden"
			/>
		</div>
	);
};
