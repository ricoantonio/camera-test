import Head from "next/head";
import styles from "../styles/Home.module.css";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Doughnut } from "react-chartjs-2";
import moment from "moment";
import Datepicker from "../components/datepicker";

export default function Home() {
  const [now, setnow] = useState(new Date());
  let jsPDF = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("jspdf").then((module) => {
        jsPDF = module.default;
      });
    }
  }, []);
  const Prints = () => {
    return <div></div>;
  };

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
  };
  const colstyle = {
    width: "30%",
  };
  const tableStyle = {
    width: "100%",
  };

  const print = () => {
    const string = renderToString(Prints());
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.fromHTML(string);
    pdf.save("pdf");
  };
  const data = {
    datasets: [
      {
        data: [2, 7],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const donutOptions = {
    cutoutPercentage: 80,
    tooltips: { enabled: false },
    height: 130,
    width: 200,
    hover: { mode: null },
  };

  return (
    <>
      {/* <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      /> */}
      {/* <input type="file" accept="image/*" capture="environment"></input> */}
      {/* <button onClick={capture}>Capture photo</button> */}
      {/* <div
        style={{
          verticalAlign: "center",
          display: "grid",
          gridTemplateColumns: "20% 50%",
          height: "200px",
        }}
      >
        <div style={{}}>50%</div>
        <div>
          <Doughnut data={data} options={donutOptions} />
        </div>
      </div> */}
      {/* <button onClick={print}>print</button> */}
      <div>{moment(now).format("MMMM Do YYYY")}</div>
      <div
        onClick={() => {
          setnow(moment(now).add(1, "days"));
        }}
      >
        +
      </div>
      <Datepicker
        id="deadline"
        label="Deadline Pekerjaan Selesai"
        noToday={true}
        placeholder={moment(now).format("D MMMM YYYY")}
        onChange={(event) => {
          setnow(event);
        }}
      />
    </>
  );
}
