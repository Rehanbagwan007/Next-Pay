import { createSlice , PayloadAction } from "@reduxjs/toolkit";



interface User {

    id: string;
    email: string;
    phone_number: string;
    clerkId: string;
    name: string | null;
    netBalance: number;
    createdAt: Date;
    updatedAt: Date;
  
 

}


interface UserState {
   user:User[],
   userRefresh:boolean

}





const initialState:UserState =   {
  user:[],
  userRefresh:false

}



const userSlice =  createSlice({
  
  name : "user",
  initialState , 
  reducers : {
    setUser(state , action : PayloadAction<User[]>){
        state.user =  action.payload
    },
    updateBalance(state , action:PayloadAction<number>){
      state.user[0].netBalance= action.payload
    },
    setUserRefresh(state) { // <-- Added reducer for userRefresh
      state.userRefresh = !state.userRefresh;
    }
    
  }
})




export const {setUser  , updateBalance , setUserRefresh} = userSlice.actions
export default userSlice.reducer