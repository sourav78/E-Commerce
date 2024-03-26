import React from "react";

const CategoryCard = ({ category }) => {
  return (
      <div
        key={Math.random()}
        className="border p-2 rounded-md w-[30%] min-w-48 bg-white cursor-pointer flex-1 lg:flex-none"
      >
        <div className="w-full p-4">
          <img
            className="m-auto max-h-56 lg:max-h-80 h-full"
            src={category.image_url}
            alt=""
          />
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-medium">
            {category.category.charAt(0).toUpperCase() +
              category.category.slice(1)}
          </h3>
          <p className="text-xl font-medium text-green-500">
            upto {category.maxDiscount}% off
          </p>
        </div>
      </div>
  );
};

export default CategoryCard;
