import { readFile } from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"

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
    return <div>{content}</div>
  } catch (err) {
    // If not markdown, try interactive component
    try {
      const Component =
        require(`@/app/blog/posts/interactive/${params.slug}`).default
      return <Component />
    } catch (e) {
      return notFound()
    }
  }
}
