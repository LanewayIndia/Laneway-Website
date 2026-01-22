export default function DigitalMarketingExcellencePage() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mb-6">
          Digital Marketing Excellence
        </h1>

        {/* Subtitle */}
        <p className="text-pumice text-lg mb-10">
          A results-driven campaign focused on elevating brand presence, driving conversions, and maximizing digital performance.
        </p>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-12">
          <img
            src="/DMEMC.png"
            alt="Digital Marketing Excellence"
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-8 text-pumice leading-relaxed">

          <p>
            The Digital Marketing Excellence campaign equips businesses with modern marketing strategies,
            data-driven insights, automation tools, and creative campaigns to maximize online reach.
          </p>

          <h2 className="text-snow text-2xl font-semibold">Campaign Focus Areas</h2>
          <ul className="list-disc pl-6">
            <li>Performance marketing & paid advertising</li>
            <li>SEO, content strategy, and organic growth</li>
            <li>Social media branding & engagement</li>
            <li>Marketing automation and analytics</li>
          </ul>

          <h2 className="text-snow text-2xl font-semibold">Who This Is For</h2>
          <p>
            Brands, startups, ecommerce businesses, creators, and marketing teams aiming to scale digital growth effectively.
          </p>

        </div>

        {/* Status Badge */}
        <div className="mt-16 text-center">
          <span className="px-6 py-3 bg-gold/90 text-background font-semibold rounded-full text-lg">
            🚀 Ongoing Campaign
          </span>
        </div>

      </div>
    </section>
  )
}
