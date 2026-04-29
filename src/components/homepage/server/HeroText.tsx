import { FadeInView, ScaleOnHover } from "@/components/animations/animation2";
import { NavigationButton } from "@/components/buttons/NavigationButton";

export default function HeroText() {
  return (
    <>
      <FadeInView>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-secondary mb-6 inline-block rounded-full px-4 py-2"
        >
          <span className="text-sm font-semibold text-amber-800">
            🌿 100% Natural & Organic
          </span>
        </motion.div> */}
        <FadeInView>
          <div className="bg-gradient-secondary mb-6 inline-block rounded-full px-4 py-2">
            <span className="text-sm font-semibold text-amber-800">
              🌿 100% Natural & Organic
            </span>
          </div>
        </FadeInView>

        <FadeInView>
          <h1 className="mb-6 text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Pure Nature
            </span>
            <br />
            <span className="text-secondary">In Every Bite</span>
          </h1>
        </FadeInView>
        {/* <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-text bg-clip-text text-transparent">
            Pure Nature
          </span>
          <br />
          <span className="text-secondary">In Every Bite</span>
        </motion.h1> */}

        <FadeInView>
          <p className="text-muted mb-8 text-xl leading-relaxed">
            Experience the authentic taste of tradition with our handcrafted
            pickles, pure honey, and wholesome oats. Sourced directly from
            organic farms.
          </p>
        </FadeInView>
        <NavigationButton title="Shop Now" path="/shop/all" />

        <FadeInView>
          <div className="mt-12 grid grid-cols-3 gap-8">
            {[
              { label: "Happy Customers", value: "50K+" },
              { label: "Products", value: "60+" },
              { label: "Average Rating", value: "4.5/5 " },
            ].map((stat, i) => (
              //
              <ScaleOnHover key={i}>
                <div className="text-primary text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-[#5C5F2E]">{stat.label}</div>
              </ScaleOnHover>
            ))}
          </div>
        </FadeInView>
      </FadeInView>
    </>
  );
}
