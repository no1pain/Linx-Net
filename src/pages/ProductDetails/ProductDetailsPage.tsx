import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";
import { useFavorites } from "@/shared/contexts/FavoritesContext";
import { useCart } from "@/shared/contexts/CartContext";
import { ProductBreadcrumbs } from "./components/ProductBreadcrumbs";
import { ProductImages } from "./components/ProductImages";
import { ProductColorSelector } from "./components/ProductColorSelector";
import { ProductCapacitySelector } from "./components/ProductCapacitySelector";
import { ProductPrice } from "./components/ProductPrice";
import { ProductActions } from "./components/ProductActions";
import { ProductSpecsPreview } from "./components/ProductSpecsPreview";
import { ProductAbout } from "./components/ProductAbout";
import { ProductTechSpecs } from "./components/ProductTechSpecs";
import { YouMayAlsoLike } from "@/shared/ui/YouMayAlsoLike";
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

    // If description is already an array of sections, pass it directly to the ProductAbout component
    if (
      Array.isArray(product.description) &&
      product.description.length > 0 &&
      typeof product.description[0] === "object" &&
      "title" in product.description[0]
    ) {
      // Ensure text field is always an array as expected by ProductAbout
      return product.description.map((section) => ({
        title: section.title,
        text: Array.isArray(section.text) ? section.text : [section.text],
      }));
    }

    // If description is a string, return it as is
    if (typeof product.description === "string") {
      return product.description;
    }

    // Handle the case where description might be an array of another structure
    if (Array.isArray(product.description)) {
      return product.description
        .map((item) => {
          if (typeof item === "object" && item.text) {
            // Check if item.text is an array before calling join
            return Array.isArray(item.text) ? item.text.join(" ") : item.text;
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

  const getBreadcrumbPath = () => {
    const category = getIdForCategory();
    if (category === "apple" || category === "iphone") return "Phones";
    if (category === "ipad") return "Tablets";
    return "Accessories";
  };

  const getIdForCategory = () => {
    const parts = String(productId).split("-") || [];
    if (parts.length > 0) {
      return parts[0];
    }
    return "";
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
      <ProductBreadcrumbs
        homeLink="/"
        categoryLink={`/${getBreadcrumbPath().toLowerCase()}`}
        categoryName={getBreadcrumbPath()}
        productName={product.name}
      />

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
        <div className="flex flex-row gap-4">
          <ProductImages
            images={product.images}
            productName={product.name}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            getImagePath={getImagePath}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-base font-medium">Available colors</div>
            <div className="text-sm text-gray-500">ID: {productId}</div>
          </div>

          <ProductColorSelector
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            getColorClassName={getColorClassName}
          />

          <ProductCapacitySelector
            capacities={capacities}
            selectedCapacity={selectedCapacity}
            setSelectedCapacity={setSelectedCapacity}
          />

          <ProductPrice
            price={product.price}
            priceRegular={product.priceRegular}
          />

          <ProductActions
            inCart={inCart}
            favorited={favorited}
            handleAddToCart={handleAddToCart}
            handleToggleFavorite={handleToggleFavorite}
          />

          {/* Specs section under buttons */}
          <ProductSpecsPreview
            screen={product.screen}
            resolution={product.resolution}
            processor={product.processor}
            ram={product.ram}
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductAbout description={getProductDescription()} />
        <ProductTechSpecs product={product} />
      </div>

      <YouMayAlsoLike />
    </div>
  );
};
