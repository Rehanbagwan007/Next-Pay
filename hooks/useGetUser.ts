
"use client"

import { createUser } from "@/actions/create-user";
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
export function useGetUser(){
  const { user } = useUser();
  
  const router = useRouter();

 const book = useSelector((store:RootState)=> store.books.books)

   const bookID =  book.map((book)=>{
      return book.id



    })

  console.log("Book ID", bookID)





  useEffect(()=>{

   


    
    
    if(user){
      router.push(`/dashboard/`);
      (async () => {
        await createUser(
          user.id,
          user.emailAddresses?.[0]?.emailAddress ?? "",
          user.phoneNumbers?.[0]?.phoneNumber ?? "",
          user.fullName ?? `user${Math.random()}`        );
      })();
    }
  },[user,router]);
}
