export default function CampaignPage() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mb-6">
          AI Transformation Initiative 2026
        </h1>

        {/* Subtitle */}
        <p className="text-pumice text-lg mb-10">
          A strategic initiative focused on empowering enterprises through artificial intelligence and automation.
        </p>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-12">
          <img
            src="/campaign-ai.png"
            alt="AI Transformation Initiative"
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-8 text-pumice leading-relaxed">

          <p>
            The AI Transformation Initiative 2025 is designed to help organizations modernize operations,
            improve decision-making, and unlock new revenue streams using AI-powered solutions.
          </p>

          <h2 className="text-snow text-2xl font-semibold">Campaign Goals</h2>
          <ul className="list-disc pl-6">
            <li>Drive enterprise AI adoption</li>
            <li>Automate business operations</li>
            <li>Improve customer experience using smart systems</li>
            <li>Enable data-driven decision making</li>
          </ul>

          <h2 className="text-snow text-2xl font-semibold">Who This Campaign Is For</h2>
          <p>
            Business leaders, startups, technology teams, and organizations looking to scale with intelligent solutions.
          </p>

        </div>

        {/* Status Badge */}
        <div className="mt-16 text-center">
          <span className="px-6 py-3 bg-gold/90 text-background font-semibold rounded-full text-lg">
            🚀 Coming Soon
          </span>
        </div>

      </div>
    </section>
  )
}
