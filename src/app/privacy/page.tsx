import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FaqAccordion } from "@/src/components/faq-accordion";

import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      {/* Hero Section with Wave */}
      <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Privacy Policy
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
      <div className="bg-white mt-4">
        <div className="container mx-auto px-4">
          <div className="text-gray-600">
            <Link href="/" className="hover:text-amber-500">
              Home
            </Link>{" "}
            &gt; Privacy-Policy
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="bg-white py-2 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left Column - First Part */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
                  Privacy Policy
                </h2>
                <p className="text-gray-600">
                  This is the Privacy Policy of the Mypafway website (together
                  with our affiliates and subsidiaries, “Mypafway”, “we”, “us”,
                  “our” and terms of similar meaning) and our related products
                  and services (the “Site”). It describes the information that
                  we collect from users of our Site (“Users”) as part of the
                  normal operation of our Site, and how we use and disclose this
                  information.
                </p>

                <p className="text-gray-600 mt-4">
                  By accepting the Privacy Policy in registration or by visiting
                  and using the Site, you expressly consent to our collection,
                  use, and disclosure of your personal information in accordance
                  with this Privacy Policy. This Privacy Policy is incorporated
                  into and subject to our Terms of Use.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Privacy Policy
                </h2>
                <p className="text-gray-600">
                  We use personal information in the file we maintain about you
                  and other information we obtain from your current and past
                  activities on the Site, to provide to you the services offered
                  by the Site; resolve service disputes; troubleshoot problems;
                  measure consumer interest in our products and services, inform
                  you about online and offline offers, products, services,
                  events and updates; deliver information to you that, in some
                  cases, is relevant to your interests, such as product news;
                  customize your experience; detect and protect us against
                  error, fraud and other criminal activity; enforce our Terms of
                  Use; provide you with system or administrative messages, and
                  as otherwise described to you at the time of collection.
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  We may also use personal information about you to improve our
                  marketing and promotional efforts, to analyze Site usage, to
                  improve our content and product offerings, and to customize
                  the Site's content, layout, and services. These uses improve
                  the Site and better tailor it to meet your needs, so as to
                  provide you with a smooth, efficient, safe and customized
                  experience while using the Site.
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  Please see our Terms of Use for information on what we do to
                  account information when you terminate your account with us.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  What Information Do We Collect?
                </h2>
                <p className="text-gray-600">
                  Our primary purpose in collecting personal information from
                  you is to provide you with a safe, smooth, efficient, and
                  customized experience. This allows us to provide services and
                  features that most likely meet your needs, and to customize
                  our service to make your experience safer and easier. We only
                  collect personal information about you that we consider
                  necessary for achieving this purpose.
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  {" "}
                  In general, you can browse the Site without telling us who you
                  are or revealing any personal information about yourself. Once
                  you become a registered User, we require you to provide
                  various contact and identity information and other personal
                  information as indicated on the relevant forms on the Site,
                  and you are no longer anonymous to us. Where possible, on
                  these forms we indicate which fields are required and which
                  fields are optional. In addition, as you use the Site, you can
                  from time to time enter or send to us personal information.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  You always have the option to not provide information by
                  choosing not to become a User or by not using the particular
                  feature of the Site for which the information is being
                  collected.
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  {" "}
                  We also automatically track certain information about you
                  based upon your behaviour on our Site. We use this information
                  to do internal research on our users' demographics, interests,
                  and behaviour to better understand, protect and serve you and
                  our community. This information may include the URL that you
                  just came from (whether this URL is on our Site or not), which
                  URL you next go to (whether this URL is on our Site or not),
                  your computer browser information, and your IP address.{" "}
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  “Cookies” are small files placed on your hard drive that
                  assist us in providing our services. We use cookies to allow
                  you to enter your password less frequently during a session,
                  and we use data collection devices (such as Google Analytics),
                  including cookies, on certain pages of the Site to help
                  analyze our web page flow, measure promotional effectiveness,
                  and promote trust and safety, to offer certain features that
                  are only available through the use of a cookie and to allow us
                  to provide information that is targeted to your interests.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  Following your registration on the Site, you can review and
                  change your information in your account area. If you disclose
                  personal information on the Site and wish to have it removed,
                  please contact us at the support contact information posted on
                  the Site.{" "}
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  We do not collect your credit card information. Your credit
                  card information is collected by PayPal or other transaction
                  processing company.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Our Disclosure of Your Information
                </h2>
                <p className="text-gray-600">
                  We will not sell or rent your personally identifiable
                  information to third parties without your explicit consent.
                  The following describes some of the ways that your information
                  may be disclosed in the normal scope of business to provide
                  our services:{" "}
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  {" "}
                  Anonymized Aggregated Data. We aggregate and anonymize data
                  and use and disclose such information for a variety of
                  purposes. However, in these situations, we do not disclose any
                  information that could be used to identify you personally.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  Public Areas of the Site. All of your activities in the public
                  areas of the Site will be identifiable to your User ID, and
                  other people can see your published content.{" "}
                </p>{" "}
                <p className="text-gray-600 mt-4">
                  Subsidiaries and Affiliates; Service Providers. We may from
                  time to time use the services of affiliates, subsidiaries and
                  unrelated service providers in the operation of the Site, and
                  may disclose personal information to them in the course of our
                  use of their services. For example, we may use the services of
                  third-party hosting companies to host the operation of the
                  Site. This may involve the hosting of data, including personal
                  information, on servers operated by those hosting companies.
                  We take care to use only service providers that we believe are
                  reputable and able to live up to our and your expectations,
                  including about the handling of confidential information.
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  Legal Requests; Emergencies; Jurisdictions. We cooperate with
                  law enforcement inquiries and demands for information that are
                  made under force of law. We are also cognizant of the need to
                  address emergencies. Therefore, we may provide personal
                  information in what we believe to be emergency situations, and
                  we may provide personal information where required by statute,
                  court order, legal process or lawful authority, and to our
                  legal counsel. In some cases, personal information that we
                  collect may be stored or processed outside of Canada, and may
                  therefore be subject to the legal jurisdiction of those
                  countries and governmental authorities in those countries.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  We may also disclose personal information to potential
                  acquirors or their agents in the course of the sale of our
                  business. If we do this, the disclosure will be subject to
                  customary confidentiality agreements.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Security
                </h2>
                <p className="text-gray-600">
                  Mypafway strives to protect your personal information. For
                  security of transactions, we use the Secure Sockets Layer
                  (SSL) protocol, which encrypts any personal information you
                  enter into registration forms on the Site. The encryption
                  process protects your information, by scrambling it before it
                  is sent to us from your computer. We also make commercially
                  reasonable effort to ensure the security of your personal
                  information on our system. Unfortunately, no data transmission
                  over the Internet can be guaranteed to be 100% secure. As a
                  result, while we strive to protect your personal information,
                  we cannot warrant the security of any information you transmit
                  to us.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Other Information Collectors
                </h2>
                <p className="text-gray-600">
                  Except as otherwise expressly included in this Privacy Policy,
                  this document only addresses the use and disclosure of
                  information we collect from you. To the extent that you
                  disclose your information to other parties through the Site,
                  different rules may apply to their use, collection and
                  disclosure of the personal information you disclose to them.
                  Since we do not control the information use, collection or
                  disclosure policies of third parties, you are subject to their
                  privacy policies. We encourage you to ask questions before you
                  disclose your personal information to others.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Questions?
                </h2>
                <p className="text-gray-600">
                  It is our goal to make our privacy practices easy to
                  understand. If you have questions, concerns or if you would
                  like more detailed information, please{" "}
                  <Link
                    href="/contact"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Mypafway
                </h2>
                <p className="text-gray-600">www.mypafway.com</p>
              </div>
            </div>

            {/* Right Column - Images */}
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
