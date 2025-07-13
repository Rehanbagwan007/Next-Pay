"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActionState } from "react";
import { handleCreateTransaction } from "@/actions/create-transaction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getRefresh } from "@/store/booksSlice";
import { set } from "zod";
import { setUserRefresh } from "@/store/userSlice";
import { setTransactionRefresh } from "@/store/transactionSlice";





  enum TransactionType {
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",  }



interface TransactionFormSheetProps {
  open: boolean;
  onClose: () => void;
  type: TransactionType; // Assuming type is either "CASH_IN" or "CASH_OUT"
  bookId: string; // Assuming bookId is a string
}

const categories = ["Salary", "Groceries", "Transport", "Freelance", "Other"];
const members = ["John", "Jane", "Dad", "Mom"];
const modes = ["Cash", "Online", "Paytm", "UPI"];

const TransactionFormSheet: React.FC<TransactionFormSheetProps> = ({
  open,
  onClose,
  type,
  bookId,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const userID = user[0]?.id;
  const dispatch = useDispatch()
  const [state, formAction] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const result = await handleCreateTransaction(formData, bookId, userID,type);
      dispatch(getRefresh())
      dispatch(setUserRefresh())
      dispatch(setTransactionRefresh())
 

      if (!result?.errors) {
      }
      return result;
    },
    undefined
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
     
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
          <form className="grid gap-4 py-4 px-6" action={formAction}>
        <SheetHeader className="p-6">
          <SheetTitle className="text-xl font-bold text-blue-700">
            {type} Entry
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-140px)]">
         
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Transaction title"
                className="col-span-3"
                name="title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="col-span-3"
                name="amount"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                 type="date"
                className="col-span-3"
                name="date"
              />
            </div>
           { /* <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="mode">Payment Mode</Label>
              <Select name="mode">
                <SelectTrigger >
                  <SelectValue placeholder="Select payment mode"  />
                </SelectTrigger>
                <SelectContent >
                  {modes.map((mode) => (
                    <SelectItem key={mode} value={mode.toLowerCase()}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
      {/*  <div className="grid gap-2">
              <Label htmlFor="member">Family Member</Label>
              <Select name="member">
                <SelectTrigger>
                  <SelectValue placeholder="Select family member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member} value={member.toLowerCase()}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Input
                id="note"
                placeholder="Add a note"
                className="col-span-3"
                name="note"
              />
            </div>
         {  /* <div className="grid gap-2">
              <Label htmlFor="bill">Attach Bill (optional)</Label>
              <Input
                id="bill"
                 type="string"
                className="col-span-3"
                accept="image/*,application/pdf"
                name="bill"
              />
            </div>*/ }
               
        </ScrollArea>
        <div className="p-6 absolute bottom-0 w-full bg-white">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
            Add Entry
          </Button>
        </div>
          </form>
      </SheetContent>
    

    </Sheet>
  );
};

export default TransactionFormSheet;
