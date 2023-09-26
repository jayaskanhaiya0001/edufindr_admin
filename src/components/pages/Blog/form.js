import { useState } from "react";
import { FileInput } from "../../common/Fields/fileInput";
import { TextEditor } from "../../common/ckEditor";
import "./form.css"
export const BlogForm = ({}) => {
    const [blogInput, setBlogInput] = useState({
        title: "",
        link: "",
        image: "",
        categories: "",
        author: "",
        tags: [],
        content: "",
    })
    const handleInput = (e) => {
        // setBlogInput({ ...blogInput, })
    }
    return (
        <>
            <div className="Form-Container">
                <div className="btn-Box" style={{justifyContent: "flex-start"}}>
                    <button className="Form-Btn">Back To Blog Page</button>
                </div>
                <div className="Form-Input-Box">
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Title</span>
                            <input type="text" name="title" onChange={handleInput} placeholder="Optimizing Your Social Media Channels: Strategies for Better Engagement and Results" />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Link</span>
                            <input type="text" name="link" placeholder="Optimizing Your Social Media" />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <FileInput handleInput={handleInput} />
                        <div className="Input-Field-Box">
                            <span>Categories</span>
                            <input type="" name="" />
                        </div>
                    </div>
                    <div style={{ padding: "0 20px" }}>
                        <TextEditor />
                    </div>

                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Meta Title</span>
                            <input type="text" name="title" onChange={handleInput} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Meta Description</span>
                            <input type="text" name="link" />
                        </div>
                    </div>
                </div>
                <div className="btn-Box">
                    <button className="Form-Btn">Submit</button>
                </div>
            </div>
        </>
    )
}