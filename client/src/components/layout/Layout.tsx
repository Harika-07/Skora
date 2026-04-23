import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, LogOut, Info, History } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Layout({ children, onLogout }: { children: React.ReactNode, onLogout?: () => void }) {
  const [, setLocation] = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-cover bg-fixed" style={{ backgroundImage: "url('/src/assets/medical-bg.png')" }}>
        <AppSidebar onLogout={onLogout} />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 border-b border-border/40 bg-white/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-primary/80 hidden md:block">
                AI Skin Health Platform
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>

              <div className="flex items-center gap-3 pl-4 border-l border-border/50">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium leading-none">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground mt-1">Premium Member</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLocation("/about")}>
                      <Info className="mr-2 h-4 w-4" />
                      <span>About Us</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocation("/history")}>
                      <History className="mr-2 h-4 w-4" />
                      <span>Consultancy History</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
