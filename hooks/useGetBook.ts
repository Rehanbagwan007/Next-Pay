"use client";

import { getBooks } from "@/actions/get-books"
import { RootState } from "@/store";
import { getAllbooks, getRefresh } from "@/store/booksSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useGetBook = (userId: string ) => {
 const dispatch = useDispatch()
 const { refresh } = useSelector((state:RootState)=> state.books)
 


        useEffect(()=>{
                async function fetchBooks(){
              
                  try{
                  const books = await getBooks(userId);
                  
                  
                   if(books){
                         dispatch(getAllbooks(books)) 
                           
                       
                        
                        
                        }
                  

                 

                  } catch (errr){
                        console.log(errr)
                  } 
                



                }

                fetchBooks()




        },[userId,dispatch,refresh])
 


     
   
};







