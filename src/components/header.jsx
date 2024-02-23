import React from "react";
import "./styles/header.css";
import syntrac from "../assets/logoSyntrac.png";

export function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={syntrac} alt="" />
            </div>
        </header>
    );
}
