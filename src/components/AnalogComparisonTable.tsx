import React, { useMemo, useState } from "react";
import { ArrowUpDownIcon } from "lucide-react";
interface AnalogData {
  name: string;
  similarityScore: number;
  costPerTreatment: number;
  relativeCostRatio: "Low" | "Medium" | "High";
  safetyVsSoc: number;
  efficacyVsSoc: number;
  heorCe: "Low" | "Medium" | "High";
  competitiveLaunches: string;
  orderOfEntry: string;
  portfolioLeverage: boolean;
  unmetNeed: "Low" | "Medium" | "High" | "Very High";
}
interface AnalogComparisonTableProps {
  data: AnalogData[];
  similarityRange: [number, number];
  selectedAnalogs: string[];
}
type SortDirection = "asc" | "desc" | null;
export function AnalogComparisonTable({
  data,
  similarityRange,
  selectedAnalogs,
}: AnalogComparisonTableProps) {
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const filteredData = useMemo(() => {
    let filtered = data.filter(
      (analog) =>
        analog.similarityScore >= similarityRange[0] &&
        analog.similarityScore <= similarityRange[1]
    );
    if (selectedAnalogs.length > 0) {
      filtered = filtered.filter((analog) =>
        selectedAnalogs.includes(analog.name)
      );
    }
    if (sortDirection) {
      filtered.sort((a, b) => {
        return sortDirection === "desc"
          ? b.similarityScore - a.similarityScore
          : a.similarityScore - b.similarityScore;
      });
    }
    return filtered;
  }, [data, similarityRange, selectedAnalogs, sortDirection]);
  const handleSort = () => {
    setSortDirection((prev) => {
      if (prev === "desc") return "asc";
      if (prev === "asc") return null;
      return "desc";
    });
  };
  const getCategoryTagClass = (value: string): string => {
    const strValue = String(value).toLowerCase();
    if (strValue.includes("very high") || strValue === "high") {
      return "tag-high";
    }
    if (strValue.includes("medium")) {
      return "tag-medium";
    }
    return "tag-low";
  };
  const getNumericTagClass = (value: number): string => {
    if (value >= 75) return "tag-high";
    if (value >= 50) return "tag-medium";
    return "tag-low";
  };
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  return (
    <div className="analog-table-container">
      <h3 className="section-title" style={{marginBottom: '1rem'}}>Analog Similarity Overview</h3>
      {/* Desktop Table */}
      <div className="table-wrapper" style={{maxHeight: '400px', overflowY: 'auto', position: 'relative'}}>
        <table className="analog-table">
          <thead>
            <tr>
              <th className="text-left">Analog Name</th>
              <th className="text-center">
                <button onClick={handleSort} className="sort-button">
                  <span>Similarity Score</span>
                  <ArrowUpDownIcon
                    size={14}
                    className={sortDirection ? "text-[#FF7043]" : ""}
                  />
                </button>
              </th>
              <th className="text-right">Cost per Treatment</th>
              <th className="text-center">Relative Cost</th>
              <th className="text-center">Safety vs SoC</th>
              <th className="text-center">Efficacy vs SoC</th>
              <th className="text-center">HEOR/CE</th>
              <th className="text-center">Competitive Launches</th>
              <th className="text-center">Order of Entry</th>
              <th className="text-center">Portfolio Leverage</th>
              <th className="text-center">Unmet Need</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((analog, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td className="text-left font-medium">{analog.name}</td>
                <td className="text-center text-gray-700">{analog.similarityScore}%</td>
                <td className="text-right text-gray-700">{formatCurrency(analog.costPerTreatment)}</td>
                <td className="text-center text-gray-700">{analog.relativeCostRatio}</td>
                <td className="text-center text-gray-700">{analog.safetyVsSoc}</td>
                <td className="text-center text-gray-700">{analog.efficacyVsSoc}</td>
                <td className="text-center text-gray-700">{analog.heorCe}</td>
                <td className="text-center text-gray-700">{analog.competitiveLaunches}</td>
                <td className="text-center text-gray-700">{analog.orderOfEntry}</td>
                <td className="text-center text-gray-700">{analog.portfolioLeverage ? "Yes" : "No"}</td>
                <td className="text-center text-gray-700">{analog.unmetNeed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards removed for simplicity */}
      {filteredData.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-title">
            No analogs match the current filters.
          </p>
          <p className="empty-state-subtitle">
            Try adjusting the similarity score range or analog selection.
          </p>
        </div>
      )}
      <style>{`
        .analog-table-container {
          width: 100%;
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 1.25rem;
          box-sizing: border-box;
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0F172A;
        }
        .table-wrapper {
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          max-height: 480px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          position: relative;
        }
        .analog-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .analog-table thead {
          background-color: #0F172A;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .analog-table th {
          color: #FFFFFF;
          font-weight: 600;
          font-size: 0.8125rem;
          padding: 12px 14px;
          white-space: nowrap;
          border-bottom: 2px solid #1E293B;
        }
        .analog-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #F1F5F9;
          font-size: 0.8125rem;
          color: #334155;
          vertical-align: middle;
        }
        .analog-table tbody tr {
          transition: background-color 0.15s ease;
        }
        .analog-table tbody tr:hover {
          background-color: #F8FAFC;
        }
        .row-even {
          background-color: #FFFFFF;
        }
        .row-odd {
          background-color: #FAFAFA;
        }
        .sort-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }
        .sort-button:hover {
          color: #FF7043;
        }
        .empty-state {
          background: #F8FAFC;
          border: 2px dashed #CBD5E1;
          border-radius: 8px;
          padding: 3rem 1.5rem;
          text-align: center;
        }
        .empty-state-title {
          font-size: 1rem;
          color: #64748B;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .empty-state-subtitle {
          font-size: 0.875rem;
          color: #94A3B8;
        }
      `}</style>
    </div>
  );
}
