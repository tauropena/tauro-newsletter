"use client"

import { useEffect, useState } from "react"

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Mobile detection
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    // Parse headings from DOM after content renders
    const parseHeadingsFromDOM = () => {
      const headingElements = Array.from(
        document.querySelectorAll(".prose h1, .prose h2, .prose h3")
      )

      const headingList = headingElements.map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
      }))

      setHeadings(headingList)
    }

    // Wait for content to render
    const timer = setTimeout(parseHeadingsFromDOM, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [content])

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      // Calculate position accounting for fixed header
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  if (isMobile || headings.length === 0) return null

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 w-60 max-h-[70vh] hidden lg:block">
      <div className="bg-background border border-[#706A5d]/60 rounded-lg p-4 shadow-[_0_2px_4px_#000000]">
        <h3 className="text-sm font-semibold mb-3 text-[#706A5d]">
          scroll to...
        </h3>
        <ul className="space-y-2">
          {headings.slice(1).map((heading, index) => (
            <li key={`${heading.id}-${index}`}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-foreground text-sm hover:text-primary hover:text-base hover:cursor-pointer transition-all duration-300 ${
                  heading.level === "h2"
                    ? "pl-4"
                    : heading.level === "h3"
                    ? "pl-8"
                    : ""
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
