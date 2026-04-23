import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, AlertCircle, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function Detect() {
  const [_, setLocation] = useLocation();
  const [analyzing, setAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // ✅ FIXED TYPES
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [progress, setProgress] = useState(0);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream as MediaStream; // ✅ FIX
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error(err);
      alert("Could not access camera.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream; // ✅ FIX
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ FIXED ANALYZE FUNCTION
  const handleAnalyze = async () => {
    if (!image) return;

    setAnalyzing(true);

    try {
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
      }, 100);

      // convert base64 → file
      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5004/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // ✅ HANDLE BACKEND ERROR
      if (data.error) {
        throw new Error(data.error);
      }

      console.log("BACKEND RESPONSE:", data);

      clearInterval(interval);
      setProgress(100);

      // ✅ STORE RESULT
      localStorage.setItem("skora_result", JSON.stringify({
        prediction: data.prediction,
        confidence: data.confidence
      }));

      setTimeout(() => {
        setLocation("/results");
      }, 500);

    } catch (err: any) {
      console.error("FULL ERROR:", err);
      alert("Backend error: " + err.message);
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">AI Skin Analysis</h1>
        <p className="text-muted-foreground">
          Upload a clear photo of the affected area or use your camera.
        </p>
      </div>

      <div className="grid gap-8">
        {!image ? (
          <Card className="glass border-dashed border-2 border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-6">

              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Camera className="h-10 w-10 text-primary" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Take a photo or upload</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure good lighting and focus.
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2" /> Upload Image
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />

                <Button onClick={startCamera} variant="outline">
                  <Camera className="mr-2" /> Use Camera
                </Button>
              </div>

              {isCameraActive && (
                <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
                  <video ref={videoRef} autoPlay className="w-full max-w-md rounded-xl" />
                  <div className="flex gap-4 mt-6">
                    <Button onClick={capturePhoto}>Capture</Button>
                    <Button onClick={stopCamera} variant="destructive">Cancel</Button>
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

            </CardContent>
          </Card>
        ) : (
          <Card className="glass overflow-hidden">
            <CardContent className="p-0 relative">

              <img src={image} className="w-full h-[500px] object-cover" />

              <Button
                variant="destructive"
                className="absolute top-4 right-4"
                onClick={() => setImage(null)}
              >
                <X />
              </Button>

              {analyzing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <h2 className="text-2xl font-bold">Analyzing...</h2>

                  <div className="w-1/2 mt-4">
                    <Progress value={progress} />
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Smart Guidance</AlertTitle>
          <AlertDescription>
            Use natural lighting for best results.
          </AlertDescription>
        </Alert>

        {image && !analyzing && (
          <div className="flex justify-end">
            <Button onClick={handleAnalyze}>
              Analyze Now <ChevronRight className="ml-2" />
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}