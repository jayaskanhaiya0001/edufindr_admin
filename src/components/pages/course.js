import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const Course = () => {
    const [AllCourses, setAllCourses] = useState([]);
    const [teachers, setTeachers] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const getCoursessData = async () => {
        try {
            const res = await axios.get('https://courseselling.onrender.com/api/v1/getAllcourses')
            if (res?.data?.courses.length > 0) {
                setAllCourses(res?.data?.courses)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const getTeachersData = async () => {
        try {
            const res = await axios.get('https://courseselling.onrender.com/api/v1/getAllTeachers')
            console.log(res)
            if (res?.data?.success) {
                setTeachers(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const DeleteCourse = async (id) => {
        try {
            const res = await axios.delete(`https://courseselling.onrender.com/api/v1/deleteCourse/${id}`)
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
    useEffect(() => {
        getCoursessData()
        getTeachersData()
    }, []);
    return (
        <>

            <div>
                <AddItem inputHandle={inputHandle} />
                <div className="Grid-Box">
                    {
                        AllCourses?.map((data, index) => {
                            return (
                                <>
                                    <div>
                                        {/* <img src={data?.img} alt="teacher" /> */}
                                        <h1>{data?.title}</h1>
                                        <h3>{data?.Exam}</h3>
                                        <p>{data?.about}</p>
                                        <button>Update</button>
                                        <button onClick={() => DeleteCourse(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                
                    <CourseForm teachers={teachers} />
                
            </div>
        </>
    )
}


const CourseForm = ({ teachers }) => {
    const [courseInput, setCourseInput] = useState({
        image:"",
        mentorNames: [
            {
                _id: "",
                name: ""
            }
        ],
        courseDuration: "",
        title: "",
        alreadyEnrolled: 0,
        price: 0,
        rating: 0,
        batchStarting: "",
        institute: "",
        language: "",
        about: "",
        highlights: [
            
        ],
        enrollmentEndDate: "2023-08-15",
        days: [
            {
                day: "Monday"
            },
            {
                day: "Tuesday"
            },
            {
                day: "Wednesday"
            }
        ],
        batches: [
            {
                description: ""
            },
            {
                description: ""
            }
        ],
        features: [
            {
                description: ""
            },
            {
                description: ""
            }
        ],
        category: "",
        Exam: ""
    })
    const getTeacherIdHandle = (id) => {
        let [{name, _id}]  =  teachers?.filter((data) => data?._id === id && data);
        setCourseInput({ ...courseInput, mentorNames: [{_id: _id , name: name}] })
    }
    const addCourse = async () => {
        try {
            let res = await axios.post('https://courseselling.onrender.com/api/v1/createCourse',courseInput)
            if(res) {
                console.log(res)
            }
        } catch(err) {
            console.log(err)
        }

    }
    return (
        <>
      
                <select onChange={(e) => {getTeacherIdHandle(e.target.value);}}>
                    {teachers?.map((data) => {
                        return (
                            <>
                                <option value={data?._id}>{data?.name}</option>
                            </>
                        )
                    })}
                </select>
                <input placeholder="courseDuration" onChange={(e) => {setCourseInput({...courseInput , courseDuration: e.target.value})}} value={courseInput?.courseDuration}/>
                <input placeholder="title" onChange={(e) => {setCourseInput({...courseInput , title: e.target.value})}} value={courseInput?.title}/>
                <input placeholder="alreadyEnrolled" onChange={(e) => {setCourseInput({...courseInput , alreadyEnrolled: e.target.value})}} value={courseInput?.alreadyEnrolled}/>
                <input placeholder="price" onChange={(e) => {setCourseInput({...courseInput , price: e.target.value})}} value={courseInput?.price}/>
                <input placeholder="rating" onChange={(e) => {setCourseInput({...courseInput , rating: e.target.value})}} value={courseInput?.rating}/>
                <input placeholder="batchStarting" onChange={(e) => {setCourseInput({...courseInput , batchStarting: e.target.value})}} value={courseInput?.batchStarting}/>
                <input placeholder="institute" onChange={(e) => {setCourseInput({...courseInput , institute: e.target.value})}} value={courseInput?.institute}/>
                <input placeholder="language" onChange={(e) => {setCourseInput({...courseInput , language: e.target.value})}} value={courseInput?.language}/>
                <input placeholder="about" onChange={(e) => {setCourseInput({...courseInput , about: e.target.value})}} value={courseInput?.about}/>
                <input placeholder="category" onChange={(e) => {setCourseInput({...courseInput , category: e.target.value})}} value={courseInput?.category}/>
                <input placeholder="Exam" onChange={(e) => {setCourseInput({...courseInput , Exam: e.target.value})}} value={courseInput?.Exam}/>
                <button onClick={async () => {await addCourse()} }>Add Course</button>

        </>
    )
}

