"use client";

import React, { useActionState } from "react";
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


interface Book {
  id: string;
  name: string;
  balance: number;
  type: "personal" | "business" | "family";
}

const mockBooks: Book[] = [
  { id: "1", name: "Personal Expenses", balance: 5500, type: "personal" },
  { id: "2", name: "Business 2023", balance: 12000, type: "business" },
  { id: "3", name: "Family Budget", balance: 3000, type: "family" },
  { id: "4", name: "Travel Fund", balance: 2500, type: "personal" },
  { id: "5", name: "Emergency Fund", balance: 8000, type: "personal" },
];

interface BookSidebarProps {
  className?: string;
}

export function BookSidebar({ className }: BookSidebarProps) {
  const [selectedBook, setSelectedBook] = React.useState<string>(mockBooks[0].id);
  const [isNewBookOpen, setIsNewBookOpen] = React.useState(false);
  
  const [state, formAction] = useActionState(
  async (_prevState:any, formData: FormData) => {
    return await handleCreateBook(formData);
  },
  undefined
);



  const BooksList = () => (
    <div className="flex h-full flex-col gap-2">
      <div className="px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold tracking-tight">Your Books</h2>
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="book-type">Type</label>
                <select
                  id="book-type"
                  className="w-full p-2 rounded-md border"
                  name="booktype"
                  required
                >
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <Button className="w-full" type="submit">Create Book</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {mockBooks.map((book) => (
            <button
              key={book.id}
              onClick={() => setSelectedBook(book.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors",
                selectedBook === book.id
                  ? "bg-blue-100 text-blue-900 hover:bg-blue-200"
                  : "hover:bg-blue-50 text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4" />
                <span>{book.name}</span>
              </div>
              <span
                className={cn(
                  "font-medium",
                  selectedBook === book.id ? "text-blue-700" : "text-gray-500"
                )}
              >
                ₹{book.balance}
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
          <BooksList />
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <div className={cn("hidden md:block h-full", className)}>
        <BooksList />
      </div>
    </>
  );
}
