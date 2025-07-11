"use client"

import { useState } from "react"
import Bunny from "@/assets/svg/bunny.svg"
import Plant from "@/assets/svg/plant.svg"
import Headphones from "@/assets/svg/headphones.svg"
import Dumbbell from "@/assets/svg/dumbbell.svg"
import Quotes from "@/assets/svg/quotes.svg"
import Popcorn from "@/assets/svg/popcorn.svg"
import Tomatoes from "@/assets/svg/tomatoes.svg"
import Airplane from "@/assets/svg/airplane.svg"
import "@/app/globals.css"

export default function InteractiveScene() {
  const [activeItem, setActiveItem] = useState(null)

  // Content for each popup
  const itemContent = {
    bunny: {
      title: "Best Coco Pictures",
      description: "from 2024 and 2025",
    },
    plant: {
      title: "Lessons Learned",
      description: "throughout 2024 and 2025.",
    },
    headphones: {
      title: "My Favorite Songs",
      description:
        "from 2024 and 2025 (because Spotify wrapped really doesn't get me).",
    },
    dumbbell: {
      title: "Goals",
      description: "for 2024 and 2025.",
    },
    quotes: {
      title: "Quotes",
      description: "that inspired me thoughout 2024 and 2025.",
    },
    popcorn: {
      title: "My Favorite Movies",
      description: "the ultimate list ",
    },
    tomatoes: {
      title: "Favorite Recipes",
      description: "what I ate all 2024 and 2025.",
    },
    airplane: {
      title: "Travel",
      description: "where I went in 2024 and 2025.",
    },
  }

  const handleItemClick = (item) => {
    setActiveItem(item)
  }

  const handleClosePopup = () => {
    setActiveItem(null)
  }

  return (
    <div className="overflow-hidden">
      {/* Position all your objects */}
      <Bunny
        className="absolute bottom-0 left-40 z-10 cursor-pointer
             w-152 h-auto
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("bunny")}
      />
      <Plant
        className="absolute top-30 left-0 z-10 cursor-pointer
             w-144 h-auto rotate-[-90deg]
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("plant")}
      />
      <Headphones
        className="absolute bottom-15 right-85 z-10 cursor-pointer
             w-144 h-auto
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("headphones")}
      />
      <Dumbbell
        className="absolute bottom-30 right-5 z-10 cursor-pointer
             w-144 h-auto rotate-[-90deg]
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("dumbbell")}
      />
      <Quotes
        className="absolute top-30 right-50 z-10 cursor-pointer
             w-64 h-auto
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("quotes")}
      />
      <Popcorn
        className="absolute top-70 left-80 z-11 cursor-pointer
             w-88 h-auto
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("popcorn")}
      />
      <Tomatoes
        className="absolute top-25 left-90 z-10 cursor-pointer
             w-120 h-auto
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("tomatoes")}
      />
      <Airplane
        className="absolute top-25 right-75 z-10 cursor-pointer
             w-136 h-auto
             hover:scale-115 transition-transform transition duration-300"
        onClick={() => handleItemClick("airplane")}
      />

      {/* Popup Modal */}
      {activeItem && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-foreground p-8 rounded-lg max-w-md border border-background relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 
              px-1.5 border border-background rounded-full 
              bg-secondary text-background text-xs
              hover:translate-y-[-0.25rem] hover:shadow-[0_0.25rem_0_0_#CC6378] transition duration-300"
            >
              ✕
            </button>
            <h2 className="text-2xl text-background font-bold mb-2">
              {itemContent[activeItem].title}
            </h2>
            <p className="text-[#3a4631] mb-4">
              {itemContent[activeItem].description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// export default function ListsPost() {
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h2 className="text-2xl">amrita's lists</h2>
//       <h1 className="text-4xl font-bold mb-4">coming soon!</h1>
//       {/* Your interactive content here */}
//     </div>
//   )
// }
// This is a placeholder for the interactive lists post.

//don't just put the interactive lists at the bottom of interactive/[slug]/page.js
//because this is a specific post that needs its own layout and styling
//this structure allows me to drop in any interactive post without havvinf to make a whole new page
