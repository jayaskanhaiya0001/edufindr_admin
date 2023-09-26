import { useState } from "react"

export const FileInput = ({getFileInputValue}) => {
    const [imgUrl , setImgUrl] = useState("")
    function printFile(event) {
        getFileInputValue(event)
        const reader = new FileReader();
        reader.onload = function(){
            if(reader?.result) {
                setImgUrl(reader?.result)
            }
          };
          reader.readAsDataURL(event.target.files[0]);
      }
    return (
        <>
        <div className="Input-Field-Box">
            {imgUrl && <img src={imgUrl} alt="" width={'100px'} height={'80px'}/>}
            <input type="file" name="file" onChange={(e) => {
                printFile(e)
                
            }}/>
        </div>
        </>
    )
}