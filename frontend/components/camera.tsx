"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCcw, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function CameraComponent() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  return (
    <>
      {image ? (
        <div className="relative h-screen w-screen">
          <Image
            src={image}
            alt="Picture"
            fill={true}
            className="object-cover"
          />
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full cursor-pointer"
            onClick={() => {
              setImage(null);
            }}
          >
            <RefreshCcw />
          </div>
          <div
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer"
            onClick={() => {
              console.log("uploading image");
              router.push("/dashboard/employees");
            }}
          >
            <Check />
          </div>
        </div>
      ) : (
        <div className="relative h-screen w-screen">
          <Webcam
            className="w-full h-full object-cover object-center"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full cursor-pointer"
            onClick={() => {
              if (webcamRef.current) {
                const photo = webcamRef.current.getScreenshot();
                setImage(photo as string);
              }
            }}
          >
            <Camera />
          </div>
        </div>
      )}
    </>
  );
}
