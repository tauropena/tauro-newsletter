import AuthCheck from "@/components/AuthCheck"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

export default function Blog() {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/posts")

  try {
    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames.map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)
      return {
        slug: filename.replace(".md", ""),
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
      }
    })

    return (
      <AuthCheck>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-8">This is my H1</h1>
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </AuthCheck>
    )
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return <div>Error loading blog posts.</div>
  }
}

// This code is a Next.js page that displays a list of blog posts.
// It uses the `fs` module to read markdown files from a specific directory,
// extracts metadata using `gray-matter`, and renders the posts as links.
// The `AuthCheck` component ensures that the user is authenticated before accessing the blog.
// The posts are displayed in a grid layout with titles and excerpts.
// The `Link` component from Next.js is used to navigate to individual blog post pages.
// The page is styled with Tailwind CSS classes for a clean and responsive design.

// make sure you can't bypass the password by going to the blog page directly by typing in /blog

// I WILL NEED TO WORK ON THE STYLING OF THIS PAGE, kind of match the home page
// H1 should say "all the blog posts ever"
// I want to essentially have a flexbox or whatever the next.js equivalent is
// for now, the flexbox should be 1 row 2 cols. as I add more posts it should expand to 3 cols. after 3 cols, it should start a new row
// each box should have a title and an image
// each box should be clickable and take you to the post page
// each box should have a hover effect that changes makes the background color and gives the box and title text a shadow
// each box should be square and take up as much of the screen as possible
