import Footer from "@/src/components/footer";
import Navbar from "@/src/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function SitemapPage() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Sitemap</h1>
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
            &gt; Sitemap
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="bg-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Sitemap Links */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-amber-400 mb-4">
                Sitemap
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-blue-600 text-lg">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/consumer-service">Services Consumers</Link>
                </li>
                <li>
                  <Link href="/business-service">Services Businesses</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/register">Registration</Link>
                </li>
              </ul>
            </div>

            {/* Image on Right */}
            <div className="col-span-1 flex flex-col space-y-4">
              {/* First Image - Full width, more height */}
              <div className="w-full">
                {/* Image section */}
                <div className="relative w-full h-[40rem]">
                  {/* Image */}
                  <Image
                    src="/hondacivicty-img.png"
                    alt="Privacy Illustration"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />

                  {/* Button inside image */}
                  {/* Button inside image */}
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <Link href="/about">
                      <button className="w-[300px] lg:w-[360px] bg-yellow-400 text-gray-800 font-semibold py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Second Image - Full width, smaller height */}
              <div className="relative w-full h-[20rem]">
                {/* Image */}
                <Image
                  src="/logo2.png"
                  alt="Security Illustration"
                  fill
                  className="object-cover rounded-lg shadow-md"
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

                {/* Button or content on top */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
