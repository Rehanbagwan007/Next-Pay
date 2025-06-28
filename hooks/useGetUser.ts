
"use client"

import { createUser } from "@/actions/create-user";
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function useGetUser(){
  const { user } = useUser();
  
  const router = useRouter();

  useEffect(()=>{
    
    
    if(user){
      router.push("/dashboard");
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
