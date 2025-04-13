import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { Card, CardContent } from "@/src/components/ui/card";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Our Services</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Wide Product Selection
                </h3>
                <p>
                  Access thousands of auto parts and accessories for virtually
                  any make and model. Our extensive inventory ensures you'll
                  find exactly what you need.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Expert Advice</h3>
                <p>
                  Our team of automotive experts is available to help you find
                  the right parts for your specific vehicle and answer any
                  technical questions you may have.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
                <p>
                  We offer quick and reliable shipping options to ensure you get
                  your parts when you need them, with tracking information
                  provided for every order.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Easy Returns</h3>
                <p>
                  If a part doesn't fit or meet your expectations, our
                  hassle-free return policy makes it simple to return or
                  exchange your purchase.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Price Comparison</h3>
                <p>
                  Our platform allows you to compare prices from multiple
                  suppliers, ensuring you get the best deal on the parts you
                  need.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Vehicle-Specific Search
                </h3>
                <p>
                  Our advanced search functionality allows you to find parts
                  that are guaranteed to fit your specific vehicle make, model,
                  and year.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Business Accounts</h3>
                <p>
                  Special services for automotive businesses, including bulk
                  ordering, dedicated account management, and competitive
                  pricing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Technical Resources</h3>
                <p>
                  Access to installation guides, technical specifications, and
                  helpful articles to assist with your automotive projects.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Customer Support</h3>
                <p>
                  Our dedicated customer service team is available to assist
                  with orders, answer questions, and resolve any issues
                  promptly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
