import { readFile } from "fs/promises"
import path from "path"
import HomeButton from "@/components/HomeButton"
import "@/app/globals.css"

export default async function PostPage({ params }) {
  // Try to load as markdown first
  try {
    const filePath = path.join(
      process.cwd(),
      "src/app/blog/posts/standard",
      `${params.slug}.md`
    )
    const content = await readFile(filePath, "utf8")
    // Render your markdown here...
    return (
      <div className="max-w-6xl mx-auto py-4 px-4 flex flex-col min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <HomeButton />
            <li>
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
                  {params.slug.replace("-", " ")}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <pre>{content}</pre>{" "}
        {/* Temporary - replace with proper markdown rendering */}
      </div>
    )
  } catch (err) {
    // If we can't find or load the markdown file
    return (
      <div className="max-w-6xl mx-auto py-4 px-4 flex flex-col min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <HomeButton />
            <li>
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
                  {params.slug.replace("-", " ")}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-4xl text-secondary mb-4">error:</h1>
          <p className="text-lg text-foreground">
            the post "{params.slug}" could not be found or loaded.
          </p>
        </div>
      </div>
    )
  }
}
