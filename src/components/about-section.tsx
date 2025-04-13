import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="About our car rental service"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              About Our Car Rental Service
            </h2>
            <p className="text-muted-foreground mb-6">
              With over 10 years of experience in the car rental industry, we
              pride ourselves on providing exceptional service and a wide range
              of vehicles to meet every need and budget. Our mission is to make
              car rental simple, affordable, and enjoyable.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p>Wide selection of vehicles from economy to luxury</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p>Transparent pricing with no hidden fees</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p>Flexible pickup and drop-off locations</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p>24/7 roadside assistance for peace of mind</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p>Clean, well-maintained vehicles for your safety</p>
              </div>
            </div>

            <Button size="lg">Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
