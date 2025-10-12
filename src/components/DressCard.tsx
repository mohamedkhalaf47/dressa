import React from 'react';
import { Dress } from '../types';

interface DressCardProps {
  dress: Dress;
}

export const DressCard: React.FC<DressCardProps> = ({ dress }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={dress.image}
          alt={dress.name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-rose-gold text-white px-3 py-1 rounded-full text-sm font-poppins font-medium shadow-lg">
          {dress.id}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-playfair font-bold text-charcoal mb-2">{dress.name}</h3>
        <p className="text-gray-600 font-poppins text-sm mb-4 line-clamp-2">{dress.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-playfair font-bold text-rose-gold">{dress.price} EGP</span>
        </div>
      </div>
    </div>
  );
};
