import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";
import { useFavorites } from "@/shared/contexts/FavoritesContext";
import { useCart } from "@/shared/contexts/CartContext";

interface ProductDetails {
  id: string | number;
  name: string;
  category?: string;
  price: number;
  priceRegular: number;
  images: string[];
  capacity?: string;
  capacityAvailable?: string[];
  color?: string;
  colorsAvailable?: string[];
  colorName?: string;
  ram?: string;
  screen?: string;
  resolution?: string;
  processor?: string;
  memory?: string;
  camera?: string;
  zoom?: string;
  cell?: string;
  description?: string | { title: string; text: string }[];
}

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // First try to find in phones
        let response = await fetch("/api/phones.json");
        if (!response.ok) {
          throw new Error("Failed to fetch phones");
        }

        let allProducts = await response.json();
        let foundProduct = allProducts.find(
          (p: any) => String(p.id) === String(productId)
        );

        // If not found in phones, try tablets
        if (!foundProduct) {
          response = await fetch("/api/tablets.json");
          if (!response.ok) {
            throw new Error("Failed to fetch tablets");
          }
          allProducts = await response.json();
          foundProduct = allProducts.find(
            (p: any) => String(p.id) === String(productId)
          );
        }

        // If still not found, try accessories
        if (!foundProduct) {
          response = await fetch("/api/accessories.json");
          if (!response.ok) {
            throw new Error("Failed to fetch accessories");
          }
          allProducts = await response.json();
          foundProduct = allProducts.find(
            (p: any) => String(p.id) === String(productId)
          );
        }

        // If still not found, try the products.json file
        if (!foundProduct) {
          response = await fetch("/api/products.json");
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          allProducts = await response.json();
          foundProduct = allProducts.find(
            (p: any) =>
              String(p.id) === String(productId) ||
              String(p.itemId) === String(productId)
          );

          // Convert the format to match the expected ProductDetails interface
          if (foundProduct) {
            foundProduct = {
              ...foundProduct,
              name: foundProduct.name,
              price: foundProduct.price,
              priceRegular: foundProduct.fullPrice || foundProduct.price,
              images: [foundProduct.image],
              description: foundProduct.description || "",
            };
          }
        }

        if (foundProduct) {
          console.log("Found product:", foundProduct);
          // Normalize product data structure
          const normalizedProduct = {
            ...foundProduct,
            price: foundProduct.price || foundProduct.priceDiscount,
            priceRegular: foundProduct.priceRegular || foundProduct.fullPrice,
            images: foundProduct.images || [foundProduct.image],
          };

          setProduct(normalizedProduct);
          setSelectedCapacity(normalizedProduct.capacity || null);
          setSelectedColor(normalizedProduct.color || null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const getImagePath = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  const getProductDescription = () => {
    if (!product?.description)
      return "No description available for this product.";

    if (typeof product.description === "string") {
      return product.description;
    }

    if (Array.isArray(product.description)) {
      return product.description
        .map((item) => {
          if (typeof item === "object" && item.text) {
            return item.text;
          }
          return "";
        })
        .join(" ");
    }

    return "No description available for this product.";
  };

  const getColorClassName = (color: string) => {
    const colorMap: Record<string, string> = {
      gold: "bg-[#f9d8c0]",
      "rose gold": "bg-[#f9d8c0]",
      spacegray: "bg-[#5f5f5f]",
      "space gray": "bg-[#5f5f5f]",
      silver: "bg-[#f0f0f0]",
      white: "bg-white",
      black: "bg-[#1f1f1f]",
      purple: "bg-[#d1cdda]",
      red: "bg-[#ba0c2e]",
      green: "bg-[#aee1cd]",
      yellow: "bg-[#ffe681]",
    };

    return colorMap[color.toLowerCase()] || "bg-gray-200";
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <Typography variant="h3" as="h3" className="mb-4">
            Product not found
          </Typography>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getIdForCategory = () => {
    const parts = String(productId).split("-") || [];
    if (parts.length > 0) {
      return parts[0];
    }
    return "";
  };

  const getBreadcrumbPath = () => {
    const category = getIdForCategory();
    if (category === "apple" || category === "iphone") return "Phones";
    if (category === "ipad") return "Tablets";
    return "Accessories";
  };

  const favorited = isFavorite(String(productId));
  const inCart = isInCart(String(productId));

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFromFavorites(String(productId));
    } else {
      addToFavorites({
        id: String(productId),
        title: product.name,
        subtitle: `${product.capacity || ""} ${product.color || ""}`.trim(),
        price: product.price,
        image: Array.isArray(product.images)
          ? getImagePath(product.images[0])
          : getImagePath(product.images as unknown as string),
        specs: {
          Screen: product.screen || "",
          Resolution: product.resolution || "",
          Processor: product.processor || "",
          RAM: product.ram || "",
        },
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: String(productId),
      title: product.name,
      subtitle: `${product.capacity || ""} ${product.color || ""}`.trim(),
      price: product.price,
      image: Array.isArray(product.images)
        ? getImagePath(product.images[0])
        : getImagePath(product.images as unknown as string),
      specs: {
        Screen: product.screen || "",
        Resolution: product.resolution || "",
        Processor: product.processor || "",
        RAM: product.ram || "",
      },
    });
  };

  // Derive available capacities and colors
  const capacities = product.capacityAvailable || [
    "64GB",
    "128GB",
    "256GB",
    "512GB",
  ];
  const colors = product.colorsAvailable || [
    "black",
    "silver",
    "gold",
    "spacegray",
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-black">
          Home
        </Link>
        <span className="text-gray-500">&gt;</span>
        <Link
          to={`/${getBreadcrumbPath().toLowerCase()}`}
          className="text-gray-500 hover:text-black"
        >
          {getBreadcrumbPath()}
        </Link>
        <span className="text-gray-500">&gt;</span>
        <span className="text-black">{product.name}</span>
      </div>

      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-500 mb-4"
      >
        <Icon id="back-arrow" size={6} />
        Back
      </button>

      <Typography variant="h1" as="h1" className="text-3xl font-bold mb-8">
        {product.name}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product images */}
        <div className="flex flex-col">
          <div className="mb-6">
            <img
              src={
                Array.isArray(product.images)
                  ? getImagePath(product.images[selectedImageIndex])
                  : getImagePath(product.images as unknown as string)
              }
              alt={product.name}
              className="w-full object-contain max-h-[400px]"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.isArray(product.images) &&
              product.images.map((image, index) => (
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
                    alt={`${product.name} - Image ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Product details and actions */}
        <div>
          <div className="text-sm text-gray-500 mb-4">ID: {productId}</div>

          {/* Colors */}
          <div className="mb-6">
            <div className="text-base font-medium mb-2">Available colors</div>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-[32px] h-[32px] rounded-full ${
                    selectedColor === color
                      ? "ring-2 ring-black ring-offset-1"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      getColorClassName(color).replace("bg-", "") ===
                      "bg-gray-200"
                        ? "#e5e7eb"
                        : getColorClassName(color).replace("bg-", ""),
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Capacity options */}
          <div className="mb-8">
            <div className="text-base font-medium mb-2">Select capacity</div>
            <div className="flex flex-wrap gap-2">
              {capacities.map((capacity) => {
                const formattedCapacity = capacity.replace(
                  /([0-9]+)([A-Z]+)/,
                  "$1 $2"
                );
                return (
                  <button
                    key={capacity}
                    className={`py-1 px-3 border ${
                      selectedCapacity === capacity ||
                      (capacity.includes("GB") &&
                        selectedCapacity === capacity.replace("GB", " GB"))
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-black"
                    }`}
                    onClick={() => setSelectedCapacity(capacity)}
                  >
                    {formattedCapacity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 flex items-baseline gap-2">
            <div className="text-3xl font-bold">${product.price}</div>
            {product.priceRegular > product.price && (
              <div className="text-lg text-gray-500 line-through">
                ${product.priceRegular}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className={`py-3 w-[231px] sm:w-[180px] md:w-[263px] ${
                inCart
                  ? "bg-white text-green-600 border border-gray-300"
                  : "bg-[#313237] text-white hover:bg-opacity-90"
              } transition`}
            >
              {inCart ? "Added to cart" : "Add to cart"}
            </button>
            <button
              onClick={handleToggleFavorite}
              className="border border-gray-300 p-3 flex items-center justify-center w-[48px] h-[48px]"
              aria-label={
                favorited ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Icon id={favorited ? "heart-active" : "heart"} size={20} />
            </button>
          </div>

          {/* Specs - shown directly below the buttons with width matching buttons */}
          <div className="w-[287px] sm:w-[236px] md:w-[319px]">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Screen
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.screen || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Resolution
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.resolution || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Processor
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.processor || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                RAM
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.ram || "–"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech specs and description */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Typography variant="h2" as="h2" className="text-2xl font-bold mb-6">
            About
          </Typography>
          <div className="text-base">{getProductDescription()}</div>
        </div>

        <div>
          <Typography variant="h2" as="h2" className="text-2xl font-bold mb-6">
            Tech specs
          </Typography>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Screen
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.screen || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Resolution
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.resolution || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Processor
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.processor || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                RAM
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.ram || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Built in memory
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.memory || product.capacity || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Camera
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.camera || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Zoom
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.zoom || "–"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
                Cell
              </div>
              <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
                {product.cell || "–"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
