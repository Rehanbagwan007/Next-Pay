"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DollarSign, Menu , IndianRupee } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store";


interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const Header: React.FC = () => {

  const user = useSelector((state:RootState)=> state.user)
  console.log(user)


  const NavItems: React.FC = () => (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <IndianRupee className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NextPay
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 mx-6">
          <NavItems />
        </nav>

        <div className="flex items-center space-x-3 ml-auto">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>

          {/* Auth Buttons */}
          <SignedOut>
            <div className="hidden md:flex items-center space-x-3">
              <SignInButton>
                <Button variant="ghost" className="text-sm font-medium">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
            {/* Mobile Auth Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <SignInButton>
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </SignInButton>
                <SignUpButton>
                  <DropdownMenuItem>Get Started</DropdownMenuItem>
                </SignUpButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedOut>

          {/* user name*/}
        
          
           
          <SignedIn>

            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
            
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;