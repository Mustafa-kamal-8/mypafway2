import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Star, Users, Fuel, Gauge } from "lucide-react";

const featuredCars = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Sedan",
    price: 59,
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.8,
    seats: 5,
    fuelType: "Hybrid",
    transmission: "Automatic",
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.9,
    seats: 7,
    fuelType: "Diesel",
    transmission: "Automatic",
  },
  {
    id: 3,
    name: "Tesla Model 3",
    category: "Electric",
    price: 99,
    image: "/placeholder.svg?height=200&width=350",
    rating: 5.0,
    seats: 5,
    fuelType: "Electric",
    transmission: "Automatic",
  },
];

export default function FeaturedCars() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Featured Vehicles
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Explore our most popular rental options
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <div className="aspect-[16/9] relative">
                <Badge className="absolute top-2 right-2 z-10 bg-yellow-500 text-black font-medium">
                  ${car.price}/day
                </Badge>
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {car.category}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{car.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{car.transmission}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button className="flex-1" variant="outline">
                  View Details
                </Button>
                <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button size="lg">View All Vehicles</Button>
        </div>
      </div>
    </section>
  );
}
