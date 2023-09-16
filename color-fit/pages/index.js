import Image from "next/image"
import Logo from "./assets/logo.png"

export default function App() {
  return (
    <div>
      {/* First screen, homepage */}
      <Image src={Logo} />
      <h1 className="text-4xl font-bold">Strut your style with the help of ColorFit!</h1>
      <p className="text-sm w-1/4">Our computer vision algorithm detects your skin color and your undertone to help determine what color fabrics would suit you. We also ask for your body type and take the weather into account when we provide suggestions on what clothing you should get. </p>
      <p>Start your style consult now!</p>
      <a href="/cam"><p className="bg-yellow-500 w-1/6 float-right text-center text-2xl">Start</p></a>
    </div>
  )
}