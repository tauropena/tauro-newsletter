import AuthCheck from "@/components/AuthCheck"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

export default function Blog() {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/posts")
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
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
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </AuthCheck>
  )
}
