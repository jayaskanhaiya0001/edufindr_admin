import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
import { FileInput } from "../common/Fields/fileInput";
import { ChipInput } from "../common/Fields/chipInput";
import { CourseForm } from "./CorseForm";
export const Course = () => {
    const [AllCourses, setAllCourses] = useState([]);
    const [teachers, setTeachers] = useState([])
    const [inputs, setInputs] = useState({ add: false, update: false })
    const [id, setId] = useState('')
    const [file, setFile] = useState(null);
    const [courseInput, setCourseInput] = useState({
        image: "",
        mentorNames: [
            {
                _id: "",
                name: ""
            }
        ],
        courseDuration: "",
        title: "",
        alreadyEnrolled: null,
        price: null,
        rating: null,
        batchStarting: "",
        institute: "",
        language: "",
        about: "",
        highlights: [],
        enrollmentEndDate: new Date(),
        days: [],
        batches: [],
        features: [],
        category: "",
        Exam: ""
    })
    const getTeacherIdHandle = (id) => {
        let [{ name, _id }] = teachers?.filter((data) => data?._id === id && data);
        setCourseInput({ ...courseInput, mentorNames: [{ _id: _id, name: name }] })
    };

    const handleCourse = async (method) => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(courseInput));
        try {
            let res = (method === 'PUT') ? await axios.put(`https://courseselling.onrender.com/api/v1/updateCourse/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }) : await axios.post(`https://courseselling.onrender.com/api/v1/createCourse`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });;
            if (res) {
                setCourseInput({
                    image: "",
                    mentorNames: [
                        {
                            _id: "",
                            name: ""
                        }
                    ],
                    courseDuration: "",
                    title: "",
                    alreadyEnrolled: null,
                    price: null,
                    rating: null,
                    batchStarting: "",
                    institute: "",
                    language: "",
                    about: "",
                    highlights: [],
                    enrollmentEndDate: new Date(),
                    days: [],
                    batches: [],
                    features: [],
                    category: "",
                    Exam: ""
                })
            }
        } catch (err) {
            console.log(err)
        }

    };

    const handleHighlight = (val) => {
        setCourseInput({ ...courseInput, highlights: [...courseInput?.highlights, { description: val }] })
    };


    const deletHighlight = (index) => {
        setCourseInput({ ...courseInput, highlights: courseInput?.highlights?.filter((data, ind) => index !== ind && data) })
    }

    const handleDays = (val) => {
        setCourseInput({ ...courseInput, days: [...courseInput?.days, { description: val }] })
    };
    const deleteDays = (index) => {
        setCourseInput({ ...courseInput, days: courseInput?.days?.filter((data, ind) => index !== ind && data) })
    }

    const handleBatches = (val) => {
        setCourseInput({ ...courseInput, batches: [...courseInput?.batches, { description: val }] })
    };
    const deleteBatches = (index) => {
        setCourseInput({ ...courseInput, batches: courseInput?.batches?.filter((data, ind) => index !== ind && data) })
    }
    const handleFeatures = (val) => {
            setCourseInput({ ...courseInput, features: [...courseInput?.features, { description: val}] })
    };
    const deleteFeatures = (index) => {
        setCourseInput({ ...courseInput, features: courseInput?.features?.filter((data, ind) => index !== ind && data) })
    }
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
    const getFileInputValue = (e) => {
        setFile(e.target.files[0]);
    };

    const [toggle, setToggle] = useState({
        key: null,
        boolVal: false
    })
    return (
        <>
            <div>

                <div className="Grid-Box">
                    <AddItem inputHandle={inputHandle} text={'Add New Course'} />
                    {
                        AllCourses?.map((data, index) => {
                            return (
                                <>
                                    <div className="grid-content-cont">
                                        {/* <img src={data?.img} alt="teacher" /> */}
                                        <div onClick={() => setToggle({ key: index, boolVal: !toggle?.boolVal })}>
                                            <span className="kebab-btn" >

                                            </span>
                                            {
                                                (toggle.key === index && toggle.boolVal === true) && (
                                                    <>
                                                        <div className="card-btn-box">
                                                            <button onClick={async () => { setCourseInput(data); setId(data?._id) }}>Update</button>
                                                            <button onClick={() => DeleteCourse(data?._id)}>Delete</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <img style={{ height: "150px", width: "100%" }} src={data?.image ? data?.image : "/images/dummy.png"} alt="course" />
                                        <h1>{data?.title}</h1>
                                        <h3>{data?.Exam}</h3>
                                        <p>{data?.about}</p>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

                {/* <div> */}
                {/* <select onChange={(e) => getTeacherIdHandle(e.target.value)}>
                        <option value="">Choose an option</option>
                        {teachers.map((data) => (
                            <option key={data._id} value={data._id}>
                                {data.name}
                            </option>
                        ))}
                    </select> */}
                <div className="Form-Input-Box">
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Course Duration</span>
                            <input placeholder="courseDuration" onChange={(e) => { setCourseInput({ ...courseInput, courseDuration: e.target.value }) }} value={courseInput?.courseDuration} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Title</span>
                            <input placeholder="title" onChange={(e) => { setCourseInput({ ...courseInput, title: e.target.value }) }} value={courseInput?.title} />
                        </div>
                    </div>

                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Alrady Enrolled</span>
                            <input placeholder="Alrady Enrolled" onChange={(e) => { setCourseInput({ ...courseInput, alreadyEnrolled: e.target.value }) }} value={courseInput?.alreadyEnrolled} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Price</span>
                            <input placeholder="price" onChange={(e) => { setCourseInput({ ...courseInput, price: e.target.value }) }} value={courseInput?.price} />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Rating</span>
                            <input placeholder="Rating" onChange={(e) => { setCourseInput({ ...courseInput, rating: e.target.value }) }} value={courseInput?.rating} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Batch Start</span>
                            <input placeholder="batchStarting" type="date" onChange={(e) => { setCourseInput({ ...courseInput, batchStarting: e.target.value }) }} value={courseInput?.batchStarting} />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Institute</span>
                            <input placeholder="institute" onChange={(e) => { setCourseInput({ ...courseInput, institute: e.target.value }) }} value={courseInput?.institute} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Language</span>
                            <input placeholder="language" onChange={(e) => { setCourseInput({ ...courseInput, language: e.target.value }) }} value={courseInput?.language} />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>About</span>
                            <input placeholder="about" onChange={(e) => { setCourseInput({ ...courseInput, about: e.target.value }) }} value={courseInput?.about} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Category</span>
                            <input placeholder="category" onChange={(e) => { setCourseInput({ ...courseInput, category: e.target.value }) }} value={courseInput?.category} />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <div className="Input-Field-Box">
                            <span>Exam</span>
                            <input placeholder="Exam" onChange={(e) => { setCourseInput({ ...courseInput, Exam: e.target.value }) }} value={courseInput?.Exam} />
                        </div>
                        <div className="Input-Field-Box">
                            <span>Enrolment End Date</span>
                            <input placeholder="Enrolment End Date" type="date" onChange={(e) => { setCourseInput({ ...courseInput, enrollmentEndDate: e.target.value }) }} value={courseInput?.enrollmentEndDate} />
                        </div>
                    </div>
                    <div className="Input-Field-row">
                        <FileInput getFileInputValue={getFileInputValue} />
                        <ChipInput items={courseInput?.highlights} handleHighlight={handleHighlight} deletHighlight={deletHighlight} label={'Highlight'} />
                    </div>
                    <div className="Input-Field-row">
                        <ChipInput items={courseInput?.days} handleHighlight={handleDays} deletHighlight={deleteDays} label={'Days'} />
                        <ChipInput items={courseInput?.batches} handleHighlight={handleBatches} deletHighlight={deleteBatches} label={'Batches'} />
                    </div>
                    <div className="Input-Field-row">
                        <ChipInput items={courseInput?.features} handleHighlight={handleFeatures} deletHighlight={deleteFeatures} label={'Features'} />
                    </div>
                </div>
                <div className="btn-Box">
                    {!id ? <button onClick={async () => { await handleCourse('') }} className="Form-Btn">Submit</button> : <button onClick={async () => { await handleCourse('PUT') }} className="Form-Btn">Update</button>}
                </div>
            </div>
        </>
    )
}

