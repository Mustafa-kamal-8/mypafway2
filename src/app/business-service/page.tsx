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
      <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
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

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          User Management
                        </h3>
                        <p className="text-gray-600">
                          Reach a target audience missed by other media
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Inventory Tracking
                        </h3>
                        <p className="text-gray-600">
                          Generate leads, drive traffic and revenue online
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Data Transformation
                        </h3>
                        <p className="text-gray-600">
                          Leverage technology and lower operating costs
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Online Catalogue Search
                        </h3>
                        <p className="text-gray-600">
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
                  E-Commerce
                  </h2>
                  <p className="text-gray-600">
              Mypafway offers customized online business services to best suit your needs. At Mypafway we use highly effective tools  at our disposal. Partnering with Mypafway online program is a great way to boost any advertising campaign, target your demographic and increase brand awareness.
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          True Engagement
                        </h3>
                        <p className="text-gray-600">
                          Cross sell and form strategic alliances with other
                          companies
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          E-mail Client
                        </h3>
                        <p className="text-gray-600">
                          Facilitate the purchase process by allowing clients to
                          communicate
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          User Management
                        </h3>
                        <p className="text-gray-600">
                          Adjust pricing, quantity, and offer exclusive deals to
                          special clients through e-mail
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col space-y-4">
              {/* First Image - Full width, more height */}
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
                  <Image
                    src="/hondacivicty-img.png"
                    alt="Privacy Illustration"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />

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
