import React from "react";
import "./styles/home.css";
import background from "../assets/background.mp4";

export function Home() {
    return (
        <div className="home">
            <div className="titleHeader text-4xl font-bold">
                <h1>SIMULADOR DE ECONOMIA DE ENERGIA | GRCA</h1>
            </div>
            <div className="vidBackground">
                <video autoPlay loop muted src={background}></video>
            </div>
        </div>
    );
}
