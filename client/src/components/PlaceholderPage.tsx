import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { useLocation } from "wouter";

export default function PlaceholderPage({ title }: { title: string }) {
  const [_, setLocation] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
        <Construction className="h-12 w-12 text-primary animate-pulse" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <p className="text-muted-foreground">
          This feature is currently under development for the prototype. Check back soon!
        </p>
      </div>
      <Button onClick={() => setLocation("/")} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Return Home
      </Button>
    </div>
  );
}
