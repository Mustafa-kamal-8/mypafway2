import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const address = "800 Steeles Avenue West, #B10182, North York, ON, L4J 7L2";
  const googleMapsUrl =
    "https://maps.google.com/?q=800+Steeles+Ave+W,+Thornhill,+ON+L4J+7L2";

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
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

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8 text-gray-600">
            <Link href="/" className="hover:text-amber-500">
              Home
            </Link>{" "}
            {" > "} Contact Us
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left side (2 columns) */}
            <div className="md:col-span-2">
              {/* Contact Us heading */}
              <h2 className="text-5xl font-bold text-amber-400 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-500 mb-8">
                If you have any questions or require assistance please e-mail
                admin@mypafway.com. Thank you.
              </p>

              {/* Google Maps */}
              <div className="border mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.385350808649!2d-79.47799758446556!3d43.80080007911456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2e28d4d5803f%3A0x1e9f8e0e6c42667c!2s800%20Steeles%20Ave%20W%2C%20Thornhill%2C%20ON%20L4J%207L2%2C%20Canada!5e0!3m2!1sen!2sus!4v1683900000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  aria-label="Google Maps showing 800 Steeles Ave W location"
                ></iframe>
              </div>

              {/* Address */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-amber-400 mb-4">
                  Mypafway Ltd.
                </h3>
                <p className="text-gray-500 mb-4">
                  800 Steeles Avenue West, #B10182, North York, ON, L4J 7L2
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-800 font-semibold py-3 px-8 rounded-full transition-colors"
                >
                  Google Maps
                </a>
              </div>

              {/* Site Administrator */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">
                  Site Administrator
                </h3>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">E-mail:</span>
                  <a
                    href="mailto:admin@mypafway.com"
                    className="text-gray-500 hover:text-amber-500"
                  >
                    admin@mypafway.com
                  </a>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-amber-400 mb-4">
                  Have you checked out our FAQ Page?
                </h3>
                <p className="text-gray-500 mb-4">
                  The FAQ page might just have what you've been looking for.
                  Take a look at the FAQ page to avoid delays with your
                  question.
                </p>
                <Link
                  href="/faq"
                  className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-800 font-semibold py-3 px-8 rounded-full transition-colors"
                >
                  FAQ
                </Link>
              </div>

              {/* Contact Form */}
              <div className="mb-6">
                <div className="relative">
                  <div className="bg-amber-400 text-gray-800 font-bold py-6 px-6 rounded-l-full inline-block">
                    Contact our customer support
                  </div>
                  <div className="absolute top-1/2 left-[280px] right-0 h-1 bg-amber-400 transform -translate-y-1/2"></div>
                </div>
                <div className="pt-12 pb-8">
                  <p className="text-gray-500 mb-6">
                    Have a question and can't find what you're looking for? Fill
                    out the form below and a customer service representative
                    will get back to you.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Name"
                        className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Company Name"
                        className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="E-mail"
                        className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Comments / Inquiry"
                        rows={8}
                        className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <div className="g-recaptcha mb-4">
                        {/* This is a placeholder for reCAPTCHA */}
                        <div className="border border-gray-300 p-4 rounded flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-600">
                            I'm not a robot
                          </span>
                          <div className="ml-auto">
                            <div className="text-xs text-gray-400">
                              reCAPTCHA
                            </div>
                            <div className="text-xs text-gray-400">
                              Privacy - Terms
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-semibold py-3 px-12 rounded-full"
                      >
                        Send
                      </Button>
                    </div>
                  </form>
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
      </main>

      <Footer />
    </div>
  );
}
