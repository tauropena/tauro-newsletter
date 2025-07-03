// "use client"
// import { use } from "react"
// import dynamic from "next/dynamic"
// import AuthCheck from "@/components/AuthCheck"
// import { notFound } from "next/navigation"

// async function getParams() {
//   // In Server Components, params is automatically passed
//   return import("./lists").then((m) => m.lists)
// }

// export default function InteractivePostPage({ lists }) {
//   // For Client Components, unwrap the promise
//   const { slug } = use(Promise.resolve(lists))

//   const PostComponent = dynamic(
//     () => import(`@/app/blog/posts/interactive/${slug}.js`),
//     {
//       loading: () => (
//         <div className="text-primary">Loading interactive content...</div>
//       ),
//       ssr: false,
//     }
//   )

//   try {
//     return (
//       <AuthCheck>
//         <div className="bg-background text-text min-h-screen p-6">
//           <PostComponent />
//         </div>
//       </AuthCheck>
//     )
//   } catch (error) {
//     console.error("Error loading post:", error)
//     return notFound()
//   }
// }
