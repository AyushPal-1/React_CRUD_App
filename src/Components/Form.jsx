import { useEffect, useState } from "react"
import { postData, updateData } from "../api/PostApi";

export const Form = ({data, setdata, UpdateDataApi, setUpdateDataApi}) => {
    const [addData, setaddData] = useState({
        title:"",
        body:"",
    })
    let isEmpty = Object.keys(UpdateDataApi).length === 0;
    
    useEffect(() => {
        UpdateDataApi && setaddData({
            title: UpdateDataApi.title || "",
            body: UpdateDataApi.body || "",

        })
    },[UpdateDataApi])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setaddData((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    const addPostData = async () => {
       const res = await postData(addData);
       if(res.status === 201){
        setdata([...data, res.data])
        setaddData({title:"", body:""})
        
       }
    }
    const UpdatePostData = async () => {
      try {
        const res = await updateData(UpdateDataApi.id, addData)
        if (res.status === 200){
            setdata((prev) => {
                return prev.map((curElem) => {
                 return curElem.id === res.data.id ? res.data : curElem;
                })
                 
             })
             setaddData({title:"", body:""})
             setUpdateDataApi({})
        }
      } catch (error) {
        console.log(error);
        
      }
      
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === "Add"){
            addPostData();
        }else if (action === "Edit"){
            UpdatePostData();
        }
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input type="text" name="title" autoComplete="off" id="title" placeholder="Add Title" value={addData.title} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="body"></label>
                <input type="text" name="body" autoComplete="off" id="body" placeholder="Add Post" value={addData.body} onChange={handleInputChange} />
            </div>
            <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ?  "Add" : "Edit"}</button>

        </form>
    )
}