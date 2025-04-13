import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FaqAccordion } from "@/src/components/faq-accordion";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>
      {/* Hero Section with Wave */}
      <section className="relative bg-gray-700 text-white mt-32">
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

      {/* Breadcrumb */}
      <div className="bg-white mt-4">
        <div className="container mx-auto px-4">
          <div className="text-gray-600">
            <Link href="/" className="hover:text-amber-500">
              Home
            </Link>{" "}
            &gt; Terms & Conditions
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
                  Terms & Conditions
                </h2>
                <p className="text-gray-600">
                  Mypafway (“Mypafway”, “we”, “us”, and terms of similar
                  meaning) provides this web site (this site and any software
                  provided by Mypafway for use with the site, the “Site”) to you
                  subject to these terms of use (these “Terms”). In these terms
                  we describe users of the Site, whether registered or not, as
                  “Users”.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  Please read these Terms carefully before using the Site. By
                  accessing, using, or browsing the Site you agree to be legally
                  bound by these Terms and all terms, policies, and guidelines
                  incorporated by reference in these Terms. If you do not agree
                  with these Terms in their entirety, you may not use the Site.
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  Mypafway reserves the right to change or modify any of the
                  terms and conditions contained in these Terms, or any policy
                  or guideline of the Site, at any time and in its sole
                  discretion. If we do so, we will notify you at the e-mail you
                  provide in your registration information, if any. If you do
                  not agree with the changes, you can cancel your account with
                  us without further obligation. Unless otherwise specified, any
                  changes or modifications will be effective immediately upon
                  posting of the revisions on the Site, and your continued use
                  of the Site after such time will constitute your acceptance of
                  such changes or modifications. You should from time to time
                  review the Terms and any policies and documents incorporated
                  in them to understand the terms and conditions that apply to
                  your use of the Site. The Terms will always show the ‘last
                  updated’ date at the top. If you do not agree to any amended
                  Terms, you must stop using the Site. If you have any questions
                  about the Terms, please e-mail us at the contact address
                  below.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  The services we provide through the Site are for your own use
                  only. You may not resell, lease, or provide them in any other
                  way to anyone else.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  1. Privacy Policy
                </h2>
                <p className="text-gray-600">
                  Please refer to Mypafway's{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Privacy-Policy
                  </Link>{" "}
                  for information on how Mypafway collects, uses, and discloses
                  personally identifiable information from users of the Site. By
                  using the Site you agree to our use, collection, and
                  disclosure of personally identifiable information in
                  accordance with the Privacy-Policy.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  2. Registration Data and Account Security
                </h2>
                <p className="text-gray-600">
                  If you register for an account on the Site, you agree to (1)
                  provide accurate, current, and complete information as may be
                  prompted by any registration forms on the Site (“Registration
                  Data”); (2) maintain the security of your password; (3)
                  maintain and promptly update the Registration Data, and any
                  other information you provide to the Site, and to keep it
                  accurate, current, and complete; and (4) accept all risks of
                  unauthorized access to the Registration Data and any other
                  information you provide to the Site. You are responsible for
                  all activity on your Site account.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  3. Fees, Charges, and Taxes
                </h2>
                <p className="text-gray-600">
                  The fees and other charges that we charge for use of the Site
                  are described in pricing. They may change from time to time.
                  If we change them, we will give you at least 30 days notice.
                  If they do change, your continued use of the Site after the
                  change indicates your agreement with the new fees and charges
                  after the effective date of the change. Any change to fees and
                  other charges will not be applicable to the billing period in
                  which the change occurs.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  You are responsible for all taxes applicable to the fees and
                  charges in any applicable jurisdiction.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  If you terminate your use of the Site you must pay the fees
                  applicable for the balance of the then current month.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  4. Ownership, Copyright, and Trademarks
                </h2>
                <p className="text-gray-600">
                  In these Terms the content on the Site, including all
                  information, data, logos, marks, designs, graphics, pictures,
                  sound files, other files, and their selection and arrangement,
                  is called “Content”. The Site, all Content and all software
                  available on the Site or used to create and operate the Site,
                  is the property of Mypafway or its licensors, and is protected
                  by Canadian and international copyright laws. All rights to
                  the Site, such Content, and such software are expressly
                  reserved. All trademarks, registered trademarks, product
                  names, and company names or logos mentioned in the Site are
                  the property of their respective owners. Reference to any
                  products, services, processes, or other information, by trade
                  name, trademark, manufacturer, supplier, or otherwise does not
                  constitute or imply endorsement, sponsorship, or
                  recommendation thereof by Mypafway.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  5. Our Limited License of Content to You
                </h2>
                <p className="text-gray-600">
                  Mypafway grants you a limited, revocable, non-exclusive,
                  non-sublicensable license to access the Site and to view,
                  copy, and print the portions of the Content available to you
                  on the Site. Such license is subject to these Terms, and
                  specifically conditioned upon the following: (1) you may only
                  view, copy, and print such portions of the Content for your
                  own use; (2) you may not modify or otherwise make derivative
                  works of the Site or the Content, or reproduce, distribute, or
                  display the Site or any Content (except for page caching)
                  except as expressly permitted in these Terms; (3) you may not
                  remove or modify any copyright, trademark, or other
                  proprietary notices that have been placed in the Content; (4)
                  you may not use any data mining, robots, or similar data
                  gathering or extraction methods; and (5) you may not use the
                  Site or the Content other than for its intended purpose.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  Except as expressly permitted above, any use of any portion of
                  the Content without the prior written permission of its owner
                  is strictly prohibited and will terminate the license granted
                  in this Section, this Agreement, and your account with us. Any
                  such unauthorized use may also violate applicable laws,
                  including without limitation copyright and trademark laws.
                  Unless explicitly stated herein, nothing in these Terms may be
                  construed as conferring any license to intellectual property
                  rights, whether by estoppel, implication, or otherwise. The
                  license in this Section is revocable by Mypafway at any time.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  You represent and warrant that your use of the Site and the
                  Content will be consistent with this license and will not
                  infringe or violate the rights of any other party or breach
                  any contract or legal duty to any other parties, or violate
                  any applicable law.{" "}
                </p>
                <p className="text-gray-600 mt-4">
                  {" "}
                  To request permission for uses of Content not included in this
                  license, you may contact Mypafway at the address set out at
                  the bottom of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  6. Use of the Site
                </h2>
                <p className="text-gray-600">
                  The Site contains areas accessible to the public or registered
                  Users (“Interactive Areas”) in which you or third parties may
                  post photographs or other content, messages, materials, or
                  other items (“User Content”). You are solely responsible for
                  your use of such Interactive Areas and use them at your own
                  risk. User Content submitted to any area of the Site
                  accessible to other Users will be considered non-confidential.
                  By using any Interactive Areas, you expressly agree not to
                  post, upload to, transmit, distribute, store, create, or
                  otherwise publish through the Site any of the following:{" "}
                </p>
                <p className="text-gray-600 ">
                  Content that is unlawful, libelous, defamatory, obscene,
                  pornographic, indecent, lewd, suggestive, harassing,
                  threatening, invasive of privacy or publicity rights, abusive,
                  inflammatory, fraudulent or otherwise objectionable;{" "}
                </p>
                <p className="text-gray-600">
                  {" "}
                  Content that would constitute, encourage or provide
                  instructions for a criminal offense, violate the rights of any
                  party, or that would otherwise create liability or violate any
                  local, state, national or international law;{" "}
                </p>
                <p className="text-gray-600">
                  {" "}
                  Content that may infringe any patent, trademark, trade secret,
                  copyright or other intellectual or proprietary right of any
                  party;{" "}
                </p>
                <p className="text-gray-600">
                  {" "}
                  Content that impersonates any person or entity or otherwise
                  misrepresents your affiliation with a person or entity;{" "}
                </p>
                <p className="text-gray-600">
                  Unsolicited promotions, political campaigning, advertising or
                  solicitations;{" "}
                </p>
                <p className="text-gray-600">
                  {" "}
                  Private information of any third party, including, without
                  limitation, addresses, phone numbers, email addresses and
                  credit card numbers, unless that third party has expressly
                  consented to such use;{" "}
                </p>
                <p className="text-gray-600">
                  {" "}
                  Viruses, corrupted data or other harmful, disruptive or
                  destructive files;{" "}
                </p>
                <p className="text-gray-600 ">
                  {" "}
                  Content that is unrelated to the topic of the Interactive
                  Area(s) in which such Content is posted; or{" "}
                </p>
                <p className="text-gray-600">
                  {" "}
                  Content that, in the sole judgment of Mypafway, is
                  objectionable or which restricts or inhibits any other person
                  from using or enjoying the Interactive Areas or the Site, or
                  which may expose Mypafway or its affiliates or its users to
                  any harm or liability of any type.{" "}
                </p>
                <p className="text-gray-600 ">
                  {" "}
                  You also may not use the Interactive Areas or the Site
                  generally to send commercial or other messages to any
                  third-party if those messages are not solicited, authorized or
                  welcomed by the third-party, and in your use of the Site you
                  must comply with all applicable laws, including laws that
                  apply in any jurisdiction to SPAM and marketing practices, and
                  with any applicable marketing association guidelines on
                  ethical marketing practices. Any use of the Interactive Areas
                  or other portions of the Site in violation of the foregoing
                  violates these Terms and may result in, among other things,
                  termination or suspension of your rights to use the
                  Interactive Areas and/or the Site.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  7. Links to Other Sites
                </h2>
                <p className="text-gray-600">
                  The Site may contain links to third-party Web sites
                  (“Third-Party Sites”) and third-party content (“Third-Party
                  Content”) as a service to those interested in this
                  information. You use links to Third-Party Sites, and any
                  Third-Party Content or service provided there at your own
                  risk. Mypafway does not monitor or have any control over, and
                  makes no claim or representation regarding, Third-Party
                  Content or Third-Party Sites. Mypafway provides these links
                  only as a convenience, and a link to a Third-Party Site or
                  Third-Party Content does not imply Mypafway's endorsement,
                  adoption or sponsorship of, or affiliation with, such
                  Third-Party Site or Third-Party Content. Mypafway accepts no
                  responsibility for reviewing changes or updates to, or the
                  quality, content, policies, nature or reliability of,
                  Third-Party Content, Third-Party Sites, or Web sites linking
                  to the Site. When you leave the Site, our terms and policies
                  no longer govern. You should review applicable terms and
                  policies, including privacy and data gathering practices, of
                  any Third-Party Site, and should make whatever investigation
                  you feel necessary or appropriate before proceeding with any
                  transaction with any third party.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  8. Advertisements and Promotions
                </h2>
                <p className="text-gray-600">
                  Mypafway may run advertisements and promotions from third
                  parties on the Site. Your business dealings or correspondence
                  with, or participation in promotions of, advertisers other
                  than Mypafway, and any terms, conditions, warranties or
                  representations associated with such dealings, are solely
                  between you and such third party. Mypafway is not responsible
                  or liable for any loss or damage of any sort incurred as the
                  result of any such dealings or as the result of the presence
                  of third-party advertisers on the Site.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  9. Warranty Disclaimer
                </h2>
                <p className="text-gray-600">
                  The Site, the Content and the services provided by the Site
                  are provided to you on an “as is” basis without warranties
                  from Mypafway of any kind, either express or implied. Mypafway
                  expressly disclaims all other warranties, express or implied,
                  including without limitation implied warranties of
                  merchantability, fitness for a particular purpose, title and
                  non-infringement. Mypafway does not represent or warrant that
                  Content is accurate, complete, reliable, current or
                  error-free, and expressly disclaims any warranty or
                  representation as to the accuracy or proprietary character of
                  the Site, the
                </p>
                <p className="text-gray-600 mt-5">
                  {" "}
                  While Mypafway attempts to make your access to and use of the
                  Site safe, Mypafway does not represent or warrant that the
                  Site or any Content are free of viruses or other harmful
                  components.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  10. Limitation of Liability and Indemnity
                </h2>
                <p className="text-gray-600">
                  You waive and shall not assert any claims or allegations of
                  any nature whatsoever against Mypafway, its affiliates or
                  subsidiaries, their sponsors, contractors, advertisers,
                  vendors or other partners, any of their successors or assigns,
                  or any of their respective officers, directors, agents or
                  employees (collectively, the “Released Parties”) arising out
                  of or in any way relating to your use of the Site or the
                  Content, including, without limitation, any claims or
                  allegations relating to the alleged infringement of
                  proprietary rights, alleged inaccuracy of Content, or
                  allegations that any Released Party has or should indemnify,
                  defend or hold harmless you or any third party from any claim
                  or allegation arising from your use or other exploitation of
                  the Site. You use the Site at your own risk.
                </p>
                <p className="text-gray-600 mt-5">
                  {" "}
                  Without limitation of the foregoing, neither Mypafway nor any
                  other Released Party shall be liable for any direct, special,
                  indirect or consequential damages, or any other damages of any
                  kind, including but not limited to loss of use, loss of
                  profits or loss of data, whether in an action in contract,
                  tort (including but not limited to negligence) or otherwise,
                  arising out of or in any way connected with the use of the
                  Site or the Content, including without limitation any damages
                  caused by or resulting from your reliance on the Site or other
                  information obtained from Mypafway or any other Released Party
                  or accessible via the Site, or that result from mistakes,
                  errors, omissions, interruptions, deletion of files or email,
                  defects, viruses, delays in operation or transmission or any
                  failure of performance, whether or not resulting from acts of
                  god, communications failure, theft, destruction or
                  unauthorized access to Mypafway or any other Released Party's
                  records, programs or services.{" "}
                </p>
                <p className="text-gray-600 mt-5">
                  {" "}
                  In no event shall the aggregate liability of Mypafway, whether
                  in contract, warranty, tort (including negligence, whether
                  active, passive or imputed), product liability, strict
                  liability or other theory, arising out of or relating to the
                  use of the Site exceed any amounts paid by you for access to
                  or use of the Site during the three months prior to the date
                  of any claim, and if you pay no such amounts, such limit shall
                  be $10.
                </p>
                <p className="text-gray-600 mt-5">
                  {" "}
                  You shall defend, indemnify and hold harmless Mypafway and the
                  other Released Parties from any loss, damages, liabilities,
                  costs, expenses, claims and proceedings arising out of your
                  use of the Site and from the use of the Site by any person to
                  whom you give access to your account, including any claims
                  made by any person that any of your User Content infringes the
                  rights, including the intellectual property rights, of any
                  third party.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  11. Communications
                </h2>
                <p className="text-gray-600">
                  Notices that we give you (other than notice of amendment of
                  these Terms, which is discussed in the introduction of these
                  Terms) may be provided in any of the following ways. First, we
                  may email you at the contact information you provide in your
                  Registration Data. Second, we may post a notice to you in the
                  profile area of your account on the Site. Third, we may post
                  the notice elsewhere on the Site. When we post notices on the
                  Site, we post them in the area of the Site suitable to the
                  notice. It is your responsibility to periodically review the
                  Site for notices.{" "}
                </p>
                <p className="text-gray-600 mt-5">
                  {" "}
                  Subject to the Privacy Policy, if you send to Mypafway or post
                  on the Site in any public area any information, ideas,
                  inventions, concepts, techniques or know-how (“User
                  Submissions”), for any purpose, including the developing,
                  manufacturing and/or marketing or products or services
                  incorporating such information, you acknowledge that Mypafway
                  can use the User Submissions without acknowledgement or
                  compensation to you, and you waive any claim of ownership or
                  compensation or other rights you may have in relation to the
                  User Submissions. We actively review User Submissions for new
                  ideas. If you wish to preserve any interest you might have in
                  your User Submissions, you should not post them to the Site or
                  send them to us.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  12. Applicable Law and Venue
                </h2>
                <p className="text-gray-600">
                  The Site is controlled by Mypafway and operated by it from its
                  offices in Toronto, Ontario. You and Mypafway both benefit
                  from establishing a predictable legal environment in regard to
                  the Site. Therefore, you and Mypafway explicitly agree that
                  all disputes, claims or other matters arising from or relating
                  to your use of the Site will be governed by the laws of the
                  Province of Ontario and the federal laws of Canada applicable
                  therein. The United Nations Convention on Contracts for the
                  International Sale of Goods does not apply to these Terms.{" "}
                </p>{" "}
                <p className="text-gray-600 mt-5">
                  {" "}
                  Except where prohibited by applicable law, any claim, dispute
                  or controversy (whether in contract or tort, pursuant to
                  statute or regulation, or otherwise, and whether preexisting,
                  present or future) arising out of or relating to (a) these
                  Terms; (b) the Site or Content; (c) oral or written
                  statements, advertisements or promotions relating to these
                  Terms or to the Site; or (d) the relationships that result
                  from these Terms or the Site or Content (collectively, a
                  “Claim”) will be referred to and determined by a sole
                  arbitrator (to the exclusion of the courts). Except where
                  prohibited by applicable law, you waive any right you may have
                  to commence or participate in any class action against
                  Mypafway related to any Claim and, where applicable, you also
                  agree to opt out of any class proceedings against Mypafway. If
                  you have a Claim, you should give written notice to arbitrate
                  at the address specified below. If we have a Claim, we will
                  give you notice to arbitrate at your address provided in your
                  Registration Data. Arbitration will be conducted by one
                  arbitrator pursuant to the commercial arbitration laws and
                  rules in effect on the date of the notice in the Province of
                  Ontario. To the extent arbitration as described in the
                  immediately preceding paragraph is prohibited by applicable
                  law, you agree that all Claims will be heard and resolved in a
                  court of competent subject matter jurisdiction located in
                  Toronto, Ontario. You consent to the personal jurisdiction of
                  such courts over you, stipulate to the fairness and
                  convenience of proceeding in such courts, and covenant not to
                  assert any objection to proceeding in such courts. If you
                  choose to access the Site from locations other than Ontario,
                  you will be responsible for compliance with all local laws of
                  such other jurisdiction and you agree to indemnify Mypafway
                  and the other Released Parties for your failure to comply with
                  any such laws.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  13. Termination/Modification of License and Site Offerings
                </h2>
                <p className="text-gray-600">
                  Notwithstanding any provision of these Terms, Mypafway
                  reserves the right, without notice and in its sole discretion,
                  without any notice or liability to you, to (a) terminate your
                  license to use the Site, or any portion thereof; (b) block or
                  prevent your future access to and use of all or any portion of
                  the Site or Content; (c) change, suspend or discontinue any
                  aspect of the Site or Content; and (d) impose limits on the
                  Site or Content.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  14. Termination of Agreement
                </h2>
                <p className="text-gray-600">
                  You and Mypafway may terminate these Terms and your use of the
                  Site at any time. When your Mypafway account is terminated,
                  any images you have uploaded to the Site may remain on the
                  Site. We may retain an archival copy of your User Content
                  after termination, and you therefore hereby grant us a
                  non-exclusive, perpetual, irrevocable license to maintain such
                  archival copy for our internal business purposes. If these
                  Terms expire or terminate for any reason, Sections 4, 9, 10,
                  12, 14 and 15, and any representation or warranty you make in
                  these Terms, shall also survive indefinitely.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  15. Miscellaneous
                </h2>
                <p className="text-gray-600">
                  If any provision of these Terms shall be deemed unlawful, void
                  or for any reason unenforceable, then that provision shall be
                  deemed severable from these Terms and shall not affect the
                  validity and enforceability of any remaining provisions.
                  Mypafway may assign any or all of its rights hereunder to any
                  party without your consent. You are not permitted to assign
                  any of your rights or obligations hereunder without the prior
                  written consent of Mypafway, and any such attempted assignment
                  will be void and unenforceable. These Terms constitute the
                  entire agreement between you and Mypafway regarding your use
                  of the Site, and supercede all prior or contemporaneous
                  communications whether electronic, oral or written between you
                  and Mypafway regarding your use of the Site. The parties
                  confirm that it is their wish that these Terms, as well as any
                  other documents relating to this Terms, including notices,
                  have been and shall be drawn up in the English language only.
                  Les parties reconnaissent avoir convenue que la présente
                  convention ainsi que tous documents, avis et procédures
                  judiciaires qui pourront être exécutés, donnés ou intentées à
                  la suite des présentes ou ayant un rapport, direct ou
                  indirect, avec la présente convention soient rédigée en
                  anglais.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  16. Questions and Comments
                </h2>
                <p className="text-gray-600">
                  If you have any questions regarding these Terms or your use of
                  the Site, please contact us here:{" "}
                </p>
                <p className="text-gray-600 mt-8">Mypafway </p>
                <p className="text-gray-600">800 Steeles Avenue West, </p>
                <p className="text-gray-600"> North York ON, </p>
                <p className="text-gray-600 ">L4J 7L2 </p>
                <p className="text-gray-600 mt-8">
                  If you have problems or have an inquiry,{" "}
                  <Link
                    href="/contact"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    contact us
                  </Link>
                  .
                </p>
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

                  {/* Button inside image */}
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <Link href="/about">
                      <button className="bg-yellow-400 text-gray-800 font-semibold px-16 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
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
                    <button className="bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
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
