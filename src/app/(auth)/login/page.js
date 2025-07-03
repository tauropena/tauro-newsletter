"use client"

// imports
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

// Login component
export default function Login() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        password,
        redirect: false,
        callbackUrl: "/home",
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (err) {
      setError("an unexpected error occurred. please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#26211D]">
      <div className="p-8 rounded w-96">
        <h1 className="text-2xl text-[#DCD6c6] font-bold mb-6 text-left">
          who is the prettiest girl in the whole wide world?
        </h1>

        {error && (
          <div className="mb-4 p-2 text-[#EF738C] rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-white px-3 py-2 border border-[#FCDC59] bg-[#3A3631] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-auto px-6 bg-[#DCD6C6] text-[#26211D] py-2 px-4 rounded-full border-2 border-[#26211D] 
                hover:translate-y-[-0.25rem] hover:shadow-[0_0.25rem_0_0_#C8C2B2] transition" ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  {/* <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg> */}
                  prepare to enter...
                </span>
              ) : (
                "sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* 
workshop the text to be more clear and communicative for users
add picture of coco
show and hide to eye shut and eye open
*/
