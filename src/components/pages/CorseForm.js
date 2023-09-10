import { useState, useEffect } from "react";
import axios from "axios";
export const CourseForm = ({ teachers, AllCourses, id }) => {
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
    const [arrInput, setArrInput] = useState({
        highLightInput: "",
        daysInput: "",
        batchesInput: "",
        features: ""
    })
    const getTeacherIdHandle = (id) => {
        let [{ name, _id }] = teachers?.filter((data) => data?._id === id && data);
        setCourseInput({ ...courseInput, mentorNames: [{ _id: _id, name: name }] })
    };
    const handleCourse = async (method) => {
        try {
            let res = (method === 'PUT') ? await axios.put(`https://courseselling.onrender.com/api/v1/updateCourse/${id}`, courseInput) : await axios.post(`https://courseselling.onrender.com/api/v1/createCourse`, courseInput);
            if (res) {
                console.log(res)
            }
        } catch (err) {
            console.log(err)
        }

    };

    const handleHighlight = () => {
        if (arrInput?.highLightInput?.trim() !== "") {
            setCourseInput({ ...courseInput, highlights: [...courseInput?.highlights, { description: arrInput?.highLightInput }] })
     
        }
        setArrInput({...arrInput, highLightInput: ""})
    };

    const handleHighLightUpdate = (e , index) => {
        setCourseInput({...courseInput, highlights: courseInput?.highlights?.map((data , ind) => index === ind ? {description: e?.target?.value}: data)})
    }

    const deletHighlight = (index) => {
        setCourseInput({...courseInput, highlights: courseInput?.highlights?.filter((data , ind) => index !== ind && data)})
    }

    const handleDays = () => {
        if (arrInput?.daysInput?.trim() !== "") {
            setCourseInput({ ...courseInput, days: [...courseInput?.days, { day: arrInput?.daysInput }] })
        }
        setArrInput({...arrInput, daysInput: ""})
    };

    const handleHighUpdate = (e , index) => {
        setCourseInput({...courseInput, days: courseInput?.days?.map((data , ind) => index === ind ? {day: e?.target?.value}: data)})
    }
    const deleteDays = (index) => {
        setCourseInput({...courseInput, days: courseInput?.days?.filter((data , ind) => index !== ind && data)})
    }

    const handleBatches = () => {
        if (arrInput?.batchesInput?.trim() !== "") {
            setCourseInput({ ...courseInput, batches: [...courseInput?.batches, { description: arrInput?.batchesInput }] })
        }
        setArrInput({...arrInput, batchesInput: ""})
    };

    const handleBatchesUpdate = (e , index) => {
        setCourseInput({...courseInput, batches: courseInput?.batches?.map((data , ind) => index === ind ? {description: e?.target?.value}: data)})
    }
    const deleteBatches = (index) => {
        setCourseInput({...courseInput, batches: courseInput?.batches?.filter((data , ind) => index !== ind && data)})
    }
    const handleFeatures = () => {
        if (arrInput?.features?.trim() !== "") {
            setCourseInput({ ...courseInput, features: [...courseInput?.features, { description: arrInput?.features }] })
        }
        setArrInput({...arrInput, features: ""})
    };
    const handleFeaturesUpdate = (e , index) => {
        setCourseInput({...courseInput, features: courseInput?.features?.map((data , ind) => index === ind ? {description: e?.target?.value}: data)})
    }
    const deleteFeatures = (index) => {
        setCourseInput({...courseInput, features: courseInput?.features?.filter((data , ind) => index !== ind && data)})
    }

    return (
        <>
{console.log(courseInput,"hehhhh")}
            <select onChange={(e) => { getTeacherIdHandle(e.target.value); }}>
                {teachers?.map((data) => {
                    return (
                        <>
                            <option value={data?._id}>{data?.name}</option>
                        </>
                    )
                })}
            </select>
            <input placeholder="courseDuration" onChange={(e) => { setCourseInput({ ...courseInput, courseDuration: e.target.value }) }} value={courseInput?.courseDuration} />
            <input placeholder="title" onChange={(e) => { setCourseInput({ ...courseInput, title: e.target.value }) }} value={courseInput?.title} />
            <input placeholder="alreadyEnrolled" onChange={(e) => { setCourseInput({ ...courseInput, alreadyEnrolled: e.target.value }) }} value={courseInput?.alreadyEnrolled} />
            <input placeholder="price" onChange={(e) => { setCourseInput({ ...courseInput, price: e.target.value }) }} value={courseInput?.price} />
            <input placeholder="rating" onChange={(e) => { setCourseInput({ ...courseInput, rating: e.target.value }) }} value={courseInput?.rating} />
            <input placeholder="batchStarting" onChange={(e) => { setCourseInput({ ...courseInput, batchStarting: e.target.value }) }} value={courseInput?.batchStarting} />
            <input placeholder="institute" onChange={(e) => { setCourseInput({ ...courseInput, institute: e.target.value }) }} value={courseInput?.institute} />
            <input placeholder="language" onChange={(e) => { setCourseInput({ ...courseInput, language: e.target.value }) }} value={courseInput?.language} />
            <input placeholder="about" onChange={(e) => { setCourseInput({ ...courseInput, about: e.target.value }) }} value={courseInput?.about} />
            <input placeholder="category" onChange={(e) => { setCourseInput({ ...courseInput, category: e.target.value }) }} value={courseInput?.category} />
            <input placeholder="Exam" onChange={(e) => { setCourseInput({ ...courseInput, Exam: e.target.value }) }} value={courseInput?.Exam} />
            <input placeholder="Enrolment End Date" type="date" onChange={(e) => { setCourseInput({ ...courseInput, enrollmentEndDate: e.target.value }) }} value={courseInput?.enrollmentEndDate} />
            <div>
                <span>
                    <input type="text" onChange={(e) => setArrInput({ ...arrInput, highLightInput: e.target.value })} value={arrInput?.highLightInput}/>
                    <button onClick={() => handleHighlight()}>Add HightLight</button>
                </span>
                <span>
                    {courseInput?.highlights?.map((data , index) => {
                        return <div><input value={data?.description} onChange={(e) => {handleHighLightUpdate(e, index)}}/><p><button onClick={() => handleHighLightUpdate()}>Update</button><button onClick={() => deletHighlight(index)}>Delete</button></p></div>
                    })}
                </span>
            </div>
            <div>
                <span>
                    <input type="text" onChange={(e) => setArrInput({ ...arrInput, daysInput: e.target.value })} value={arrInput?.daysInput}/>
                    <button onClick={() => handleDays()}>Add Days</button>
                </span>
                <span>
                    {courseInput?.days?.map((data , index) => {
                        return <div><input value={data?.day} onChange={(e) => {handleHighUpdate(e, index)}}/><p><button onClick={() => handleHighLightUpdate()}>Update</button><button onClick={() => deleteDays(index)}>Delete</button></p></div>
                    })}
                </span>
            </div>

            <div>
                <span>
                    <input type="text" onChange={(e) => setArrInput({ ...arrInput, batchesInput: e.target.value })} value={arrInput?.batchesInput}/>
                    <button onClick={() => handleBatches()}>Add Batches</button>
                </span>
                <span>
                    {courseInput?.batches?.map((data , index) => {
                        return <div><input value={data?.description} onChange={(e) => {handleBatchesUpdate(e, index)}}/><p><button onClick={() => handleBatchesUpdate()}>Update</button><button onClick={() => deleteBatches(index)}>Delete</button></p></div>
                    })}
                </span>
            </div>
            <div>
                <span>
                    <input type="text" onChange={(e) => setArrInput({ ...arrInput, features: e.target.value })} value={arrInput?.features}/>
                    <button onClick={() => handleFeatures()}>Add Features</button>
                </span>
                <span>
                    {courseInput?.features?.map((data , index) => {
                        return <div><input value={data?.description} onChange={(e) => {handleFeaturesUpdate(e, index)}}/><p><button onClick={() => handleFeaturesUpdate()}>Update</button><button onClick={() => deleteFeatures(index)}>Delete</button></p></div>
                    })}
                </span>
            </div>
            {!id ? <button onClick={async () => { await handleCourse('') }}>Add Course</button> : <button onClick={async () => { await handleCourse('PUT') }}>Update Course</button>}

        </>
    )
}