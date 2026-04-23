import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, MapPin, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Results() {

  // 🔥 REAL DATA STATE
  const [result, setResult] = useState("Loading...");
  const [confidence, setConfidence] = useState(0);

  // ✅ NEW STATE (ONLY ADDITION)
  const [explanation, setExplanation] = useState("Loading...");

  // 🔥 LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("skora_result");

    if (stored) {
      const data = JSON.parse(stored);
      setResult(data.prediction);
      setConfidence(data.confidence || 0);

      // ✅ ADD THIS
      setExplanation(data.explanation || "No explanation available");
    }
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analysis Results</h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleString()}
          </p>
        </div>

        <Badge variant="outline" className="text-lg px-4 py-1 border-primary/20 bg-primary/5 text-primary">
          Confidence: {confidence ? `${confidence}%` : "N/A"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-l-4 border-l-red-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <Badge variant="destructive" className="bg-red-500">
                  AI Result
                </Badge>
              </div>

              <CardTitle className="text-2xl">
                {result}
              </CardTitle>

              <CardDescription className="text-base">
                AI-detected skin condition based on image analysis.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Confidence Level</span>

                  <span className="text-red-600">
                    {confidence ? `${confidence}%` : "N/A"}
                  </span>
                </div>

                <Progress value={confidence} className="bg-red-100 h-3" />
              </div>

              {/* ✅ ONLY THIS TEXT CHANGED (UI SAME) */}
              <div className="bg-white/50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-primary">Medical Explanation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {explanation}
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Disclaimer
                </h4>
                <p className="text-xs text-yellow-700 mt-1">
                  This AI analysis is for informational purposes only and does not replace professional medical advice.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-white/40 p-1">
              <TabsTrigger value="products">Recommended Products</TabsTrigger>
              <TabsTrigger value="remedies">Home Remedies</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" /> Curated Treatment Plan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Salicylic Acid Cleanser", brand: "CeraVe", price: "₹1,249", img: "/src/assets/cerave-retinol.jpg" },
                  { name: "Niacinamide Serum 10%", brand: "The Ordinary", price: "₹795", img: "/src/assets/ordinary-niacinamide.png" },
                ].map((item, i) => (
                  <Card key={i} className="flex flex-row overflow-hidden hover:shadow-md transition-shadow bg-white">
                    <div className="w-24 h-full bg-gray-100 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col justify-between w-full">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-primary font-bold mt-1">{item.price}</p>
                      </div>
                      <Button size="sm" className="w-full mt-2" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Link href="/cart">
                  <Button className="gap-2">
                    View All & Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="remedies" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Maintain a proper skincare routine, stay hydrated, and avoid harsh chemicals.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="glass h-full border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" /> Nearby Dermatologists
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-3 items-center p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src="/src/assets/doctor-1.jpg" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Dr. Sarah Wilson</h4>
                    <p className="text-xs text-muted-foreground">Dermatologist</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}