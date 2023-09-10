import { useEffect, useState } from "react";
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
                                    <div>
                                        {console.log(data , "Data")}
                                        <img src={'/images/dummy.png'} alt="teacher" />
                                        <h3>{data?.about}</h3>
                                        <button onClick={() => deleteFreebeis(data?._id)}>Delete</button>
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
            <input type="file" onChange={(e) => {setFreebeisInput({...freebeisInput , freeBees: {...freebeisInput?.freeBees, value: e.target.value}})}}/>
            <button onClick={() => addFreebeis()}>Add Freebeis</button>
        </div>
        </>
    )
}