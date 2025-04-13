import Image from "next/image";
import Link from "next/link";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function BusinessPage() {
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
              fill="#30d5fc"
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
            &gt; Services: Business
          </div>
        </div>
      </div>

      {/* Main Section - 3 Columns */}
      <section className="bg-white py-2 md:py-16">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-12">
            Business
          </h2> */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column with Image beside paragraphs */}
            <div className="md:col-span-2 space-y-16">
              {/* First Paragraph with image on left */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* <div className="relative w-full md:w-1/3 h-[15rem]">
                  <Image
                    src="/privacy-img.png"
                    alt="Related Visual"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div> */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold ">
                    Search Engine
                  </h2>
                  <p className="text-gray-600">
                    Mypafway is an automotive search engine that consists of OEM
                    and aftermarket automotive parts. Mypafway's search engine
                    enables consumers the ability to find automotive parts from
                    many different car manufacturers from around the globe. The
                    search engine allows consumers to purchase automotive parts.
                    In addition, the search engine enables consumers the ability
                    to refine their search based on the lowest price and most
                    popular automotive part. Every automotive part is in stock
                    and ready for purchase straight from the car manufacturer.
                  </p>
                  <button className="bg-[#30d5fc] text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                    Try it Now!
                  </button>

                  {/* Features Section for Search Engine */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="bg-[#30d5fc] text-white font-bold text-3xl py-2 px-8 rounded-r-full inline-block">
                        Features
                      </div>
                      <div
                        className="h-1 bg-[#30d5fc] absolute right-0 top-1/2 transform -translate-y-1/2"
                        style={{ width: "calc(100% - 180px)" }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {/* Feature 1 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="User Management"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          User Management
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Reach a target audience missed by other media
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Inventory Tracking"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Inventory Tracking
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Generate leads, drive traffic and revenue online
                        </p>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Data Transformation"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Data Transformation
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Leverage technology and lower operating costs
                        </p>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Online Catalogue Search"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Online Catalogue Search
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Eliminate the traditional practice of selling through
                          an auto parts catalogue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Paragraph with image on left */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* <div className="relative w-full md:w-1/3 h-[15rem]">
                  <Image
                    src="/privacy-img.png"
                    alt="Related Visual"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div> */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold ">
                    Peer-to-Peer Channel (P2P)
                  </h2>
                  <p className="text-gray-600">
                    Mypafway's P2P is a feature that enables companies to market
                    their auto parts through file-sharing. It provides access to
                    auto part information and collaboration. It's designed to:
                    (1) Ease tension between buyers and sellers, (2) Develop
                    relationships between auto part manufacturers, auto part
                    suppliers, and auto part retailers, and (3) Create outlets
                    for auto part manufacturers, auto part suppliers, and auto
                    part retailers.
                  </p>
                  <button className="bg-[#30d5fc] text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                    Try it Now!
                  </button>

                  {/* Features Section for P2P */}
                  {/* Features Section for Search Engine */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="bg-[#30d5fc] text-white font-bold text-3xl py-2 px-8 rounded-r-full inline-block">
                        Features
                      </div>
                      <div
                        className="h-1 bg-[#30d5fc] absolute right-0 top-1/2 transform -translate-y-1/2"
                        style={{ width: "calc(100% - 180px)" }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {/* Feature 1 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="User Management"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          True Engagement
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Cross sell and form strategic alliances with other
                          companies
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Inventory Tracking"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          E-mail Client
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Facilitate the purchase process by allowing clients to
                          communicate
                        </p>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Data Transformation"
                            width={96}
                            height={96}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          User Management
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Adjust pricing, quantity, and offer exclusive deals to
                          special clients through e-mail
                        </p>
                      </div>

                      {/* Feature 4 */}
                    </div>
                  </div>
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
                    <button className="bg-[#30d5fc] text-gray-800 font-semibold px-16 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>

              {/* Second Image */}
              <div className="relative w-full h-[20rem]">
                <Image
                  src="/logo2.png"
                  alt="Security Illustration"
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <Link href="/register">
                    <button className="bg-[#30d5fc] text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
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
