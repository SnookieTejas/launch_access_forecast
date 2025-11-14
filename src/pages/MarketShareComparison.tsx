import React, { useEffect, useState, useRef } from "react";
import { FlaskConicalIcon } from "lucide-react";
import { MultiSelect } from "../components/MultiSelect";
import { Button } from "../components/Button";
import { MarketShareVisualization } from "./MarketShareVisualization";
const competitorBrands = [
  "Biotropex",
  "Dermalynet",
  "Fibranova",
  "Genovexa",
  "Immuvex",
  "Orbisyn",
  "Neurovax",
];
const tppAttributes = [
  "Advocacy",
  "Budget impact of disease treated by drug (millions)",
  "Competitive branded launches (±12 months)",
  "Cost per treatment per annum",
  "Demonstrated efficacy in sub-population",
  "Efficacy vs SoC",
  "HEOR/CE",
  "Low cost option usage",
  "Order of entry",
  "Orphan status",
  "Portfolio leverage",
  "Relative cost ratio",
  "Safety vs SoC",
  "Treatment options",
  "Unmet need in therapy area",
];
// Mock data for each brand
const brandData: Record<string, Record<string, string>> = {
  Biotropex: {
    Advocacy: "Low",
    "Budget impact of disease treated by drug (millions)": "87.88",
    "Competitive branded launches (±12 months)": "3+",
    "Cost per treatment per annum": "11096",
    "Demonstrated efficacy in sub-population": "No",
    "Efficacy vs SoC": "100",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Order of entry": "2",
    "Orphan status": "Yes",
    "Portfolio leverage": "No",
    "Relative cost ratio": "-0.25",
    "Safety vs SoC": "100",
    "Treatment options": "Medium",
    "Unmet need in therapy area": "High",
  },
  Dermalynet: {
    Advocacy: "High",
    "Budget impact of disease treated by drug (millions)": "6766.57",
    "Competitive branded launches (±12 months)": "3+",
    "Cost per treatment per annum": "70445",
    "Demonstrated efficacy in sub-population": "No",
    "Efficacy vs SoC": "100",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Order of entry": "4+",
    "Orphan status": "No",
    "Portfolio leverage": "Yes",
    "Relative cost ratio": "0.14",
    "Safety vs SoC": "100",
    "Treatment options": "Medium",
    "Unmet need in therapy area": "High",
  },
  Fibranova: {
    Advocacy: "Low",
    "Budget impact of disease treated by drug (millions)": "344.6",
    "Competitive branded launches (±12 months)": "0",
    "Cost per treatment per annum": "226.67",
    "Demonstrated efficacy in sub-population": "No",
    "Efficacy vs SoC": "75",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Order of entry": "4+",
    "Orphan status": "No",
    "Portfolio leverage": "No",
    "Relative cost ratio": "1.4",
    "Safety vs SoC": "100",
    "Treatment options": "Low",
    "Unmet need in therapy area": "Low",
  },
  Genovexa: {
    Advocacy: "Medium",
    "Budget impact of disease treated by drug (millions)": "27310.13",
    "Competitive branded launches (±12 months)": "3+",
    "Cost per treatment per annum": "2108.89",
    "Demonstrated efficacy in sub-population": "No",
    "Efficacy vs SoC": "100",
    "HEOR/CE": "Low",
    "Low cost option usage": "Medium",
    "Order of entry": "4+",
    "Orphan status": "No",
    "Portfolio leverage": "No",
    "Relative cost ratio": "0.53",
    "Safety vs SoC": "100",
    "Treatment options": "High",
    "Unmet need in therapy area": "Low",
  },
  Immuvex: {
    Advocacy: "Low",
    "Budget impact of disease treated by drug (millions)": "21119.52",
    "Competitive branded launches (±12 months)": "3+",
    "Cost per treatment per annum": "2441",
    "Demonstrated efficacy in sub-population": "No",
    "Efficacy vs SoC": "100",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Order of entry": "1",
    "Orphan status": "No",
    "Portfolio leverage": "No",
    "Relative cost ratio": "0",
    "Safety vs SoC": "100",
    "Treatment options": "Low",
    "Unmet need in therapy area": "Low",
  },
  Orbisyn: {
    Advocacy: "Medium",
    "Budget impact of disease treated by drug (millions)": "2011.58",
    "Competitive branded launches (±12 months)": "2",
    "Cost per treatment per annum": "12849.95",
    "Demonstrated efficacy in sub-population": "No",
    "Efficacy vs SoC": "150",
    "HEOR/CE": "Low",
    "Low cost option usage": "Medium",
    "Order of entry": "1",
    "Orphan status": "Yes",
    "Portfolio leverage": "No",
    "Relative cost ratio": "0",
    "Safety vs SoC": "100",
    "Treatment options": "High",
    "Unmet need in therapy area": "Medium",
  },
  Neurovax: {
    Advocacy: "High",
    "Budget impact of disease treated by drug (millions)": "15420.33",
    "Competitive branded launches (±12 months)": "3+",
    "Cost per treatment per annum": "8750.25",
    "Demonstrated efficacy in sub-population": "Yes",
    "Efficacy vs SoC": "125",
    "HEOR/CE": "Medium",
    "Low cost option usage": "High",
    "Order of entry": "3",
    "Orphan status": "No",
    "Portfolio leverage": "Yes",
    "Relative cost ratio": "0.75",
    "Safety vs SoC": "95",
    "Treatment options": "High",
    "Unmet need in therapy area": "Very High",
  },
};
export function MarketShareComparison() {
  const [selectedBrands, setSelectedBrands] =
    useState<string[]>(competitorBrands);
  const [showToast, setShowToast] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isSticky, setIsSticky] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-1px 0px 0px 0px",
      }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);
  const handleCompare = () => {
    setShowVisualization(true);
  };
  const handleBackToComparison = () => {
    setShowVisualization(false);
  };
  const handleCellHover = (cellId: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setHoveredCell(cellId);
  };
  const truncateText = (text: string, maxLength: number = 40) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  if (showVisualization) {
    return (
      <MarketShareVisualization
        selectedBrands={selectedBrands}
        onBack={handleBackToComparison}
      />
    );
  }
  return (
    <div className="page-wrapper">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Comparison generated successfully
            </span>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="tooltip"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          {hoveredCell}
          <div className="tooltip-arrow" />
        </div>
      )}

      {/* Page Container */}
      <div className="page-container">
        {/* Title Section with Filter Controls Inline */}
        <div className="title-section title-section-inline">
          <div className="title-with-icon">
            <div className="title-icon">
              <FlaskConicalIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="title-text">TPP Details: Competitor Products</h2>
          </div>
          <div
            ref={filterRef}
            className={`filter-controls ${
              isSticky ? "filter-controls-sticky" : ""
            }`}
          >
            <div
              className={
                isSticky
                  ? "filter-controls-inner-sticky"
                  : "filter-controls-inner"
              }
            >
              <div className="filter-row">
                <div className="filter-multiselect">
                  <MultiSelect
                    label="Select competitor brands"
                    placeholder="Multiple selections"
                    options={competitorBrands}
                    value={selectedBrands}
                    onChange={setSelectedBrands}
                  />
                </div>
                <Button
                  onClick={handleCompare}
                  disabled={selectedBrands.length === 0}
                  className="compare-button"
                >
                  Compare Market Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sentinel for Intersection Observer */}
        <div ref={sentinelRef} className="sentinel" />

        {/* Content Area */}
        {selectedBrands.length === 0 ? (
          <div className="empty-state">
            <FlaskConicalIcon className="empty-state-icon" />
            <h3 className="empty-state-title">No brands selected</h3>
            <p className="empty-state-subtitle">
              Select competitor brands above to view TPP attribute comparison
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="desktop-table-wrapper">
              <div className="table-container">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th className="header-cell header-cell-sticky">
                        <div className="header-content">Attribute</div>
                      </th>
                      {selectedBrands.map((brand, index) => (
                        <th
                          key={brand}
                          className="header-cell header-cell-brand"
                          style={{
                            animation: "slideInFromRight 0.4s ease-in-out",
                            animationDelay: `${index * 0.05}s`,
                            animationFillMode: "both",
                          }}
                        >
                          <div className="header-brand-name">{brand}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tppAttributes.map((attribute, attrIndex) => (
                      <tr
                        key={attribute}
                        className={`table-row ${
                          attrIndex % 2 === 0 ? "row-even" : "row-odd"
                        }`}
                      >
                        <td
                          className="attribute-cell"
                          onMouseEnter={(e) => {
                            if (attribute.length > 40) {
                              handleCellHover(attribute, e);
                            }
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <div className="attribute-content">
                            <span
                              className="attribute-text"
                              title={
                                attribute.length > 40 ? attribute : undefined
                              }
                            >
                              {truncateText(attribute, 40)}
                            </span>
                          </div>
                        </td>
                        {selectedBrands.map((brand, brandIndex) => {
                          let cellValue = brandData[brand]?.[attribute] || "-";
                          if ((attribute === "Budget impact of disease treated by drug (millions)" || attribute === "Cost per treatment per annum") && cellValue !== "-") {
                            cellValue = `$${cellValue}`;
                          }
                          const cellId = `${brand}-${attribute}`;
                          return (
                            <td
                              key={cellId}
                              className="value-cell"
                              style={{
                                animation: "fadeInSlideIn 0.3s ease-in-out",
                                animationDelay: `${brandIndex * 0.05}s`,
                                animationFillMode: "both",
                              }}
                              onMouseEnter={(e) => {
                                if (cellValue.length > 20) {
                                  handleCellHover(cellValue, e);
                                }
                              }}
                              onMouseLeave={() => setHoveredCell(null)}
                            >
                              <div className="value-content">
                                <span
                                  className="value-text"
                                  title={
                                    cellValue.length > 20
                                      ? cellValue
                                      : undefined
                                  }
                                >
                                  {cellValue}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Accordion */}
            <div className="mobile-accordion">
              {tppAttributes.map((attribute) => (
                <details key={attribute} className="accordion-item">
                  <summary className="accordion-summary">
                    <span className="accordion-title">{attribute}</span>
                    <svg
                      className="accordion-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="accordion-content">
                    {selectedBrands.map((brand) => {
                      let value = brandData[brand]?.[attribute] || "-";
                      if ((attribute === "Budget impact of disease treated by drug (millions)" || attribute === "Cost per treatment per annum") && value !== "-") {
                        value = `$${value}`;
                      }
                      return (
                        <div key={brand} className="accordion-row">
                          <span className="accordion-label">{brand}:</span>
                          <span className="accordion-value">
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        /* Page Wrapper */
        .page-wrapper {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          background: #F8FAFC;
          min-height: 100vh;
        }

        /* Page Container */
        .page-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
          box-sizing: border-box;
        }

        /* Title Section */
        .title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          justify-content: space-between;
        }
        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .title-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #FF5A5F 0%, #FF385C 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(255, 90, 95, 0.2);
        }

        .title-text {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0F172A;
          margin: 0;
        }

        /* Sentinel */
        .sentinel {
          height: 1px;
          margin-bottom: 0rem;
        }

        /* Filter Controls */
        .filter-controls {
          transition: all 0.3s ease;
          position: relative;
          z-index: 100;
        }

        .filter-controls-sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          z-index: 100;
        }

        .filter-controls-inner {
          margin-bottom: 2rem;
        }

        .filter-controls-inner-sticky {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
        }

        .filter-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 1rem;
        }

        .filter-multiselect {
          flex: 0 0 320px;
          max-width: 320px;
        }

        .compare-button {
          background: #FF5A5F;
          color: white;
          height: 46px;
          padding: 0 1.5rem;
          white-space: nowrap;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .compare-button:hover:not(:disabled) {
          background: #E04B50;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 90, 95, 0.3);
        }

        .compare-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 4rem 2rem;
          min-height: 400px;
          text-align: center;
        }

        .empty-state-icon {
          width: 4rem;
          height: 4rem;
          color: #CBD5E1;
          margin-bottom: 1.5rem;
        }

        .empty-state-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #334155;
          margin: 0 0 0.5rem 0;
        }

        .empty-state-subtitle {
          font-size: 1rem;
          color: #64748B;
          margin: 0;
          max-width: 400px;
        }

        /* Desktop Table Wrapper */
        .desktop-table-wrapper {
          display: block;
        }

        .table-container {
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: auto;
          max-height: calc(100vh - 300px);
          border: 1px solid #E2E8F0;
        }

        /* Comparison Table */
        .comparison-table {
          width: 100%;
          min-width: 1100px;
          border-collapse: separate;
          border-spacing: 0;
        }

        .comparison-table thead {
          background: #0F172A;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .header-cell {
          padding: 1rem 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: #FFFFFF;
          white-space: nowrap;
          min-width: 180px;
        }

        .header-cell-sticky {
          position: sticky;
          left: 0;
          background: #0F172A;
          z-index: 30;
          min-width: 300px;
          text-align: left;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .header-brand-name {
          border-bottom: 2px solid #FF5A5F;
          padding-bottom: 0.5rem;
          display: inline-block;
        }

        /* Table Rows */
        .table-row {
          border-bottom: 1px solid #E2E8F0;
          transition: background-color 0.15s ease;
        }

        .table-row:hover {
          background-color: #F8FAFC;
        }

        .row-even {
          background-color: #FFFFFF;
        }

        .row-odd {
          background-color: #FAFAFA;
        }

        /* Attribute Cell */
        .attribute-cell {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0F172A;
          position: sticky;
          left: 0;
          background: inherit;
          z-index: 10;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
        }

        .attribute-content {
          display: flex;
          align-items: center;
          height: 100%;
          overflow: hidden;
        }

        .attribute-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Value Cell */
        .value-cell {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          color: #334155;
          text-align: center;
        }

        .value-content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .value-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }

        /* Mobile Accordion */
        .mobile-accordion {
          display: none;
        }

        .accordion-item {
          background: #FFFFFF;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .accordion-summary {
          padding: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          color: #0F172A;
          font-size: 0.875rem;
          transition: background-color 0.15s ease;
        }

        .accordion-summary:hover {
          background-color: #F8FAFC;
        }

        .accordion-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 0.5rem;
        }

        .accordion-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #94A3B8;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .accordion-item[open] .accordion-icon {
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 0.75rem 1rem;
          border-top: 1px solid #E2E8F0;
          background: #FAFAFA;
        }

        .accordion-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          font-size: 0.875rem;
        }

        .accordion-label {
          font-weight: 500;
          color: #64748B;
        }

        .accordion-value {
          color: #0F172A;
        }

        /* Toast Notification */
        .toast-notification {
          position: fixed;
          top: 6rem;
          right: 2rem;
          background: #10B981;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          animation: slideInRight 0.3s ease-in-out;
          z-index: 1200;
        }

        /* Tooltip */
        .tooltip {
          position: fixed;
          z-index: 1100;
          background: #1F2937;
          color: white;
          font-size: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          pointer-events: none;
          animation: fadeIn 0.2s ease-in-out;
          transform: translate(-50%, -100%);
          max-width: 300px;
          white-space: normal;
          word-wrap: break-word;
        }

        .tooltip-arrow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%) rotate(45deg);
          width: 0.5rem;
          height: 0.5rem;
          background: #1F2937;
        }

        /* Animations */
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInSlideIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Scrollbar Styling */
        .table-container::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .table-container::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }

        /* Responsive Breakpoints */

        /* Large Desktop: ≥1400px */
        @media (min-width: 1400px) {
          .page-container {
            padding: 1rem 1rem;
          }

          .filter-controls-inner-sticky {
            padding: 1rem 3rem;
          }
        }

        /* Desktop: 1024px - 1399px */
        @media (min-width: 1024px) and (max-width: 1399px) {
          .page-container {
            max-width: 1200px;
            padding: 1rem 1rem;
          }
        }

        /* Tablet: 768px - 1023px */
        @media (max-width: 1023px) {
          .page-container {
            padding: 1.5rem 1.5rem;
          }

          .desktop-table-wrapper {
            display: none;
          }

          .mobile-accordion {
            display: block;
          }

          .filter-row {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-multiselect {
            flex: 1 1 100%;
            max-width: 100%;
          }

          .compare-button {
            width: 100%;
          }

          .filter-controls-inner-sticky {
            padding: 1rem 1.5rem;
          }
        }

        /* Mobile: ≤767px */
        @media (max-width: 767px) {
          .page-container {
            padding: 1rem 1rem;
          }

          .title-section {
            margin-bottom: 1.5rem;
          }

          .title-icon {
            width: 2rem;
            height: 2rem;
          }

          .title-text {
            font-size: 1.25rem;
          }

          .filter-controls-inner-sticky {
            padding: 1rem 1rem;
          }

          .toast-notification {
            right: 1rem;
            left: 1rem;
            top: 5rem;
          }
        }

        /* Small Mobile: ≤480px */
        @media (max-width: 480px) {
          .page-container {
            padding: 0.75rem 0.75rem;
          }

          .title-text {
            font-size: 1.125rem;
          }

          .accordion-summary {
            padding: 0.875rem;
          }

          .accordion-content {
            padding: 0.625rem 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
