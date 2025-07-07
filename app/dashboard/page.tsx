"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

const DashboardPage = () => {
  const router = useRouter();
  const books = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    if (books && books.length > 0) {
      router.replace(`/dashboard/${books[0].id}`);
    }
  }, [books, router]);

  return <div>Loading...</div>;
};

export default DashboardPage; 