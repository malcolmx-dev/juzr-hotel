import { Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { FaRegCircleUser, FaRegTrashCan } from "react-icons/fa6"
import { PiListPlus } from "react-icons/pi";
import useFetch from "../../clients/features/get_withcredentials"



export default function User(){
    const navigate= useNavigate()


    const {data, loading, error, refreshData}= useFetch(`http://localhost:10000/api/user`)

    if(error?.response?.status===401){
        alert(error.response.statusText)
        navigate('/admin')

    }

   

    const handleDelete= async(id) => {
        try{
            const res= axios({
                method:'delete',
                url: `http://localhost:10000/api/user/${id}`,
                withCredentials: true,

            })
            console.log(res.data)
            refreshData()
        }catch(err){
            console.log(err)
        }
    }
    const handleBlackList= async(id) => {
        try{
            const res= axios({
                method:'put',
                url: `http://localhost:10000/api/user/${id}`,
                withCredentials: true,
                data:{
                    blackList:true
                }

            })
            console.log(res.data)
            refreshData()
        }catch(err){
            console.log(err)
        }
    }

return(
    loading  ? <div class="spinner-border bg-secondary align-middle text-primary" role="status"> </div>:
    <div className="w-100 h-100 bg-secondary">
        <h1 className="text-center pt-3">Users List</h1>
        <div className="d-flex flex-column align-items-center justify-content-center  w-100 mt-5">
            
            {data?.map((user)=>
                <div className="d-flex align-items-center justify-content-between w-25 border fs-5 text-center rounded m-2 shadow-sm">
                    <Button className="bg-danger p-1 m-1 fs-6 h-75 border border border-3 text-white" onClick={() => handleDelete(user._id)} ><FaRegTrashCan className="mb-1" /></Button>
                    <p className="p-0 m-0"><FaRegCircleUser className='mb-1 me-1' /> {user.name} {user.surname}</p>
                    <Button className="bg-dark text-white p-1 border border-3 " onClick={() => handleBlackList(user._id)}><PiListPlus /></Button>
                </div>
            )}
            
        </div>
    </div>
    )
}