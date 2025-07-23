"use client"

import { useRouter } from "next/navigation"
import Head from "next/head"

export default function Home() {
  const router = useRouter()
  const handleLoginRedirect = () => {
    router.push("/login")
  }

  return (
    <>
      <Head>
        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f194f459e5195f688bebd9c64/0d11c910d3ec9fb2ac0a5b153.js");`,
          }}
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className=" text-gray-400 mb-4">are you lost?</h1>
        <button
          onClick={() => router.push("/login")}
          className="cursor-pointer px-6 text-2xl bg-foreground text-background py-2 rounded-full border-2 border-background 
        hover:translate-y-[-0.25rem] hover:shadow-[0_0.25rem_0_0_#C8C2B2] transition duration-300"
        >
          click here
        </button>
      </div>
    </>
  )
}
