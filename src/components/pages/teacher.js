import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
import { ChipInput } from "../common/Fields/chipInput";
import { FileInput } from "../common/Fields/fileInput";
import "./Blog/form.css";
export const Teacher = () => {
    const [teachers, setTeachers] = useState([])
    const [id, setId] = useState('')
    const [toggle, setToggle] = useState({
        key: null,
        boolVal: false
    })
    const [teacherInput, setTeacherInput] = useState({
        name: "",
        yearsOfExperience: null,
        designation: "",
        studentsTaught: null,
        selections: null,
        about: "",
        highlights: [],
        educations: [],
        experiences: []
    })
    console.log(teacherInput, "Teacher Input")
    const getTeachersData = async () => {
        try {
            const res = await axios.get('https://edu-server-side-2023.onrender.com/api/v1/getAllTeachers')
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
    console.log(teacherInput, "Teacher Input")
    const DeleteTeacherData = async (id) => {
        try {
            const res = await axios.delete(`https://edu-server-side-2023.onrender.com/api/v1/deleteTeacher/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const inputHandle = (key) => {
        setTeacherInput({
            name: "",
            yearsOfExperience: null,
            designation: "",
            studentsTaught: 0,
            selections: 0,
            about: "",
            highlights: [],
            educations: [],
            experiences: []
        })
    }

    return (
        <>

            <div>

                <div className="Grid-Box">
                    <AddItem inputHandle={inputHandle} text={'Add New Teacher'} />
                    {
                        teachers?.map((data, index) => {
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
                                                            <button onClick={async () => { setId(data?._id); setTeacherInput(data) }}>Update</button>
                                                            <button onClick={() => DeleteTeacherData(data?._id)}>Delete</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <img style={{ height: "150px", width: "100%" }} src={data?.image ? data?.image : "/images/dummy.png"} alt="teacher" />
                                        <h1>{data?.name}</h1>
                                        <h3>{data?.designation}</h3>
                                        <p>{data?.about}</p>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <CourseForm id={id} teachers={teachers} teacherInput={teacherInput} setTeacherInput={setTeacherInput} />
            </div>
        </>
    )
}

const CourseForm = ({ id, teacherInput, setTeacherInput }) => {
    const [educationDetail, setEducationDetail] = useState({ degree: "", university: "", year: "" })
    const [experienceDetail, setExperienceDetail] = useState({ position: "", institution: "", year: "" })
    const [highlightInput, setHighLightInput] = useState("")
    const [btn, setBtn] = useState({ eduBtn: false, expBtn: false, highBtn: false })
    const [allInd, setAllInd] = useState({ eduInd: 0, expInd: 0, highInd: 0 })
    const [file, setFile] = useState(null);
    const handleTeacher = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(teacherInput));
        try {
            let res = await axios.post(`https://edu-server-side-2023.onrender.com/api/v1/createTeacher`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res) {
                console.log(res)
                setTeacherInput({
                    name: "",
                    yearsOfExperience: null,
                    designation: "",
                    studentsTaught: 0,
                    selections: 0,
                    about: "",
                    highlights: [],
                    educations: [],
                    experiences: []
                })
            }
        } catch (err) {
            console.log(err)
        }

    }
    const handleHighlight = (val) => {
        setTeacherInput({ ...teacherInput, highlights: [...teacherInput?.highlights, { description: val }] })
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleEducationUpdate = (id) => {
        setTeacherInput({ ...teacherInput, educations: teacherInput?.educations?.map((data, index) => index === id ? educationDetail : data) })
    }
    const handleExperienceUpdate = (id) => {
        setTeacherInput({ ...teacherInput, experiences: teacherInput?.experiences?.map((data, index) => index === id ? experienceDetail : data) })
    }

    const deletHighlight = (index) => [
        setTeacherInput({ ...teacherInput, highlights: teacherInput?.highlights?.filter((data, ind) => index !== ind && data) })
    ]

    const handleTeacherUpdater = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('file', file);
            formDataToSend.append('formData', JSON.stringify(teacherInput));
            const res = await axios.put(`https://edu-server-side-2023.onrender.com/api/v1/updateTeacher/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTeacherInput({
                name: "",
                yearsOfExperience: null,
                designation: "",
                studentsTaught: null,
                selections: null,
                about: "",
                highlights: [],
                educations: [],
                experiences: []
            })
            console.log(res, "Check Response")
        } catch (err) {
            console.log(err, "Ërror")
        }
    }
    return (
        <>
            <div className="Form-Input-Box">
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Name</span>
                        <input placeholder="Name" onChange={(e) => { setTeacherInput({ ...teacherInput, name: e.target.value }) }} value={teacherInput?.name} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>Years Of Experience</span>
                        <input placeholder="Years Of Experience" type="number" onChange={(e) => { setTeacherInput({ ...teacherInput, yearsOfExperience: e.target.value }) }} value={teacherInput?.yearsOfExperience} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Designation</span>
                        <input placeholder="Designation" onChange={(e) => { setTeacherInput({ ...teacherInput, designation: e.target.value }) }} value={teacherInput?.designation} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>Students Taught</span>
                        <input placeholder="Students Taught" onChange={(e) => { setTeacherInput({ ...teacherInput, studentsTaught: e.target.value }) }} value={teacherInput?.studentsTaught} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Selections</span>
                        <input placeholder="Selections" onChange={(e) => { setTeacherInput({ ...teacherInput, selections: e.target.value }) }} value={teacherInput?.selections} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>About</span>
                        <input placeholder="About" onChange={(e) => { setTeacherInput({ ...teacherInput, about: e.target.value }) }} value={teacherInput?.about} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <FileInput getFileInputValue={handleFileChange} />
                    <ChipInput handleHighlight={handleHighlight} items={teacherInput?.highlights} deletHighlight={deletHighlight} label={'Highlights'} />
                </div>
                <div className="Flex-Container ">
                    <div className="Flex-Box">
                        <div className="Input-Field-Box">
                            <input placeholder="degree" onChange={(e) => { setEducationDetail({ ...educationDetail, degree: e.target.value }) }} value={educationDetail?.degree} />
                        </div>
                        <div className="Input-Field-Box">
                            <input placeholder="university" onChange={(e) => { setEducationDetail({ ...educationDetail, university: e.target.value }) }} value={educationDetail?.university} />
                        </div>
                        <div className="Input-Field-Box">
                            <input placeholder="year" onChange={(e) => { setEducationDetail({ ...educationDetail, year: e.target.value }) }} value={educationDetail?.year} />
                        </div>
                        <div className="btn-Box">
                            {!btn?.eduBtn ? <button onClick={() => { setTeacherInput({ ...teacherInput, educations: [...teacherInput?.educations, educationDetail] }); setEducationDetail({ degree: "", university: "", year: "" }) }} className="Form-Btn">Save</button> : <button onClick={() => { handleEducationUpdate(allInd?.eduInd); setBtn({ ...btn, eduBtn: false }); setEducationDetail({ degree: "", university: "", year: "" }) }} className="Form-Btn">Update</button>}
                        </div>
                    </div>

                    <div>
                        {
                            teacherInput?.educations?.map((data, index) => {
                                return <div className="cont-flex-box">
                                    <div><span>{data?.degree}</span></div>
                                    <div><span>{data?.university}</span></div>
                                    <div><span>{data?.year}</span></div>
                                    <button onClick={() => { setEducationDetail({ degree: data?.degree, university: data?.university, year: data?.year }); setAllInd({ ...allInd, eduInd: index }); setBtn({ ...btn, eduBtn: true }) }}>Update</button>
                                    <button onClick={() => { setTeacherInput({ ...teacherInput, educations: teacherInput?.educations?.filter((data, ind) => ind !== index && data) }) }}>Delete</button>
                                </div>
                            })
                        }
                    </div>
                </div>





                <div className="Flex-Container ">
                    <div className="Flex-Box">
                        <div className="Input-Field-Box">
                            <input placeholder="position" onChange={(e) => { setExperienceDetail({ ...experienceDetail, position: e.target.value }) }} value={experienceDetail?.position} />

                        </div>
                        <div className="Input-Field-Box">
                            <input placeholder="institution" onChange={(e) => { setExperienceDetail({ ...experienceDetail, institution: e.target.value }) }} value={experienceDetail?.institution} />

                        </div>
                        <div className="Input-Field-Box">
                            <input placeholder="year" onChange={(e) => { setExperienceDetail({ ...experienceDetail, year: e.target.value }) }} value={experienceDetail?.year} />
                        </div>
                        <div className="btn-Box">
                            {!btn?.expBtn ? <button onClick={() => setTeacherInput({ ...teacherInput, experiences: [...teacherInput?.experiences, experienceDetail] })} className="Form-Btn">Save</button> : <button onClick={() => { handleExperienceUpdate(allInd?.eduInd); setBtn({ ...btn, expBtn: false }) }} className="Form-Btn">Update</button>}
                        </div>
                    </div>

                    <div>
                        {
                            teacherInput?.experiences?.map((data, index) => {
                                return <div className="cont-flex-box">
                                    <div><span>{data?.position}</span></div>
                                    <div><span>{data?.institution}</span></div>
                                    <div><span>{data?.year}</span></div>
                                    <button onClick={async () => { setExperienceDetail({ position: data?.position, institution: data?.institution, year: data?.year }); setBtn({ ...btn, expBtn: true }); setAllInd({ ...allInd, expInd: index }) }}>Update</button>
                                    <button onClick={() => { setTeacherInput({ ...teacherInput, experiences: teacherInput?.experiences?.filter((data, ind) => index !== ind && data) }) }}>Delete</button>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="btn-Box">

                <button onClick={() => { handleTeacher() }} className="Form-Btn">Submit</button>
                <button onClick={() => {
                    handleTeacherUpdater()
                }} className="Form-Btn">Update</button>
            </div>



        </>
    )
}
