import React, { useState } from "react";
import { ArrowLeftIcon, PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
interface MarketShareVisualizationProps {
  selectedBrands: string[];
  onBack: () => void;
}
// Brand color palette
const brandColors: Record<string, string> = {
  Immuvex: '#3B82F6',
  Biotropex: '#BA5422',
  Dermalynet: '#EB6620',
  Fibranova: '#EE8045',
  Genovexa: '#FCC9B1',
  Orbisyn: '#32190A',
  Neurovax: '#BA5422',
};
// Mock scenario data - market share percentages
const generateScenarioData = (brands: string[], scenario: string) => {
  const baseShares: Record<string, Record<string, number>> = {
    "Base Case": {
      Immuvex: 22,
      Biotropex: 18,
      Dermalynet: 20,
      Fibranova: 12,
      Genovexa: 15,
      Orbisyn: 8,
      Neurovax: 5,
    },
    "Better Efficacy": {
      Immuvex: 25,
      Biotropex: 20,
      Dermalynet: 18,
      Fibranova: 10,
      Genovexa: 14,
      Orbisyn: 8,
      Neurovax: 5,
    },
    "Lower Safety": {
      Immuvex: 18,
      Biotropex: 15,
      Dermalynet: 22,
      Fibranova: 15,
      Genovexa: 16,
      Orbisyn: 9,
      Neurovax: 5,
    },
  };
  return brands.map((brand) => ({
    name: brand,
    value: baseShares[scenario][brand] || 0,
    color: brandColors[brand],
  }));
};
// Brand attribute data
const brandAttributes: Record<string, Record<string, string>> = {
  Immuvex: {
    "Relative cost ratio": "0",
    "Efficacy vs SoC": "100",
    "Safety vs SoC": "100",
    "Cost per treatment per annum": "2441",
    "Order of entry": "1",
    "Competitive branded launches (±12 months)": "3+",
    "Budget impact of disease treated by drug (millions)": "21119.52",
    "Unmet need in therapy area": "Low",
    Advocacy: "Low",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Treatment options": "Low",
  },
  Biotropex: {
    "Relative cost ratio": "-0.25",
    "Efficacy vs SoC": "100",
    "Safety vs SoC": "100",
    "Cost per treatment per annum": "11096",
    "Order of entry": "2",
    "Competitive branded launches (±12 months)": "3+",
    "Budget impact of disease treated by drug (millions)": "87.88",
    "Unmet need in therapy area": "High",
    Advocacy: "Low",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Treatment options": "Medium",
  },
  Dermalynet: {
    "Relative cost ratio": "0.14",
    "Efficacy vs SoC": "100",
    "Safety vs SoC": "100",
    "Cost per treatment per annum": "70445",
    "Order of entry": "4+",
    "Competitive branded launches (±12 months)": "3+",
    "Budget impact of disease treated by drug (millions)": "6766.57",
    "Unmet need in therapy area": "High",
    Advocacy: "High",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Treatment options": "Medium",
  },
  Fibranova: {
    "Relative cost ratio": "1.4",
    "Efficacy vs SoC": "75",
    "Safety vs SoC": "100",
    "Cost per treatment per annum": "226.67",
    "Order of entry": "4+",
    "Competitive branded launches (±12 months)": "0",
    "Budget impact of disease treated by drug (millions)": "344.6",
    "Unmet need in therapy area": "Low",
    Advocacy: "Low",
    "HEOR/CE": "Low",
    "Low cost option usage": "Low",
    "Treatment options": "Low",
  },
  Genovexa: {
    "Relative cost ratio": "0.53",
    "Efficacy vs SoC": "100",
    "Safety vs SoC": "100",
    "Cost per treatment per annum": "2108.89",
    "Order of entry": "4+",
    "Competitive branded launches (±12 months)": "3+",
    "Budget impact of disease treated by drug (millions)": "27310.13",
    "Unmet need in therapy area": "Low",
    Advocacy: "Medium",
    "HEOR/CE": "Low",
    "Low cost option usage": "Medium",
    "Treatment options": "High",
  },
  Orbisyn: {
    "Relative cost ratio": "0",
    "Efficacy vs SoC": "150",
    "Safety vs SoC": "100",
    "Cost per treatment per annum": "12849.95",
    "Order of entry": "1",
    "Competitive branded launches (±12 months)": "2",
    "Budget impact of disease treated by drug (millions)": "2011.58",
    "Unmet need in therapy area": "Medium",
    Advocacy: "Medium",
    "HEOR/CE": "Low",
    "Low cost option usage": "Medium",
    "Treatment options": "High",
  },
  Neurovax: {
    "Relative cost ratio": "0.75",
    "Efficacy vs SoC": "125",
    "Safety vs SoC": "95",
    "Cost per treatment per annum": "8750.25",
    "Order of entry": "3",
    "Competitive branded launches (±12 months)": "3+",
    "Budget impact of disease treated by drug (millions)": "15420.33",
    "Unmet need in therapy area": "Very High",
    Advocacy: "High",
    "HEOR/CE": "Medium",
    "Low cost option usage": "High",
    "Treatment options": "High",
  },
};
const attributes = [
  "Relative cost ratio",
  "Efficacy vs SoC",
  "Safety vs SoC",
  "Cost per treatment per annum",
  "Order of entry",
  "Competitive branded launches (±12 months)",
  "Budget impact of disease treated by drug (millions)",
  "Unmet need in therapy area",
  "Advocacy",
  "HEOR/CE",
  "Low cost option usage",
  "Treatment options",
];
const scenarios = ["Base Case", "Better Efficacy", "Lower Safety"];
export function MarketShareVisualization({
  selectedBrands,
  onBack,
}: MarketShareVisualizationProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
  });
  const handleCellHover = (cellId: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setHoveredCell(cellId);
  };
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };
  // --- Donut chart colors and data for Peak Share Comparison ---
  const TIER_COLORS = {
    'Restrictive tier': '#32190A',
    'Non-preferred': '#BA5422',
    'Non-preferred with interventions': '#EB6620',
    'Preferred with interventions': '#EE8045',
    Preferred: '#FCC9B1'
  };
  const donutData = {
    'Base Case': [
      { name: 'Preferred', value: 35 },
      { name: 'Preferred with interventions', value: 25 },
      { name: 'Non-preferred with interventions', value: 20 },
      { name: 'Non-preferred', value: 10 },
      { name: 'Restrictive tier', value: 10 }
    ],
    'Better Efficacy': [
      { name: 'Preferred', value: 40 },
      { name: 'Preferred with interventions', value: 35 },
      { name: 'Non-preferred with interventions', value: 15 },
      { name: 'Non-preferred', value: 5 },
      { name: 'Restrictive tier', value: 5 }
    ],
    'Lower Safety': [
      { name: 'Preferred', value: 38 },
      { name: 'Preferred with interventions', value: 33 },
      { name: 'Non-preferred with interventions', value: 20 },
      { name: 'Non-preferred', value: 6 },
      { name: 'Restrictive tier', value: 3 }
    ]
  };
  // Helper for contrast color
  const getContrastColor = (hexColor: string | undefined): string => {
    if (!hexColor || typeof hexColor !== 'string' || !hexColor.startsWith('#')) {
      return '#FFFFFF';
    }
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };
  // Pie label
  const renderDonutLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const fillColor = TIER_COLORS[name as keyof typeof TIER_COLORS];
    const textColor = getContrastColor(fillColor);
    return <text x={x} y={y} fill={textColor} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600">{`${value}%`}</text>;
  };
  // Pie tooltip
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{payload[0].value}%</p>
        </div>;
    }
    return null;
  };
  // Render donut chart for scenario using generateScenarioData
  const renderDonutChart = (scenario: 'Base Case' | 'Better Efficacy' | 'Lower Safety') => {
    const data = generateScenarioData(selectedBrands, scenario);
    if (!data || !Array.isArray(data)) {
      return null;
    }
    return <div className="donut-chart-wrapper">
        <div className="donut-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius="55%" outerRadius="85%" paddingAngle={2} dataKey="value" animationBegin={0} animationDuration={600} label={renderDonutLabel} labelLine={false}>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center-label">
            <span className="channel-name">{scenario}</span>
          </div>
        </div>
      </div>;
  };

  return (
    <div className="page-wrapper">
      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-[1100] bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none animate-fadeIn"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
            maxWidth: "300px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          {hoveredCell}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="page-title">Peak Share Comparison (24 months)</h1>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-colors duration-200 font-medium flex-shrink-0"
          >
            <ArrowLeftIcon size={18} />
            <span>Back to Comparison</span>
          </button>
        </div>
        <div className="h-px bg-[#E0E0E0]" />
      </div>

      {/* Scenario Visualization Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
        {/* Responsive Chart Grid */}
        {/* <div className="chart-section">
          {scenarios.map(scenario => <div key={scenario}>{renderDonutChart(scenario)}</div>)}
        </div> */}
        <div className="chart-grid">
          {renderDonutChart("Base Case")}
          {renderDonutChart("Better Efficacy")}
          {renderDonutChart("Lower Safety")}
        </div>

        {/* Legend */}
        <div className="chart-legend">
          {selectedBrands.map((brand) => (
            <div key={brand} className="legend-item">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: brandColors[brand],
                }}
              />
              <span className="text-sm text-gray-700 font-medium">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="table-container">
          <table className="data-table">
            <thead className="bg-[#1C1C35] text-white sticky top-0 z-20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap sticky left-0 bg-[#1C1C35] z-30 min-w-[280px] shadow-md">
                  Attribute
                </th>
                {selectedBrands.map((brand) => (
                  <th
                    key={brand}
                    className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap min-w-[160px] shadow-md"
                  >
                    {brand}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attributes.map((attribute, index) => (
                <tr
                  key={attribute}
                  className={`border-b border-[#E0E0E0] hover:bg-[#F5F5F8] transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                  style={{
                    height: "52px",
                  }}
                >
                  <td
                    className="px-6 py-4 text-sm font-medium text-[#2E2E3A] sticky left-0 bg-inherit z-10 shadow-sm"
                    onMouseEnter={(e) => {
                      if (attribute.length > 35) {
                        handleCellHover(attribute, e);
                      }
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <div className="flex items-center h-full">
                      <span className="truncate">{attribute}</span>
                    </div>
                  </td>
                  {selectedBrands.map((brand) => {
                    let value = brandAttributes[brand]?.[attribute] || "-";
                    if (attribute === "Cost per treatment per annum" && value !== "-") {
                      value = `$${value}`;
                    }
                    return (
                      <td
                        key={`${brand}-${attribute}`}
                        className="px-6 py-4 text-sm text-gray-700 text-center align-middle"
                        onMouseEnter={(e) => {
                          if (value.length > 15) {
                            handleCellHover(value, e);
                          }
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="flex items-center justify-center h-full">
                          <span className="truncate">{value}</span>
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

      <style>{`
        /* Page Wrapper - Increased width to minimize side margins */
        .page-wrapper {
          min-height: 100vh;
          background-color: #F8F9FB;
          max-width: 1400px;
          margin: 0 auto;
          overflow-x: hidden;
          padding: 2rem 1rem;
          box-sizing: border-box;
          animation: slideUp 0.5s ease-out;
        }

        /* Responsive Page Title */
        .page-title {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 600;
          color: #2E2E3A;
        }

        /* Chart Section - Responsive Grid */
         /* Chart Grid - Responsive with tight gaps */
        .chart-grid {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          padding: 8px 0 16px;
        }

        /* Donut Chart Wrapper */
        .donut-chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeInGrow 0.6s ease-out;
        }

        /* Donut Chart Container - Increased by 20% (220px -> 264px) */
        .donut-chart-container {
          width: 264px;
          height: 264px;
          position: relative;
        }

        /* Center Label Inside Donut */
        .donut-center-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
        }

        .chart-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
          margin-bottom: 32px;
        }

        /* Individual Chart Card */
        .chart-card {
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeInGrow 0.6s ease-out;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Chart Title - Responsive */
        .chart-title {
          font-size: clamp(1.1rem, 1.5vw, 1.25rem);
          font-weight: 600;
          color: #2E2E3A;
          text-align: center;
          margin-bottom: 16px;
        }

        /* Chart Container - Maintain Aspect Ratio */
        .chart-container {
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }

        /* Legend - Responsive Wrapping */
        .chart-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          width: 100%;
          max-width: 100%;
          padding-top: 24px;
          border-top: 1px solid #E5E7EB;
          box-sizing: border-box;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Table Container - Internal Scroll Only */
        .table-container {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: auto;
          max-height: calc(100vh - 600px);
          min-height: 400px;
          scroll-behavior: smooth;
          box-sizing: border-box;
        }

        /* Data Table */
        .data-table {
          width: 100%;
          min-width: 900px;
          border-collapse: separate;
          border-spacing: 0;
        }

        /* Animations */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInGrow {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Custom scrollbar styling */
        .table-container::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .table-container::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }

        /* Ensure no horizontal scroll on body */
        body {
          overflow-x: hidden;
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 1024px) {
          .page-wrapper {
            padding: 20px 24px;
            width: 100%;
          }

          .chart-section {
            gap: 20px;
          }

          .chart-container {
            max-width: 280px;
          }
        }

        @media (max-width: 768px) {
          .page-wrapper {
            padding: 16px 20px;
            width: 100%;
          }

          .chart-section {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .chart-container {
            max-width: 100%;
            max-width: min(320px, 100%);
          }

          .chart-legend {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
