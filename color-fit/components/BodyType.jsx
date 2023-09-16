import React from 'react';

export default function BodyType({ text, image }) {
  return (
    <div className='w-96 h-1/4 bg-brown-300 flex p-12 flex-row justify-center items-center border-4 border-grey-700'>
      <img src={image} alt={text} />
      <p className='text-2xl'>{text}</p>
    </div>
  )
}