import { getBooks } from "@/actions/get-books"
import { RootState } from "@/store"
import { useSelector } from "react-redux"




export const useGetBook = async (userId:string) => {

 



  const books = await getBooks(userId)
  console.log(books)

 
  

     





}