"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function extractExcerpt(content: string, maxLength = 45) {
  const plainText = content.replace(/<[^>]+>/g, "");
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + "...";
}

function extractExcerptTitle(content: string, maxLength = 30) {
  const plainText = content.replace(/<[^>]+>/g, "");
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + "...";
}

export default function BlogClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://www.googleapis.com/blogger/v3/blogs/8838452285404351994/posts?fetchImages=true&fetchBodies=true&orderBy=published&status=live&key=AIzaSyAaZMw_5CXwe9brfb7HMOMo96uYr_dE0Qs"
        );
        const data = await response.json();
        console.log("Client fetched posts:", data.items);
        setPosts(data.items || []);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
          <Navbar />
        </div>
        <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay updated with the latest automotive news, maintenance tips,
              and DIY guides.
            </p>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No blog posts found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={
                          post.images?.[0]?.url ||
                          "/placeholder.svg?height=200&width=400" ||
                          "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">
                        {formatDate(post.published)} • by{" "}
                        {post.author.displayName}
                      </div>
                      <h2 className="text-xl font-bold mb-2">
                        {" "}
                        {extractExcerptTitle(post.title)}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {extractExcerpt(post.content)}
                      </p>
                      <Link
                        href={post.url} // uses the Blogger post's full URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200 shadow"
                      >
                        Read More
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
