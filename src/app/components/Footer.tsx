export default function Footer() {
  const links = [
    { label: "FAQ", href: "" },
    { label: "Terms & Conditions", href: "" },
    { label: "Shipping Policy", href: "" },
    { label: "Our Mission", href: "about-us/#OurMission" },
    { label: "Our Story", href: "about-us/#Ourstory" },
  ];

  return (
    <footer className=" mt-25 w-full  bg-zinc-900 px-4 py-12 text-zinc-100   sm:py-14  md:py-16   lg:py-15">
      <div className="mx-auto w-full max-w-7xl">
        {/* Brand */}
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="font-serif text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Verdea
          </h2>
        </div>

        {/* Navigation */}
        <nav className="mb-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-xs text-zinc-400 sm:gap-x-6 sm:text-sm md:mb-16 md:gap-x-8">
          {links.map((link, index) => (
            <div key={link.label} className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-8">
              <a
                href={link.href}
                className="whitespace-nowrap transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>

              {index < links.length - 1 && (
                <span className="hidden h-4 w-px bg-zinc-700 sm:block" />
              )}
            </div>
          ))}
        </nav>

        {/* Contact */}
        <section className="mb-14 text-center md:mb-16">
          <h3 className="font-serif text-xl sm:text-2xl">
            Contact Us
          </h3>

          <div className="mx-auto my-4 h-px w-10 bg-zinc-600 sm:my-5 sm:w-12" />

          <div className="space-y-3 text-xs text-zinc-400 sm:text-sm">
            <p className="mx-auto max-w-xs leading-relaxed sm:max-w-none">
              Mashhad, Dandanpezeshkan St. 16
            </p>

            <a
              href="tel:09055814481"
              className="inline-block transition-colors duration-200 hover:text-white"
            >
              09055814481
            </a>
          </div>
        </section>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-5 sm:pt-6">
          <p className="text-center text-[10px] tracking-wide text-zinc-500 sm:text-xs">
            © {new Date().getFullYear()} Verdea Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}