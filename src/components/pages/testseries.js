import axios from "axios";
import { AddItem } from "../common/Placeholder/add";
import { useEffect, useState } from "react";
import { ChipInput } from "../common/Fields/chipInput";
export const TestSeries = () => {
    const [testSeries, setAllTestSeries] = useState([])
    const [id, setId] = useState('')
    const [toggle, setToggle] = useState({
        key: null,
        boolVal: false
    })
    const [testSeriesInput, setTestSeriesInput] = useState({
        totalTest: "",
        freeTest: "",
        title: "",
        alreadyEnrolled: null,
        price: null,
        rating: null,
        languages: [],
        about: "",
        highlights: [],
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
        category: "",
        Exam: "",
        createdAt: "2023-08-22T12:00:00Z",
        updatedAt: "2023-08-22T14:30:00Z"
    })
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
    const TestSeriesHandle = (params) => {
        let obj = testSeries.filter((data) => params === data?._id && data);
        if(obj) {
            setTestSeriesInput(obj[0])
        }
    }

    const AddNewTestSeries =() => {

    }
    return (
        <>

            <div>
                <div className="Grid-Box">
                    <AddItem inputHandle={AddNewTestSeries} text={'Add New Test Series'} />
                    {
                        testSeries?.map((data, index) => {
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
                                                            <button onClick={async () => TestSeriesHandle(data?._id)}>Update</button>
                                                            <button onClick={() => DeleteTestSeries(data?._id)}>Delete</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <img src={'/images/dummy.png'} alt="test-series" style={{ height: "150px", width: "100%" }} />
                                        <h1>{data?.title}</h1>
                                        <h3>{data?.Exam}</h3>
                                        <p>{data?.about}</p>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <TestSeriesForm id={id} testSeries={testSeries} testSeriesInput={testSeriesInput} setTestSeriesInput={setTestSeriesInput}/>
            </div>
        </>
    )
}

const TestSeriesForm = ({ id, testSeries , testSeriesInput , setTestSeriesInput}) => {
    
    const [arrInput, setArrInput] = useState({
        highLightInput: "",
        lanuguageInput: "",
    })
    const addTestSEries = async (method) => {
        try {
            let res = (method === 'PUT') ? await axios.put(`https://courseselling.onrender.com/api/v1/updateTest/${id}`, testSeriesInput) : await axios.post(`https://courseselling.onrender.com/api/v1/createTest`, testSeriesInput);
            if (res) {
                console.log(res)
            }
        } catch (err) {
            console.log(err)
        }

    }

    const UpdateTestSeries = async () => {
        try {
            let res = await axios.put(`https://courseselling.onrender.com/api/v1/updateTest/${id}`, testSeriesInput)
            if (res) {
                console.log(res)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleHighlight = (val) => {
            setTestSeriesInput({ ...testSeriesInput, highlights: [...testSeriesInput?.highlights, { description: val}] })
    };

    const deletHighlight = (index) => {
        setTestSeriesInput({ ...testSeriesInput, highlights: testSeriesInput?.highlights?.filter((data, ind) => index !== ind && data) })
    }

    const handleLanguages = (val) => {
            setTestSeriesInput({ ...testSeriesInput, languages: [...testSeriesInput?.languages, { description: val }] })
    };


    const deletLanguages = (index) => {
        setTestSeriesInput({ ...testSeriesInput, highlights: testSeriesInput?.highlights?.filter((data, ind) => index !== ind && data) })
    }
    return (
        <>
            <div className="Form-Input-Box">
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Total Test</span>
                        <input placeholder="Total Test" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, totalTest: e.target.value }) }} value={testSeriesInput?.totalTest} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>Free Test</span>
                        <input placeholder="Free Test" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, freeTest: e.target.value }) }} value={testSeriesInput?.freeTest} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Title</span>
                        <input placeholder="Title" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, title: e.target.value }) }} value={testSeriesInput?.title} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>Price</span>
                        <input placeholder="Price" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, price: e.target.value }) }} value={testSeriesInput?.price} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Already Enrolled</span>
                        <input placeholder="Already Enrolled" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, alreadyEnrolled: e.target.value }) }} value={testSeriesInput?.alreadyEnrolled} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>Rating</span>
                        <input placeholder="Rating" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, rating: e.target.value }) }} value={testSeriesInput?.rating} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>About</span>
                        <input placeholder="About" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, about: e.target.value }) }} value={testSeriesInput?.about} />
                    </div>
                    <div className="Input-Field-Box">
                        <span>Category</span>
                        <input placeholder="category" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, category: e.target.value }) }} value={testSeriesInput?.category} />
                    </div>
                </div>
                <div className="Input-Field-row">
                    <div className="Input-Field-Box">
                        <span>Exam</span>
                        <input placeholder="Exam" onChange={(e) => { setTestSeriesInput({ ...testSeriesInput, Exam: e.target.value }) }} value={testSeriesInput?.Exam} />
                    </div>
                    <ChipInput label={'Highlights'} items={testSeriesInput?.highlights} handleHighlight={handleHighlight} deletHighlight={deletHighlight}/>
                </div>
                <div className="Input-Field-row">
                    <ChipInput label={'Languages'} items={testSeriesInput?.languages} handleHighlight={handleLanguages} deletHighlight={deletLanguages}/>
                </div>
            </div>
            <div className="btn-Box">
                {!id ? <button onClick={async () => { await addTestSEries('') }} className="Form-Btn">Submit</button> : <button onClick={async () => { await addTestSEries('PUT') }} className="Form-Btn">Submit</button>}
            </div>

        </>
    )
}
