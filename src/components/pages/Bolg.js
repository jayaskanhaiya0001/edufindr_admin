import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const Blog = () => {
    const [AllBlogs, setAllBLogs] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const getBlogsData = async () => {
        try {
            const res = await axios.get('https://courseselling.onrender.com/api/v1/blogs?tag=technology')
            console.log(res)
            if (res?.data?.success) {
                setAllBLogs(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getBlogsData()
    }, []);
    const DeleteBlog = async (id) => {
        try {
            const res = await axios.delete(`https://courseselling.onrender.com/api/v1/DeleteBlog/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const inputHandle = (key) => {
        switch (key) {
            case 'ADD':
                setInputs({ ...inputs, add: true })
                break;
            case 'UPDATE':
                setInputs({ ...inputs, update: true })
                break;
            default:
        }
    }
    return (
        <>
        
        <div>
            <AddItem inputHandle={inputHandle}/>
            <div className="Grid-Box">
                    {
                        AllBlogs?.map((data, index) => {
                            return (
                                <>
                                    <div>
                                        <img src={data?.img ? data?.img : "/images/dummy.png"} alt="teacher" />
                                        <h1>{data?.title}</h1>
                                        <h3>{data?.author}</h3>
                                        <p>{data?.content}</p>
                                        <button>Update</button>
                                        <button onClick={() => DeleteBlog(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div>
                    {inputs?.add && <BlogForm/>}
                </div>
        </div>
        </>
    )
}

const BlogForm = () => {
    const [blogInput, setBlogInput] = useState({
        title: "",
        content: "",
        image: "",
        author: "",
        tags: ["technology", "coding", "web development"],
        createdAt: "2023-08-17T12:00:00.000Z",
        updatedAt: "2023-08-17T14:30:00.000Z"
    })
    const addBlog = async () => {
        try {
            let res = await axios.post('https://courseselling.onrender.com/api/v1/blog',blogInput)
            if(res) {
                console.log(res)
            }
        } catch(err) {
            console.log(err)
        }

    }
    return (
        <>
                <input placeholder="content" onChange={(e) => {setBlogInput({...blogInput , content: e.target.value})}}/>
                <input placeholder="title" onChange={(e) => {setBlogInput({...blogInput , title: e.target.value})}}/>
                <input placeholder="image" type={'file'} onChange={(e) => {setBlogInput({...blogInput , image: e.target.value})}}/>
                <input placeholder="author" onChange={(e) => {setBlogInput({...blogInput , author: e.target.value})}}/>
                <input placeholder="createdAt" type="date" onChange={(e) => {setBlogInput({...blogInput , createdAt: e.target.value})}}/>
                <input placeholder="updatedAt" type="date" onChange={(e) => {setBlogInput({...blogInput , updatedAt: e.target.value})}}/>
                <button onClick={async () => {await addBlog()} }>Add Course</button>

        </>
    )
}
