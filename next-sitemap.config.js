// next-sitemap.config.js
/**
 * Next-sitemap configuration file.
 * Generates sitemap.xml and robots.txt based on site URLs.
 */
module.exports = {
  siteUrl: "https://mashal.equipment",
  generateRobotsTxt: true, // (optional)
  // optional — default is .next
  outDir: "public",
  // optional change frequency & priority
  changefreq: "daily",
  priority: 0.7,
  // Exclude specific paths if needed
  // exclude: ["/secret", "/admin/*"],
};
