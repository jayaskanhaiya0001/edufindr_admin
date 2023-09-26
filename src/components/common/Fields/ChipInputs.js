import { useState } from "react";
import "./index.css";
export const ChipInputs = ({ label , items , handleHighlight , deletHighlight}) => {
    // const [items, setItems] = useState([])
    const [highlight, setHighLight] = useState("")
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            // setItems((prevState) => [...prevState, highlight])
            handleHighlight(highlight)
            setHighLight("")
        }
    };
    const handleDelete = (index) => {
        deletHighlight(index)
        // setItems((prevItems) => prevItems?.filter((data, ind) => ind !== index && data))
    };
    return (
        <>
            <div className="Input-Field-Box">
                <span>{label ? label : "Label"}</span>
                <div className="Chip-Main-Container">
                    {items?.map((data, index) => {
                        return (
                            <>
                                <div className="rounded-item">
                                    <span>{data}</span>
                                    <button onClick={() => handleDelete(index)} className="cross-btn">X</button>
                                </div>
                            </>
                        )
                    })}
                    <input value={highlight} onChange={(e) => setHighLight(e.target.value)} onKeyDown={handleEnter} className="Chip-Main-Input" />
                </div>
            </div>

        </>
    )
}