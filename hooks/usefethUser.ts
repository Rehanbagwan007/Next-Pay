import { getUser } from "@/actions/get-user"
import { RootState } from "@/store"
import { setUser } from "@/store/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



export const usefetchUser = ()=>{

    const dispatch =  useDispatch()
    const userRefresh = useSelector((store: RootState) => store.user?.userRefresh ?? false);










    useEffect(()=>{

        async function GETUSER() {

            try{


                const user = await getUser()
              


                if(user) dispatch(setUser([user]))








            }catch(err){



            }

          
            
        }
                             GETUSER()



    },[userRefresh,dispatch])






    







}