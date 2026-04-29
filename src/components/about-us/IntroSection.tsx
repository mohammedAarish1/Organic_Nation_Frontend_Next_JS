// Introduction Section
const IntroSection = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Welcome to{" "}
            <span className="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ORGANIC NATION
            </span>
          </h2>
          <div className="mx-auto h-1 w-16 bg-linear-to-r from-amber-600 to-orange-600" />
        </div>

        {/* Content Card */}
        <div className="rounded-3xl bg-linear-to-br from-white to-amber-50/50 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Welcome to{" "}
              <span className="text-secondary font-semibold">
                ORGANIC NATION - A {'"FOODSBAY INDIA"'} unit (Partnership Firm)
              </span>
              , a distinguished name in the realm of organic food processing.
              Established in 2019 and situated in the serene landscapes of
              Bailparao, Uttarakhand, we have swiftly emerged as the largest
              supplier of organic honey in North India.
            </p>

            <div className="relative rounded-2xl bg-linear-to-r from-amber-100 to-orange-100 p-6 pl-8">
              <div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-amber-600 to-orange-600" />
              <p className="italic">
                At{" "}
                <span className="text-secondary font-semibold">
                  ORGANIC NATION
                </span>
                , we pride ourselves on producing chemical preservative free
                homestyle pickles, chutneys, and murrabbas. Our products are
                crafted with traditional recipes and the finest organic
                ingredients, ensuring a delightful and authentic taste
                experience in every jar.
              </p>
            </div>

            <p>
              Our commitment to quality extends beyond{" "}
              <span className="font-semibold">honey and preserves</span>. As a
              prominent trader and supplier,{" "}
              <span className="font-semibold">
                we offer a diverse range of organic & Natural products including
                seasonings, vegetable powders, oats, vegan-friendly soya chaap,
                millet-based muesli, and granola
              </span>
              . Each product is a testament to our dedication to promoting{" "}
              <span className="font-semibold">health and wellness</span> through
              natural, wholesome foods.
            </p>

            <p>
              Our journey is guided by a vision of sustainability and
              excellence. We adhere to rigorous organic farming practices,
              ensuring that our products are free from harmful chemicals and
              additives. This commitment not only nurtures your health but also
              supports environmentally friendly agricultural methods.{" "}
              <span className="font-semibold">ORGANIC {"NATION's"}</span> reach
              goes beyond the Indian market, as{" "}
              <span className="font-semibold">
                we proudly export our signature pickles to international
                destinations
              </span>
              . Our global presence allows us to share the{" "}
              <span className="font-semibold">rich and diverse flavors</span> of
              India with the world, celebrating the essence of our culinary
              heritage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
