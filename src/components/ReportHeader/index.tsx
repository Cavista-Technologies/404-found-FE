import React from "react";
import { CavistaLogo } from "@/assets/images/images";

interface ReportPdfHeaderProps {
  tabLabel: string;
  period?: string;
}

function getCurrentPeriod(): string {
  return new Date().toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function getGeneratedAt(): string {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export const ReportPdfHeader: React.FC<ReportPdfHeaderProps> = ({
  tabLabel,
  period,
}) => {
  const displayPeriod = period ?? getCurrentPeriod();
  const generatedAt = getGeneratedAt();

  return (
    <div
      className="pdf-only"
      style={{
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        backgroundColor: "#ffffff",
        paddingBottom: "12px",
        marginBottom: "16px",
        borderBottom: "3px solid #b9243c",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <img
          src={CavistaLogo}
          alt="Cavista"
          className="h-12 w-auto object-contain"
        />
      </div>

      <p
        style={{
          margin: "0 0 2px 0",
          fontSize: "28px",
          fontWeight: 500,
          color: "#b9243c",
        }}
      >
        Cavista Technologies
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <p style={{ margin: 0, fontSize: "24px", color: "#4A4041" }}>
          <span style={{ fontWeight: 500 }}>{tabLabel}</span>{" "}
          <span style={{ color: "#b9243c", fontWeight: 500 }}>
            {displayPeriod}
          </span>
        </p>

        <p
          style={{
            margin: 0,
            fontSize: "16px",
            color: "#7A7172",
            whiteSpace: "nowrap",
          }}
        >
          Generated: {generatedAt}
        </p>
      </div>
    </div>
  );
};
