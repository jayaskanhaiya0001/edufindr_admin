import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const TestSeries = () => {
    const [testSeries, setAllTestSeries] = useState([])
    const getAllTestSeries = async () => {
        try {
            const res = await axios.get('https://courseselling.onrender.com/api/v1/getAllTest')
            if (res?.data?.Tests.length > 0) {
                setAllTestSeries(res?.data?.Tests)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllTestSeries()
    }, []);
    const DeleteTestSeries = async (id) => {
        try {
            const res = await axios.delete(`https://courseselling.onrender.com/api/v1/deleteTest/${id}`)
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
                        testSeries?.map((data, index) => {
                            return (
                                <>
                                    <div>
                                        {/* <img src={data?.img} alt="teacher" /> */}
                                        <h1>{data?.title}</h1>
                                        <h3>{data?.Exam}</h3>
                                        <p>{data?.about}</p>
                                        <button>Update</button>
                                        <button onClick={() => DeleteTestSeries(data?._id)}>Delete</button>
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

const TestSeriesForm = () => {
    const [testSeriesInput, setTestSeriesInput] = useState({
        totalTest: null,
        freeTest: "",
        title: "",
        alreadyEnrolled: null,
        price: null,
        rating: null,
        languages: [
          { lanuguage: "English" },
          { lanuguage: "Spanish" }
        ],
        about: "This is a sample test course designed for demonstration purposes.",
        highlights: [
          {
            "description": "Comprehensive test coverage"
          },
          {
            "description": "Interactive quizzes and assignments"
          }
        ],
        testDivision: [
          {
            "key": "Module 1",
            "value": "Introduction to the course"
          },
          {
            "key": "Module 2",
            "value": "Advanced topics"
          }
        ],
        category: "Education",
        Exam: "Sample Exam",
        createdAt: "2023-08-22T12:00:00Z",
        updatedAt: "2023-08-22T14:30:00Z"
      })
    const addTestSEries = async () => {
        try {
            let res = await axios.post('https://courseselling.onrender.com/api/v1/createTest',testSeriesInput)
            if(res) {
                console.log(res)
            }
        } catch(err) {
            console.log(err)
        }

    }
    return (
        <>
                <input placeholder="totalTest" onChange={(e) => {setTestSeriesInput({...testSeriesInput , totalTest: e.target.value})}}/>
                <input placeholder="freeTest" onChange={(e) => {setTestSeriesInput({...testSeriesInput , freeTest: e.target.value})}}/>
                <input placeholder="title" onChange={(e) => {setTestSeriesInput({...testSeriesInput , title: e.target.value})}}/>
                <input placeholder="price" onChange={(e) => {setTestSeriesInput({...testSeriesInput , price: e.target.value})}}/>
                <input placeholder="alreadyEnrolled" onChange={(e) => {setTestSeriesInput({...testSeriesInput , alreadyEnrolled: e.target.value})}}/>
                <input placeholder="rating" onChange={(e) => {setTestSeriesInput({...testSeriesInput , rating: e.target.value})}}/>
                <input placeholder="createdAt" type="date" onChange={(e) => {setTestSeriesInput({...testSeriesInput , createdAt: e.target.value})}}/>
                <input placeholder="updatedAt" type="date" onChange={(e) => {setTestSeriesInput({...testSeriesInput , updatedAt: e.target.value})}}/>
                <input placeholder="about" onChange={(e) => {setTestSeriesInput({...testSeriesInput , about: e.target.value})}}/>
                <input placeholder="category" onChange={(e) => {setTestSeriesInput({...testSeriesInput , category: e.target.value})}}/>
                <input placeholder="Exam" onChange={(e) => {setTestSeriesInput({...testSeriesInput , Exam: e.target.value})}}/>
                <button onClick={async () => {await addTestSEries()} }>Add Course</button> 

        </>
    )
}
