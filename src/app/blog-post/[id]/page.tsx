// blog-post/[id]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

async function getBlogPost(id: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/8838452285404351994/posts/${id}?key=AIzaSyAaZMw_5CXwe9brfb7HMOMo96uYr_dE0Qs`,
      { cache: "force-cache" }
    );
    if (!response.ok) throw new Error("Failed to fetch blog post");
    return await response.json();
  } catch (error) {
    console.log("Error fetching blog post:", error);
    return null;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Generate the static params for the blog post pages
export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/blogger/v3/blogs/8838452285404351994/posts?fetchImages=true&fetchBodies=true&orderBy=published&status=live&key=AIzaSyAaZMw_5CXwe9brfb7HMOMo96uYr_dE0Qs",
      { cache: "force-cache" }
    );
    const data = await response.json();
    const posts = data.items || [];

    return posts.map((post: any) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
          <Navbar />
        </div>
        <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
            <p className="mb-8">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link href="/blog">
              <Button className="inline-flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <article className="prose prose-lg max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                {post.author?.image?.url && (
                  <Image
                    src={post.author.image.url}
                    alt={post.author.displayName || "Author"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>{post.author?.displayName}</span>
              </div>
              <span>•</span>
              <time dateTime={post.published}>
                {formatDate(post.published)}
              </time>
            </div>

            {post.images?.[0]?.url && (
              <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg">
                <Image
                  src={post.images[0].url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
