import HomeButton from "@/components/HomeButton"
import AuthCheck from "@/components/AuthCheck"
import path from "path"
import fs from "fs/promises"
import "@/app/globals.css"

export default async function Page({ params }) {
  const { slug } = await params

  // 1. Load the last updated date from the JSON file
  let lastUpdated = "unknown date"
  let dateSource = "none"

  try {
    // For production: Load from public folder
    // For development: Use dynamic require
    if (process.env.NODE_ENV === "production") {
      const response = await fetch(`/blog-metadata.json`)
      if (response.ok) {
        const metadata = await response.json()
        lastUpdated = metadata.lastUpdated
        dateSource = "JSON (production)"
      }
    } else {
      // Development fallback - use current date
      lastUpdated = new Date()
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toLowerCase()
      dateSource = "fallback (development)"
    }
  } catch (error) {
    console.error("Failed to load last updated date:", error)
  }

  // 2. Dynamically load the correct interactive post
  const getInteractivePost = () => {
    try {
      return require(`../../posts/interactive/${slug}.js`).default
    } catch (error) {
      console.error("Failed to load post:", error)
      return null
    }
  }

  const InteractiveComponent = getInteractivePost()

  // 3. Handle case where component doesn't exist
  if (!InteractiveComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">post not found</h1>
      </div>
    )
  }

  // 4. Render the post with a consistent layout
  return (
    <AuthCheck>
      <main className="min-h-screen max-w-6xl mx-auto p-4 flex flex-col">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <HomeButton></HomeButton>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-foreground md:ml-2">
                  {slug.replace("-", " ")}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          <h1 className="text-primary text-center italic">
            work in progress; some content will not load. i'll email you when
            this page is ready!
          </h1>
        </div>
        {/* Interactive Component */}
        <div
          className=" border-2 border-[#706A50]/60 rounded-lg p-6 my-4
      flex-1 flex flex-col items-center justify-center shadow-[_0_3px_4px_#000000]"
        >
          <InteractiveComponent />
        </div>

        <div>
          <p className="text-gray-400 text-right italic p-4">
            last updated: {lastUpdated}
          </p>
          <p className="text-gray-400 text-right italic p-4">
            date source: {dateSource}
          </p>
        </div>
      </main>
    </AuthCheck>
  )
}
