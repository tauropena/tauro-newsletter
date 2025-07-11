import HomeButton from "@/components/HomeButton"
import "@/app/globals.css"

export default function Page({ params }) {
  // 1. Dynamically load the correct interactive post
  const getInteractivePost = () => {
    try {
      // this require path works, but I am not sure why and if it's the best way to do this
      // also unsure how the .default export works here
      return require(`../../posts/interactive/${params.slug}.js`).default
    } catch (error) {
      console.error("Failed to load post:", error)
      return null
    }
  }

  // 2. Get the component for the current slug
  const InteractiveComponent = getInteractivePost()

  // 3. Handle case where component doesn't exist
  if (!InteractiveComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">post not found</h1>
      </div>
    )
  }

  // 4. render the post with a consistent layout
  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 flex flex-col">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <HomeButton></HomeButton>
          <li aria-current="page">
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
                {params.slug.replace("-", " ")}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {/* Interactive Component */}
      <div
        className="border border-[#706A50] rounded-lg p-6 my-4 bg-background shadow-[0_0.25rem_0_0_#706A50]
      flex-1 flex flex-col items-center justify-center"
      >
        <InteractiveComponent />
      </div>
      {/* Post Title */}
      <div>
        {/* <h1 className="text-4xl text-foreground font-bold">amrita's lists</h1> */}
        <p className="text-foreground text-right italic p-4">
          {" "}
          last updated: july 11, 2025
        </p>
      </div>
    </main>
  )
}

// in an ideal world

// flex-1 flex flex-col items-center justify-center
// I need this for when the div widthchanges to anything below 1024 px

// w-full h-auto
//  and I need this for the actual content to take up the full width of the parent container
