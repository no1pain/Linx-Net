import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
  specs?: {
    [key: string]: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  isInCart: (id: string | number) => boolean;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const itemId = String(item.id);
    const existingItem = cartItems.find((cartItem) => cartItem.id === itemId);

    if (existingItem) {
      // If item already exists, increase quantity
      updateQuantity(itemId, existingItem.quantity + 1);
    } else {
      // Otherwise add new item with quantity 1
      setCartItems((prev) => [...prev, { ...item, id: itemId, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string | number) => {
    const stringId = String(id);
    setCartItems((prev) => prev.filter((item) => item.id !== stringId));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    const stringId = String(id);
    if (quantity <= 0) {
      removeFromCart(stringId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === stringId ? { ...item, quantity } : item))
    );
  };

  const isInCart = (id: string | number) => {
    const stringId = String(id);
    return cartItems.some((item) => item.id === stringId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
