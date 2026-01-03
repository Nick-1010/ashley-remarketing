import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ item }) {
  const { images, image, price, title, category, id } = item;
  const mainImage = images && images.length > 0 ? images[0] : image;
  
  return (
    <Link to={`/vehicle/${id}`}>
      <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="h-44 bg-slate-100 flex items-center justify-center">
          {mainImage ? (
            <img src={mainImage} alt={title} className="object-cover h-full w-full" />
          ) : (
            <div className="text-slate-400">No image</div>
          )}
        </div>
        <div className="p-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xl font-heading text-gray-900">${price?.toLocaleString()}</div>
              <div className="font-semibold text-gray-900">{title}</div>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">{category}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}