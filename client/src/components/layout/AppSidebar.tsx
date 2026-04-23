import { Home, Scan, ShoppingBag, Activity, FileText, Settings, LogOut, Image, Star, Info, History } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar({ onLogout }: { onLogout?: () => void }) {
  const [location] = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Info, label: "About Us", href: "/about" },
    { icon: Scan, label: "Detect Skin Problems", href: "/detect" },
    { icon: History, label: "Consultancy History", href: "/history" },
    { icon: ShoppingBag, label: "Skora Store", href: "/store" },
    { icon: FileText, label: "Order History", href: "/orders" },
    { icon: Settings, label: "Admin Dashboard", href: "/admin" },
  ];

  return (
    <Sidebar className="border-r border-border/50 bg-white/80 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Scan className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-primary tracking-tight">Skora</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={location === item.href}
                className={cn(
                  "h-10 transition-all duration-200",
                  location === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
