import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FaqAccordion } from "@/src/components/faq-accordion";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function ConsumerPage() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gray-700 text-white mt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Services</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full"
          >
            <path
              fill="#FFC107"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white mt-4">
        <div className="container mx-auto px-4">
          <div className="text-gray-600">
            <Link href="/" className="hover:text-amber-500">
              Home
            </Link>{" "}
            &gt; Services: Consumers
          </div>
        </div>
      </div>

      {/* Main Section - 3 Columns */}
      <section className="bg-white py-2 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-12">
            Consumer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column with Image beside paragraphs */}
            <div className="md:col-span-2 space-y-16">
              {/* First Paragraph with image on left */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 h-[15rem]">
                  <Image
                    src="out_plan.jpg.jpg"
                    alt="Related Visual"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-400">
                    Search Engine
                  </h2>
                  <p className="text-gray-600">
                    We're an online store locater via Google Earth, specializing
                    in comparative shopping for auto parts and accessories.
                    Comparative shopping will rise to prominence because it
                    embraces two of the most fundamental attributes. The first
                    is ease of access to auto part information. Mypafway’s
                    search engine enables consumers to compare prices and auto
                    parts from an array of different products at one location.
                    The second attribute is the commercial opportunity to match
                    buyers with sellers.
                  </p>
                  <button className="bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                    Try it Now!
                  </button>
                </div>
              </div>

              {/* Second Paragraph with image on left */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 h-[15rem]">
                  <Image
                    src="gear.jpg"
                    alt="Related Visual"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-400">
                    Mypafway Freemium
                  </h2>
                  <p className="text-gray-600">
                    Mypafway's Freemium business model lets anyone (yes this is
                    open to the general public) promote and sell quality, name
                    brand items on Mypafway for FREE. While Mypafway takes care
                    of fulfilling the order. You stock the inventory, pack the
                    orders, and Mypafway will ship it to your customers.
                  </p>
                  <button className="bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                    Try it Now!
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <div className="relative">
                  <div className="bg-yellow-400 text-white font-bold text-3xl py-2 px-8 rounded-r-full inline-block">
                    Benefits
                  </div>
                  <div
                    className="h-1 bg-yellow-400 absolute right-0 top-1/2 transform -translate-y-1/2"
                    style={{ width: "calc(100% - 180px)" }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {/* Feature 1 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/cross-seeling-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Cross Selling</h3>
                    <p className="text-gray-600">
                      Reach a target audience missed by other media
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/lead-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Lead Generation</h3>
                    <p className="text-gray-600">
                      Generate leads, drive traffic and revenue online
                    </p>
                  </div>
                  {/* Feature 3 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/leveraging-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Leveraging of Technology
                    </h3>
                    <p className="text-gray-600">
                      Leverage technology and lower operating costs
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/stremlining-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Streamlining Inventory
                    </h3>
                    <p className="text-gray-600">
                      Eliminate the traditional practice of selling through an
                      auto parts catalogue Mypafway Mypafway Learn More Mypafway
                      logo
                    </p>
                  </div>

                  {/* Feature 4 */}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-4">
              {/* First Image */}
              <div className="relative w-full h-[40rem]">
                <Image
                  src="/hondacivicty-img.png"
                  alt="Privacy Illustration"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <Link href="/about">
                    <button className="bg-yellow-400 text-gray-800 font-semibold px-16 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>

              {/* Second Image */}
              <div className="flex flex-col w-full h-[22rem] bg-black items-center p-20">
                {/* Image */}
                <Image
                  src="/logo2.png"
                  alt="Security Illustration"
                  width={200}
                  height={200}
                  className="object-cover rounded-lg shadow-md w-full"
                />

                {/* Button or content on top */}
                <div className="mt-10">
                  <Link href="/register">
                    <button className="w-[300px] lg:w-[360px] bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                      Register Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
