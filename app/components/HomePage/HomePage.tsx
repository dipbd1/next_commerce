"use client";
// imported server actions
import { signIn, signOut, useSession } from "next-auth/react";


const handleSubmit = async (event: React.SyntheticEvent) => {

  event.preventDefault();

  const target = event.target as typeof event.target & {
    0: { value: string };
    1: { value: string };
  };

  const username = target[0].value;
  const password = target[1].value;

  const result = await signIn("credentials", {
    username,
    password,
    redirect: false,
    callbackUrl: "/",
  })

  if (result.error) {
    alert(result.error)
    return
  }
};


function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    // console.log("session", session)

    return (
      <div>
        <div
          className="bg-gray-800 bg-opacity-50 px-16 py-10 backdrop-blur-md w-56"
        >
          Logged in as {session.user.email}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") return <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
    //  style="background-image:url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8" +
        "fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')"
    }}
  >
    <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <div className="text-white">
        <div className="mb-8 flex flex-col items-center">
          {/* <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt="" /> */}
          <h1 className="mb-2 text-2xl">Instagram</h1>
          <span className="text-gray-300">Enter Login Details</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-lg">
            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="text"
              name="name"
              placeholder="id@email.com"
              //  validation
              required
              minLength={3}
              maxLength={20}
            />
          </div>

          <div className="mb-4 text-lg">
            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="Password"
              name="password"
              placeholder="*********"
              //  validation
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="mt-8 flex justify-center text-lg text-black">
            <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}

export default HomePage;