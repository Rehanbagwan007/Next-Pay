"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"


interface UserInterface {

    id:string,
  email:string,
  phone_number:string,
  clerkId:string,
  name:string, 
  netBalance:number, 
  userRefresh: boolean,


}



export  const getUser = async ()=>{


  
try{
  const Getuser  = await currentUser()
  const userRefresh = false
  
  const user = await prisma.user.findUnique({
    where:{
      clerkId:Getuser?.id
      
    }
  })

  const ExtendedUser = {
    ...user,
    userRefresh:false
  }

  

  
  
  
  return(

    user

    



  )
  
}catch(error){
  
  console.log(error)
  

  
}










}