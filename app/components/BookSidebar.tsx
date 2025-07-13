"use client";

import React, { useActionState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, BookOpen, Menu } from "lucide-react";
import { handleCreateBook } from "@/actions/create-book"; // Adjust the import path as necessary
import { useGetBook } from "@/hooks/useGetBook";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store";
import { getAllbooks, getRefresh } from "@/store/booksSlice";
import { useState } from "react";

interface Book {
  id: string;
  title: string;
  cashIn: number;
  cashOut: number;
  typeBook: "personal" | "business" | "family";
}

interface BookSidebarProps {
  className?: string;
}

const mockBooks: Book[] = [
  { id: "1", title: "Personal Expenses", cashIn: 5500, cashOut: 0, typeBook: "personal" },
  { id: "2", title: "Business 2023", cashIn: 12000, cashOut: 0, typeBook: "business" },
  { id: "3", title: "Family Budget", cashIn: 3000, cashOut: 0, typeBook: "family" },
  { id: "4", title: "Travel Fund", cashIn: 2500, cashOut: 0, typeBook: "personal" },
  { id: "5", title: "Emergency Fund", cashIn: 8000, cashOut: 0, typeBook: "personal" },
];

export function BookSidebar({ className }: BookSidebarProps) {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch()
  const bookId = params.bookId as string;

  const [isNewBookOpen, setIsNewBookOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  
  const user = useSelector((state:RootState)=>  state.user.user)
  
  const books = useSelector((state: RootState) => state.books.books);

  console.log("Books from redux" , books)



  
  const [state, formAction] = useActionState(
    async (_prevState:any, formData: FormData) => {
      const result = await handleCreateBook(formData);
      setIsNewBookOpen(!isNewBookOpen)
         
    
      if(result){
      
          dispatch(getRefresh())
        
         
       
      }
      
      

      if (!result?.errors) {
        setIsNewBookOpen(false);
        dispatch(getRefresh())
        // Refresh the books data
      }
      return result;
    },
    undefined
  );

  const handleBookClick = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  const BooksList = () => (
    <div className="flex h-full flex-col gap-2">
      <div className="px-4 py-2 flex flex-col gap-2">
        <h2 className="text-lg font-semibold tracking-tight">Your Books</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          />
          <Dialog open={isNewBookOpen} onOpenChange={setIsNewBookOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Book</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 py-4" action={formAction}>   
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="book-name">Book Name</label>
                  <Input
                    id="book-name"
                    placeholder="Enter book name"
                    name="bookname"
                    required
                  />
                  {state?.errors?.bookName && (
                    <p className="text-sm text-red-500">{state.errors.bookName[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="book-type">Type</label>
                  <select
                    id="book-type"
                    className="w-full p-2 rounded-md border"
                    name="booktype"
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="personal">Personal</option>
                    <option value="business">Business</option>
                    <option value="family">Family</option>
                  </select>
                  {state?.errors?.bookType && (
                    <p className="text-sm text-red-500">{state.errors.bookType[0]}</p>
                  )}
                </div>
                {state?.errors?.formError && (
                  <p className="text-sm text-red-500">{state.errors.formError[0]}</p>
                )}
                <Button className="w-full" type="submit">Create Book</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {books?.filter(book => book?.id && book.title && book.title.toLowerCase().includes(search.toLowerCase())).map((book) => (
            <button
              key={book.id}
              onClick={() => handleBookClick(book.id!)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors font-medium",
                bookId === book.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-[1.03]"
                  : "hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-200 hover:scale-[1.01]"
              )}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4" />
                <span>{book.title}</span>
              </div>
              <span
                className={cn(
                  "font-medium",
                  bookId === book.id ? "text-blue-700" : "text-gray-500"
                )}
              >
                ₹{(book.cashIn ?? 0) - (book.cashOut ?? 0)}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Dialog open={isNewBookOpen} onOpenChange={setIsNewBookOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="mr-2 h-4 w-4" /> New Book
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );

  // Mobile view uses Sheet component
  return (
    <>
      {/* Mobile View */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="h-full bg-white dark:bg-sidebar shadow-xl rounded-r-2xl border-r border-gray-200 dark:border-gray-700">
            <BooksList />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <div className={cn("hidden md:block h-full bg-white dark:bg-sidebar shadow-xl rounded-r-2xl border-r border-gray-200 dark:border-gray-700", className)}>
        <BooksList />
      </div>
    </>
  );
}
