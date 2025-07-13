"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { Card } from "@/components/ui/card";
import { BookSidebar } from "../components/BookSidebar";
import DefaultDashboard from "../components/DefualtDashboard";
import { usefetchUser } from "@/hooks/usefethUser";





export default function DashboardPage() {

  
  




  return (
    <div className="min-h-screen w-screen flex flex-row">

      <div className="md:w-1/4 md:h-screen none">
      <BookSidebar/>

      </div>


      <div className="w-3/4 h-screen">
      <DefaultDashboard/>
      </div>



    </div>
  
  );
} 