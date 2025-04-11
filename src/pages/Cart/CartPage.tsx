import React from "react";
import { Typography } from "@ui/Typography";
import { useCart } from "@/shared/contexts/CartContext";
import { BackButton, CartItem, CartSummary, EmptyCart } from "./components";

export const CartPage: React.FC = () => {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } =
    useCart();

  const handleCheckout = () => {
    // Implement checkout functionality
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton />

      <Typography variant="h1" as="h1" className="text-3xl font-bold mb-8">
        Cart
      </Typography>

      {cartCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <CartSummary
            total={cartTotal}
            itemCount={cartCount}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};
