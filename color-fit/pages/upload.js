import React, { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState();
    function handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile(e.target.files[0]);
            }
        }
    
    function handleRemove() {
        setFile(null);
    }
    }
 
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Upload an image:</h1>
            <input type="file" onChange={handleChange} />
            <img 
            alt="invalid file type"
            width={"250"}
            src={file} />
 
        </div>
 
    );
}