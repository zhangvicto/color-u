import React from 'react';
import Image from 'next/image'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
})

export default function BodyType({ text, image }) {
  return (
    <div className='w-48 w-1/5 h-1/4 bg-brown-300 flex flex-col p-6 m-2 justify-center items-center border-2 rounded-lg'>
      <Image src={image} alt={text} height={250}/>
      <p className={`${poppins.className} text-xl font-mono p-4`}>{text}</p>
    </div>
  )
}