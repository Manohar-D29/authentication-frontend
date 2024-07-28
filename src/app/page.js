import Navbar from "@/components/Navbar"

const Home = () => {
  return (
    <>
      <Navbar />

      <div className=" flex justify-center items-center flex-col gap-4 h-screen space-y-8 bg-[url('/17973908.jpg')] bg-cover">
        <h1 className="text-6xl font-bold text-blue-800">
          -AuthenticatioN-
        </h1>

        <img src="/auth-fingerprint-svgrepo-com.svg" alt="home" className="w-48 h-48" />

        <h2 className="text-2xl font-bold italic ">
          Complete authentication system with typescript, express, mongodb, nextJs, tailwind with passport-jwt and o-auth
        </h2>
      </div>
    </>

  )
}

export default Home