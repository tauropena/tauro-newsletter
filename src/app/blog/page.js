import fs from "fs"
import path from "path"
import Link from "next/link"
import AuthCheck from "@/components/AuthCheck"
import "@/app/globals.css"

export default function BlogIndex() {
  // Path to your markdown posts
  const postsDirectory = path.join(process.cwd(), "src/app/blog/posts/standard")

  try {
    // Read directory contents
    const filenames = fs.readdirSync(postsDirectory)

    // Filter for markdown files only
    const markdownFiles = filenames.filter(
      (file) =>
        file.endsWith(".md") &&
        fs.statSync(path.join(postsDirectory, file)).isFile()
    )

    const posts = markdownFiles.map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")

      // Extract frontmatter
      const titleMatch = fileContents.match(/^title:\s*(.*)$/m)
      const excerptMatch = fileContents.match(/^excerpt:\s*(.*)$/m)

      return {
        slug: filename.replace(".md", ""),
        title: titleMatch ? titleMatch[1] : "Untitled Post",
        excerpt: excerptMatch ? excerptMatch[1] : "",
      }
    })

    return (
      <AuthCheck>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-foreground text-4xl font-bold mb-8">
            all the blog posts ever.
          </h1>
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 border border-gray-500 rounded-lg hover:bg-[#3A3631] transition"
              >
                <h2 className="text-2xl font-semibold mb-2 text-foreground">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </AuthCheck>
    )
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return (
      <AuthCheck>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-8">all the blog posts ever</h1>
          <p className="text-red-500">
            error loading blog posts. please try again later.
          </p>
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

// DO THIS AFTER RELEASING THE APP! NOT IMPORTANT RIGHT NOW!

// I WILL NEED TO WORK ON THE STYLING OF THIS PAGE, kind of match the home page
// H1 should say "all the blog posts ever"
// I want to essentially have a flexbox or whatever the next.js equivalent is
// for now, the flexbox should be 1 row 2 cols. as I add more posts it should expand to 3 cols. after 3 cols, it should start a new row
// each box should have a title and an image
// each box should be clickable and take you to the post page
// each box should have a hover effect that changes makes the background color and gives the box and title text a shadow
// each box should be square and take up as much of the screen as possible
