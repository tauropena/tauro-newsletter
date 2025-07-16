"use client"

import { useEffect, useState } from "react"

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    // Extract headings from markdown content
    const extractHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll("h2, h3"))

      const headingList = headingElements.map((heading) => ({
        id: heading.id,
        text: heading.innerText,
        level: heading.tagName.toLowerCase(),
        element: heading,
      }))

      setHeadings(headingList)
    }

    // Wait for content to render
    const timer = setTimeout(extractHeadings, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [content])

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  if (isMobile || headings.length === 0) return null

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 w-56 max-h-[70vh] overflow-y-auto hidden lg:block">
      <div className="bg-background/90 border border-gray-700 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-sm font-semibold mb-3 text-primary">Contents</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-sm hover:text-secondary transition-colors ${
                  heading.level === "h3" ? "pl-4" : ""
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
