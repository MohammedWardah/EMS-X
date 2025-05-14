import React from "react";
import styles from "./SummaryCard.module.css";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className={`rounded flex bg-gray-800 ${styles.summaryCard}`}>
      <div
        className={` ${color} text-3x1 flex justify-center items-center  text-white px-4 rounded-l ${styles.iconContainer}`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
