"use client"

import Link from "next/link"

export default function HomeButton() {
  return (
    <li className="inline-flex items-center">
      <Link
        href="/home"
        className=" bg-secondary rounded-full px-3 py-1 z-12 inline-flex items-center text-background hover:translate-y-[-0.25rem] hover:shadow-[0_0.25rem_0_0_#2F481B] transition duration-300"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="CurrentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
        home
      </Link>
    </li>
  )
}

// this should eventually include all the breadcrumb code so that i can just plug in the span at the end.
// i just don't feel like figuiring it out right now
// for now, this is just a button that links to the home page
