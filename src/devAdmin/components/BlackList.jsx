import { Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { FaRegCircleUser } from "react-icons/fa6"
import { PiListPlus } from "react-icons/pi";
import useFetch from "../../clients/features/get_withcredentials"



export default function BlackList(){
    const navigate= useNavigate()


    const {data, loading, error, refreshData}= useFetch(`http://localhost:10000/api/user?blackList=${true}`)

    if(error?.response?.status===401){
        alert(error.response.statusText)
        navigate('/admin')

    }


    const handleBlackList= async(id) => {
        try{
            const res= axios({
                method:'put',
                url: `http://localhost:10000/api/user/${id}`,
                withCredentials: true,
                data:{
                    blackList:false
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
        <h1 className="text-center pt-3">BlackList</h1>
        <div className="d-flex flex-column align-items-center justify-content-center  w-100 mt-5">
            
            {data?.map((user)=>
                <div className="d-flex align-items-center justify-content-between w-25 border fs-5 text-center rounded m-2 shadow-sm">
                    <p className="p-0 m-0"><FaRegCircleUser className='mb-1 me-1' /> {user.name} {user.surname}</p>
                    <Button className="bg-primary text-white p-1 border border-3 " onClick={() => handleBlackList(user._id)}><PiListPlus /></Button>
                </div>
            )}
            
        </div>
    </div>
    )
}