import { signIn } from "@/app/api/auth/[...nextauth]/route"
//what is the @ sign for?

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Who is the prettiest girl in the whole wide world?
        </h1>
        <button
          onClick={() => signIn("credentials", { password: "" })}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Enter
        </button>
      </div>
    </div>
  )
}

// change the button styling to match the mailchimp styling
// workshop the text to be more clear and communicative for users
// make sure the button works on click and submit (enter key)
