import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Scan, ShieldCheck, UserCheck, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Home() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("skora_consultancy_history") || "[]");
    if (savedHistory.length === 0) {
      // Add some default items if history is empty
      const defaultHistory = [
        {
          id: 1,
          title: "Acne Treatment Follow-up",
          doctor: "Dr. Sarah Mitchell",
          date: "Jan 15, 2026",
          status: "Completed",
          description: "Patient shows significant improvement in inflammatory lesions. Continuing with prescribed retinol and moisturizer routine."
        },
        {
          id: 2,
          title: "Initial Skin Analysis",
          doctor: "AI System",
          date: "Dec 28, 2025",
          status: "Archived",
          description: "Initial scan detected mild rosacea and oily T-zone. Recommended consultation with specialist."
        }
      ];
      localStorage.setItem("skora_consultancy_history", JSON.stringify(defaultHistory));
      setHistory(defaultHistory);
    } else {
      setHistory(savedHistory);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
            AI-Powered Dermatology
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Your Personal AI Skin Health Companion
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-xl">
            Get instant analysis, professional dermatologist consultations, and personalized treatment plans in seconds.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/detect">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                <Scan className="mr-2 h-5 w-5" /> Start Skin Analysis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/40 hover:bg-white/10 text-white hover:text-white">
              <Calendar className="mr-2 h-5 w-5" /> Book Consultation
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -right-20 -bottom-40 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </section>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-primary">
              <Scan className="h-6 w-6" />
            </div>
            <CardTitle>AI Detection</CardTitle>
            <CardDescription>Instant analysis of skin conditions with 98% accuracy.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/detect">
              <Button variant="ghost" className="w-full justify-between group">
                Scan Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="glass hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-500">
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
              <UserCheck className="h-6 w-6" />
            </div>
            <CardTitle>Find Doctors</CardTitle>
            <CardDescription>Connect with top dermatologists near you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between group">
              Find Specialist <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        <Card className="glass hover:shadow-lg transition-all duration-300 border-t-4 border-t-orange-500">
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle>Skora Store</CardTitle>
            <CardDescription>Verified medicines and skincare products.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/store">
              <Button variant="ghost" className="w-full justify-between group">
                Shop Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="glass overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Skin Health Journey</CardTitle>
            <CardDescription>Track your improvement over time</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/5 text-primary">On Track</Badge>
        </CardHeader>
        <CardContent>
          <div className="relative pt-6">
            <div className="flex justify-between mb-2 text-sm font-medium text-muted-foreground">
              <span>Treatment Started</span>
              <span>Goal: Clear Skin</span>
            </div>
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[65%] rounded-full relative">
                <div className="absolute top-0 right-0 bottom-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%]" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              You've completed <span className="text-foreground font-semibold">14 days</span> of your recommended routine. Keep it up!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Past Consultancy / History Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Past Consultancy & History</h2>
          <Link href="/history">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.slice(0, 2).map((item) => (
            <Card key={item.id} className="glass border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant={item.status === 'Completed' ? 'default' : 'outline'}>{item.status}</Badge>
                </div>
                <CardDescription>{item.doctor} • {item.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
