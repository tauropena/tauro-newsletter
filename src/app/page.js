"use client"
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  const handleLoginRedirect = () => {
    router.push("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className=" text-gray-400 mb-4">are you lost?</h1>
      <button
        onClick={() => router.push("/login")}
        className="px-6 text-2xl bg-foreground text-background py-2 rounded-full border-2 border-background 
        hover:translate-y-[-0.25rem] hover:shadow-[0_0.25rem_0_0_#C8C2B2] transition duration-300"
      >
        look here!
      </button>
    </div>
  )
}
