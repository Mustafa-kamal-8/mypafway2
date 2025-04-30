"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { toast } from "@/src/components/ui/use-toast";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import Navbar from "@/src/components/navbar";
import Stores from "@/src/store/stores";
import { uploadOrders } from "@/src/api/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = Stores();
  const img = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState("shipping");
  const [userId, setUserId] = useState<string | null>(null);

  // Calculate total price for the cart
  const totalPrice = cartItems.reduce((total: number, item) => {
    return total + Number.parseFloat(item.price || "0") * (item.quantity || 1);
  }, 0);

  // Get userId from localStorage on component mount
  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    // Payment information
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    // Additional information
    shippingMethod: "standard",
    paymentMethod: "credit-card",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();

    setActiveStep("payment");

    // Check if userId exists
    if (!userId) {
      toast({
        title: "User Not Found",
        description: "Please log in to continue with checkout.",
        variant: "destructive",
      });
      return;
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate payment form
    if (formData.paymentMethod === "credit-card") {
      if (
        !formData.cardNumber ||
        !formData.cardName ||
        !formData.expiryDate ||
        !formData.cvv
      ) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required payment fields.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      setIsSubmitting(true);

      // Create order data object
      const orderData = {
        user_id: userId,
        order_items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: Number.parseFloat(item.price || "0"),
          quantity: item.quantity || 1,
          image: item.image_link || "",
        })),
        order_summary: {
          subtotal: totalPrice,
          shipping: formData.shippingMethod === "express" ? 15 : 5,
          total: totalPrice + (formData.shippingMethod === "express" ? 15 : 5),
        },
        payment_method: formData.paymentMethod,
        shipping_method: formData.shippingMethod,
        payment_status: "pending",
        shipment_status: "processing",
        notes: formData.notes,
      };
      const response = await uploadOrders(orderData);
      // Log the order data to console instead of sending to backend
      console.log("Order Data:", orderData);

      // Simulate successful order creation
      //   setTimeout(() => {

      //     clearCart();

      //     const fakeOrderId = `order-${Date.now()}`;

      //     router.push(`/order-confirmation/${fakeOrderId}`);
      //   }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description:
          "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
          <Navbar />
        </div>
        <div className="container mx-auto px-4 py-6 pt-64 md:pt-56">
          <div className="text-center py-12 border rounded-lg">
            <p className="text-xl text-muted-foreground mb-6">
              Your cart is empty. Please add items to your cart before checkout.
            </p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-6 pt-64 md:pt-56">
        <div className="mb-6">
          <Link
            href="/cart"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main checkout form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Checkout</h2>

              {/* Progress steps */}
              <div className="flex mb-8">
                <div
                  className={`flex-1 text-center pb-4 relative ${
                    activeStep === "shipping"
                      ? "border-b-2 border-yellow-500 text-yellow-500 font-bold"
                      : "border-b border-gray-300"
                  }`}
                >
                  <span className="absolute left-0 right-0 -bottom-3 mx-auto w-6 h-6 rounded-full bg-white border flex items-center justify-center">
                    1
                  </span>
                  <span>Shipping</span>
                </div>
                <div
                  className={`flex-1 text-center pb-4 relative ${
                    activeStep === "payment"
                      ? "border-b-2 border-yellow-500 text-yellow-500 font-bold"
                      : "border-b border-gray-300"
                  }`}
                >
                  <span className="absolute left-0 right-0 -bottom-3 mx-auto w-6 h-6 rounded-full bg-white border flex items-center justify-center">
                    2
                  </span>
                  <span>Payment</span>
                </div>
              </div>

              {/* Shipping form */}
              {activeStep === "shipping" && (
                <form onSubmit={handleSubmitShipping}>
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-yellow-500" />
                      Shipping Information
                    </h3>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-blue-700">
                        Your shipping address will be retrieved from your
                        account information.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Shipping Method</h4>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) =>
                          handleRadioChange("shippingMethod", value)
                        }
                      >
                        <div className="flex items-center space-x-2 border p-3 rounded-md">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label
                            htmlFor="standard"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-gray-500">
                              Delivery in 5-7 business days
                            </div>
                          </Label>
                          <div className="font-bold">$5.00</div>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-md">
                          <RadioGroupItem value="express" id="express" />
                          <Label
                            htmlFor="express"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-gray-500">
                              Delivery in 1-3 business days
                            </div>
                          </Label>
                          <div className="font-bold">$15.00</div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Special instructions for delivery"
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}

              {/* Payment form */}
              {activeStep === "payment" && (
                <form onSubmit={handleSubmitPayment}>
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-yellow-500" />
                      Payment Method
                    </h3>

                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) =>
                        handleRadioChange("paymentMethod", value)
                      }
                    >
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label
                          htmlFor="credit-card"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">Credit / Debit Card</div>
                          <div className="text-sm text-gray-500">
                            Pay securely with your card
                          </div>
                        </Label>
                        <div className="flex space-x-1">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label
                          htmlFor="paypal"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-gray-500">
                            Pay with your PayPal account
                          </div>
                        </Label>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      </div>
                    </RadioGroup>

                    {formData.paymentMethod === "credit-card" && (
                      <div className="space-y-4 border p-4 rounded-md">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep("shipping")}
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-slate-800 text-white rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-slate-700"
                  >
                    <div className="relative h-16 w-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.image_link
                            ? `${img}${item.image_link}`
                            : "/placeholder.svg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Qty: {item.quantity || 1}</span>
                        <span>
                          ${Number.parseFloat(item.price || "0").toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Subtotal</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Shipping</span>
                  <span className="font-bold">
                    ${formData.shippingMethod === "express" ? "15.00" : "5.00"}
                  </span>
                </div>

                <div className="flex justify-between pt-2 text-xl font-bold">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      totalPrice +
                      (formData.shippingMethod === "express" ? 15 : 5)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
