import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const Teacher = () => {
    const [teachers, setTeachers] = useState([])
    const [id, setId] = useState('')
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

    const DeleteTeacherData = async (id) => {
        try {
            const res = await axios.delete(`https://courseselling.onrender.com/api/v1/deleteTeacher/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const inputHandle = (key) => {
        switch (key) {
            case 'ADD':
                // setInputs({ ...inputs, add: true })
                break;
            case 'UPDATE':
                // setInputs({ ...inputs, update: true })
                break;
            default:
        }
    }
    return (
        <>

            <div>
                <AddItem inputHandle={inputHandle} />
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
                                        <button onClick={async () => setId(data?._id)}>Update</button>
                                        <button onClick={() => DeleteTeacherData(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <CourseForm id={id} teachers={teachers}/>
            </div>
        </>
    )
}

const CourseForm = ({ teachers, id }) => {
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

    const handleTeacher = async (method) => {
        try {
            let res = (method === 'PUT') ? await axios.put(`https://courseselling.onrender.com/api/v1/updateTeacher/${id}`, teacherInput) : await axios.post(`https://courseselling.onrender.com/api/v1/createCourse`, teacherInput);
            if (res) {
                console.log(res)
            }
        } catch (err) {
            console.log(err)
        }

        try {
            let res = await axios.post('https://courseselling.onrender.com/api/v1/createCourse', teacherInput)
            if (res) {
                console.log(res)
            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(()=>{
        const updateTeacher = teachers?.filter((data) => data?._id === id);
        if(updateTeacher) {
            setTeacherInput(updateTeacher[0])
        }
    },[id])
    return (
        <>
            <input placeholder="name" onChange={(e) => { setTeacherInput({ ...teacherInput, name: e.target.value }) }} value={teacherInput?.name}/>
            <input placeholder="yearsOfExperience" type="number" onChange={(e) => { setTeacherInput({ ...teacherInput, yearsOfExperience: e.target.value }) }}value={teacherInput?.yearsOfExperience} />
            <input placeholder="alreadyEnrolled" onChange={(e) => { setTeacherInput({ ...teacherInput, alreadyEnrolled: e.target.value }) }} value={teacherInput?.alreadyEnrolled}/>
            <input placeholder="designation" onChange={(e) => { setTeacherInput({ ...teacherInput, designation: e.target.value }) }} value={teacherInput?.designation}/>
            <input placeholder="studentsTaught" onChange={(e) => { setTeacherInput({ ...teacherInput, studentsTaught: e.target.value }) }} value={teacherInput?.studentsTaught}/>
            <input placeholder="selections" onChange={(e) => { setTeacherInput({ ...teacherInput, selections: e.target.value }) }} value={teacherInput?.selections}/>
            <input placeholder="about" onChange={(e) => { setTeacherInput({ ...teacherInput, about: e.target.value }) }} value={teacherInput?.about}/>
            <input placeholder="language" onChange={(e) => { setTeacherInput({ ...teacherInput, language: e.target.value }) }} value={teacherInput?.language}/>
            <input placeholder="about" onChange={(e) => { setTeacherInput({ ...teacherInput, about: e.target.value }) }} value={teacherInput?.about}/>
            <input placeholder="category" onChange={(e) => { setTeacherInput({ ...teacherInput, category: e.target.value }) }} value={teacherInput?.category}/>
            <input placeholder="Exam" onChange={(e) => { setTeacherInput({ ...teacherInput, Exam: e.target.value }) }} value={teacherInput?.Exam}/>
            {!id ? <button onClick={async () => { await handleTeacher('') }}>Add Teacher</button> : <button onClick={async () => { await handleTeacher('PUT') }}>Update Teacher</button>}

        </>
    )
}


