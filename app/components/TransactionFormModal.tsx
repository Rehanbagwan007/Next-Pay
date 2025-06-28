"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface TransactionFormModalProps {
  open: boolean;
  onClose: () => void;
  type: "Cash In" | "Cash Out";
}

const categories = ["Salary", "Groceries", "Transport", "Freelance", "Other"];
const members = ["John", "Jane", "Dad", "Mom"];
const modes = ["Cash", "Online", "Paytm", "UPI"];

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({
  open,
  onClose,
  type,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-700">
            {type} Entry
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
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
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mode">Payment Mode</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                {modes.map((mode) => (
                  <SelectItem key={mode} value={mode.toLowerCase()}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="member">Family Member</Label>
            <Select>
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
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="Add a note"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bill">Attach Bill (optional)</Label>
            <Input
              id="bill"
              type="file"
              className="col-span-3"
            />
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
          Add Entry
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionFormModal;
