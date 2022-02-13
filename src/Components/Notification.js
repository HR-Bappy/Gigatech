import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Section from "../section/Section";
import "../assets/css/page.css";

export default function Notification({data}) {
  return (
    <div className="notification">
      {data}
    </div>
  );
}
