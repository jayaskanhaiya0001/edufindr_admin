import { useEffect, useState } from "react";
import { FileInput } from "../common/Fields/fileInput";
import { AddItem } from "../common/Placeholder/add";
import axios from "axios";
export const Freebeis = () => {
    const [freebeisInput, setFreebeisInput] = useState({
        freeBees: {
            key: "",
            value: ""
          }
        
      })
    const [frebeisInfo, setFreebeisInfo] = useState("file");
    const [allFreebeis , setAllFreebeis] = useState([])
    const [toggle, setToggle] = useState({
        key: null,
        boolVal: false
    })
    const [pdfUrl , setPdfUrl] = useState("")

    const getFileInputValue = (event) => {
        setPdfUrl(URL.createObjectURL(event.target.files[0]))
    }
      const addFreebeis = async () => {
        try {

            const res = await axios.post(`https://courseselling.onrender.com/api/v1/createFreebees`, freebeisInput)
            if(res) {
                console.log(res , "Response")
            }
        } catch (err) {
            console.log(err)
        }
       
      }
      const getFreebeis = async () => {
        try {

            const res = await axios.get(`https://courseselling.onrender.com/api/v1/getAllFreebees?filter=${frebeisInfo}`, freebeisInput)
            if(res) {
                console.log(res , "Response1")
                setAllFreebeis(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
       
      }
      const deleteFreebeis = async (id) => {
        try {

            const res = await axios.get(`https://courseselling.onrender.com/api/v1/deleteFreebees/${id}`)
            if(res) {
                console.log(res , "Response1")
                setAllFreebeis(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
       
      }
      useEffect(()=> {
        getFreebeis()
      },[frebeisInfo])
    return (
        <>
        
        <div>
        <div className="Grid-Box">
                    {
                        allFreebeis?.map((data, index) => {
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
                                                            {/* <button onClick={async () => setId(data?._id)}>Update</button> */}
                                                            <button onClick={() => deleteFreebeis(data?._id)}>Delete</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <img src={'/images/dummy.png'} alt="teacher" style={{ height: "150px", width: "100%" }}/>
                                        <h3>{data?.about}</h3>

                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            <div>
                <button onClick={() => setFreebeisInfo('file')}>Files</button>
                <button onClick={() => setFreebeisInfo('video')}>Videos</button>
            </div>
            <select onChange={(e) => {setFreebeisInput({...freebeisInput , freeBees: {...freebeisInput?.freeBees, key: e.target.value}})}}>
                <option value="">Select Your Freebeis</option>
                <option value="file">File</option>
                <option value="video">Video</option>
            </select>
            <iframe id="viewer" frameborder="0" scrolling="no" width="300" height="200" src={pdfUrl}></iframe>
            <input type="file" onChange={(e) => {setFreebeisInput({...freebeisInput , freeBees: {...freebeisInput?.freeBees, value: e.target.value}}); getFileInputValue(e)}}/>
            <button onClick={() => addFreebeis()}>Add Freebeis</button>
        </div>
        </>
    )
}