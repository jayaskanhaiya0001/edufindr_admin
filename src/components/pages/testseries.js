import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
export const TestSeries = () => {
    const [testSeries, setAllTestSeries] = useState([])
    const [id, setId] = useState('')
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
    const inputHandle = (params) => {

    }
    return ( 
        <>
            <div>
                <AddItem inputHandle={inputHandle}/>
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
                                        <button onClick={async () => setId(data?._id)}>Update</button>
                                        <button onClick={() => DeleteTestSeries(data?._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <TestSeriesForm id={id} testSeries={testSeries}/>
            </div>
        </>
    )
}

const TestSeriesForm = ({id , testSeries}) => {
    const [testSeriesInput, setTestSeriesInput] = useState({
        totalTest: "",
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
    const addTestSEries = async (method) => {
        try {
            let res = (method === 'PUT') ? await axios.put(`https://courseselling.onrender.com/api/v1/updateTest/${id}`, testSeriesInput) : await axios.post(`https://courseselling.onrender.com/api/v1/createTest`, testSeriesInput);
            if(res) {
                console.log(res)
            }
        } catch(err) {
            console.log(err)
        }

    }
    useEffect(()=>{
        const updateTestSeries = testSeries?.filter((data) => data?._id === id);
        console.log(updateTestSeries , "updateTestSeries")
        if(updateTestSeries) {
            setTestSeriesInput(updateTestSeries[0])
        }
    },[id])
    return (
        <>
                <input placeholder="totalTest" onChange={(e) => {setTestSeriesInput({...testSeriesInput , totalTest: e.target.value})}} value={testSeriesInput?.totalTest}/>
                <input placeholder="freeTest" onChange={(e) => {setTestSeriesInput({...testSeriesInput , freeTest: e.target.value})}} value={testSeriesInput?.freeTest}/>
                <input placeholder="title" onChange={(e) => {setTestSeriesInput({...testSeriesInput , title: e.target.value})}} value={testSeriesInput?.title}/>
                <input placeholder="price" onChange={(e) => {setTestSeriesInput({...testSeriesInput , price: e.target.value})}} value={testSeriesInput?.price}/>
                <input placeholder="alreadyEnrolled" onChange={(e) => {setTestSeriesInput({...testSeriesInput , alreadyEnrolled: e.target.value})}} value={testSeriesInput?.alreadyEnrolled}/>
                <input placeholder="rating" onChange={(e) => {setTestSeriesInput({...testSeriesInput , rating: e.target.value})}} value={testSeriesInput?.rating}/>
                <input placeholder="createdAt" type="date" onChange={(e) => {setTestSeriesInput({...testSeriesInput , createdAt: e.target.value})}} value={testSeriesInput?.createdAt}/>
                <input placeholder="updatedAt" type="date" onChange={(e) => {setTestSeriesInput({...testSeriesInput , updatedAt: e.target.value})}} value={testSeriesInput?.updatedAt}/>
                <input placeholder="about" onChange={(e) => {setTestSeriesInput({...testSeriesInput , about: e.target.value})}} value={testSeriesInput?.about}/>
                <input placeholder="category" onChange={(e) => {setTestSeriesInput({...testSeriesInput , category: e.target.value})}} value={testSeriesInput?.category}/>
                <input placeholder="Exam" onChange={(e) => {setTestSeriesInput({...testSeriesInput , Exam: e.target.value})}} value={testSeriesInput?.Exam}/>
                {!id ? <button onClick={async () => { await addTestSEries('') }}>Add Course</button> : <button onClick={async () => { await addTestSEries('PUT') }}>Add Course</button>}

        </>
    )
}
