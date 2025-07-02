"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthCheck from "@/components/AuthCheck"

export default function HomePage() {
  return (
    <AuthCheck>
      <div className="min-h-screen p-4 md:p-0">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 md:gap-0 md:h-screen">
          <GridSquare
            title="amrita's lists"
            href="/blog/interactive/lists"
            color="bg-[#26211D] hover:bg-[#ef7386]"
          />
          <GridSquare
            title="monthly highlights"
            href="/blog/standard/latest"
            color="bg-[#26211D] hover:bg-[#ef7386]"
          />
          <GridSquare
            title="archives"
            href="/blog"
            color="bg-[#26211D] hover:bg-[#ef7386]"
          />
        </div>
      </div>
    </AuthCheck>
  )
}

function GridSquare({ title, href, color }) {
  return (
    <Link href={href}>
      <div
        className={`${color} min-h-[calc(100vh/3)] h-full md:h-full flex flex-col items-start justify-center border border-[#706A5D] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:z-10 relative p-6 group`}
      >
        <h2 className="text-2xl font-bold text-[#DCD6C6] group-hover:text-3xl group-hover:[text-shadow:_0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">
          {title}
        </h2>
      </div>
    </Link>
  )
}

// LATER
// hover to discover? black text is hidden until hover
// add text animations
// possible images to square backgrounds or text takes up the whole square in a cool way
// see deepseek potential issues to improve UI
