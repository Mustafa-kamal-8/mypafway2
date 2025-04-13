"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/src/components/navbar";
import { useCartStore } from "../../store/cartStore";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Calculate total price for the cart
  const totalPrice = cart.reduce(
    (total: number, product) => total + product.price * product.quantity,
    0
  );

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-6 pt-56 md:pt-56">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Your Cart</h2>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
              <ShoppingBag className="h-16 w-16" />
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Your cart is empty!
            </p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {cart.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                    {/* Product info - mobile and desktop */}
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground md:hidden">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          disabled={product.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="w-8 text-center">
                          {product.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive md:hidden"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>

                    {/* Price - desktop only */}
                    <div className="hidden md:flex md:col-span-2 items-center justify-center">
                      <span className="font-medium">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Subtotal and remove button */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end">
                      <span className="font-medium md:text-right">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hidden md:flex"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Order summary */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-primary text-lg">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                variant="outline"
                onClick={clearCart}
                className="sm:flex-1 bg-red-500 text-white hover:bg-red-600"
              >
                Clear Cart
              </Button>
              <Link href="/checkout" className="sm:flex-[2]">
                <Button className="w-full" disabled={cart.length === 0}>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
