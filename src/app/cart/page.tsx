"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/src/components/navbar";
import { Button } from "@/src/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Stores from "@/src/store/stores";
import { Input } from "@/src/components/ui/input";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, saveForLater } =
    Stores();
  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  // Calculate total price for the cart
  const totalPrice = cartItems.reduce((total: number, item) => {
    return total + Number.parseFloat(item.price || "0") * (item.quantity || 1);
  }, 0);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-6 pt-64 md:pt-56">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main cart section */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
              </div>
              {cartItems.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearCart}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  <span>Clear All Items</span>
                </Button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
                  <ShoppingCart className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-xl text-muted-foreground mb-6">
                  Your cart is empty!
                </p>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                  <div className="col-span-6 font-medium">Products</div>
                  <div className="col-span-2 text-center font-medium hidden md:block">
                    Quantity
                  </div>
                  <div className="col-span-2 text-center font-medium hidden md:block">
                    Price
                  </div>
                  <div className="col-span-2 text-center font-medium hidden md:block">
                    Action
                  </div>
                </div>

                {/* Cart items */}
                {cartItems.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b"
                  >
                    {/* Product info */}
                    <div className="col-span-12 md:col-span-6 flex gap-4">
                      <div className="relative h-24 w-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            product.image_link
                              ? `${img}${product.image_link}`
                              : "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Category:{" "}
                          {typeof product.category === "object"
                            ? product.category?.name || "Exterior"
                            : product.category || "Exterior"}
                        </p>
                        <button
                          onClick={() => saveForLater(product.id)}
                          className="flex items-center text-sm text-gray-600 mt-2 hover:text-gray-900"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Save for Later
                        </button>

                        {/* Mobile price and quantity */}
                        <div className="flex justify-between items-center mt-3 md:hidden">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  (product.quantity || 1) - 1
                                )
                              }
                              disabled={(product.quantity || 1) <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="text"
                              value={product.quantity || 1}
                              onChange={(e) => {
                                const val = Number.parseInt(e.target.value);
                                if (!isNaN(val) && val > 0) {
                                  updateQuantity(product.id, val);
                                }
                              }}
                              className="w-12 h-8 text-center border-0 p-0"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  (product.quantity || 1) + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="font-bold">
                            $
                            {Number.parseFloat(product.price || "0").toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity - desktop */}
                    <div className="col-span-2 hidden md:flex items-center justify-center">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              (product.quantity || 1) - 1
                            )
                          }
                          disabled={(product.quantity || 1) <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          value={product.quantity || 1}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value);
                            if (!isNaN(val) && val > 0) {
                              updateQuantity(product.id, val);
                            }
                          }}
                          className="w-12 h-8 text-center border-0 p-0"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              (product.quantity || 1) + 1
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Price - desktop */}
                    <div className="col-span-2 hidden md:flex items-center justify-center">
                      <span className="font-bold">
                        ${Number.parseFloat(product.price || "0").toFixed(2)}
                      </span>
                    </div>

                    {/* Action - desktop */}
                    <div className="col-span-2 hidden md:flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove Item
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-1/3">
              <div className="bg-slate-800 text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span>Summary</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b border-slate-700">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pb-4 border-b border-slate-700">
                    <span>Shipping</span>
                    <span>Calculated at Checkout</span>
                  </div>

                  <div className="flex justify-between pt-2 text-xl font-bold">
                    <span>Grand Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3">
                    Continue to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
