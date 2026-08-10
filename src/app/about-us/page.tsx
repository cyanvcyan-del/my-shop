import { AccordionDemo } from "../features/Accordion";

export default function about() {
  return (
    <div className="min-h-screen bg-mainP-500">
      <section className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mainblack">
            About Verdea
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-mainblack sm:text-5xl">
            Healthy Food, Without Compromising on Taste
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-mainblack">
            At Verdea, we believe healthy eating should be delicious,
            satisfying, and simple enough to become part of everyday life.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div id="Ourstory" className="rounded-3xl bg-mainT p-8  shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Our Story
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-gray-600">
              <p>
                Verdea was created with a simple idea: eating healthy should
                never mean sacrificing flavor. We bring together delicious
                recipes, quality ingredients, and balanced nutrition to create
                meals that make healthy choices easier.
              </p>

              <p>
                Our meals are thoughtfully prepared for people with different
                nutritional goals and lifestyles. Whether you are working
                towards healthy weight management, looking for balanced meals,
                watching your blood sugar or cholesterol intake, or simply
                looking for nutritious everyday food, Verdea gives you more
                convenient choices.
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-mainT p-7 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mainP-500 text-xl">
                🥗
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Balanced Nutrition
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                We focus on balanced meals made with thoughtfully selected
                ingredients and portions to support a healthier everyday
                lifestyle.
              </p>
            </div>

            <div className="rounded-3xl bg-mainT p-7 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mainP-500 text-xl">
                💪
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Protein-Focused Options
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Our menu includes protein-rich meals for people who want to
                increase their protein intake as part of a balanced diet.
              </p>
            </div>

            <div className="rounded-3xl  bg-mainT p-7 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mainP-500 text-xl">
                ❤️
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Food With a Purpose
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                From weight-conscious choices to nutritious meals for
                different dietary needs, we aim to make better food choices
                more convenient and enjoyable.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div id="OurMission" className="rounded-3xl bg-mainblack p-8 text-white sm:p-10">
            <h2 className="mb-4 text-2xl font-bold">
              Our Mission
            </h2>

            <p className="max-w-3xl text-sm leading-7 text-white sm:text-base">
              Our mission is to make healthy food accessible, enjoyable, and
              convenient. We want every Verdea meal to feel like a meal you
              genuinely look forward to eating, while helping you make choices
              that fit your nutritional goals.
            </p>
          </div>

          {/* Important Note */}
          <div className="rounded-2xl shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)]  bg-mainT p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              A Note About Your Health
            </h2>

            <p className="text-sm leading-6 text-gray-600">
              Verdea meals are designed to support healthy eating and different
              nutritional goals, but they are not intended to diagnose, treat,
              or cure any medical condition. If you have diabetes, high
              cholesterol, a medical condition, or specific dietary
              requirements, we recommend consulting a qualified healthcare
              professional before making significant changes to your diet.
            </p>
          </div>
        </div>
        <h1 id="FAQ" className="text-mainP-500 select-none">FAQ</h1>
        <AccordionDemo/>
      </section>
    </div>
  );
}