"use client"

import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function BusinessPage() {
  const router = useRouter()

  const handleGetStarted = (planId: string) => {
    router.push(`/payment?plan=${planId}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Mypafway Business Solutions</h1>
              <p className="text-xl text-muted-foreground">
                Choose a plan that fits your needs. Don't worry, you can change your plan at any time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-4">Why Choose Our Business Services?</h2>
                <p className="text-muted-foreground mb-6">
                  We understand that businesses have unique requirements. Mypafway offers flexible solutions,
                  competitive rates, and exceptional service to keep your company moving forward.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p>Increase Brand Awareness</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p>E Commerce Solutions</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p>Reach a Target Audience Missed by Other Media</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p>Inventory Tracking via API</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p>Free Shipping</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p>Auto Parts Storage (Lyons Den)</p>
                  </div>
                </div>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Business car rental"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-12">Our Business Plans</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {businessPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-lg" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? "bg-primary" : ""}`}
                      onClick={() => handleGetStarted(plan.id)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Special Payment Plans</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you happen to have any questions about invoicing or custom plans, visit our{" "}
                <Link href="/faq" className="text-blue-600 hover:underline">
                  FAQ Page
                </Link>
                . We can help.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
