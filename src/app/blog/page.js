import fs from "fs"
import path from "path"
import Link from "next/link"
import AuthCheck from "@/components/AuthCheck"
import "@/app/globals.css"
import HomeButton from "@/components/HomeButton"

export default function BlogIndex() {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/posts/standard")

  try {
    const filenames = fs.readdirSync(postsDirectory)
    const markdownFiles = filenames.filter(
      (file) =>
        file.endsWith(".md") &&
        fs.statSync(path.join(postsDirectory, file)).isFile()
    )

    const posts = markdownFiles.map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const titleMatch = fileContents.match(/^title:\s*(.*)$/m)
      const excerptMatch = fileContents.match(/^excerpt:\s*(.*)$/m)

      return {
        slug: filename.replace(".md", ""),
        title: titleMatch ? titleMatch[1] : "untitled post",
        // excerpt: excerptMatch ? excerptMatch[1] : "",
      }
    })

    return (
      <AuthCheck>
        <div className="max-w-6xl mx-auto py-4 px-4 flex flex-col min-h-screen">
          {/* Breadcrumb Navigation */}
          <nav
            className="flex items-center text-sm mb-4"
            aria-label="Breadcrumb"
          >
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
                  <span className="ml-1 text-foreground md:ml-2">archives</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center">
            <div className="max-w-4xl w-full">
              <h1 className="text-foreground text-4xl font-bold mb-2 mb-4">
                all the newsletters ever.
              </h1>
              <div className="grid gap-8 pb-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-background border border-[#706A5d]/60 rounded-lg p-4 shadow-[_0_2px_4px_#000000] 
                    hover:bg-secondary transition duration-300"
                  >
                    <h2
                      className="text-2xl font-semibold mb-2 text-foreground 
                      hover:text-3xl hover:[text-shadow:_0_0.25rem_0_#706A5D] transition-all duration-300"
                    >
                      {post.title}
                    </h2>
                    {/* <p className="text-gray-400">{post.excerpt}</p> */}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    )
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return (
      <AuthCheck>
        <div className="max-w-6xl mx-auto py-4 px-4 flex flex-col min-h-screen">
          {/* Breadcrumb (same as above) */}
          <nav
            className="flex items-center text-sm py-4"
            aria-label="Breadcrumb"
          >
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
                  <span className="ml-1 text-foreground md:ml-2">Blog</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Error Message */}
          <div className="flex-1 flex flex-col items-center">
            <div className="max-w-4xl w-full">
              <h1 className="text-4xl text-foreground font-bold mb-8">
                all the newsletters ever
              </h1>
              <p className="text-secondary">
                error loading posts. please try again later.
              </p>
            </div>
          </div>
        </div>
      </AuthCheck>
    )
  }
}

// This code is a Next.js page that displays a list of blog posts.
// It uses the `fs` module to read markdown files from a specific directory,
// The `AuthCheck` component ensures that the user is authenticated before accessing the blog.
// The posts are displayed in a grid layout with titles and excerpts.
// The `Link` component from Next.js is used to navigate to individual blog post pages.

// QUICK FIXES
// add the date to each post's box.

// DO THIS AFTER RELEASING THE APP! NOT IMPORTANT RIGHT NOW!

// I WILL NEED TO WORK ON THE STYLING OF THIS PAGE, kind of match the home page
// H1 should say "all the blog posts ever"
// I want to essentially have a flexbox or whatever the next.js equivalent is
// for now, the flexbox should be 1 row 2 cols. as I add more posts it should expand to 3 cols. after 3 cols, it should start a new row
// each box should have a title and an image
// each box should be clickable and take you to the post page
// each box should have a hover effect that changes makes the background color and gives the box and title text a shadow (exactly like the home page)
// each box should be square and take up as much of the screen as possible
