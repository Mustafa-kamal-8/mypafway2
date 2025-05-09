import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FaqAccordion } from "@/src/components/faq-accordion";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function FaqPage() {
  // FAQ data
  const faqItems = [
    {
      question: "What is Mypafway?",
      answer:
        "Mypafway is an online platform that connects consumers with auto parts suppliers. We provide a convenient way to search for, compare, and purchase auto parts for various vehicle makes and models.",
    },
    {
      question: "Why should I use Mypafway?",
      answer:
        "Mypafway offers a streamlined experience for finding the right auto parts for your vehicle. We partner with trusted suppliers to ensure quality products, competitive pricing, and reliable delivery options.",
    },
    {
      question: "Can I upgrade, downgrade, or cancel later?",
      answer:
        "Absolutely. Mypafway is a month-to-month service, so you can upgrade, downgrade, or cancel at any time.",
    },
    {
      question: "Do I have to sign a contract?",
      answer: "No. Every plan is month to month.",
    },
    {
      question: " Can I cancel at anytime?",
      answer: "Yes. You can cancel anytime. ",
    },
    {
      question: "  Will my data be safe?",
      answer:
        "Mypafway has implemented security safeguards and backup procedures to protect your data.",
    },
    {
      question: "What are the account types that Mypafway offers?",
      answer:
        "Mypafway offers two main account types: Consumer accounts for individual vehicle owners, and Business accounts for auto repair shops, dealerships, and other automotive businesses. Business accounts include additional features like bulk ordering and special pricing.",
    },
    {
      question: "What service plans do you offer?",
      answer:
        "We offer several service plans tailored to different needs. Our basic plan is free and includes standard search and ordering capabilities. Premium plans offer additional benefits such as expedited shipping, priority customer service, and exclusive discounts.",
    },
    {
      question: "Are there any other charges?",
      answer:
        "If you live outside Canada there are no extra charges whatsoever. If your business is registered in Canada we are required by law to add the standard HST.",
    },
    {
      question: "How do I search for parts?",
      answer:
        "You can search for parts using our standard search bar by entering keywords, part numbers, or descriptions. For more specific searches, use our Advanced Search feature to filter by year, make, model, and category.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and direct bank transfers for business accounts.",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Terms & Conditions
          </h1>
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
      {/* Hero Section with Wave */}
      <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Frequent Asked Questions
          </h1>
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
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="text-gray-600">
            <Link href="/" className="hover:text-amber-500">
              Home
            </Link>{" "}
            &gt; FAQ
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="bg-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
              Frequent Asked Questions
            </h2>
            <p className="text-gray-600">
              Welcome to Mypafway's FAQ Centre. If you have problems or have an
              inquiry, please contact us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ Questions and Answers */}
            <div className="lg:col-span-2">
              <FaqAccordion items={faqItems} />
            </div>

            {/* Image Section */}
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
