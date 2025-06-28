import { createSlice , PayloadAction } from "@reduxjs/toolkit";


const initialState =  {
  id:"",
  email:"",
  phone_number: "",
  clerkId: "",
  name: "" , 
  netBalance:0, 
 
}



const userSlice =  createSlice({
  
  name : "user",
  initialState , 
  reducers : {
    setUser(state , action : PayloadAction<typeof initialState>){
      return action.payload
    },
    updateBalance(state , action:PayloadAction<number>){
      state.netBalance = action.payload
    }
    
  }
})




export const {setUser  , updateBalance } = userSlice.actions
export default userSlice.reducer