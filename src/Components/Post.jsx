import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css"
import { Form } from "./Form";

export const Post = () => {
    
    const [data, setdata] = useState([]);
    const [UpdateDataApi, setUpdateDataApi] = useState({});

    const getPostData = async () => {
      const res = await getPost();
      setdata(res.data)
    }
  
    useEffect(() => {
      getPostData();
    },[])
    
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            
            if(res.status === 200){
                const newUpdatedPosts = data.filter((curPost) => {
                    return curPost.id !== id
                })
                setdata(newUpdatedPosts)
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

    return(
    <>
        <section className="section-form">
            <Form data={data} setdata={setdata} UpdateDataApi={UpdateDataApi} setUpdateDataApi={setUpdateDataApi}/>
        </section>
     <section className="section-post">
        <ol>
            {
                data.map((curElem) => {
                    const {id, body, title} = curElem
                    return(
                        <li key={id}>
                            <p>Title: {title}</p>
                            <p>Body: {body}</p> 
                            <button onClick={() => handleUpdatePost(curElem)}>Edit</button> 
                            <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>     
                        </li>
                    )
                })
            }
        </ol>
     </section>
     </>
    )
}