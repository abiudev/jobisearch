"use client";

import { useState, useEffect } from "react";

import { Coffee, Home, Phone, Briefcase, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed  top-0 left-0 right-0 z-50 transition-all  duration-300  ease-in-out
      ${
        isScrolled
          ? "h-16 bg-white shadow-md rounded-b-lg border-b border-teal-600"
          : "h-20 bg-white rounded-b-lg border-b border-teal-600"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <img src="/jslogo.png" width={120} height={120} />
        </a>

        <div className="hidden  md:flex space-x-6">
          <NavLink href="/" icon={<Home className="h-4 w-4 text-black " />}>
            Home
          </NavLink>
          <NavLink href="/services" icon={<Briefcase className="h-4 w-4" />}>
            Services
          </NavLink>
          <NavLink href="/contact" icon={<Phone className="h-4 w-4" />}>
            Contact Us
          </NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/signup")}>
            Sign In
          </Button>
          <Button className="bg-teal-600">
            <Coffee className="mr-2 h-4 w-4 " /> Buy me coffee
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <Button variant="outline" className="mr-2">
            Sign In
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLink href="/" icon={<Home className="h-4 w-4" />}>
                  Home
                </NavLink>
                <NavLink
                  href="/services"
                  icon={<Briefcase className="h-4 w-4" />}
                >
                  Services
                </NavLink>
                <NavLink href="/contact" icon={<Phone className="h-4 w-4" />}>
                  Contact Us
                </NavLink>
                <Button className="mt-4">
                  <Coffee className="mr-2 h-4 w-4" /> Buy me coffee
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const NavLink = ({ href, children, icon }: NavLinkProps) => (
  <a
    href={href}
    className="flex items-center space-x-1 text-gray-600 hover:text-teal-600"
  >
    {icon}
    <span>{children}</span>
  </a>
);

export default Navbar;
