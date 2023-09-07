import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const Blog = () => {
    const [AllBlogs, setAllBLogs] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const [id, setId] = useState('')
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
                                        <button onClick={async () => setId(data?._id)}>Update</button>
                                        <button onClick={() => DeleteBlog(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div>
                     <BlogForm AllBlogs={AllBlogs} id={id}/>
                </div>
        </div>
        </>
    )
}

const BlogForm = ({AllBlogs , id}) => {
    const [blogInput, setBlogInput] = useState({
        title: "",
        content: "",
        image: "",
        author: "",
        tags: [],
        createdAt: "",
        updatedAt: ""
    })
    const [tags , setTags] = useState("")
    const handleBlog = async () => {
        try {
            let res = await axios.post(`https://courseselling.onrender.com/api/v1/blog`, blogInput);
            if(res) {
                console.log(res)
            }
        } catch(err) {
            console.log(err)
        }

    }

    const handleUpdateBlog = async () => {
        try {

            let res =  await axios.put(`https://courseselling.onrender.com/api/v1/updateBlogs/${id}`, blogInput)
            if(res) {
                console.log(res)
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        const updateBlog = AllBlogs?.filter((data) => data?._id === id);
        if(updateBlog) {
            setBlogInput(updateBlog[0])
        }
    },[id])
    return (
        <>
                <input placeholder="content" onChange={(e) => {setBlogInput({...blogInput , content: e.target.value})}} value={blogInput?.content}/>
                <input placeholder="title" onChange={(e) => {setBlogInput({...blogInput , title: e.target.value})}} value={blogInput?.title}/>
                <input placeholder="image" type={'file'} onChange={(e) => {setBlogInput({...blogInput , image: e.target.value})}} value={blogInput?.image}/>
                <input placeholder="author" onChange={(e) => {setBlogInput({...blogInput , author: e.target.value})}} value={blogInput?.author}/>
                <input placeholder="createdAt" type="date" onChange={(e) => {setBlogInput({...blogInput , createdAt: e.target.value})}} value={blogInput?.createdAt}/>
                <input placeholder="updatedAt" type="date" onChange={(e) => {setBlogInput({...blogInput , updatedAt: e.target.value})}} value={blogInput?.updatedAt}/>
                <input placeholder="tags" type="text" onChange={(e) => {setTags(e.target.value)}}/>
                <button onClick={() => setBlogInput({...blogInput , tags: [...blogInput?.tags , tags]})}>Add Tag</button>
                <button onClick={async () => {await handleBlog()} }>Add Course</button> 
                <button onClick={async () => {await handleUpdateBlog()} }>Update Blog</button>


        </>
    )
}
