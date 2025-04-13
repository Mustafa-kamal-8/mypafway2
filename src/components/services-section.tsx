import { Card, CardContent } from "@/src/components/ui/card";
import {
  Car,
  Clock,
  MapPin,
  Shield,
  CreditCard,
  HeadphonesIcon,
} from "lucide-react";

const services = [
  {
    icon: <Car className="h-10 w-10 text-yellow-500" />,
    title: "Wide Vehicle Selection",
    description:
      "Choose from our extensive fleet of economy, luxury, and specialty vehicles to suit your needs.",
  },
  {
    icon: <Clock className="h-10 w-10 text-yellow-500" />,
    title: "24/7 Availability",
    description:
      "Our services are available round the clock to accommodate your schedule.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-yellow-500" />,
    title: "Convenient Locations",
    description:
      "Pick up and drop off your rental at any of our convenient locations across the city.",
  },
  {
    icon: <Shield className="h-10 w-10 text-yellow-500" />,
    title: "Comprehensive Insurance",
    description:
      "Drive with peace of mind with our comprehensive insurance coverage options.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-yellow-500" />,
    title: "Flexible Payment Options",
    description:
      "We offer various payment methods to make your rental experience hassle-free.",
  },
  {
    icon: <HeadphonesIcon className="h-10 w-10 text-yellow-500" />,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is always ready to assist you with any queries or concerns.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Services</h2>
        <p className="text-center text-muted-foreground mb-12">
          Discover what makes our car rental service stand out
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
