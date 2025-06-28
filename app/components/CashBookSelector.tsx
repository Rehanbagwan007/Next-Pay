import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Book } from "lucide-react";

const mockBooks = [
  { id: 1, name: "Personal Expenses", balance: 5500 },
  { id: 2, name: "Business Expenses", balance: 12000 },
  { id: 3, name: "Family Budget", balance: 3000 },
];

interface CashBookSelectorProps {
  onCreateNew?: () => void;
  onSelect?: (id: string) => void;
}

export default function CashBookSelector({ onCreateNew, onSelect }: CashBookSelectorProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-blue-700 text-lg">Your Books</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mockBooks.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition"
              onClick={() => onSelect?.(book.id.toString())}
            >
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span className="font-medium text-gray-700">{book.name}</span>
              </div>
              <span className="text-sm text-blue-600 font-semibold">₹{book.balance}</span>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 flex items-center gap-2"
          onClick={onCreateNew}
        >
          <Plus className="w-4 h-4" /> Add New Book
        </Button>
      </CardContent>
    </Card>
  );
}
