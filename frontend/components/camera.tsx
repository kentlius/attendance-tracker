"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Webcam from "react-webcam";
import { Camera, RefreshCcw, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CameraComponent(props: { employeeId: string }) {
  const router = useRouter();

  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  return (
    <>
      {isCameraOn ? (
        <>
          {image ? (
            <div className="relative h-screen">
              <Image
                src={image}
                alt="Picture"
                fill={true}
                className="object-cover rounded-lg"
              />
              <div
                className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer"
                onClick={() => {
                  setIsCameraOn(false);
                }}
              >
                <X />
              </div>
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
                onClick={async () => {
                  const response = await fetch(image);
                  const blob = await response.blob();
                  const file = new File([blob as Blob], "image.jpg", {
                    type: "image/jpeg",
                  });

                  const formData = new FormData();
                  formData.append("image", file);
                  formData.append("employeeId", props.employeeId);

                  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records`, {
                    method: "POST",
                    body: formData,
                  });

                  router.push("/");
                }}
              >
                <Check />
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              <Webcam
                className="w-full h-full object-cover object-center rounded-lg"
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <div
                className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer"
                onClick={() => {
                  setIsCameraOn(false);
                }}
              >
                <X />
              </div>
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
      ) : (
        <div className="flex items-center justify-center h-full">
          <Button
            onClick={() => {
              setIsCameraOn(true);
            }}
          >
            Open Camera
          </Button>
        </div>
      )}
    </>
  );
}
