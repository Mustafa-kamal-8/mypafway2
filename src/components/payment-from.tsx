"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
import { toast } from "@/src/components/ui/use-toast";
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Mail,
  User,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { Separator } from "@/src/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { countries, getStatesByCountry } from "./country-state-data";

interface PaymentFormProps {
  planPrice: number;
  planName?: string;
}

export default function PaymentForm({
  planPrice,
  planName = "Basic",
}: PaymentFormProps) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [savePaymentMethod, setSavePaymentMethod] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [availableStates, setAvailableStates] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedPlan] = useState({ name: planName });

  useEffect(() => {
    if (country) {
      const states = getStatesByCountry(country);
      setAvailableStates(states);

      if (state && !states.some((s) => s.value === state)) {
        setState("");
      }
    } else {
      setAvailableStates([]);
    }
  }, [country, state]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      errors.email = "Email is invalid";
    if (!address.trim()) errors.address = "Address is required";
    if (!city.trim()) errors.city = "City is required";
    if (!state.trim()) errors.state = "State is required";
    if (!zip.trim()) errors.zip = "ZIP code is required";
    if (!country.trim()) errors.country = "Country is required";
    if (!agreeToTerms)
      errors.terms = "You must agree to the terms and conditions";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
          address: {
            line1: address,
            city,
            state,
            postal_code: zip,
            country,
          },
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
        return;
      }

      console.log("Payment method created:", paymentMethod.id);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPaymentStatus({
        success: true,
        message:
          "Payment successful! You will be redirected to your dashboard.",
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentStatus({
        success: false,
        message:
          error.message ||
          "Payment failed. Please try again or contact support.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {paymentStatus && (
        <Alert
          variant={paymentStatus.success ? "default" : "destructive"}
          className="mb-6"
        >
          {paymentStatus.success ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {paymentStatus.success ? "Payment Successful" : "Payment Failed"}
          </AlertTitle>
          <AlertDescription>{paymentStatus.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <User className="mr-2 h-5 w-5 text-muted-foreground" />
            Billing Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company LLC"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St"
                className={formErrors.address ? "border-red-500" : ""}
              />
              {formErrors.address && (
                <p className="text-red-500 text-xs">{formErrors.address}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger
                  id="country"
                  className={formErrors.country ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.country && (
                <p className="text-red-500 text-xs">{formErrors.country}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
                className={formErrors.city ? "border-red-500" : ""}
              />
              {formErrors.city && (
                <p className="text-red-500 text-xs">{formErrors.city}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">
                  State/Province <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={state}
                  onValueChange={setState}
                  disabled={!country || availableStates.length === 0}
                >
                  <SelectTrigger
                    id="state"
                    className={formErrors.state ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStates.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.state && (
                  <p className="text-red-500 text-xs">{formErrors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">
                  Postal Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zip"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="10001"
                  className={formErrors.zip ? "border-red-500" : ""}
                />
                {formErrors.zip && (
                  <p className="text-red-500 text-xs">{formErrors.zip}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
            Payment Method
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="card-element">
                Credit/Debit Card Information{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="border rounded-md p-3 mt-1">
                <CardElement
                  id="card-element"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                    hidePostalCode: true, // We collect it separately
                  }}
                />
              </div>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-1" />
                <span>Your card information is encrypted and secure.</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-payment"
                checked={savePaymentMethod}
                onCheckedChange={(checked) =>
                  setSavePaymentMethod(checked as boolean)
                }
              />
              <Label htmlFor="save-payment" className="text-sm font-normal">
                Save this payment method for future transactions
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
            Billing Summary
          </h3>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">
                {selectedPlan.name} Plan
              </span>
              <span>${planPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Tax</span>
              <span>$0.00</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${planPrice.toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              You will be charged ${planPrice.toFixed(2)} today and billed
              monthly until canceled.
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className={formErrors.terms ? "border-red-500" : ""}
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          {formErrors.terms && (
            <p className="text-red-500 text-xs">{formErrors.terms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            `Pay $${planPrice.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
}
