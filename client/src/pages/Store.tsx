import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Store() {
  const products = [
    { name: "CeraVe Resurfacing Retinol Serum", price: "₹1,649", rating: 4.8, store: "Amazon", image: "/src/assets/cerave-retinol.jpg" },
    { name: "La Roche-Posay Effaclar Duo", price: "₹1,850", rating: 4.9, store: "Sephora", image: "/src/assets/lrp-effaclar.jpg" },
    { name: "Neutrogena Hydro Boost Water Gel", price: "₹1,349", rating: 4.7, store: "Walmart", image: "/src/assets/neutrogena-hydro.jpg" },
    { name: "The Ordinary Niacinamide 10% + Zinc 1%", price: "₹540", rating: 4.6, store: "Ulta", image: "/src/assets/ordinary-niacinamide.png" },
    { name: "PanOxyl Acne Foaming Wash", price: "₹795", rating: 4.5, store: "Amazon", image: "/src/assets/panoxyl-wash.jpg" },
    { name: "Paula's Choice Skin Perfecting 2% BHA", price: "₹2,800", rating: 4.9, store: "Sephora", image: "/src/assets/paulas-choice-bha.jpg" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Skora Marketplace</h1>
          <p className="text-muted-foreground mt-2">Trusted skincare products from verified partners.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9 bg-white" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50">
            <div className="relative h-48 bg-white p-4 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              <Badge className="absolute top-3 right-3 bg-white/90 hover:bg-white text-foreground shadow-sm backdrop-blur-sm">
                via {product.store}
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-primary">{product.price}</span>
                <div className="flex items-center text-yellow-500 text-sm">
                  ★ {product.rating}
                </div>
              </div>
              <Button className="w-full gap-2">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
