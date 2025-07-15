"use client";

import React, { useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
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
import { handleCreateBook } from "@/actions/create-book";
import { useGetBook } from "@/hooks/useGetBook";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getRefresh } from "@/store/booksSlice";

interface BookSidebarProps {
  className?: string;
}

export function BookSidebar({ className }: BookSidebarProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const bookId = params.bookId as string;
  const [isNewBookOpen, setIsNewBookOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const books = useSelector((state: RootState) => state.books.books);

  const [state, formAction] = React.useActionState(
    async (_prevState: any, formData: FormData) => {
      const result = await handleCreateBook(formData);
      setIsNewBookOpen(!isNewBookOpen);
      if (result) {
        dispatch(getRefresh());
      }
      if (!result?.errors) {
        setIsNewBookOpen(false);
        dispatch(getRefresh());
      }
      return result;
    },
    undefined
  );

  const handleBookClick = (id: string) => {
    router.push(`/dashboard/${id}`);
    setSidebarOpen(false);
  };

  // Sidebar content
  const sidebarContent = (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Back to Dashboard button if on /dashboard/[id] */}
      {pathname && /^\/dashboard\/.+/.test(pathname) && (
        <button
          className="flex items-center gap-2 p-2 mb-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium"
          onClick={() => router.push("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      )}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-xl text-blue-700">Cash Books</span>
        <Dialog open={isNewBookOpen} onOpenChange={setIsNewBookOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline" className="ml-2">
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <form action={formAction} className="space-y-4">
              <Input name="title" placeholder="Book Title" required />
              <Button type="submit" className="w-full">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-2">
        <Input
          placeholder="Search books..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-2"
        />
      </div>
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
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => setIsNewBookOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Book
        </Button>
      </div>
    </div>
  );

  // Mobile sidebar with Sheet
  return (
    <>
      <div className="md:hidden flex items-center p-2 border-b bg-white dark:bg-card sticky top-0 z-20">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <span className="ml-2 font-bold text-lg text-blue-700">Cash Books</span>
      </div>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[80vw] max-w-xs p-0 flex flex-col">
          <div className="flex justify-end p-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <span className="text-2xl">×</span>
            </Button>
          </div>
          {sidebarContent}
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-full">
        {sidebarContent}
      </div>
    </>
  );
}
