
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(){
  
  
  
  
  
try{
  const Getuser  = await currentUser()
  
  const user = await prisma.user.findUnique({
    where:{
      clerkId:Getuser?.id
      
    }
  })
  
  
  if(!user){
    return NextResponse.json({
      succces:false,
      data:null,
      message:"user not found"
    })
  }
  
  return NextResponse.json({
    success:true,
    data:user,
    message:"data successfully find"
  })
  
}catch(error){
  
  
  console.log(error)
  
  
  
  
}
  
  
  
  
}