"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { uploadConfirmationUser } from "@/src/api/order-item";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: string;
  quantity: string;
  productId: {
    image_url: string;
    name: string;
  };
  orderId: {
    id: number;
    payment_method: string;
    shipping_method: string;
    shipment_status: string;
    payment_status: string;
    order_summary: {
      subtotal: number;
      shipping: number;
      total: number;
    };
  };
}

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (!storedUser) return;

      try {
        const parsedUser = JSON.parse(storedUser);
        const search = `userId:${parsedUser.id}`;
        const response = await uploadConfirmationUser({ search });
        if (response?.result) {
          setOrders(response.result);
        }
      } catch (error) {
        console.error("Failed to fetch order items", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className=" min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900">My Orders</h1>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((item) => {
              const paymentMethod = item.orderId?.payment_method?.toLowerCase();
              const displayPaymentStatus =
                paymentMethod === "paypal" || paymentMethod === "cod"
                  ? "pending"
                  : "paid";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 h-32 flex items-center justify-center bg-gray-100 rounded">
                      <Image
                        src={
                          item.productId?.image_url?.includes("https")
                            ? item.productId.image_url
                            : `https://uploads.backendservices.in/storage/${item.productId.image_url}`
                        }
                        alt={item.productId.name}
                        width={100}
                        height={100}
                        className="rounded object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-gray-900 mb-1">
                        {item.productId.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.price}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Payment:{" "}
                        <span className="font-medium uppercase">
                          {paymentMethod}
                        </span>{" "}
                        (
                        <span
                          className={
                            displayPaymentStatus === "paid"
                              ? "text-green-600 font-semibold"
                              : "text-yellow-600 font-semibold"
                          }
                        >
                          {displayPaymentStatus}
                        </span>
                        )
                      </p>
                      <p className="text-sm text-gray-600">
                        Shipping: {item.orderId.shipping_method} |{" "}
                        {item.orderId.shipment_status}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: ₹{item.orderId.order_summary.total}
                      </p>

                      <div className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() =>
                            router.push(
                              `/product-order-details/${item.orderId.id}`
                            )
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderPage;
