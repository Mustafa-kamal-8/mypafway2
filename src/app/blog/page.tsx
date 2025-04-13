import Image from "next/image";
import Link from "next/link";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { Card, CardContent } from "@/src/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Oil for Your Vehicle",
    excerpt:
      "Understanding the different types of motor oil and how to select the best one for your specific car model and driving conditions.",
    image: "/placeholder.svg?height=200&width=400",
    date: "June 15, 2023",
    author: "Sarah Johnson",
  },
  {
    id: 2,
    title: "DIY Brake Pad Replacement: A Step-by-Step Guide",
    excerpt:
      "Learn how to replace your vehicle's brake pads at home with this comprehensive guide, including tools needed and safety precautions.",
    image: "/placeholder.svg?height=200&width=400",
    date: "May 22, 2023",
    author: "Michael Brown",
  },
  {
    id: 3,
    title: "Understanding Your Car's Electrical System",
    excerpt:
      "A beginner's guide to the components of your vehicle's electrical system and how to diagnose common electrical problems.",
    image: "/placeholder.svg?height=200&width=400",
    date: "April 10, 2023",
    author: "David Wilson",
  },
  {
    id: 4,
    title: "The Benefits of Upgrading to Performance Parts",
    excerpt:
      "Explore how performance parts can enhance your vehicle's power, handling, and efficiency, with recommendations for popular upgrades.",
    image: "/placeholder.svg?height=200&width=400",
    date: "March 5, 2023",
    author: "Jennifer Lee",
  },
  {
    id: 5,
    title: "Seasonal Maintenance Tips for Your Vehicle",
    excerpt:
      "Essential maintenance tasks to prepare your car for changing seasons, from winter preparations to summer readiness.",
    image: "/placeholder.svg?height=200&width=400",
    date: "February 18, 2023",
    author: "Robert Martinez",
  },
  {
    id: 6,
    title: "How to Properly Detail Your Car's Interior",
    excerpt:
      "Professional tips and techniques for cleaning and maintaining your vehicle's interior to keep it looking new for years to come.",
    image: "/placeholder.svg?height=200&width=400",
    date: "January 30, 2023",
    author: "Amanda Thompson",
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Stay updated with the latest automotive news, maintenance tips, and
            DIY guides.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {post.date} • by {post.author}
                  </div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
