export default function StartupGrowthAcceleratorPage() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mb-6">
          Startup Growth Accelerator
        </h1>

        {/* Subtitle */}
        <p className="text-pumice text-lg mb-10">
          A high-impact program designed to help startups scale faster, raise capital, and achieve sustainable growth.
        </p>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-12">
          <img
            src="/SGA.png"
            alt="Startup Growth Accelerator"
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-8 text-pumice leading-relaxed">

          <p>
            The Startup Growth Accelerator empowers early-stage and growth-stage startups with mentorship, funding insights,
            go-to-market strategies, and access to industry-leading experts.
          </p>

          <h2 className="text-snow text-2xl font-semibold">Campaign Objectives</h2>
          <ul className="list-disc pl-6">
            <li>Help startups scale operations efficiently</li>
            <li>Provide mentorship from experienced founders and investors</li>
            <li>Improve product-market fit and traction</li>
            <li>Support fundraising and investor readiness</li>
          </ul>

          <h2 className="text-snow text-2xl font-semibold">Who Should Join</h2>
          <p>
            Startup founders, early-stage teams, entrepreneurs, and innovators looking to accelerate product growth and market expansion.
          </p>

        </div>

        {/* Status Badge */}
        <div className="mt-16 text-center">
          <span className="px-6 py-3 bg-gold/90 text-background font-semibold rounded-full text-lg">
            🔥 Ongoing Campaign
          </span>
        </div>

      </div>
    </section>
  )
}
