import React, { useState } from "react";
import './tailwind.css'

function App() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
    return (
        <div className="App">
                <h1 className="text-3xl font-bold underline">Upload an image:</h1>
            <input type="file" onChange={handleChange} />
            <img 
            alt="not found"
            width={"250"}
            src={file} />
 
        </div>
 
    );
}
 
export default App;
