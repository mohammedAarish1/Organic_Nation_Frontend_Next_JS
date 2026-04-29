import TableOfContents from "@/components/terms-and-conditions/TableOfContents";
import { ReactNode } from "react";

// Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
    <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold text-gray-900">
      {title}
    </h2>
    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
      {children}
    </div>
  </div>
);

// All Section Components
const IntroductionSection = () => (
  <Section title="Introduction">
    <p>
      Welcome to Organic Nation! These Terms and Conditions govern your access
      to and use of the Website (defined below) among other things. By using
      this Website, you affirm that you are of legal age to enter into these
      Terms and Conditions, or, if you are not, that you have obtained parental
      or guardian consent to enter into these Terms and Conditions and your
      parent or guardian consents to these Terms and Conditions on your behalf.
      If you violate or do not agree to these Terms and Conditions, then your
      access to and use of the Website is unauthorized. You shall not use this
      Website if you are not competent to contract under the applicable laws,
      rules and regulations.
    </p>

    <div className="mt-4 space-y-4">
      <div>
        <p className="mb-2 font-semibold text-gray-900">DEFINED TERMS:</p>
        <p className="mb-2">
          In these Terms and Conditions: {'"Agreement"'} means the terms and
          conditions as detailed herein including all schedules, appendices,
          annexure, privacy policy and will include the references to this
          Agreement as amended, supplemented, varied or replaced time to time.
        </p>
        <ol className="ml-4 list-inside list-decimal space-y-3">
          <li>
            When we say {'"Organic Nation"'} we mean Foodsbay India, an India
            based company incorporated under the Indian Companies Act and any
            subsidiaries of Foodsbay India (including any subsidiaries that
            Foodsbay India may form or acquire in the future), and their
            affiliates, directors, officers, employees and agents. We also refer
            to Organic Nation as {'"we,"'} {'"us"'} and {'"our."'} But when we
            say {'"Foodsbay Entities,"'} we mean Foodsbay; its suppliers,
            vendors, contractors, and licensors.
          </li>
          <li>
            Foodsbay India is the owner and operator of www.organicnation.co.in
            and is engaged in the business of curating, designing and selling
            consumer products under the brand name {'"Organic Nation"'}. When we
            say {'"Website"'}, we mean the website www.organicnation.co.in, and
            all related functionality, services, and content offered by or for
            Organic Nation on or through www.organicnation.co.in, and includes
            the systems, servers, and networks used to make the Website
            available.
          </li>
          <li>
            When we say {'"you"'} or {'"your"'} we mean any customer or user
            (like you!) of this Website and any person who has notice of these
            Terms and Conditions.
          </li>
          <li>
            When we say {'"Terms and Conditions,"'} we mean these Terms and
            Conditions and all other terms and policies posted by Organic Nation
            on the website (and any updates by Organic Nation to these Terms and
            Conditions and those terms and policies).
          </li>
        </ol>
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-900">UPDATES:</p>
        <p>
          We may update these Terms and Conditions from time to time by
          notifying you of such changes by any reasonable means, including by
          posting a revised Terms and Conditions through the Website. Any such
          changes will not apply to any dispute between you and us arising prior
          to the date on which we posted the revised Terms and Conditions
          incorporating such changes or otherwise notified you of such changes.
          You agree that it your responsibility to regularly check
          www.organicnation.co.in, for any updated Terms and Conditions. In
          addition, by continuing to use or access to the Website or otherwise
          engaging with Organic Nation after we post any changes, you accept the
          updated Terms Website. The {'"Last Updated"'} legend indicates when
          these Terms and Conditions were last changed.
        </p>
      </div>
    </div>
  </Section>
);

const TermsSection = () => (
  <Section title="Terms & Termination">
    <ol className="ml-4 list-inside list-decimal space-y-3">
      <li>
        This Agreement shall continue to be in full force and effect for so long
        as you are using the site. The Website www.organicnation.co.in is an
        online shopping platform wherein the users can purchase/buy the products
        and services listed on it pursuant to the terms and conditions set forth
        below. By clicking on the {'"Proceed to Checkout"'} button, you are
        agreeing to use the Services in a manner consistent with and abide by
        the terms and conditions of this Agreement, our Privacy Policy, and with
        all applicable laws and regulations.
      </li>
      <li>
        These Terms and Conditions are effective unless and until terminated by
        either you or Foodsbay India. You may terminate these Terms and
        Conditions at any time, provided that you discontinue any further use of
        the Website. We also may terminate these Terms and Conditions at any
        time and may do so immediately without notice, and deny you access to
        the Website, if in our sole discretion you fail to comply with any term
        or provision of these Terms and Conditions.
      </li>
    </ol>
  </Section>
);

const WebsiteUseSection = () => (
  <Section title="Use of the Website">
    <ol className="ml-4 list-inside list-decimal space-y-3">
      <li>
        You certify that the information you provide on or through the Website
        is accurate and complete.
      </li>
      <li>
        You are solely responsible for maintaining the confidentiality and
        security of your account including username, password, payment
        information etc.
      </li>
      <li>
        Foodsbay India is not responsible for any losses arising out of the
        unauthorized use of your account.
      </li>
      <li>
        You agree that Foodsbay India does not have any responsibility if you
        lose or share access to your device. Any agreement between you and the
        issuer of your credit card, debit card, or other form of payment will
        continue to govern your use of such payment method on the Website
      </li>
      <li>
        You agree that Foodsbay India is not a party to any such agreement, nor
        is Foodsbay India responsible for the content, accuracy, or
        unavailability of any method used for payment.
      </li>
      <li>
        Your account may be restricted or terminated for any reason, at our sole
        discretion. Except as otherwise provided by law, at any time without
        notice to you, we may (1) change, restrict access to, suspend, or
        discontinue the Website or any portion of the Website, and (2) charge,
        modify, or waive any fees required to use any services, functionality or
        other content available through the Website or any portion of the
        Website.
      </li>
      <li>
        In connection with the Website, you will not:
        <ol className="mt-2 ml-6 list-inside list-[lower-alpha] space-y-2">
          <li>
            Make available through or in connection with the Website any virus,
            worm, Trojan horse, Easter egg, time bomb, spyware, or other
            computer code, file or program that is or is potentially harmful or
            invasive or intended to damage or hijack the operation of, or to
            monitor the use of, any hardware, software, or equipment.
          </li>
          <li>
            Use the Website for any commercial purpose, or for any purpose that
            is fraudulent or otherwise tortious or unlawful.
          </li>
          <li>Harvest or collect information about users of the Website.</li>
          <li>
            Interfere with or disrupt the operation of the Website or the
            systems, servers, or networks used to make the Website available,
            including by hacking or defacing any portion of the Website; or
            violate any requirement, procedure or policy of such servers or
            networks.
          </li>
          <li>Restrict or inhibit any other person from using the Website.</li>
          <li>
            Reproduce, modify, adapt, translate, create derivative works of,
            sell, rent, lease, loan, timeshare, distribute, or otherwise exploit
            any portion of (or any use of) the Website except as expressly
            authorized in these Terms and Conditions, without Foodsbay{" "}
            {"India's"} express prior written consent.
          </li>
          <li>
            Reverse engineer, decompile, or disassemble any portion of the
            Website, except where such restriction is expressly prohibited by
            applicable law.
          </li>
          <li>
            Remove any copyright, trademark, or other proprietary rights notice
            from the Website.
          </li>
          <li>
            Frame or mirror any portion of the Website, or otherwise incorporate
            any portion of the Website into any product or service, unless you
            obtain Foodsbay {"India's"} express prior written consent to do so.
          </li>
          <li>Cause injury to any person or entity.</li>
          <li>
            Violate any law, rule, or regulation, or these Terms and Conditions.
          </li>
          <li>
            You will not use the Foodsbay {"India's"} name, logo, or brand to
            (1) send any unsolicited or unauthorized content, including
            advertising, promotional materials, email, junk mail, spam, or other
            form of solicitation; or (2) use any meta tags or other hidden text
            or metadata utilizing a Foodsbay India trademark, logo, URL, or
            product name without Foodsbay {"India's"} written consent;
          </li>
          <li>
            You will not attempt to do anything, or permit, encourage, assist,
            or allow any third party to do anything, prohibited in this Section,
            or attempt, permit, encourage, assist, or allow any other violation
            of these Terms and Conditions.
          </li>
        </ol>
      </li>
    </ol>
  </Section>
);

const ProductsSection = () => (
  <Section title="Products provided by Foodsbay India">
    <ol className="ml-4 list-inside list-decimal space-y-3">
      <li>
        NO PRODUCTS RELATED TO HEALTH, WELLNESS, NUTRACEUTICALS ARE INTENDED TO
        SUBSTITUTE FOR THE DIAGNOSIS, TREATMENT AND ADVICE OF A MEDICAL
        PROFESSIONAL, AND SUCH MATERIALS DO NOT COVER ALL POSSIBLE USES,
        PRECAUTIONS, SIDE EFFECTS, AND INTERACTIONS, AND SHOULD NOT BE CONSTRUED
        TO INDICATE THAT ANY PRODUCT IS SAFE OR EFFECTIVE FOR YOU. CONSULT THE
        PRODUCT INFORMATION (INCLUDING PACKAGE INSERTS) REGARDING DOSAGE,
        PRECAUTIONS, WARNINGS, AND INTERACTIONS, AND YOUR MEDICAL PROFESSIONAL,
        FOR GUIDANCE BEFORE USING ANY SUCH PRODUCTS.
      </li>
      <li>
        THE FOODSBAY INDIA ENTITIES ASSUME NO RESPONSIBILITY FOR ANY CONSEQUENCE
        RELATING DIRECTLY OR INDIRECTLY TO ANY ACTION OR INACTION YOU TAKE BASED
        ON THE PRODUCTS.
      </li>
      <li>
        Always read labels, warnings, directions, and other information provided
        with the product before using or consuming the product. For additional
        information about a product, please contact the manufacturer.
        Information and statements regarding dietary supplements have not been
        evaluated by the Food and Drug Administration and are not intended to
        diagnose, treat, cure, or prevent any disease or health condition. If
        you find a product is not as described, your sole remedy is to return it
        in unused condition (excluding products that are not eligible for
        return), in accordance with Foodsbay {"India's"} Return Policy. It is
        your responsibility to ascertain and obey all applicable local, state,
        federal, and foreign laws (including minimum age requirements) regarding
        the purchase, possession, and use of any Product.
      </li>
    </ol>
  </Section>
);

const OrdersSection = () => (
  <Section title="Order Placement & Acceptance">
    <ol className="mt-2 flex list-disc flex-col gap-3">
      <li>
        <p>CANCELLATION BY THE CUSTOMER</p>
        <p>
          After placing an order, in case you want to cancel your order, you can
          easily do so until it has not been processed or shipped by us and is
          in our warehouse. Any amount already paid by you will be refunded
          back. Contact our customer support to help you with this process as
          swiftly as possible. We will not be able to cancel those orders that
          have been already processed and shipped. Get in touch with us via our
          contact form. Alternatively, look for the order support contact
          information provided in your order receipt e-mail. Allow us reasonable
          time to track the order status and thereby cancel it for you.
        </p>
      </li>
      <li>
        <p>CANCELLATION BY FOODSBAY INDIA</p>
        <p>
          While our endeavour is to ensure that every order that has been
          successfully placed with Foodsbay India, there are some situations in
          which we may have to cancel the order(s). some of the situations that
          may result in your order being cancelled include (but not limited to):
        </p>
        <ul className="my-2 flex list-inside list-decimal flex-col gap-3 pl-3">
          <li>Limitations on quantities available for purchase;</li>
          <li>Inaccurate or insufficient address;</li>
          <li>Product no longer available or temporarily out of stock;</li>
          <li>Inaccuracies or errors in product pricing or information.</li>
        </ul>
        <p>
          We will contact you within 2 business days of such cancellation and
          give you the option to exchange / refund / cancel the order based on
          your convenience.
        </p>
      </li>
    </ol>
  </Section>
);

const PaymentSection = () => (
  <Section title="Payment Policy">
    <ol className="mt-2 flex list-disc flex-col gap-3">
      <li>
        <p>PRICING INFORMATION</p>
        <p>
          Product prices listed on the website are current. While every care has
          been taken to label the products accurately, errors in data entry and
          updating may occur. Foodsbay India reserves the right to cancel the
          order in case a transaction has been made where the price indicated
          was not the correct price. In the rare event that happens, we will
          give a full refund of all money received from the customer. Foodsbay
          India may, at its discretion, either contact you for instructions or
          cancel your order and notify you of such cancellation. Pricing for
          products may be different on the website or from prices available in
          Foodsbay India or on associated Foodsbay India apps. Prices are
          subject to change without advance notice.
        </p>
        <p>
          All prices on this web site are given in Indian Rupees. For
          international cards used on the site, the banks applicable exchange
          rate and charges will apply. We have no jurisdiction on this and any
          disputes or queries on exchange rates and bank charges need to be
          directed to the bank or institution that issued your card or payment
          instrument.
        </p>
        <p>
          All orders are acknowledged at current pricing. We will bill at price
          in effect at the time of receipt of money and raising of an invoice.
          Some products which are listed on the web stores such as fresh fruits
          and vegetables are products where prices change on a daily basis. You
          will be billed the prices prevalent during the invoicing of the
          products. However, for the products such as fresh fruits and
          vegetables, differential amount due to differential weight shall be
          adjusted in the customer invoice copy on delivery. Our products are
          liable for taxes, as applicable in India.
        </p>
      </li>
      <li>
        <p>PAYMENT OPTIONS</p>
        <p>We support the following payment options at Foodsbay India:</p>
        <ul className="my-2 flex list-inside list-decimal flex-col gap-3 pl-3">
          <li>Cash On Delivery (available in selected pin codes)</li>
          <li>Credit Card (Visa, Master Card, Diners, etc.)</li>
          <li>Debit Card (Visa, Maestro, RuPay, Master Card, etc.)</li>
          <li>
            Net banking / Direct Debit payments from select banks. A complete
            list is available at the time of checkout process and prior to
            making payments for any purchases).
          </li>
          <li>UPI</li>
          <li>Wallets (PayTm, Mobikwik, Amazon Pay, Phone Pe etc.)</li>
          <li>Pay Later (Ola Money, ePayLater etc.)</li>
        </ul>
      </li>
      <li>
        <p>PROMOTIONAL CODES</p>
        <p>
          Promotional codes are limited in nature and may expire or be
          discontinued with or without notice. Promotional codes are void where
          prohibited by law. Promotional codes may not be copied, sold, or
          otherwise transferred. They are not redeemable for cash and are
          subject to cancellation or change at any time for any reason without
          notice. We reserve the right in our discretion to impose conditions on
          the offering of any promotional code.
        </p>
      </li>
      <li>
        <p>GIFT CARDS</p>
        <p>
          <span className="font-medium">Risk of loss and title: </span> The risk
          of loss and title to any gift cards passes to the purchaser upon our
          electronic transmission to the recipient or delivery to the carrier,
          whichever is applicable.
        </p>
        <p>
          <span className="font-medium">Nonreturnable; not for resale: </span>{" "}
          Notwithstanding anything contained in these Terms and Conditions,
          Foodsbay India plastic Gift Cards and eGift Cards (“Foodsbay India
          Gift Cards”) are not returnable or refundable for cash. Resale of
          Foodsbay India Gift Cards is strictly prohibited.
        </p>
        <p>
          <span className="font-medium">Acceptance locations: </span> Unless
          other restrictions apply, Foodsbay India Gift Cards may be used at any
          Foodsbay India store; or on-line at www.organicnation.co.in.
        </p>
        <p>
          <span className="font-medium">Not for promotional use: </span>{" "}
          Foodsbay India Gift Cards may be used as personal or business gifts,
          but may not be used in connection with any marketing, advertising or
          other promotional activities (including without limitation via
          websites, Internet advertisements, email, telemarketing, direct mail,
          newspaper and magazine advertisements, and radio and television
          broadcasts).
        </p>
        <p>
          <span className="font-medium">Lost or Stolen Gift Card: </span> Lost
          or stolen cards will not be replaced. Foodsbay India shall not have
          any liability towards (i) lost or stolen Foodsbay India Gift Cards or
          (ii) use of any Foodsbay India Gift Cards by third parties through
          your www.organicnation.co.in account. You are solely responsible for
          keeping the password for your www.organicnation.co.in account safe and
          for any activity conducted under your account.
        </p>
      </li>
      <li>
        <p>CASH ON DELIVERY</p>
        <p>
          <span className="font-medium">Limit: </span> Foodsbay India’s Cash on
          Delivery option allows you to pay order value at the time of delivery
          for all orders up to Rs. 14,999. Your existing limits will be revised
          once, there is a delivery or order rejected against your account, from
          the new limit implementation logic, if required. To pay for any order
          using Cash on Delivery (COD) mode of payment, please select the ‘Cash
          On Delivery’ option on the payment page. Cash on Delivery option is
          available only in selected pin codes. However the COD limit may differ
          from customer to customer depending upon the order rejection
          percentage from a particular customers registered email id. For
          avoidance of doubt, ‘Order Rejection Percentage’ shall mean any
          undelivered orders which are returned from the address provided by the
          customer even, after three successful delivery attempts. In event of
          COD limit breach, your order will be cancelled and you will have to
          place a new order using Pre-payment options.
        </p>
        <p>
          <span className="font-medium">Decrease In COD Limit: </span> Further,
          the COD limit for any user may get decreased to Rs. 4,999, Rs.1,499 or
          Rs. 0 on the basis on Order Rejection Percentage and can be reset to
          Rs.14,999 basis on order acceptance percentage and number of prepaid
          orders placed, post limit decrease.
        </p>
      </li>
      <li>
        <p>GST CHARGES</p>
        <p>
          GST is a single tax on the supply of goods and services that is levied
          on every value addition (through production and services) and is added
          to a product’s sale price. GST has to borne/paid by the ultimate
          consumer of the product or service. Orders fulfilled on or after July
          1st 2017, GST will be applicable on your orders. GST subsumes all
          other taxes like Excise duty, VAT, Entry tax etc.
        </p>
        <div>
          Following rules will govern whether or not additional GST will be
          applicable on the products purchased by you:
          <ul className="list-inside list-decimal">
            <li>
              GST applicability: The prices for the Products shall be inclusive
              of GST. The discounted prices displayed on the Website shall be
              inclusive of all taxes.
            </li>
            <li>
              GST amount: If applicable, the amount of GST collected from
              customer depends on category, for example:
              <ol className="list-inside list-[lower-alpha] pl-3">
                <li>Pickles: Max 12%</li>
                <li>Cookies, Chocolates: Max 18%</li>
                <li>Molasses: Max. 28%</li>
                <li>Spices, Masalas: Max 5%</li>
              </ol>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <p>PAYMENT FAILURE</p>
        <p>
          Please retry making the payment after ensuring that the information
          entered is accurate, including all account details, billing addresses
          and passwords. If your payment still fails, you can use the Cash on
          Delivery (COD) payment option, if available on the payment page to
          place your order. If your payment is debited from your account after a
          payment failure, it will be credited back within 7-10 days, after we
          receive a confirmation from the bank.
        </p>
      </li>
      <li>
        <p>REFUND OF GST AMOUNT ON CANCELLED / RETURNED PRODUCT</p>
        <p>
          If you return the product, the applicable GST/VAT amount will also be
          refunded into the source account selected at the time of return
          initiation. However, no refunds of GST/VAT shall be made in relation
          to shipping charges collected from the consumer under Foodsbay India
          shipping policy.
        </p>
      </li>
      <li>
        <p>PAYMENT SECURITY</p>
        <p>
          Transactions on the website are protected by SSL (Secure Sockets
          Layer) and Secure Data Encryption using a 1024-bit process. Any
          information you enter when transacting with the webstore is sent in a
          Secure Socket Layer (SSL) session and is encrypted to protect you
          against unintentional disclosure to third parties. This is an
          assurance that it follows the best security practices adopted by major
          online vendors where all payments are processed in real-time for your
          security and immediate peace of mind. Credit card and Debit card
          information is not stored by us and is not taken by us. This
          information is taken directly by the payment gateway provided who is
          authorised and is compliant with the regulations and requirements of
          various banks and institutions and payment franchisees that it is
          associated with.
        </p>
      </li>
    </ol>
  </Section>
);
const ShippingSection = () => (
  <Section title="Shipping Policy">
    <ol className="mt-2 flex list-disc flex-col gap-3">
      <li>
        <p>GENERAL</p>
        <div className="flex flex-col gap-2">
          <p>
            We strive to deliver products purchased from Foodsbay India in
            excellent condition and in the fastest time possible. Also, for all
            the subsequent purchases of Order value of Rs. 750* or more, we will
            deliver the order to your doorstep free of cost. A minimal shipping
            charge will be applicable to all orders under Rs. 750 based on cart
            items.
          </p>
          <p className="font-semibold">
            All the products will be shipped in 3-5 days.
          </p>
          <p>
            Products will be shipped to an address designated by you, if
            applicable, so long as such address is complete. All transactions
            are made pursuant to a shipping contract, and, as a result, risk of
            loss and title for Products pass to you upon delivery of the
            Products to the carrier.
          </p>
          <p>
            We take no responsibility for goods signed by an alternative person
            other than the person ordering the product at the address indicated
            at the time of the order. Since the transactions are authorised by
            the card holder, we do not take responsibility for incorrect
            addresses provided at the time of placing the order The delivery
            will NOT be redirected / redelivered to any other address in any
            circumstance.
          </p>
          <p>
            The selected product will be delivered only in the city it is
            mentioned as “available” on this website.
          </p>
          <p>
            Foodsbay India shall not be held responsible for damage of products
            after delivery.
          </p>
          <p>
            If the order is cancelled, lost or un-delivered to your preferred
            location, we will refund the complete order amount including any
            shipping charges if paid online.
          </p>
          <p>
            If you return an order delivered to you, order shipping charges will
            not be refunded. For accounts whose return behaviour violates our
            fair usage policy, a delivery charge of Rs. 50-150 will be levied on
            all orders, irrespective of order value.
          </p>
          <p></p>
          <p>
            *Order value is calculated after applying discounts/VAT/GST or any
            other applicable charges.
          </p>
        </div>
      </li>
      <li>
        <p>FAIR USAGE POLICY</p>
        <div className="flex flex-col gap-2">
          <p>
            We always strive hard to provide the best experience to our
            customers. However, we have noticed that few accounts abuse our
            liberal returns policy. These accounts typically return most of the
            items bought or choose to not accept our shipments. Hence, our
            regular customers are deprived of the opportunity to buy these
            items. To protect the rights of our customers, we reserve the right
            to collect shipping charge of Rs. 149 for all orders and disable
            cash on delivery option for accounts which have a high percentage of
            returns and shipments not accepted by value of orders placed.
          </p>
          <p>
            Please tap on the{" "}
            <span className="font-medium"> “Manage Orders” </span>section under
            the account menu of the website to check your order status.
          </p>
        </div>
      </li>
      <li>
        <p>CHANGE OF ADDRESS FOR DELIVERY</p>
        <p>
          You can change your order’s shipping address before we’ve shipped it
          by getting in touch with our customer care representatives. Extra
          charges (if applicable) shall be levied.
        </p>
      </li>
      <li>
        <p>DAMAGE OF PARCEL</p>
        <p>
          Kindly reach out to us for pilferage / leakage / tempering within
          Forty Eight (48) hours of delivery failing which the claim will not be
          entertained. Whilst we investigate, you are requested to please make
          note of the below pointers:
        </p>
        <ul className="list-inside list-decimal">
          <li>Please do not use the item for which claim is being raised</li>
          <li>
            You may be required to furnish information like a short description
            of the case (a few questions will be asked to help us understand the
            scenario)
          </li>
          <li>
            The snapshots of the packet and other boxes (if any). Try to cover
            the sides which look tampered/damaged.
          </li>
          <li>
            The refund for prepaid / Cash on delivery orders will be done after
            the investigation.{" "}
          </li>
        </ul>
        <p className="mt-2">
          You may not be liable for a refund if he/she falls in any of the
          scenarios stated below:
        </p>
        <ul className="list-inside">
          <li>-- Failure to provide adequate information about the case.</li>
          <li>
            -- Failure to provide snapshots of the packet and box (if any).
          </li>
          <li>
            -- If a pilferage / leakage delivery was received, claims must be
            made the same day.
          </li>
          <li>
            -- You must not dispose of the packaging for 3 – 4 days
            post-delivery. We might need to pick-up your packaging for
            investigation at our end.
          </li>
        </ul>
      </li>
    </ol>
  </Section>
);
const ReturnsSection = () => (
  <Section title="Return & Refund Policy">
    <ol className="mt-2 flex list-disc flex-col gap-3">
      <li>
        <p>ELIGIBILITY</p>
        <div className="flex flex-col gap-2">
          <p>
            No returns will be accepted, unless the product is damaged or
            defective (defined hereinbelow).
          </p>
          <ul className="flex list-inside flex-col gap-2">
            <li>
              -- Damaged means any packed product having quality issues leading
              to deleterious or destructive effects due to physical or chemical
              damage, or from any other circumstances, and which renders the
              product unfit for consumption and / or use.
            </li>
            <li>
              -- Defective product is a product that causes injury to a person
              due to either a design defect includes packaging, a manufacturing
              defect, or a marketing defect.
            </li>
          </ul>
          <p>
            You understand and agree that certain food products may require
            specific storage conditions and certain instructions may be required
            to follow as mentioned on the Packaging of the product. You are
            required to adhere to the same so as to enjoy the product in its
            best form and prevent spoilage, contamination of the product which
            may render it unfit for consumption or its intended usage. Products
            stored or used in conflict with such conditions and instructions
            shall be not eligible for Returns / Refunds.
          </p>
          <p>
            DENTS / SCRATCHES: We take care and exercise due caution to deliver
            your product(s) in the best possible manner, however, there may be
            times that you may receive the product(s) with minor dents or
            scratches including slight indentations or creasing in a shipping
            carton. As a general consensus, it is safe to buy and use food from
            dented packaging; it does, however, depend on the condition the
            packaging is in and the food contained inside. Please note, that
            minor scratches and/or dents do not affect the quality of the
            product(s) or its intended use and thus, is safe and fit for use and
            consumption. However, we suggest you inspect each of the product(s)
            and packaging inside for damage as well. In case of a major dent or
            any leakage or if you notice any opening, pinhole, then we suggest
            not to use the product(s) and get in touch with our customer support
            without delay.
          </p>
          <p>
            SHELF LIFE: Our Website and the product(s) itself, clearly reflects
            the Best Before / Expiry date (“Shelf Life”) of each product, which
            indicates and means that the product is fit and safe for use and /
            or consumption by the date indicated on the Website and also on the
            Product received by you. We shall never have any product(s) on our
            Website which are not safe / unfit for consumption. However, when
            you as a Consumer make a purchase of any product(s), it is agreed
            and understood that you have made your fair due diligence with
            regards to the Shelf Life / Best Before / Expiry date of the
            product(s) as stated on the Website and thus placed your order
            depending upon your usage.
          </p>
          <ul className="flex list-inside flex-col gap-2">
            <li>
              -- In an effort to curb frivolous, invalid and false claims of
              rejecting and returning the product(s) which are well within the
              stipulated Shelf Life and also fit and safe for consumption, NO
              CLAIMS FOR ANY RETURN OF PRODUCT(S) WHICH ARE WELL WITHIN THE
              STIPULATED TIMEFRAME OF THEIR SHELF LIFE AS REFLECTING ON THE BEST
              BEFORE / EXPIRY OF THE PRODUCT(S) SHALL BE ENTERTAINED.
            </li>
            <li>
              -- There may also be times when you may receive a product wherein
              the Best Before / Expiry date on the Website may be different than
              that reflecting on the Best Before / Expiry date mentioned on the
              product(s) (this could purely be due to logistical / technical /
              system updates), in this case, if the product is well within its
              Shelf Life i.e., within its Best Before / Expiry date it shall not
              be eligible for Return on issues of Shelf Life not being
              sufficient or enough, unless the Shelf Life is less than 20% at
              the time of receipt of the product by you which would be taken
              into account by us, evaluated at our end by the concerned team and
              fulfilling the eligibility criteria processed for return or refund
              as the case may be.
            </li>
          </ul>
          <p>
            For any other items to be eligible for a refund, you have to return
            the item you have purchased to us within seven (7) calendar days of
            the delivery. If seven (7) days have gone by since your date of
            delivery, unfortunately we can’t offer you a refund or replacement.
            To be eligible for a return, your item must be unused, unopened and
            in the same condition that you received it. It must also be in the
            original packaging.
          </p>
          <p>
            Foodsbay India takes stringent measures to ensure that the products
            delivered to you are in perfect condition. However, there is a
            remote possibility that the product may get damaged during transit
            or an incorrect product is delivered to you. In such a case, you may
            return a product brought from us in case of damage or defect within
            seven (7) days of purchase for non-perishable products and within
            two (2) days of purchase for perishable products.
          </p>
        </div>
        <p>Important information</p>
        <ul className="list-inside list-decimal">
          <li>
            To be eligible for a return, your item must be unused, unopened and
            in the same condition that you received it. It must also be in the
            original packaging. Contact our customer support to get a free
            shipping label.
          </li>
          <li>
            . If our products arrived damaged, rotten or contaminated in any
            way, please contact us right away, and we will be happy to send a
            free replacement. This replacement for the damaged, rotten or
            contaminated products shall always be subject to our rights to
            recall the products to send it for further analysis and testing. If
            anything is unclear or you have more questions feel free to contact
            our customer support .
          </li>
          <li>
            At the time of return, preferably, at least 75 % of the weight or
            volume of the actual product must be returned.
          </li>
          <li>
            The refund or return shall be subject to inspection and in case it
            is not approved, then no refund shall be initiated.
          </li>
          <li>
            The Product must be unused and in the same condition that you
            received it. It must also be in the original packaging.
          </li>
          <li>
            Please note that items purchased at www.organicnation.co.in cannot
            be returned in a Foodsbay India store for exchange or refund.
          </li>
          <li>
            The above policy is valid on all products except Gift cards and
            perishable items having shelf life of less than two (2) days.
          </li>
        </ul>
      </li>

      <li>
        <p>REFUND TIMELINE</p>
        <p>
          After the refund has been initiated by Foodsbay India as per the
          Returns Policy, the refund amount is expected to reflect in the
          customer account as per the following timelines:
        </p>
        <ul className="list-inside">
          <li>** NEFT – 1 to 3 business days post refund initiation</li>
          <li>** Foodsbay India Credit – Instant</li>
          <li className="font-semibold">
            ** Online Refund – 7 to 10 business days post refund initiation,
            depending on your bank partner
          </li>
          <li>** Wallets – Instant</li>
        </ul>
        <p>
          Please note, Foodsbay India initiates the refund after the returned
          item has reached us and quality check is successful. Therefore, the
          refund initiation time may vary by time taken by the courier partner
          to deliver the return to our warehouse. In case of any refund
          discrepancies, Foodsbay India may at its sole discretion, request you
          to share with us a screenshot of your bank statement.
        </p>
      </li>
      <li>
        <p>SELF-SHIPPING OF THE PRODUCT</p>
        <p>
          You can self-ship the return item via any reliable courier partner.
          For all self-shipped returns, you will be duly reimbursed the shipping
          costs. Therefore, please ensure that scan copy of courier bill/receipt
          is shared via various Contact us option available on the website.
        </p>
        <p>
          The courier bill/receipt should satisfy the following conditions for
          successful processing:
        </p>
        <ul className="list-inside">
          <li>** It should capture the weight of the return package.</li>
          <li>
            ** Residential/office address, destination address, shipment date,
            amount and other details should be mentioned.
          </li>
          <li>
            ** The information on the receipt should NOT be edited/over-written.
          </li>
          <li>
            ** The courier charge (amount mentioned on the receipt) should not
            overshoot the Sender-Destination-Service combination and shall be
            cross checked with the courier company.
          </li>
        </ul>
        <p>
          This is subject to your returns being inspected and successfully
          processed upon receipt at our end.
        </p>
      </li>

      <li>
        <p>ADDRESS FOR SELF-SHIP OF RETURNS</p>
        <p>
          You can send the return to any one of the following returns processing
          facilities depending on your location. Kindly do not send it to on any
          other address as the package would not be acceptable then.
        </p>
        <div className="mt-2 flex flex-col gap-1 font-medium">
          <p className="w-1/4">
            D-166/25, GROUND FLOOR, SECTOR-50 NOIDA, NOIDA CITY ZONE-4, Gautam
            Buddha Nagar , Uttar Pradesh-201301
          </p>
          <p>+919999532041</p>
        </div>
      </li>
      <li>
        <p>DECLINE OF RETURN REQUEST AND RETURN OF PRODUCT</p>
        <p>
          This may happen, if the item you returned is used, damaged or labels
          are missing. In the event that the return request is declined, the
          user shall not be eligible for a refund, and Foodsbay India assumes no
          liability in this regard. For more details, please call our customer
          support.
        </p>
        <p>
          This may happen, if the item you returned does not qualify the
          eligibility criteria as in Clause 8.1. above.
        </p>
        <p>
          We reserve the right to modify, amend or change our Return and Refund
          Policy from time to time
        </p>
      </li>
    </ol>
  </Section>
);
const IndemnificationSection = () => (
  <Section title="Indemnification">
    <p>
      User agrees to defend, indemnify and hold harmless Foodsbay India, its
      employees, directors, officers, agents and their successors and assigns
      and against any and all claims, liabilities, damages, losses, costs and
      expenses, including attorney’s fees, caused by or arising out of claims
      based upon the use of User’s actions or inactions, including but not
      limited to any warranties, representations or undertakings or in relation
      to the non-fulfilment of any of its obligations under this Agreement or
      arising out of the User’s infringement of any applicable laws, regulations
      including but not limited to Intellectual Property Rights, payment of
      statutory dues and taxes, claim of libel, defamation, violation of rights
      of privacy or publicity, loss of service by other subscribers and
      infringement of intellectual property or other rights. This clause shall
      survive the expiry or Termination of this Agreement.
    </p>
  </Section>
);
const JurisdictionSection = () => (
  <Section title="Governing Law And Jurisdiction">
    <p>
      This Website is created and controlled by Foodsbay India in Uttarakhand,
      India and the laws of India shall apply. This agreement is governed and
      construed in accordance with the Laws of India. You hereby irrevocably
      consent to the exclusive jurisdiction and venue of courts in Uttarakhand,
      India, in all disputes arising out of or relating to the use of the
      Website. Use of the Website is unauthorized in any jurisdiction that does
      not give effect to all provisions of these Terms and Conditions, including
      without limitation this paragraph. You agree to indemnify and hold
      Foodsbay India, its subsidiaries, affiliates, directors, partners,
      officers and employees, harmless any claim, demand, or damage, including
      reasonable attorneys’ fees, asserted by any third party due to or arising
      out of your use of or conduct on the Website.
    </p>
  </Section>
);
const IPRightsSection = () => (
  <Section title="Intellectual Property Rights">
    <p>
      Foodsbay India and other names, graphics, logos, and icons identifying
      Foodsbay India or its products or services are the proprietary marks of
      Foodsbay India. These IPR’s may not be used in connection with any product
      or service that is not offered by Foodsbay India, in any manner that is
      likely to cause confusion among customers, or in any manner that
      disparages or discredits Foodsbay India. The names and logos of third
      party products shown on the Website are the property of their respective
      owners.
    </p>
  </Section>
);
const AgreementSection = () => (
  <Section title="Entire Agreement">
    <p>
      These Terms and Conditions, together with Privacy Policy, and other rules
      and policies posted on the site, which are hereby incorporated as set
      forth fully in these Terms and Conditions, constitute the entire agreement
      between you and Foodsbay India with respect to your use of and material
      available through the Website, and they supersede all prior or
      contemporaneous communications and proposals between you and Foodsbay
      India with respect to this Website. Any rights not expressly granted in
      these Terms and Conditions are reserved.
    </p>
  </Section>
);
const SubmissionsSection = () => (
  <Section title="Submissions">
    <p>
      Foodsbay India welcomes your comments about your experiences shopping with
      us and your suggestions about how to improve this Website. Any comments,
      ideas, suggestions, initiation, or any other content you contribute to
      Foodsbay India or this site (including the name you submit with any
      content) will be deemed to include a royalty-free, perpetual, irrevocable,
      nonexclusive right and license for Foodsbay India to adopt, publish,
      reproduce, disseminate, transmit, distribute, copy, use, create derivative
      works, display worldwide, or act on such content, without additional
      approval or consideration, in any, media, or technology now known or later
      developed for the full term of any rights that may exist in such content,
      and you waive any claim to the contrary. You represent and warrant that
      you own or otherwise control all of the rights to the content that you
      contribute to this Website and that use of your content by Foodsbay India
      will not infringe upon or violate the rights of any third party.
    </p>
  </Section>
);
const DisclaimerSection = () => (
  <Section title="Disclaimer">
    <p>
      We reserve the right to modify these policies at any time, so please
      review it frequently. Changes and clarifications will take effect
      immediately upon their posting on the Website. If we make material changes
      to this policy, we will notify you here that it has been updated, so that
      you are aware of what information we collect, how we use it, and under
      what circumstances, if any, we use and/or disclose it.
    </p>

    <p>
      If we undergo any changes in the legal status with respect of acquisition
      or merger with another company, your information may be transferred to the
      new owners so that we may continue to sell products to you.
    </p>
  </Section>
);

export default async function TermsAndConditionsPage({
  params,
}: {
  params: { sectionId: string };
}) {
  const { sectionId: activeSection } = await params;

  const sectionComponents = {
    introduction: IntroductionSection,
    terms: TermsSection,
    "website-use": WebsiteUseSection,
    products: ProductsSection,
    orders: OrdersSection,
    payment: PaymentSection,
    shipping: ShippingSection,
    returns: ReturnsSection,
    indemnification: IndemnificationSection,
    jurisdiction: JurisdictionSection,
    "ip-rights": IPRightsSection,
    agreement: AgreementSection,
    submissions: SubmissionsSection,
    disclaimer: DisclaimerSection,
  };

  const ActiveComponent =
    sectionComponents[activeSection as keyof typeof sectionComponents] ||
    IntroductionSection;

  return (
    <div className="mt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Last Updated: 25<sup>th</sup> June 2024
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <TableOfContents
              //   sections={sections}
              activeSection={activeSection}
              // setActiveSection={setActiveSection}
            />
          </div>

          {/* Content */}
          <div className="mt-8 lg:col-span-3 lg:mt-0">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
