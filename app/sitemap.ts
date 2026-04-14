import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://laneway.in"

  // Base routes
  const routes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/our-projects",
    "/blogs",
    "/careers",
    "/laneway-open-house",
    "/privacy",
    "/terms",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Blog posts
  const blogPosts = [
    "/blogs/ai-adoption-smbs",
    "/blogs/ai-business-operations",
    "/blogs/ai-powered-application",
    "/blogs/budget-smart-businesses",
    "/blogs/marketing-trends-2026",
    "/blogs/scalable-mvps",
    "/blogs/startup-funding-masterclass",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Projects
  const projects = [
    "/our-projects/7zeromedia",
    "/our-projects/currice",
    "/our-projects/samyam",
    "/our-projects/vayo",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Campaigns
  const campaigns = [
    "/campaigns/ai-transformation-initiative",
    "/campaigns/digital-marketing-excellence",
    "/campaigns/startup-accelerator",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...blogPosts, ...projects, ...campaigns]
}
