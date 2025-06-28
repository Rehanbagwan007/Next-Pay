"use server";

import prisma from "@/lib/prisma";


type User = {
  id:string | null
  email:string | null
  phone_number: string | null
  clerkId: string | null
  name: string |null
  netBalance: number |null
  createdAt: Date | null
  updatedAt: Date |null
}| null



export async function createUser(clerkId:string ,  email:string , phone_number : string , name:string) {
  
  
  
  
  const existing = await prisma.user.findUnique({
    where: {
      clerkId
    }
  })
  
  console.log(existing)

 
  
  
  
  
  
    if(!existing){
     const createdUser = await prisma?.user.create({
        data: {
          clerkId,
          email,
          phone_number,
          name,
       
          
        }
      });
     console.log(createdUser)
     
      
    }
  
    
    
       
    
    
  
  
}