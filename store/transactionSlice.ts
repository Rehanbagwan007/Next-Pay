import { createSlice, PayloadAction } from '@reduxjs/toolkit';



 interface Transaction {
  id?: string ;
  title?: string;
  userId?: string;
  amount?:number;
  bookId?:string;
  type?: string;
  paymentMode: string;
  note?: string;
  billurl?: string;
  createdAt?: object;
  
}
interface TransactionState {
   Transaction: Transaction[];
  TransactionRefresh: boolean;
  TransactionisActive: boolean;
}
const initialState: TransactionState= {
   Transaction: [],
    TransactionRefresh: false,
    TransactionisActive: false,
};



const TransactionSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getAllTransaction: (state, action: PayloadAction<Transaction[]>) => {
      state.Transaction = action.payload;
    },
    setTransactionRefresh: (state) => {
      state.TransactionRefresh= !state.TransactionRefresh;
    },
    setTransactionActive: (state, action: PayloadAction<boolean>) => {
      state.TransactionisActive = action.payload;
    },
  },
});

export const { getAllTransaction , setTransactionRefresh , setTransactionActive } = TransactionSlice.actions;
export default TransactionSlice.reducer;