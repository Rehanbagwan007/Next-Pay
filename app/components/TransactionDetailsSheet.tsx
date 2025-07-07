"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Trash2, 
  Calendar, 
  DollarSign, 
  FileText, 
  CreditCard, 
  User,
  Tag,
  ArrowUpCircle,
  ArrowDownCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTransactionRefresh } from "@/store/transactionSlice";
import { getRefresh } from "@/store/booksSlice";
import { setUserRefresh } from "@/store/userSlice";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "CASH_IN" | "CASH_OUT";
  date: string;
  category?: string;
  paymentMode?: string;
  familyMember?: string;
  note?: string;
  bill?: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onDelete?: (transactionId: string) => void;
}

const TransactionDetailsSheet: React.FC<TransactionDetailsSheetProps> = ({
  open,
  onClose,
  transaction,
  onDelete,
}) => {
  if (!transaction) return null;
  const dispatch = useDispatch()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {

    async function DeleteTransaction(){

      try{

        const resposne = await axios.post("/api/deleteTransaction" , {
             transaction_id : transaction?.id
          
        })

        console.log(resposne)
        if(resposne.status === 200){
          dispatch(setTransactionRefresh())
          dispatch(getRefresh())
          dispatch(setUserRefresh())
         
        }



      }catch(err){
        console.log(err)



      }



    }


   DeleteTransaction()


   
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-gray-900">
              Transaction Details
            </SheetTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Transaction Type Badge */}
            <div className="flex items-center gap-3">
              {transaction.type === "CASH_IN" ? (
                <ArrowDownCircle className="h-6 w-6 text-green-500" />
              ) : (
                <ArrowUpCircle className="h-6 w-6 text-red-500" />
              )}
              <Badge 
                variant={transaction.type === "CASH_IN" ? "default" : "destructive"}
                className="text-sm font-medium"
              >
                {transaction.type === "CASH_IN" ? "Cash In" : "Cash Out"}
              </Badge>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {transaction.title}
              </h3>
            </div>

            <Separator />

            {/* Amount */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span>Amount</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ₹{transaction.amount.toLocaleString()}
              </div>
            </div>

            <Separator />

            {/* Date and Time */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Transaction Date</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(transaction.date)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Created</span>
                </div>
                <div className="text-sm text-gray-700">
                  {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
                </div>
              </div>

              {transaction.updatedAt !== transaction.createdAt && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last Updated</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    {formatDate(transaction.updatedAt)} at {formatTime(transaction.updatedAt)}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Payment Mode */}
            {transaction.paymentMode && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Mode</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 capitalize">
                    {transaction.paymentMode}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Category */}
            {transaction.category && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span>Category</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 capitalize">
                    {transaction.category}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Family Member */}
            {transaction.familyMember && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Family Member</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.familyMember}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Note */}
            {transaction.note && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>Note</span>
                  </div>
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                    {transaction.note}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Bill Attachment */}
            {transaction.bill && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>Bill Attachment</span>
                  </div>
                  <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    View Bill
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Transaction ID */}
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Transaction ID</div>
              <div className="text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded">
                {transaction.id}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailsSheet; 