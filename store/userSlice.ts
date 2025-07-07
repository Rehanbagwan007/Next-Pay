import { createSlice , PayloadAction } from "@reduxjs/toolkit";


const initialState =  {
  id:"",
  email:"",
  phone_number: "",
  clerkId: "",
  name: "" , 
  netBalance:0, 
  userRefresh: false, // <-- Added userRefresh
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
    },
    setUserRefresh(state) { // <-- Added reducer for userRefresh
      state.userRefresh = !state.userRefresh;
    }
    
  }
})




export const {setUser  , updateBalance , setUserRefresh} = userSlice.actions
export default userSlice.reducer