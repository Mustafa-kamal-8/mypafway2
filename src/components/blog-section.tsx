import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { CalendarIcon, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Road Trip Destinations for 2023",
    excerpt:
      "Discover the most scenic and exciting road trip routes that you should explore this year.",
    image: "/placeholder.svg?height=200&width=400",
    date: "June 15, 2023",
    author: "Sarah Johnson",
  },
  {
    id: 2,
    title: "How to Choose the Right Rental Car for Your Needs",
    excerpt:
      "A comprehensive guide to selecting the perfect rental car based on your specific requirements.",
    image: "/placeholder.svg?height=200&width=400",
    date: "May 22, 2023",
    author: "Michael Brown",
  },
  {
    id: 3,
    title: "Essential Tips for a Smooth Car Rental Experience",
    excerpt:
      "Learn the insider tips and tricks to ensure your car rental process goes without a hitch.",
    image: "/placeholder.svg?height=200&width=400",
    date: "April 10, 2023",
    author: "David Wilson",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Latest from Our Blog
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Stay updated with our latest news and travel tips
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <div className="aspect-video relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/blog/${post.id}`}>
                  <Button variant="link" className="p-0">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button size="lg">View All Posts</Button>
        </div>
      </div>
    </section>
  );
}
