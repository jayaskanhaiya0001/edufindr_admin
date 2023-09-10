import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const Blog = () => {
    const [blogInput, setBlogInput] = useState({
        title: "",
        content: "",
        author: "",
        tags: [],
    })
    const [AllBlogs, setAllBLogs] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const [id, setId] = useState('')
    const getBlogsData = async () => {
        try {
            const res = await axios.get(`https://courseselling.onrender.com/api/v1/blogs?tag=${""}`)
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
        setBlogInput({
            title: "",
            content: "",
            author: "",
            tags: [],
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
                                        <img style={{height:"150px", width:"209px"}} src={data?.image ? data?.image : "/images/dummy.png"} alt="teacher" />
                                        <h3>{data?.title.slice(0,100)}</h3>
                                        <h3>{data?.author}</h3>
                                        <p>{data?.content.slice(0,150)}</p>
                                        <button onClick={async () => setId(data?._id)}>Update</button>
                                        <button onClick={() => DeleteBlog(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div>
                     <BlogForm AllBlogs={AllBlogs} id={id} blogInput={blogInput} setBlogInput={setBlogInput}/>
                </div>
        </div>
        </>
    )
}

const BlogForm = ({AllBlogs , id,setBlogInput,blogInput}) => {
    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    const [tags , setTags] = useState("")
    const handleBlog = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(blogInput));
        try {
            let res = await axios.post(`http://localhost:4000/api/v1/blog`, formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            if(res) {
                console.log(res)
                setBlogInput({
                    title: "",
                    content: "",
                    author: "",
                    tags: [],
                })
            }
        } catch(err) {
            console.log(err)
        }

    }

    const handleUpdateBlog = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(blogInput));
        try {

            let res =  await axios.put(`http://localhost:4000/api/v1/updateBlogs/${id}`, formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
            if(res) {
                console.log(res)
                setBlogInput({
                    title: "",
                    content: "",
                    author: "",
                    tags: [],
                })
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
        {console.log(blogInput,"hello")}
                <input placeholder="content" onChange={(e) => {setBlogInput({...blogInput , content: e.target.value})}} value={blogInput?.content}/>
                <input placeholder="title" onChange={(e) => {setBlogInput({...blogInput , title: e.target.value})}} value={blogInput?.title}/>
                <input placeholder="author" onChange={(e) => {setBlogInput({...blogInput , author: e.target.value})}} value={blogInput?.author}/>
                <input placeholder="tags" type="text" onChange={(e) => {setTags(e.target.value)}}/>
                <button onClick={() => {setBlogInput({...blogInput , tags: [ tags]})}}>Add Tag</button>
                {
                    blogInput?.tags?.map((item,index)=>{
                        return <div>
                            <p>{item}</p>
                                        
                                        <button onClick={() => { setBlogInput({ ...blogInput, tags: blogInput?.tags?.filter((data, ind) => index !== ind && data) }) }}>Delete</button>
                        </div>
                    })
                }
                 <div> Image Upload<div><input type="file" name="file" onChange={handleFileChange} /></div></div>
                <button onClick={async () => {await handleBlog()} }>Add Course</button> 
                <button onClick={async () => {await handleUpdateBlog()} }>Update Blog</button>
               

        </>
    )
}
