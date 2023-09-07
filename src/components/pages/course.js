import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
import { CourseForm } from "./CorseForm";
export const Course = () => {
    const [AllCourses, setAllCourses] = useState([]);
    const [teachers, setTeachers] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const [id, setId] = useState('')
    const getCoursessData = async () => {
        try {
            const res = await axios.get('https://courseselling.onrender.com/api/v1/getAllcourses')
            if (res?.data?.courses.length > 0) {
                setAllCourses(res?.data?.courses)
            }
        } catch (err) {
            console.log(err)
        }
    };
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
    };
    const DeleteCourse = async (id) => {
        try {
            const res = await axios.delete(`https://courseselling.onrender.com/api/v1/deleteCourse/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    };
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
    };
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
                                        <button onClick={async () => setId(data?._id)}>Update</button>
                                        <button onClick={() => DeleteCourse(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

                <CourseForm teachers={teachers} AllCourses={AllCourses} id={id} />

            </div>
        </>
    )
}

