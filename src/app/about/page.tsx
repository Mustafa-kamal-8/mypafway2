import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-700">
        <Navbar />
      </div>

      {/* Hero Section with Wave */}
      <div className="relative bg-gray-700 pt-32 md:pt-32">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-6xl font-bold text-white mb-6">About us</h1>
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
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span>About</span>
          </div>

          {/* About Us Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">About us</h2>
              <p className="text-gray-600 mb-4">
                Mypafway's mission is to ensure the competitiveness of the auto
                parts industry, so that consumers have choice of auto parts,
                receive quality auto parts, at competitive prices. Utilizing our
                website will not only help the auto parts industry, but redraw
                the auto parts industry structure in a way that spurs enormous
                growth by allowing companies to promote auto part inventory that
                has never before been commercially viable. Mypafway enables
                companies to market their auto part content through our search
                engine applications. We plan on positioning Mypafway as the
                preferred brand for comparison shopping of auto parts and
                accessories online; by focusing company efforts on building
                brand value, satisfying customers with unparalleled service,
                convenience and responsiveness; through state-of-the-art
                applications.
              </p>
              <div className="mb-16">
                <div className="relative mb-8">
                  <div className="bg-yellow-300 text-gray-800 font-bold py-2 px-6 rounded-l-full inline-block">
                    Features
                  </div>
                  <div className="absolute top-1/2 left-[120px] right-0 h-1 bg-yellow-300 transform -translate-y-1/2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/crosssellingimg.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Cross Selling</h3>
                    <p className="text-gray-600">
                      Cross sell and form strategic alliances with other
                      companies
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/shipping-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Shipping</h3>
                    <p className="text-gray-600">Ship Auto Parts</p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/inventory-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Streamlining Inventory
                    </h3>
                    <p className="text-gray-600">
                      Streamline and automate auto part inventory
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-16">
                <div className="relative mb-8">
                  <div className="bg-yellow-300 text-gray-800 font-bold py-2 px-6 rounded-l-full inline-block">
                    Benefits
                  </div>
                  <div className="absolute top-1/2 left-[120px] right-0 h-1 bg-yellow-300 transform -translate-y-1/2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/cross-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Cross Selling</h3>
                    <p className="text-gray-600 text-sm">
                      Reach a target audience missed by other media
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/lead-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Lead Generation</h3>
                    <p className="text-gray-600 text-sm">
                      Generate leads, drive traffic and revenue online
                    </p>
                  </div>

               
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/leveraging-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      Leveraging of Technology
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Leverage technology and lower operating costs
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/stream-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      Streamlining Inventory
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Eliminate the traditional practice of selling through an
                      auto parts catalogue
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-16">
                <div className="relative mb-8">
                  <div className="bg-yellow-300 text-gray-800 font-bold py-2 px-6 rounded-l-full inline-block">
                    What your customers really want
                  </div>
                  <div className="absolute top-1/2 left-[280px] right-0 h-1 bg-yellow-300 transform -translate-y-1/2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <svg
                        className="w-24 h-24 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Parts Search</h3>
                    <p className="text-gray-600">
                      Ability to locate hard to find auto parts
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/partinfo-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Parts Information
                    </h3>
                    <p className="text-gray-600">
                      Ability to obtain information on auto parts and pricing
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/efficient-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Efficient Ecommerce
                    </h3>
                    <p className="text-gray-600">Quick order taking</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="w-full">
                {/* Image section */}
                <div className="relative w-full h-[40rem]">
                  {/* Image */}
                  <Image
                    src="/brembo-logo.png" // Replace with actual path
                    alt="Brembo Logo"
                    width={350}
                    height={100}
                    className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10"
                  />

                  {/* Background Image */}
                  <Image
                    src="/hondacivicty-img.png"
                    alt="Privacy Illustration"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />

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
              <div className="flex flex-col w-full h-[22rem] bg-black items-center p-20 mt-10">
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

          {/* Features Section */}

          {/* Benefits Section */}

          {/* What Customers Want Section */}

          {/* Register Now Section */}

          {/* Learn More Button */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
