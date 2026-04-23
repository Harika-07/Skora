import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Detect from "@/pages/Detect";
import Results from "@/pages/Results";
import Store from "@/pages/Store";
import Admin from "@/pages/Admin";
import PlaceholderPage from "@/components/PlaceholderPage";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AuthPage({ onLogin }: { onLogin: () => void }) {
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = () => {
    if (!validateEmail(loginEmail)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid existing email address.",
      });
      return;
    }
    if (!loginPassword) {
      toast({
        variant: "destructive",
        title: "Password Required",
        description: "Please enter your password.",
      });
      return;
    }
    onLogin();
  };

  const handleGoogleLogin = () => {
    // In a real app, this would trigger Google OAuth
    toast({
      title: "Google Login",
      description: "Redirecting to secure Google authentication...",
    });
    setTimeout(onLogin, 1000);
  };

  const handleRegister = () => {
    if (!regName) {
      toast({
        variant: "destructive",
        title: "Name Required",
        description: "Please enter your full name.",
      });
      return;
    }
    if (!validateEmail(regEmail)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please use a valid existing email for verification.",
      });
      return;
    }
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${regEmail}.`,
    });
    setTimeout(onLogin, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center pb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Scan className="h-7 w-7" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">Welcome to Skora</CardTitle>
          <CardDescription>AI-Powered Skin Health Platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 mt-4" onClick={handleLogin} size="lg">
                Sign In
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">Or continue with</span></div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>Google Account</Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-reg">Email</Label>
                <Input 
                  id="email-reg" 
                  type="email" 
                  placeholder="valid.mail@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <Button className="w-full mt-4" onClick={handleRegister} size="lg">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground pb-8 justify-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("skora_auth") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("skora_auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("skora_auth");
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {isAuthenticated ? (
        <Layout onLogout={handleLogout}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/detect" component={Detect} />
            <Route path="/results" component={Results} />
            <Route path="/store" component={Store} />
            <Route path="/admin" component={Admin} />
            
            {/* Placeholder Pages */}
            <Route path="/about">
              <PlaceholderPage title="About Us" />
            </Route>
            <Route path="/history">
              <PlaceholderPage title="Consultancy History" />
            </Route>
            <Route path="/orders">
              <PlaceholderPage title="Order History" />
            </Route>
            <Route path="/profile">
              <PlaceholderPage title="User Profile" />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </Layout>
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </QueryClientProvider>
  );
}

export default App;
