import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState, useRef } from "react";
import { TextEditor } from "../common/ckEditor";
import { FileInput } from "../common/Fields/fileInput";
// import { ChipInput } from "../common/Fields/chipInput";
import { ChipInputs } from "../common/Fields/ChipInputs";
export const Blog = () => {
    const [blogInput, setBlogInput] = useState({
        title: "",
        content: "",
        author: "",
        tags: [],
        metaTitle: "",
        metaDescription: "",
        link: ""
    })
    const [toggle, setToggle] = useState({
        key: null,
        boolVal: false
    })
    const [AllBlogs, setAllBLogs] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const [id, setId] = useState('')

    const handleUpdate = (params) => {
        let obj = AllBlogs.filter((data) => params === data?._id && data);
        if (obj) {
            setBlogInput(obj[0])
        }
    };
    console.log(blogInput, "BLOG INPUT")
    const getBlogsData = async () => {
        try {
            const res = await axios.get(`https://edu-server-side-2023.onrender.com/api/v1/blogs?tag=${""}`)
            console.log(res)
            if (res?.data?.success) {
                setAllBLogs(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
    };
    const handleTags = (val) => {
        setBlogInput((prevState) => ({ ...prevState, tags: [...prevState?.tags, val] }))
    };
    useEffect(() => {
        getBlogsData()
    }, []);
    const DeleteBlog = async (id) => {
        try {
            const res = await axios.delete(`https://edu-server-side-2023.onrender.com/api/v1/DeleteBlog/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const inputHandle = (key) => {
        setBlogInput({
            title: "",
            content: "",
            author: "",
            tags: [],
            metaTitle: "",
            metaDescription: "",
            link: ""
        })
        switch (key) {
            case 'ADD':
                setInputs({ ...inputs, add: true })
                break;
            case 'UPDATE':
                setInputs({ ...inputs, update: true })
                break;
            default:
        }
    };

    return (
        <>

            <div>
                <div className="Grid-Box">
                    <AddItem inputHandle={inputHandle} text={'Add New Blog'} />
                    {
                        AllBlogs?.map((data, index) => {
                            return (
                                <>
                                    <div className="grid-content-cont">
                                        <div onClick={() => setToggle({ key: index, boolVal: !toggle?.boolVal })}>
                                            <span className="kebab-btn" >

                                            </span>
                                            {
                                                (toggle.key === index && toggle.boolVal === true) && (
                                                    <>
                                                        <div className="card-btn-box">
                                                            <button onClick={async () => { handleUpdate(data?._id); setId(data?._id) }}>Update</button>
                                                            <button onClick={() => DeleteBlog(data?._id)}>Delete</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <img style={{ height: "150px", width: "100%" }} src={data?.image ? data?.image : "/images/dummy.png"} alt="teacher" />
                                        <h3>{data?.title.slice(0, 100)}</h3>
                                        <h3>{data?.author}</h3>
                                        <p>{data?.content.slice(0, 150)}</p>

                                    </div>
                                </>
                            )
                        })
                    }
                </div>

                <div>
                    <BlogForm AllBlogs={AllBlogs} id={id} blogInput={blogInput} setBlogInput={setBlogInput} handleTags={handleTags} />
                </div>

            </div>
        </>
    )
}



const BlogForm = ({ AllBlogs, id, setBlogInput, blogInput, handleTags }) => {
    console.log(blogInput, "blogInput....")
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleBlog = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(blogInput));
        try {
            let res = await axios.post(`https://edu-server-side-2023.onrender.com/api/v1/blog`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res) {
                setBlogInput({
                    title: "",
                    content: "",
                    author: "",
                    tags: [],
                    metaTitle: "",
                    metaDescription: "",
                    link: ""
                })
            }
        } catch (err) {
            console.log(err)
        }

    };

    const handleUpdateBlog = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(blogInput));
        try {

            let res = await axios.put(`https://edu-server-side-2023.onrender.com/api/v1/updateBlogs/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (res) {
                setBlogInput({
                    title: "",
                    content: "",
                    author: "",
                    tags: [],
                    metaTitle: "",
                    metaDescription: "",
                    link: ""
                })
            }
        } catch (err) {
            console.log(err)
        }
    };
    const handleTextInput = (val) => {
        setBlogInput({ ...blogInput, content: val })
    };


    const deleteTags = (index) => {
        setBlogInput({ ...blogInput, tags: blogInput?.tags?.filter((data, ind) => index !== ind && data) })
    }
    return (
        <>
            <div className="Form-Container">
                <div className="btn-Box" style={{ justifyContent: "flex-start" }}>
                    <button className="Form-Btn">Back To Blog Page</button>
                </div>
                <div className="Form-Input-Box">
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Title</span>
                            <input placeholder="title" onChange={(e) => { setBlogInput({ ...blogInput, title: e.target.value }) }} value={blogInput?.title} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Link</span>
                            <input type="text" name="link" placeholder="Optimizing Your Social Media" onChange={(e) => { setBlogInput({ ...blogInput, link: e.target.value }) }} value={blogInput?.link} />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <FileInput handleInput={handleFileChange} />
                        <div className="Input-Field-Box">
                            <span>Categories</span>
                            <input type="" name="" />
                        </div>
                    </div>
                    <div style={{ padding: "0 20px" }}>
                        <TextEditor textEditorInput={handleTextInput} />
                    </div>

                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Meta Title</span>
                            <input type="text" value={blogInput?.metaTitle} name="title" onChange={(e) => { setBlogInput({ ...blogInput, metaTitle: e.target.value }) }} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Meta Description</span>
                            <input value={blogInput?.metaDescription} name="title" onChange={(e) => { setBlogInput({ ...blogInput, metaDescription: e.target.value }) }} type="text" />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Author</span>
                            <input placeholder="author" onChange={(e) => { setBlogInput({ ...blogInput, author: e.target.value }) }} value={blogInput?.author} />
                        </div>
                        <ChipInputs items={blogInput?.tags} handleHighlight={handleTags} deletHighlight={deleteTags} />
                    </div>
                </div>
                <div className="btn-Box">
                    <button className="Form-Btn" onClick={id ? handleUpdateBlog : handleBlog}>Submit</button>
                </div>
            </div>

        </>
    )
}


