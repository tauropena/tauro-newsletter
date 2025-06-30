"use client"

// imports
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

// Login component
export default function Login() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const result = await signIn("credentials", {
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Incorrect password. Please try again.")
    } else {
      router.push("/blog")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Who is the prettiest girl in the whole wide world?
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4rounded-md hover:bg-blue-600 transition"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}

/* 
change the button styling to match the mailchimp styling
workshop the text to be more clear and communicative for users
make sure the button works on click and submit (enter key)
add show password functionality 
add error message that says password is caseSensitive 
add loading state 
add picture of coco
*/
