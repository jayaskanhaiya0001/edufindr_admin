import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const Teacher = () => {
    const [teachers, setTeachers] = useState([])
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
    useEffect(() => {
        getTeachersData()
    }, []);

    const handleTeacherData = (index, command) => {

    }

    const DeleteTeacherData = async (id) => {
        try {
            const res = await axios.delete(`https://courseselling.onrender.com/api/v1/deleteTeacher/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>

            <div>
                <AddItem />
                <div className="Grid-Box">
                    {
                        teachers?.map((data, index) => {
                            return (
                                <>
                                    <div>
                                        <img src={data?.img ? data?.img : "/images/dummy.png"} alt="teacher" />
                                        <h1>{data?.name}</h1>
                                        <h3>{data?.designation}</h3>
                                        <p>{data?.about}</p>
                                        <button onClick={() => handleTeacherData(index, data?._id)}>Update</button>
                                        <button onClick={() => DeleteTeacherData(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

const CourseForm = ({ teachers }) => {
    const [teacherInput, setTeacherInput] = useState({
        name: "John Smith",
        yearsOfExperience: 10,
        designation: "Math Teacher",
        studentsTaught: 300,
        selections: 50,
        about: "Passionate about teaching mathematics...",
           highlights: [
                { "highlight": "Published research in algebra" },
                { "highlight": "Received Teacher of the Year award" }
            ],
        educations: [
          {
            "degree": "Bachelor of Science",
            "university": "XYZ University",
            "year": 2008
          },
          {
            "degree": "Master of Education",
            "university": "ABC University",
            "year": 2012
          }
        ],
        experiences: [
          {
            "position": "Math Teacher",
            "institution": "123 High School",
            "year": 2012
          },
          {
            "position": "Head of Department",
            "institution": "456 Academy",
            "year": 2018
          }
        ]
      })
    const getTeacherIdHandle = (id) => {
        let [{name, _id}]  =  teachers?.filter((data) => data?._id === id && data);
        setTeacherInput({ ...teacherInput, mentorNames: [{_id: _id , name: name}] })
    }
    const addCourse = async () => {
        try {
            let res = await axios.post('https://courseselling.onrender.com/api/v1/createCourse',teacherInput)
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
                <input placeholder="name" onChange={(e) => {setTeacherInput({...teacherInput , name: e.target.value})}}/>
                <input placeholder="yearsOfExperience" type="number" onChange={(e) => {setTeacherInput({...teacherInput , yearsOfExperience: e.target.value})}}/>
                <input placeholder="alreadyEnrolled" onChange={(e) => {setTeacherInput({...teacherInput , alreadyEnrolled: e.target.value})}}/>
                <input placeholder="designation" onChange={(e) => {setTeacherInput({...teacherInput , designation: e.target.value})}}/>
                <input placeholder="studentsTaught" onChange={(e) => {setTeacherInput({...teacherInput , studentsTaught: e.target.value})}}/>
                <input placeholder="selections" onChange={(e) => {setTeacherInput({...teacherInput , selections: e.target.value})}}/>
                <input placeholder="about" onChange={(e) => {setTeacherInput({...teacherInput , about: e.target.value})}}/>
                <input placeholder="language" onChange={(e) => {setTeacherInput({...teacherInput , language: e.target.value})}}/>
                <input placeholder="about" onChange={(e) => {setTeacherInput({...teacherInput , about: e.target.value})}}/>
                <input placeholder="category" onChange={(e) => {setTeacherInput({...teacherInput , category: e.target.value})}}/>
                <input placeholder="Exam" onChange={(e) => {setTeacherInput({...teacherInput , Exam: e.target.value})}}/>
                <button onClick={async () => {await addCourse()} }>Add Course</button>

        </>
    )
}


