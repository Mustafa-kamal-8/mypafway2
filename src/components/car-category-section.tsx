import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Economy",
    image: "/placeholder.svg?height=200&width=300",
    description: "Affordable and fuel-efficient cars",
  },
  {
    id: 2,
    name: "SUVs",
    image: "/placeholder.svg?height=200&width=300",
    description: "Spacious vehicles for any terrain",
  },
  {
    id: 3,
    name: "Luxury",
    image: "/placeholder.svg?height=200&width=300",
    description: "Premium cars for a sophisticated experience",
  },
  {
    id: 4,
    name: "Electric",
    image: "/placeholder.svg?height=200&width=300",
    description: "Eco-friendly electric vehicles",
  },
];

export default function CarCategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Browse by Category
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Find the perfect vehicle for your needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={`/category/${category.id}`} key={category.id}>
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div className="aspect-[3/2] relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
