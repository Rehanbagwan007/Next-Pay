import { combineReducers, configureStore} from "@reduxjs/toolkit"

import  userReducer from "./userSlice"

import booksReducer from "./booksSlice"

import transactionReducer from "./transactionSlice"



export const  store =  configureStore({
  reducer : combineReducers({ 
    user : userReducer,
    books : booksReducer,
    transaction:transactionReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})


export type RootState =  ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch