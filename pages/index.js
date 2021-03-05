import Head from "next/head";
import styles from "../styles/Home.module.css";
import Webcam from "react-webcam";
import React from "react";
export default function Home() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: "environment" },
    // facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <input type="file" accept="image/*" capture="environment"></input>
      <button onClick={capture}>Capture photo</button>
    </>
  );
}
