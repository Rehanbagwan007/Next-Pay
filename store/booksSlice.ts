import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id?: string;
  title?: string;
  cashIn?: number;
  cashOut?: number;
  typeBook?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Add other fields as needed
}

interface BooksState {
  books: Book[];
  refresh: boolean;
  isActive: boolean;
}

const initialState: BooksState = {
  books: [],
  refresh: false,
  isActive: false,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getAllbooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getisActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { getAllbooks, getRefresh, getisActive } = booksSlice.actions;
export default booksSlice.reducer;