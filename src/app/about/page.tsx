import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      {/* Main Content with Sufficient Padding */}
      <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
        {/* Increased padding to pt-32 */}
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          <div className="prose max-w-none">
            <p className="mb-4">
              Welcome to MYPAFWAY, your trusted source for high-quality auto
              parts and accessories. Since our establishment, we have been
              dedicated to providing car enthusiasts and everyday drivers with
              access to the best automotive products on the market.
            </p>
            <p className="mb-4">
              Our mission is to make finding and purchasing auto parts as simple
              and convenient as possible. We understand that your vehicle is
              important to you, which is why we offer only the highest quality
              parts from trusted manufacturers.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
            <p className="mb-4">
              MYPAFWAY was founded by a group of automotive enthusiasts who
              recognized the need for a comprehensive online platform where
              customers could easily find the exact parts they need for their
              vehicles. What started as a small operation has grown into a
              trusted name in the automotive parts industry.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment</h2>
            <p className="mb-4">At MYPAFWAY, we are committed to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing high-quality auto parts at competitive prices</li>
              <li>Offering excellent customer service and support</li>
              <li>Ensuring a seamless shopping experience</li>
              <li>
                Continuously expanding our inventory to meet customer needs
              </li>
              <li>
                Staying up-to-date with the latest automotive trends and
                technologies
              </li>
            </ul>
            <p className="mb-4">
              We take pride in our extensive selection of products, which
              includes everything from essential maintenance parts to
              performance upgrades and accessories. Whether you're a
              professional mechanic, a DIY enthusiast, or simply looking to
              maintain your vehicle, MYPAFWAY has you covered.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
            <p className="mb-4">
              Our team consists of automotive experts who are passionate about
              cars and committed to helping our customers find exactly what they
              need. We're always available to answer questions, provide
              recommendations, and ensure your satisfaction with every purchase.
            </p>
            <p className="mb-4">
              Thank you for choosing MYPAFWAY. We look forward to serving all
              your automotive needs!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
