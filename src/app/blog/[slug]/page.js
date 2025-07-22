import { readFile } from "fs/promises"
import AuthCheck from "@/components/AuthCheck"
import path from "path"
import HomeButton from "@/components/HomeButton"
import TableOfContents from "@/components/TableContents"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkSlug from "remark-slug"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import { defaultSchema } from "hast-util-sanitize"
import matter from "gray-matter"
import "@/app/globals.css"

export default async function PostPage({ params }) {
  const { slug } = await params

  try {
    const filePath = path.join(
      process.cwd(),
      "src/app/blog/posts/standard",
      `${slug}.md`
    )
    const fileContents = await readFile(filePath, "utf8")

    // Parse content without front matter for rendering
    const { data: frontmatter, content: markdownContent } = matter(fileContents)

    // Extend the default schema to allow class names on code blocks
    const schema = {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), "className"], // Allow class on code blocks
      },
    }

    // Process complete markdown for rendering
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkSlug)
      .use(remarkRehype)
      .use(rehypeSanitize) // Sanitization happens here
      .use(rehypeStringify)
      .process(markdownContent)

    const contentHtml = processedContent.toString()

    return (
      <AuthCheck>
        <div className="max-w-6xl mx-auto py-4 px-4 flex min-h-screen relative">
          {/* Pass the complete markdown but parse carefully */}
          <TableOfContents content={fileContents} />

          <div className="flex-1">
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
                    <span className="ml-1 text-foreground md:ml-2">
                      {slug.replace(/-/g, " ")}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Rendered markdown (without frontmatter) */}
            <article
              className="max-w-3xl mx-auto py-8
              prose prose-headings:text-foreground 
              prose-p:text-gray-400 
              prose-strong:text-primary 
              prose-blockquote:text-xl
              prose-a:text-white"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </AuthCheck>
    )
  } catch (err) {
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
                  <span className="ml-1 text-foreground md:ml-2">
                    {slug.replace(/-/g, " ")}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-4xl text-secondary mb-4">error:</h1>
            <p className="text-lg text-foreground">
              the post "{slug}" could not be found or loaded.
            </p>
            {/* <p className="text-sm text-muted-foreground mt-2">
//               error details: {err.message}
//          </p> */}
          </div>
        </div>
      </AuthCheck>
    )
  }
}
// import { readFile } from "fs/promises"
// import AuthCheck from "@/components/AuthCheck"
// import path from "path"
// import HomeButton from "@/components/HomeButton"
// import TableOfContents from "@/components/TableContents"
// import { unified } from "unified"
// import remarkParse from "remark-parse"
// import remarkSlug from "remark-slug"
// import remarkHtml from "remark-html"
// import matter from "gray-matter"
// import "@/app/globals.css"
// import sanitizeHtml from "sanitize-html"

// export default async function PostPage({ params }) {
//   const { slug } = await params

//   try {
//     const postsDirectory = path.join(
//       process.cwd(),
//       "src/app/blog/posts/standard"
//     )
//     const filePath = path.join(postsDirectory, `${slug.toLowerCase()}.md`)

//     const fileContents = await readFile(filePath, "utf8")
//     const { data: frontmatter, content: markdownContent } = matter(fileContents)

//     const processedContent = await unified()
//       .use(remarkParse)
//       .use(remarkSlug)
//       .use(remarkHtml)
//       .process(markdownContent)

//     const contentHtml = sanitizeHtml(processedContent.toString(), {
//       allowedTags: sanitizeHtml.defaults.allowedTags.concat([
//         "h1",
//         "h2",
//         "h3",
//         "h4",
//         "h5",
//         "h6",
//         "strong",
//         "em",
//         "blockquote",
//         "ul",
//         "ol",
//         "li",
//         "code",
//         "pre",
//       ]),
//       allowedAttributes: {
//         ...sanitizeHtml.defaults.allowedAttributes,
//         a: ["href", "name", "target", "class"],
//         img: ["src", "alt", "width", "height", "class"],
//         "*": ["class", "id"],
//       },
//     })

//     return (
//       <AuthCheck>
//         <div className="max-w-6xl mx-auto py-4 px-4 flex min-h-screen relative">
//           <TableOfContents content={fileContents} />

//           <div className="flex-1">
//             {/* Breadcrumb Navigation */}
//             <nav
//               className="flex items-center text-sm mb-4"
//               aria-label="Breadcrumb"
//             >
//               <ol className="inline-flex items-center space-x-1 md:space-x-2">
//                 <HomeButton />
//                 <li>
//                   <div className="flex items-center">
//                     <svg
//                       className="w-6 h-6 text-primary"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>
//                     <span className="ml-1 text-foreground md:ml-2">
//                       {slug.replace(/-/g, " ")}
//                     </span>
//                   </div>
//                 </li>
//               </ol>
//             </nav>

//             {/* Rendered markdown (with frontmatter) */}
//             <article
//               className="prose prose-headings:text-foreground prose-p:text-[#706A50] max-w-3xl mx-auto py-8"
//               dangerouslySetInnerHTML={{ __html: contentHtml }}
//             />
//           </div>
//         </div>
//       </AuthCheck>
//     )
//   } catch (err) {
//     return (
//       <AuthCheck>
//         <div className="max-w-6xl mx-auto py-4 px-4 flex flex-col min-h-screen">
//           {/* Breadcrumb Navigation */}
//           <nav
//             className="flex items-center text-sm mb-4"
//             aria-label="Breadcrumb"
//           >
//             <ol className="inline-flex items-center space-x-1 md:space-x-2">
//               <HomeButton />
//               <li>
//                 <div className="flex items-center">
//                   <svg
//                     className="w-6 h-6 text-primary"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   <span className="ml-1 text-foreground md:ml-2">
//                     {slug.replace(/-/g, " ")}
//                   </span>
//                 </div>
//               </li>
//             </ol>
//           </nav>

//           <div className="flex flex-col items-center justify-center flex-1">
//             <h1 className="text-4xl text-secondary mb-4">error:</h1>
//             <p className="text-lg text-foreground">
//               the post "{slug}" could not be found or loaded.
//             </p>
//             {/* <p className="text-sm text-muted-foreground mt-2">
//               error details: {err.message}
//             </p> */}
//           </div>
//         </div>
//       </AuthCheck>
//     )
//   }
// }

// LATER
// Create a link back to safe page for error handling!
