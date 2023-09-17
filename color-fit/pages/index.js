import Image from "next/image";
import Logo from "./assets/logo.png";

export default function App() {
  return (
    <div>
      <div className='text-center text-4xl font-bold text-[#d9dede] bg-[#494A43] p-12'>
        Strut your style with the help of ColorFit!
      </div>

      <div className="flex flex-col md:flex-row items-start w-full p-8">
        <div className="w-1/4 ml-40 mt-5">
          <Image src={Logo} alt="Logo" width={600} height={600} />
        </div>

        <div className="w-1/2 p-8">
          <p className="text-center text-2xl ml-26 mt-10 pl-14">
            Our computer vision algorithm detects your skin color and undertone 
            to help determine what color fabrics would suit you best. We also 
            take your body type into account when we provide suggestion on 
            what clothing you should get.
          </p>
          <p className="text-center italic font-bold text-2xl mt-20 mb-9 pl-14">
            Start your style consult now!
          </p>
          <a href="/cam">
            <p className="fixed bottom-2 left-0 right-0 p-4 flex justify-between">
              <button className="startbutton px-8 py-2 mr-10 bg-[#efdcd0] text-[#684032] border-2 border-[#684032] rounded-2xl hover:bg-[#684032] hover:text-[#efdcd0] focus:outline-none focus:ring focus:ring-[#edeeef] mx-auto font-medium">
                Start
              </button>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
