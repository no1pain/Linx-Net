import React from "react";

interface ProductImagesProps {
  images: string[];
  productName: string;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  getImagePath: (path: string) => string;
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  productName,
  selectedImageIndex,
  setSelectedImageIndex,
  getImagePath,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {Array.isArray(images) &&
          images.map((image, index) => (
            <button
              key={index}
              className={`border p-1 flex-shrink-0 w-[80px] h-[80px] ${
                selectedImageIndex === index
                  ? "border-black"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={getImagePath(image)}
                alt={`Product thumbnail ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
      </div>

      <div className="flex-1">
        <img
          src={
            Array.isArray(images)
              ? getImagePath(images[selectedImageIndex])
              : getImagePath(images as unknown as string)
          }
          alt={productName}
          className="w-full object-contain max-h-[400px]"
        />
      </div>
    </>
  );
};
