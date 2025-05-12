"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ArrowLeft, CheckCircle, Lock, ShieldCheck } from "lucide-react"
import PaymentForm from "@/src/components/payment-from"
import Image from "next/image"

// Initialize Stripe with the publishable key from environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

const businessPlans = [
  {
    id: "small-business",
    name: "Small Business",
    price: 199,
    description: "Perfect for small businesses with occasional business needs",
    features: [
      "Up to 100 auto parts stored per month",
      "24/7 customer support",
      "Free cancellation",
      "Monthly billing",
      "Drop Shipping",
    ],
  },
  {
    id: "corporate",
    name: "Corporate",
    price: 499,
    description: "Ideal for medium-sized businesses with regular business needs",
    features: [
      "Up to 500 auto parts stored per month",
      "Priority customer support",
      "Free cancellation and modifications",
      "Monthly or annual billing",
      "Free Shipping",
      "Inventory Tracking",
      "E Commerce",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 999,
    description: "Comprehensive solution for large enterprises with frequent business needs",
    features: [
      "Unlimited auto parts storage per month",
      "Free cancellation, modifications, and upgrades",
      "Flexible billing options",
      "Premium insurance coverage",
      "Free Shipping",
      "Custom Branding Options on Orders Shipped",
      "E Commerce",
      "Inventory Tracking via API",
    ],
  },
]

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the plan ID from search parameters
    const planId = searchParams.get("plan")

    if (!planId) {
      // If no plan ID is provided, redirect to business page
      router.push("/business")
      return
    }

    const plan = businessPlans.find((p) => p.id === planId)

    if (plan) {
      setSelectedPlan(plan)

      // In a real implementation, this would be a server-side call
      // For demo purposes, we're simulating the creation of a payment intent
      setTimeout(() => {
        // This is a mock client secret - in a real app this would come from your server
        setClientSecret("pi_mock_secret_" + Math.random().toString(36).substring(2, 15))
        setLoading(false)
      }, 1000)
    } else {
      // If plan not found, redirect back to business page
      router.push("/business")
    }
  }, [searchParams, router])

  const handleGoBack = () => {
    router.push("/business")
  }

  if (loading || !selectedPlan) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" className="mb-6 flex items-center" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground">Secure checkout powered by Stripe</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50 rounded-t-lg">
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>All transactions are secure and encrypted</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm planPrice={selectedPlan.price} />
                    </Elements>
                  )}
                </CardContent>
                <CardFooter className="border-t p-6 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Secure SSL Encrypted Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=30&width=50"
                      alt="Visa"
                      width={50}
                      height={30}
                      className="h-8 w-auto"
                    />
                    <Image
                      src="/placeholder.svg?height=30&width=50"
                      alt="Mastercard"
                      width={50}
                      height={30}
                      className="h-8 w-auto"
                    />
                    <Image
                      src="/placeholder.svg?height=30&width=50"
                      alt="American Express"
                      width={50}
                      height={30}
                      className="h-8 w-auto"
                    />
                    <Image
                      src="/placeholder.svg?height=30&width=50"
                      alt="Discover"
                      width={50}
                      height={30}
                      className="h-8 w-auto"
                    />
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="border-0 shadow-lg sticky top-8">
                <CardHeader className="border-b bg-gray-50 rounded-t-lg">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">{selectedPlan.name} Plan</h3>
                    <p className="text-muted-foreground text-sm">{selectedPlan.description}</p>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <h4 className="font-semibold mb-3">Plan Features:</h4>
                    <ul className="space-y-2">
                      {selectedPlan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${selectedPlan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                      <span>Total</span>
                      <span>${selectedPlan.price.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Billed monthly. Cancel anytime.</div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help? Contact our support team at{" "}
              <a href="mailto:admin@mypafway.com" className="text-primary hover:underline">
                admin@mypafway.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
