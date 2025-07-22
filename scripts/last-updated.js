// scripts/generate-last-updated.js
const fs = require("fs")
const path = require("path")

async function generateLastUpdated() {
  const contentDir = path.join(process.cwd(), "src/app/blog/interactive/[slug]")
  const publicDir = path.join(process.cwd(), "public")
  const outputPath = path.join(publicDir, "blog-metadata.json")

  try {
    // Ensure public directory exists
    await fs.promises.mkdir(publicDir, { recursive: true })

    const stats = await fs.promises.stat(path.join(contentDir, "page.js"))

    const metadata = {
      lastUpdated: stats.mtime
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toLowerCase(),
    }

    await fs.promises.writeFile(outputPath, JSON.stringify(metadata, null, 2))
    console.log("Successfully generated last updated metadata")
  } catch (error) {
    console.error("Error generating last updated metadata:", error)
    process.exit(1)
  }
}

generateLastUpdated()
