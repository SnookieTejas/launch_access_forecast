import React, { useState } from "react";
import {
  TrendingUpIcon,
  PlusIcon,
  FlaskConicalIcon,
  InfoIcon,
  BarChart3Icon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Input } from "../components/Input";
import { SegmentedControl } from "../components/SegmentedControl";
import { Toggle } from "../components/Toggle";
import { RangeSlider } from "../components/RangeSlider";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
// Field descriptions for tooltips
const fieldDescriptions: Record<string, string> = {
  "Product name": "Enter product name",
  "HEOR/CE":
    "Relative cost-benefit tradeoff based on any potential to offset medical costs and HEOR or Comparative Effectiveness study findings. HEOR/CE studies conducted in the US till one year post product launch should be considered",
  "Demonstrated efficacy in sub-population":
    "Whether drug may be limited in usage to a subpopulation within therapy area",
  "Efficacy vs SoC":
    "Comparison of the efficacy profile of the product relative to standard of care (SoC) for product indications. The standard of care considered is the market leading product within the same or similar class as the analog at its time of launch",
  "Safety vs SoC":
    "Comparison of the safety profile of the product relative to standard of care (SoC) for product indications. The standard of care considered is the market leading product within the same or similar class as the analog at its time of launch",
  "Relative cost ratio":
    "The relative cost ratio is the difference between cost of treatment by product vs. by branded SoC as a percentage of branded SoC's cost. Cost of treatment is calculated based on WAC costs at the product's time of launch",
  "Cost per treatment per annum":
    "Cost per patient per year for treating the indication on label based on typical dosage, frequency and course of treatment. WAC price of drug at its time of launch is used.",
  "Commercial (%)":
    "Percentage of patients covered under commercial insurance plans",
  "Medicare (%)": "Percentage of patients covered under Medicare",
  "Medicaid (%)": "Percentage of patients covered under Medicaid",
  "Unmet need in therapy area":
    "The residual disease outcome (including that caused by SoC safety issues) that is yet to be addressed under current SoC",
  Advocacy:
    "Physician or patient advocacy, potentially translated into socio-political pressure (e.g. legislation) for payers to cover a product. Three factors are considered with more weight given to Part D protected class status and patient advocacy group (1) Whether the drug is in one of the Part D Protected Classes (2) Whether the drug or its drug class has been incorporated into clinical treatment guidelines with uniformity (3) Whether there are well organized (focused, well funded and with visible advocacy activities) patient advocacy groups for the therapy area",
  "Low cost option usage":
    "Usage of low cost options primarily generics but also include OTCs and non-pharmaceutical interventions available in therapeutic area currently and in the foreseeable future. This includes consideration of competitive generic launches +12 months",
  "Treatment options":
    "Number of branded drugs within the therapeutic area (within and outside of same class, suitable for treatment of patients at similar disease stages)",
  "Budget impact of disease treated by drug":
    "Annual gross budget impact of drug due to pharmacy cost estimated from (1) Cost per treatment per annum (2) Number of patients with the disease at a treatment stage that the drug is appropriate for",
  "Orphan status":
    "Whether or not all indications that the drug has been approved for are orphan indications",
  "Portfolio leverage":
    "Whether manufacturer has other products within (or outside therapy area) that product may leverage to gain better access (e.g. via portfolio rebates)",
  "Higher value to patient relative to plan":
    "Whether product has higher value to the patient, likely driven by perceivable benefit to quality of living, relative to plan",
  "Order of entry":
    "Whether the drug is amongst the first within class, intermediate to class, or late me-too branded products",
  "Competitive branded launches":
    "Number of competitor brand launches within the same or related classes during 12 months preceding or following launch of the product",
};
// InfoTooltip component
function InfoTooltip({ label }: { label: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const description = fieldDescriptions[label] || "";
  if (!description) return null;
  return (
    <div className="relative inline-block">
      <InfoIcon
        size={14}
        className="text-gray-500 flex-shrink-0 cursor-help"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className="absolute z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg -left-2 top-6 animate-fadeIn">
          {description}
          <div className="absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      )}
    </div>
  );
}
interface ScenarioTab {
  id: string;
  label: string;
}
const scenarioTabs: ScenarioTab[] = [
  {
    id: "base",
    label: "Base Case",
  },
  {
    id: "scenario1",
    label: "Scenario 1",
  },
  {
    id: "scenario2",
    label: "Base Case",
  },
  {
    id: "scenario3",
    label: "Scenario 3",
  },
  {
    id: "scenario4",
    label: "Base Case",
  },
];
const tppAttributes = [
  {
    attribute: "Cost per treatment per annum",
    value: "$85,000",
    betterEfficacyValue: "$95,000",
    lowerSafetyValue: "$75,000",
  },
  {
    attribute: "Budget impact of disease treated by drug (millions)",
    value: "$450M",
    betterEfficacyValue: "$520M",
    lowerSafetyValue: "$380M",
  },
  {
    attribute: "Relative cost ratio",
    value: "Medium",
    betterEfficacyValue: "High",
    lowerSafetyValue: "Low",
  },
  {
    attribute: "Safety vs. SoC",
    value: "Medium",
    betterEfficacyValue: "Medium",
    lowerSafetyValue: "Low",
  },
  {
    attribute: "Efficacy vs. SoC",
    value: "Medium",
    betterEfficacyValue: "High",
    lowerSafetyValue: "Medium",
  },
  {
    attribute: "Unmet need in therapy area",
    value: "High",
    betterEfficacyValue: "High",
    lowerSafetyValue: "Medium",
  },
  {
    attribute: "Demonstrated efficacy in sub-population",
    value: "No",
    betterEfficacyValue: "Yes",
    lowerSafetyValue: "No",
  },
  {
    attribute: "Treatment options",
    value: "Medium",
    betterEfficacyValue: "High",
    lowerSafetyValue: "Low",
  },
  {
    attribute: "Low cost option usage",
    value: "Low",
    betterEfficacyValue: "Medium",
    lowerSafetyValue: "High",
  },
  {
    attribute: "Order of entry",
    value: "2nd",
    betterEfficacyValue: "1st",
    lowerSafetyValue: "3rd",
  },
  {
    attribute: "Competitive branded launches (±12 months)",
    value: "3-5",
    betterEfficacyValue: "<3",
    lowerSafetyValue: ">5",
  },
  {
    attribute: "Portfolio leverage",
    value: "Yes",
    betterEfficacyValue: "Yes",
    lowerSafetyValue: "No",
  },
  {
    attribute: "HEOR/CE",
    value: "Low",
    betterEfficacyValue: "Medium",
    lowerSafetyValue: "Low",
  },
  {
    attribute: "Orphan status",
    value: "No",
    betterEfficacyValue: "No",
    lowerSafetyValue: "Yes",
  },
  {
    attribute: "Advocacy",
    value: "Medium",
    betterEfficacyValue: "High",
    lowerSafetyValue: "Low",
  },
  {
    attribute: "Value to patient relative to plan",
    value: "Medium",
    betterEfficacyValue: "High",
    lowerSafetyValue: "Low",
  },
];
const baseChartData = {
  label: "Base case",
  value: 12000,
};
// Scenario 2 comparison data
const scenario2ChartData = [
  {
    label: "Base case",
    value: 12000,
  },
  {
    label: "Better efficacy",
    value: 16000,
  },
];
// Scenario 4 comparison data
const scenario4ChartData = [
  {
    label: "Base case",
    value: 12000,
  },
  {
    label: "Better efficacy",
    value: 16000,
  },
  {
    label: "Lower safety",
    value: 8000,
  },
];
const orderOfEntry = ["1st", "2nd", "3rd", "4th", "5th", ">5th"];
const competitiveLaunches = ["<3", "3-5", ">5"];
// Color palette for tiers
const TIER_COLORS = {
  "Restrictive tier": "#32190A",
  "Non-preferred": "#BA5422",
  "Non-preferred with interventions": "#EB6620",
  "Preferred with interventions": "#EE8045",
  Preferred: "#FCC9B1",
};
// Helper function for contrast colors
const getContrastColor = (hexColor: string | undefined): string => {
  if (!hexColor || typeof hexColor !== "string" || !hexColor.startsWith("#")) {
    return "#FFFFFF";
  }
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};
// Mock data for donut charts - Base Case
const donutDataBaseCase = {
  Commercial: [
    {
      name: "Preferred",
      value: 35,
    },
    {
      name: "Preferred with interventions",
      value: 25,
    },
    {
      name: "Non-preferred with interventions",
      value: 20,
    },
    {
      name: "Non-preferred",
      value: 10,
    },
    {
      name: "Restrictive tier",
      value: 10,
    },
  ],
  Medicare: [
    {
      name: "Preferred",
      value: 25,
    },
    {
      name: "Preferred with interventions",
      value: 10,
    },
    {
      name: "Non-preferred with interventions",
      value: 45,
    },
    {
      name: "Non-preferred",
      value: 5,
    },
    {
      name: "Restrictive tier",
      value: 15,
    },
  ],
  Medicaid: [
    {
      name: "Preferred",
      value: 50,
    },
    {
      name: "Preferred with interventions",
      value: 25,
    },
    {
      name: "Non-preferred with interventions",
      value: 5,
    },
    {
      name: "Non-preferred",
      value: 12,
    },
    {
      name: "Restrictive tier",
      value: 8,
    },
  ],
};
// Mock data for donut charts - Better Efficacy
const donutDataBetterEfficacy = {
  Commercial: [
    {
      name: "Preferred",
      value: 10,
    },
    {
      name: "Preferred with interventions",
      value: 20,
    },
    {
      name: "Non-preferred with interventions",
      value: 30,
    },
    {
      name: "Non-preferred",
      value: 30,
    },
    {
      name: "Restrictive tier",
      value: 10,
    },
  ],
  Medicare: [
    {
      name: "Preferred",
      value: 20,
    },
    {
      name: "Preferred with interventions",
      value: 20,
    },
    {
      name: "Non-preferred with interventions",
      value: 20,
    },
    {
      name: "Non-preferred",
      value: 10,
    },
    {
      name: "Restrictive tier",
      value: 30,
    },
  ],
  Medicaid: [
    {
      name: "Preferred",
      value: 40,
    },
    {
      name: "Preferred with interventions",
      value: 10,
    },
    {
      name: "Non-preferred with interventions",
      value: 10,
    },
    {
      name: "Non-preferred",
      value: 20,
    },
    {
      name: "Restrictive tier",
      value: 10,
    },
  ],
};
// Mock data for donut charts - Lower Safety
const donutDataLowerSafety = {
  Commercial: [
    {
      name: "Preferred",
      value: 5,
    },
    {
      name: "Preferred with interventions",
      value: 5,
    },
    {
      name: "Non-preferred with interventions",
      value: 30,
    },
    {
      name: "Non-preferred",
      value: 40,
    },
    {
      name: "Restrictive tier",
      value: 20,
    },
  ],
  Medicare: [
    {
      name: "Preferred",
      value: 10,
    },
    {
      name: "Preferred with interventions",
      value: 10,
    },
    {
      name: "Non-preferred with interventions",
      value: 40,
    },
    {
      name: "Non-preferred",
      value: 10,
    },
    {
      name: "Restrictive tier",
      value: 30,
    },
  ],
  Medicaid: [
    {
      name: "Preferred",
      value: 20,
    },
    {
      name: "Preferred with interventions",
      value: 20,
    },
    {
      name: "Non-preferred with interventions",
      value: 28,
    },
    {
      name: "Non-preferred",
      value: 20,
    },
    {
      name: "Restrictive tier",
      value: 14,
    },
  ],
};
// Mock data for stacked bar chart - Base Case
const barData = {
  Commercial: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 31.82,
      "Non-preferred": 41.53,
      "Non-preferred with intervention": 7.4,
      "Preferred with intervention": 4.99,
      Preferred: 14.26,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 32.14,
      "Non-preferred": 40.7,
      "Non-preferred with intervention": 7.51,
      "Preferred with intervention": 4.55,
      Preferred: 15.1,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 32.1,
      "Non-preferred": 40.1,
      "Non-preferred with intervention": 7.27,
      "Preferred with intervention": 5.03,
      Preferred: 15.5,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 32.55,
      "Non-preferred": 39.5,
      "Non-preferred with intervention": 7.27,
      "Preferred with intervention": 4.88,
      Preferred: 15.8,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 32.94,
      "Non-preferred": 39.2,
      "Non-preferred with intervention": 7.2,
      "Preferred with intervention": 4.56,
      Preferred: 16.1,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 33.16,
      "Non-preferred": 38.5,
      "Non-preferred with intervention": 7.35,
      "Preferred with intervention": 4.29,
      Preferred: 16.7,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 33.16,
      "Non-preferred": 38.2,
      "Non-preferred with intervention": 7.78,
      "Preferred with intervention": 3.96,
      Preferred: 16.9,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 33.66,
      "Non-preferred": 37.5,
      "Non-preferred with intervention": 7.97,
      "Preferred with intervention": 3.77,
      Preferred: 17.1,
    },
  ],
  Medicare: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 28.5,
      "Non-preferred": 38.2,
      "Non-preferred with intervention": 8.3,
      "Preferred with intervention": 6.5,
      Preferred: 18.5,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 28.8,
      "Non-preferred": 37.9,
      "Non-preferred with intervention": 8.4,
      "Preferred with intervention": 6.3,
      Preferred: 18.6,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 29.1,
      "Non-preferred": 37.6,
      "Non-preferred with intervention": 8.5,
      "Preferred with intervention": 6.1,
      Preferred: 18.7,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 29.4,
      "Non-preferred": 37.3,
      "Non-preferred with intervention": 8.6,
      "Preferred with intervention": 5.9,
      Preferred: 18.8,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 29.7,
      "Non-preferred": 37.0,
      "Non-preferred with intervention": 8.7,
      "Preferred with intervention": 5.7,
      Preferred: 18.9,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 30.0,
      "Non-preferred": 36.7,
      "Non-preferred with intervention": 8.8,
      "Preferred with intervention": 5.5,
      Preferred: 19.0,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 30.3,
      "Non-preferred": 36.4,
      "Non-preferred with intervention": 8.9,
      "Preferred with intervention": 5.3,
      Preferred: 19.1,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 30.6,
      "Non-preferred": 36.1,
      "Non-preferred with intervention": 9.0,
      "Preferred with intervention": 5.1,
      Preferred: 19.2,
    },
  ],
  Medicaid: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 25.3,
      "Non-preferred": 42.5,
      "Non-preferred with intervention": 9.2,
      "Preferred with intervention": 7.8,
      Preferred: 15.2,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 25.6,
      "Non-preferred": 42.2,
      "Non-preferred with intervention": 9.3,
      "Preferred with intervention": 7.6,
      Preferred: 15.3,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 25.9,
      "Non-preferred": 41.9,
      "Non-preferred with intervention": 9.4,
      "Preferred with intervention": 7.4,
      Preferred: 15.4,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 26.2,
      "Non-preferred": 41.6,
      "Non-preferred with intervention": 9.5,
      "Preferred with intervention": 7.2,
      Preferred: 15.5,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 26.5,
      "Non-preferred": 41.3,
      "Non-preferred with intervention": 9.6,
      "Preferred with intervention": 7.0,
      Preferred: 15.6,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 26.8,
      "Non-preferred": 41.0,
      "Non-preferred with intervention": 9.7,
      "Preferred with intervention": 6.8,
      Preferred: 15.7,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 27.1,
      "Non-preferred": 40.7,
      "Non-preferred with intervention": 9.8,
      "Preferred with intervention": 6.6,
      Preferred: 15.8,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 27.4,
      "Non-preferred": 40.4,
      "Non-preferred with intervention": 9.9,
      "Preferred with intervention": 6.4,
      Preferred: 15.9,
    },
  ],
};
// Mock data for stacked bar chart - Better Efficacy
const barDataBetterEfficacy = {
  Commercial: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 28.5,
      "Non-preferred": 38.2,
      "Non-preferred with intervention": 9.8,
      "Preferred with intervention": 6.5,
      Preferred: 17.0,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 28.8,
      "Non-preferred": 37.8,
      "Non-preferred with intervention": 10.0,
      "Preferred with intervention": 6.2,
      Preferred: 17.2,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 29.0,
      "Non-preferred": 37.4,
      "Non-preferred with intervention": 10.2,
      "Preferred with intervention": 6.0,
      Preferred: 17.4,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 29.3,
      "Non-preferred": 37.0,
      "Non-preferred with intervention": 10.4,
      "Preferred with intervention": 5.8,
      Preferred: 17.5,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 29.6,
      "Non-preferred": 36.7,
      "Non-preferred with intervention": 10.6,
      "Preferred with intervention": 5.4,
      Preferred: 17.7,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 29.9,
      "Non-preferred": 36.3,
      "Non-preferred with intervention": 10.8,
      "Preferred with intervention": 5.2,
      Preferred: 17.8,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 30.2,
      "Non-preferred": 35.9,
      "Non-preferred with intervention": 11.0,
      "Preferred with intervention": 4.9,
      Preferred: 18.0,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 30.5,
      "Non-preferred": 35.5,
      "Non-preferred with intervention": 11.2,
      "Preferred with intervention": 4.7,
      Preferred: 18.1,
    },
  ],
  Medicare: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 25.2,
      "Non-preferred": 35.8,
      "Non-preferred with intervention": 10.5,
      "Preferred with intervention": 8.2,
      Preferred: 20.3,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 25.5,
      "Non-preferred": 35.4,
      "Non-preferred with intervention": 10.7,
      "Preferred with intervention": 8.0,
      Preferred: 20.4,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 25.8,
      "Non-preferred": 35.0,
      "Non-preferred with intervention": 10.9,
      "Preferred with intervention": 7.8,
      Preferred: 20.5,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 26.1,
      "Non-preferred": 34.6,
      "Non-preferred with intervention": 11.1,
      "Preferred with intervention": 7.6,
      Preferred: 20.6,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 26.4,
      "Non-preferred": 34.2,
      "Non-preferred with intervention": 11.3,
      "Preferred with intervention": 7.4,
      Preferred: 20.7,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 26.7,
      "Non-preferred": 33.8,
      "Non-preferred with intervention": 11.5,
      "Preferred with intervention": 7.2,
      Preferred: 20.8,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 27.0,
      "Non-preferred": 33.4,
      "Non-preferred with intervention": 11.7,
      "Preferred with intervention": 7.0,
      Preferred: 20.9,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 27.3,
      "Non-preferred": 33.0,
      "Non-preferred with intervention": 11.9,
      "Preferred with intervention": 6.8,
      Preferred: 21.0,
    },
  ],
  Medicaid: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 22.5,
      "Non-preferred": 39.8,
      "Non-preferred with intervention": 11.2,
      "Preferred with intervention": 9.5,
      Preferred: 17.0,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 22.8,
      "Non-preferred": 39.4,
      "Non-preferred with intervention": 11.4,
      "Preferred with intervention": 9.3,
      Preferred: 17.1,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 23.1,
      "Non-preferred": 39.0,
      "Non-preferred with intervention": 11.6,
      "Preferred with intervention": 9.1,
      Preferred: 17.2,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 23.4,
      "Non-preferred": 38.6,
      "Non-preferred with intervention": 11.8,
      "Preferred with intervention": 8.9,
      Preferred: 17.3,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 23.7,
      "Non-preferred": 38.2,
      "Non-preferred with intervention": 12.0,
      "Preferred with intervention": 8.7,
      Preferred: 17.4,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 24.0,
      "Non-preferred": 37.8,
      "Non-preferred with intervention": 12.2,
      "Preferred with intervention": 8.5,
      Preferred: 17.5,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 24.3,
      "Non-preferred": 37.4,
      "Non-preferred with intervention": 12.4,
      "Preferred with intervention": 8.3,
      Preferred: 17.6,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 24.6,
      "Non-preferred": 37.0,
      "Non-preferred with intervention": 12.6,
      "Preferred with intervention": 8.1,
      Preferred: 17.7,
    },
  ],
};
// Mock data for stacked bar chart - Lower Safety
const barDataLowerSafety = {
  Commercial: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 35.2,
      "Non-preferred": 44.8,
      "Non-preferred with intervention": 6.5,
      "Preferred with intervention": 3.8,
      Preferred: 9.7,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 35.5,
      "Non-preferred": 44.4,
      "Non-preferred with intervention": 6.6,
      "Preferred with intervention": 3.7,
      Preferred: 9.8,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 35.8,
      "Non-preferred": 44.1,
      "Non-preferred with intervention": 6.7,
      "Preferred with intervention": 3.5,
      Preferred: 9.9,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 36.1,
      "Non-preferred": 43.8,
      "Non-preferred with intervention": 6.8,
      "Preferred with intervention": 3.3,
      Preferred: 10.0,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 36.4,
      "Non-preferred": 43.5,
      "Non-preferred with intervention": 6.9,
      "Preferred with intervention": 3.1,
      Preferred: 10.1,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 36.7,
      "Non-preferred": 43.2,
      "Non-preferred with intervention": 7.0,
      "Preferred with intervention": 2.9,
      Preferred: 10.2,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 37.0,
      "Non-preferred": 42.9,
      "Non-preferred with intervention": 7.1,
      "Preferred with intervention": 2.7,
      Preferred: 10.3,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 37.3,
      "Non-preferred": 42.6,
      "Non-preferred with intervention": 7.2,
      "Preferred with intervention": 2.5,
      Preferred: 10.4,
    },
  ],
  Medicare: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 32.8,
      "Non-preferred": 41.5,
      "Non-preferred with intervention": 7.2,
      "Preferred with intervention": 4.8,
      Preferred: 13.7,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 33.1,
      "Non-preferred": 41.2,
      "Non-preferred with intervention": 7.3,
      "Preferred with intervention": 4.6,
      Preferred: 13.8,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 33.4,
      "Non-preferred": 40.9,
      "Non-preferred with intervention": 7.4,
      "Preferred with intervention": 4.4,
      Preferred: 13.9,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 33.7,
      "Non-preferred": 40.6,
      "Non-preferred with intervention": 7.5,
      "Preferred with intervention": 4.2,
      Preferred: 14.0,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 34.0,
      "Non-preferred": 40.3,
      "Non-preferred with intervention": 7.6,
      "Preferred with intervention": 4.0,
      Preferred: 14.1,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 34.3,
      "Non-preferred": 40.0,
      "Non-preferred with intervention": 7.7,
      "Preferred with intervention": 3.8,
      Preferred: 14.2,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 34.6,
      "Non-preferred": 39.7,
      "Non-preferred with intervention": 7.8,
      "Preferred with intervention": 3.6,
      Preferred: 14.3,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 34.9,
      "Non-preferred": 39.4,
      "Non-preferred with intervention": 7.9,
      "Preferred with intervention": 3.4,
      Preferred: 14.4,
    },
  ],
  Medicaid: [
    {
      quarter: "Launch Quarter",
      "Restrictive tier": 29.5,
      "Non-preferred": 45.2,
      "Non-preferred with intervention": 8.0,
      "Preferred with intervention": 5.8,
      Preferred: 11.5,
    },
    {
      quarter: "L+2",
      "Restrictive tier": 29.8,
      "Non-preferred": 44.9,
      "Non-preferred with intervention": 8.1,
      "Preferred with intervention": 5.6,
      Preferred: 11.6,
    },
    {
      quarter: "L+3",
      "Restrictive tier": 30.1,
      "Non-preferred": 44.6,
      "Non-preferred with intervention": 8.2,
      "Preferred with intervention": 5.4,
      Preferred: 11.7,
    },
    {
      quarter: "L+4",
      "Restrictive tier": 30.4,
      "Non-preferred": 44.3,
      "Non-preferred with intervention": 8.3,
      "Preferred with intervention": 5.2,
      Preferred: 11.8,
    },
    {
      quarter: "L+5",
      "Restrictive tier": 30.7,
      "Non-preferred": 44.0,
      "Non-preferred with intervention": 8.4,
      "Preferred with intervention": 5.0,
      Preferred: 11.9,
    },
    {
      quarter: "L+6",
      "Restrictive tier": 31.0,
      "Non-preferred": 43.7,
      "Non-preferred with intervention": 8.5,
      "Preferred with intervention": 4.8,
      Preferred: 12.0,
    },
    {
      quarter: "L+7",
      "Restrictive tier": 31.3,
      "Non-preferred": 43.4,
      "Non-preferred with intervention": 8.6,
      "Preferred with intervention": 4.6,
      Preferred: 12.1,
    },
    {
      quarter: "L+8",
      "Restrictive tier": 31.6,
      "Non-preferred": 43.1,
      "Non-preferred with intervention": 8.7,
      "Preferred with intervention": 4.4,
      Preferred: 12.2,
    },
  ],
};
export function ScenarioComparison({
  initialTab = "base",
}: {
  initialTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedChannel, setSelectedChannel] = useState<
    "Commercial" | "Medicare" | "Medicaid"
  >("Commercial");
  const [selectedPeakAccessScenario, setSelectedPeakAccessScenario] =
    useState("Better efficacy");
  const [selectedAccessUptakeScenario, setSelectedAccessUptakeScenario] =
    useState("Better efficacy");
  const [selectedPeakAccessScenarioS4, setSelectedPeakAccessScenarioS4] =
    useState("Lower safety");
  const [selectedAccessUptakeScenarioS4, setSelectedAccessUptakeScenarioS4] =
    useState("Lower safety");
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [isLowerSafetyLocked, setIsLowerSafetyLocked] = useState(false);
  // Scenario 1 form state
  const [productName, setProductName] = useState("");
  const [heorCe, setHeorCe] = useState("Medium");
  const [demonstratedEfficacy, setDemonstratedEfficacy] = useState(false);
  const [efficacyVsSoc, setEfficacyVsSoc] = useState(50);
  const [safetyVsSoc, setSafetyVsSoc] = useState(50);
  const [relativeCostRatio, setRelativeCostRatio] = useState("Medium");
  const [costPerTreatment, setCostPerTreatment] = useState("");
  const [commercial, setCommercial] = useState("65");
  const [medicare, setMedicare] = useState("20");
  const [medicaid, setMedicaid] = useState("10");
  const [unmetNeed, setUnmetNeed] = useState("Medium");
  const [lowCostOption, setLowCostOption] = useState("Medium");
  const [budgetImpact, setBudgetImpact] = useState("Medium");
  const [portfolioLeverage, setPortfolioLeverage] = useState(false);
  const [orderEntry, setOrderEntry] = useState("");
  const [advocacy, setAdvocacy] = useState("Medium");
  const [treatmentOptions, setTreatmentOptions] = useState("Medium");
  const [orphanStatus, setOrphanStatus] = useState(false);
  const [higherValue, setHigherValue] = useState(false);
  const [competitiveBranded, setCompetitiveBranded] = useState("");
  // Scenario 3 form state (separate state)
  const [productName3, setProductName3] = useState("");
  const [heorCe3, setHeorCe3] = useState("Medium");
  const [demonstratedEfficacy3, setDemonstratedEfficacy3] = useState(false);
  const [efficacyVsSoc3, setEfficacyVsSoc3] = useState(50);
  const [safetyVsSoc3, setSafetyVsSoc3] = useState(50);
  const [relativeCostRatio3, setRelativeCostRatio3] = useState("Medium");
  const [costPerTreatment3, setCostPerTreatment3] = useState("");
  const [commercial3, setCommercial3] = useState("65");
  const [medicare3, setMedicare3] = useState("20");
  const [medicaid3, setMedicaid3] = useState("10");
  const [unmetNeed3, setUnmetNeed3] = useState("Medium");
  const [lowCostOption3, setLowCostOption3] = useState("Medium");
  const [budgetImpact3, setBudgetImpact3] = useState("Medium");
  const [portfolioLeverage3, setPortfolioLeverage3] = useState(false);
  const [orderEntry3, setOrderEntry3] = useState("");
  const [advocacy3, setAdvocacy3] = useState("Medium");
  const [treatmentOptions3, setTreatmentOptions3] = useState("Medium");
  const [orphanStatus3, setOrphanStatus3] = useState(false);
  const [higherValue3, setHigherValue3] = useState(false);
  const [competitiveBranded3, setCompetitiveBranded3] = useState("");
  const handleAddScenario = () => {
    // If on base case, show modal with scenario options
    if (activeTab === "base") {
      setShowScenarioModal(true);
      return;
    }
    // If on scenario 2 (Better Efficacy), show modal with custom and lower safety options
    if (activeTab === "scenario2") {
      setShowScenarioModal(true);
      return;
    }
    // For other tabs, use the original logic
    const scenarioMap: Record<string, string> = {
      base: "scenario1",
      scenario1: "scenario2",
      scenario2: "scenario3",
      scenario3: "scenario4",
    };
    const nextScenario = scenarioMap[activeTab];
    if (nextScenario) {
      setActiveTab(nextScenario);
    }
  };
  const handleScenarioSelection = (scenarioType: string) => {
    setShowScenarioModal(false);
    if (scenarioType === "custom") {
      // If coming from base case, go to scenario 1
      if (activeTab === "base") {
        setActiveTab("scenario1"); // Navigate to Input Selection (formerly Scenario 1)
      }
      // If coming from scenario 2 (Better Efficacy), go to scenario 3
      else if (activeTab === "scenario2") {
        setActiveTab("scenario3"); // Navigate to Input Selection (Scenario 3)
      }
    } else if (scenarioType === "better-efficacy") {
      setActiveTab("scenario2"); // Navigate to Better Efficacy (Scenario 2)
    } else if (scenarioType === "lower-safety") {
      setActiveTab("scenario4"); // Navigate to Lower Safety (Scenario 4)
    }
  };
  const handleMarketProfileSubmit = () => {
    setActiveTab("scenario2");
  };
  const handleMarketProfileSubmit3 = () => {
    setActiveTab("scenario4");
  };
  const isAddDisabled = activeTab === "scenario4";
  const channelOptions = ["Commercial", "Medicare", "Medicaid"];
  // Custom tooltip for pie charts
  const CustomPieTooltip = ({ active, payload }: any) => {
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
  // Enhanced custom label for donut charts
  const renderDonutLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const fillColor = TIER_COLORS[name as keyof typeof TIER_COLORS];
    const textColor = getContrastColor(fillColor);
    return (
      <text
        x={x}
        y={y}
        fill={textColor}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="600"
      >
        {`${value}%`}
      </text>
    );
  };
  // Bar label renderer
  const renderBarLabel = (props: any) => {
    const { x, y, width, height, value, payload } = props;
    if (value < 5) return null;
    let tierColor = "#32190A";
    if (payload) {
      if (payload["Restrictive tier"] === value) {
        tierColor = TIER_COLORS["Restrictive tier"];
      } else if (payload["Non-preferred"] === value) {
        tierColor = TIER_COLORS["Non-preferred"];
      } else if (payload["Non-preferred with intervention"] === value) {
        tierColor = TIER_COLORS["Non-preferred with interventions"];
      } else if (payload["Preferred with intervention"] === value) {
        tierColor = TIER_COLORS["Preferred with interventions"];
      } else if (payload["Preferred"] === value) {
        tierColor = TIER_COLORS["Preferred"];
      }
    }
    const textColor = getContrastColor(tierColor);
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill={textColor}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="600"
      >
        {`${value.toFixed(1)}%`}
      </text>
    );
  };
  const renderDonutChart = (
    channel: "Commercial" | "Medicare" | "Medicaid"
  ) => {
    // Determine which data set to use based on active tab and selected scenario
    let donutData;
    if (activeTab === "scenario4") {
      // For Scenario 4, use the scenario 4 dropdown selection
      if (selectedPeakAccessScenarioS4 === "Lower safety") {
        donutData = donutDataLowerSafety;
      } else if (selectedPeakAccessScenarioS4 === "Better efficacy") {
        donutData = donutDataBetterEfficacy;
      } else {
        donutData = donutDataBaseCase;
      }
    } else if (activeTab === "scenario2") {
      // For Scenario 2, use the scenario 2 dropdown selection
      donutData =
        selectedPeakAccessScenario === "Better efficacy"
          ? donutDataBetterEfficacy
          : donutDataBaseCase;
    } else {
      // For other tabs, use base case data
      donutData = donutDataBaseCase;
    }
    const data = donutData[channel];
    return (
      <div className="donut-chart-wrapper">
        <div className="donut-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={600}
                label={renderDonutLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={TIER_COLORS[entry.name as keyof typeof TIER_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center-label">
            <span className="channel-name">{channel}</span>
          </div>
        </div>
      </div>
    );
  };
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-[#0D0C24] mb-2">
            {payload[0].payload.quarter}
          </p>
          {payload.reverse().map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm"
              style={{
                color: entry.color,
              }}
            >
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  // Render navigation component
  const renderScenarioNavigation = (isTopNavigation = true) => {
    // If lower safety is locked and this is top navigation, show only base case, better efficacy, and lower safety
    if (isLowerSafetyLocked && isTopNavigation) {
      return (
        <div className="sub-navigation-pane">
          <div className="sub-nav-content">
            <div className="scenario-tabs">
              <button
                onClick={() => setActiveTab("base")}
                className={`scenario-tab ${
                  activeTab === "base"
                    ? "scenario-tab-active"
                    : "scenario-tab-inactive"
                }`}
              >
                Base Case
              </button>
              <button
                onClick={() => setActiveTab("scenario2")}
                className={`scenario-tab ${
                  activeTab === "scenario2"
                    ? "scenario-tab-active"
                    : "scenario-tab-inactive"
                }`}
              >
                Better Efficacy
              </button>
              <button
                onClick={() => setActiveTab("scenario4")}
                className={`scenario-tab ${
                  activeTab === "scenario4"
                    ? "scenario-tab-active"
                    : "scenario-tab-inactive"
                }`}
              >
                Lower safety
              </button>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isLowerSafetyLocked}
                  onChange={(e) => setIsLowerSafetyLocked(e.target.checked)}
                  className="scenario-checkbox"
                />
                <span className="checkbox-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      );
    }
    // For base case, show only base case tab with add scenario button beside it
    if (activeTab === "base") {
      return (
        <div className="sub-navigation-pane">
          <div className="sub-nav-content">
            <div className="scenario-tabs">
              <button
                onClick={() => setActiveTab("base")}
                className="scenario-tab scenario-tab-active"
              >
                Base Case
              </button>
              <button
                className="add-scenario-button-inline"
                onClick={handleAddScenario}
              >
                <div className="add-icon-circle">
                  <PlusIcon className="add-icon" />
                </div>
                <span className="add-scenario-text">Add Scenario</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    // For scenario 1, show only base case and input selection tabs (no add scenario button)
    if (activeTab === "scenario1") {
      return (
        <div className="sub-navigation-pane">
          <div className="sub-nav-content">
            <div className="scenario-tabs">
              <button
                onClick={() => setActiveTab("base")}
                className="scenario-tab scenario-tab-inactive"
              >
                Base Case
              </button>
              <button
                onClick={() => setActiveTab("scenario1")}
                className="scenario-tab scenario-tab-active"
              >
                Input Selection
              </button>
            </div>
          </div>
        </div>
      );
    }
    // For scenario 2 top navigation, show only base case and scenario 2 with add scenario button inline
    if (activeTab === "scenario2" && isTopNavigation) {
      return (
        <div className="sub-navigation-pane">
          <div className="sub-nav-content">
            <div className="scenario-tabs">
              <button
                onClick={() => setActiveTab("base")}
                className="scenario-tab scenario-tab-inactive"
              >
                Base Case
              </button>
              <button
                onClick={() => setActiveTab("scenario2")}
                className="scenario-tab scenario-tab-active"
              >
                Better efficacy
              </button>
              <button
                className="add-scenario-button-inline"
                onClick={handleAddScenario}
              >
                <div className="add-icon-circle">
                  <PlusIcon className="add-icon" />
                </div>
                <span className="add-scenario-text">Add Scenario</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    // For scenario 3 top navigation, show only base case, scenario 2, and scenario 3
    if (activeTab === "scenario3" && isTopNavigation) {
      return (
        <div className="sub-navigation-pane">
          <div className="sub-nav-content">
            <div className="scenario-tabs">
              <button
                onClick={() => setActiveTab("base")}
                className="scenario-tab scenario-tab-inactive"
              >
                Base Case
              </button>
              <button
                onClick={() => setActiveTab("scenario2")}
                className="scenario-tab scenario-tab-inactive"
              >
                Better Efficacy
              </button>
              <button
                onClick={() => setActiveTab("scenario3")}
                className="scenario-tab scenario-tab-active"
              >
                Input Selection
              </button>
            </div>
          </div>
        </div>
      );
    }
    // For scenario 4 top navigation, show only base case, scenario 2, and scenario 4 with checkbox
    if (activeTab === "scenario4" && isTopNavigation) {
      return (
        <div className="sub-navigation-pane">
          <div className="sub-nav-content">
            <div className="scenario-tabs">
              <button
                onClick={() => setActiveTab("base")}
                className="scenario-tab scenario-tab-inactive"
              >
                Base Case
              </button>
              <button
                onClick={() => setActiveTab("scenario2")}
                className="scenario-tab scenario-tab-inactive"
              >
                Better Efficacy
              </button>
              <button
                onClick={() => setActiveTab("scenario4")}
                className="scenario-tab scenario-tab-active"
              >
                Lower safety
              </button>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isLowerSafetyLocked}
                  onChange={(e) => setIsLowerSafetyLocked(e.target.checked)}
                  className="scenario-checkbox"
                />
                <span className="checkbox-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      );
    }
    // For other scenarios, show all tabs with add scenario button on the right
    return (
      <div className="sub-navigation-pane">
        <div className="sub-nav-content">
          <div className="scenario-tabs">
            {scenarioTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`scenario-tab ${
                  activeTab === tab.id
                    ? "scenario-tab-active"
                    : "scenario-tab-inactive"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            className="add-scenario-button"
            onClick={handleAddScenario}
            disabled={isAddDisabled}
          >
            <div className="add-icon-circle">
              <PlusIcon className="add-icon" />
            </div>
            <span className="add-scenario-text">Add Scenario</span>
          </button>
        </div>
      </div>
    );
  };
  // Determine chart type based on active tab
  const showTwoBarChart = activeTab === "scenario2";
  const showThreeBarChart = activeTab === "scenario4";
  // Show content for Base Case, Scenario 2, and Scenario 4 (but not Scenario 3)
  const showContent =
    activeTab === "base" ||
    activeTab === "scenario2" ||
    activeTab === "scenario4";
  return (
    <div className="page-wrapper">
      <div className="page-container">
        {/* Top Sub-Navigation Pane */}
        {renderScenarioNavigation(true)}

        {/* Scenario Selection Modal */}
        {showScenarioModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowScenarioModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Select Scenario Type</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowScenarioModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <button
                  className="scenario-option-button"
                  onClick={() => handleScenarioSelection("custom")}
                >
                  <div className="scenario-option-content">
                    <FlaskConicalIcon
                      className="scenario-option-icon"
                      size={24}
                    />
                    <div className="scenario-option-text">
                      <h4 className="scenario-option-title">Custom Scenario</h4>
                      <p className="scenario-option-description">
                        Create a custom scenario with your own inputs
                      </p>
                    </div>
                  </div>
                </button>

                {/* Show Better Efficacy option only on base case */}
                {activeTab === "base" && (
                  <button
                    className="scenario-option-button"
                    onClick={() => handleScenarioSelection("better-efficacy")}
                  >
                    <div className="scenario-option-content">
                      <TrendingUpIcon
                        className="scenario-option-icon"
                        size={24}
                      />
                      <div className="scenario-option-text">
                        <h4 className="scenario-option-title">
                          Better Efficacy
                        </h4>
                        <p className="scenario-option-description">
                          Scenario with improved efficacy outcomes
                        </p>
                      </div>
                    </div>
                  </button>
                )}

                <button
                  className="scenario-option-button"
                  onClick={() => handleScenarioSelection("lower-safety")}
                >
                  <div className="scenario-option-content">
                    <InfoIcon className="scenario-option-icon" size={24} />
                    <div className="scenario-option-text">
                      <h4 className="scenario-option-title">Lower Safety</h4>
                      <p className="scenario-option-description">
                        Scenario with reduced safety profile
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content - Show for Base Case, Scenario 2, and Scenario 4 only */}
        {showContent && activeTab !== "scenario1" && (
          <>
            <div className="content-layout">
              {/* Left Panel - Bar Chart */}
              <div className="chart-panel">
                <h2 className="text-lg font-semibold text-[#0D0C24] mb-2">Patient Count Comparison</h2>
                <div className="chart-svg-container" style={{margin: 0, padding: 0}}>
                  {showThreeBarChart ? (
                    // Scenario 4 - Three bars comparison
                    <svg
                      viewBox="0 0 700 450"
                      className="chart-svg"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <marker
                          id="arrowY"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                        </marker>
                        <marker
                          id="arrowX"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                        </marker>
                        <linearGradient
                          id="orangeGradient"
                          x1="0%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#C2410C" />
                          <stop offset="100%" stopColor="#FDBA74" />
                        </linearGradient>
                        <linearGradient
                          id="redGradient"
                          x1="0%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#7F1D1D" />
                          <stop offset="100%" stopColor="#DC2626" />
                        </linearGradient>
                      </defs>

                      <line
                        x1="120"
                        y1="380"
                        x2="120"
                        y2="30"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowY)"
                      />
                      <line
                        x1="120"
                        y1="380"
                        x2="680"
                        y2="380"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowX)"
                      />

                      <text
                        x="40"
                        y="200"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                        transform="rotate(-90, 40, 160)"
                      >
                        Number of patients on therapy
                      </text>

                      {/* Bar 1 - Base case (Orange) */}
                      <rect
                        x="180"
                        y="140"
                        width="90"
                        height="240"
                        fill="url(#orangeGradient)"
                        rx="4"
                      />
                      <text
                        x="225"
                        y="125"
                        fill="#374151"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        12,000
                      </text>
                      <text
                        x="225"
                        y="405"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Base case
                      </text>

                      {/* Bar 2 - Better efficacy (Red) */}
                      <rect
                        x="320"
                        y="80"
                        width="90"
                        height="300"
                        fill="url(#redGradient)"
                        rx="4"
                      />
                      <text
                        x="365"
                        y="65"
                        fill="#374151"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        16,000
                      </text>
                      <text
                        x="365"
                        y="405"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Better efficacy
                      </text>

                      {/* Bar 3 - Lower safety (Orange) */}
                      <rect
                        x="460"
                        y="220"
                        width="90"
                        height="160"
                        fill="url(#orangeGradient)"
                        rx="4"
                      />
                      <text
                        x="505"
                        y="205"
                        fill="#374151"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        8,000
                      </text>
                      <text
                        x="505"
                        y="405"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Lower safety
                      </text>
                    </svg>
                  ) : showTwoBarChart ? (
                    // Scenario 2 - Two bars comparison
                    <svg
                      viewBox="0 0 600 450"
                      className="chart-svg"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <marker
                          id="arrowY"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                        </marker>
                        <marker
                          id="arrowX"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                        </marker>
                        <linearGradient
                          id="orangeGradient"
                          x1="0%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#C2410C" />
                          <stop offset="100%" stopColor="#FDBA74" />
                        </linearGradient>
                        <linearGradient
                          id="redGradient"
                          x1="0%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#7F1D1D" />
                          <stop offset="100%" stopColor="#DC2626" />
                        </linearGradient>
                      </defs>

                      <line
                        x1="120"
                        y1="380"
                        x2="120"
                        y2="30"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowY)"
                      />
                      <line
                        x1="120"
                        y1="380"
                        x2="580"
                        y2="380"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowX)"
                      />

                      <text
                        x="40"
                        y="200"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                        transform="rotate(-90, 40, 160)"
                      >
                        Number of patients on therapy
                      </text>

                      <rect
                        x="220"
                        y="140"
                        width="100"
                        height="240"
                        fill="url(#orangeGradient)"
                        rx="4"
                      />
                      <text
                        x="270"
                        y="125"
                        fill="#374151"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        12,000
                      </text>
                      <text
                        x="270"
                        y="405"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Base case
                      </text>

                      <rect
                        x="380"
                        y="80"
                        width="100"
                        height="300"
                        fill="url(#redGradient)"
                        rx="4"
                      />
                      <text
                        x="430"
                        y="65"
                        fill="#374151"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        16,000
                      </text>
                      <text
                        x="430"
                        y="405"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Better efficacy
                      </text>
                    </svg>
                  ) : (
                    // Base Case - Single bar
                    <svg
                      viewBox="0 0 600 450"
                      className="chart-svg"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <marker
                          id="arrowY"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                        </marker>
                        <marker
                          id="arrowX"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                        </marker>
                        <linearGradient
                          id="orangeGradient"
                          x1="0%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#C2410C" />
                          <stop offset="100%" stopColor="#FDBA74" />
                        </linearGradient>
                      </defs>

                      <line
                        x1="120"
                        y1="380"
                        x2="120"
                        y2="30"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowY)"
                      />
                      <line
                        x1="120"
                        y1="380"
                        x2="580"
                        y2="380"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowX)"
                      />

                      <text
                        x="40"
                        y="200"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                        transform="rotate(-90, 40, 160)"
                      >
                        Number of patients on therapy
                      </text>

                      <rect
                        x="300"
                        y="100"
                        width="120"
                        height="280"
                        fill="url(#orangeGradient)"
                        rx="4"
                      />

                      <text
                        x="360"
                        y="85"
                        fill="#374151"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        12,000
                      </text>

                      <text
                        x="360"
                        y="410"
                        fill="#4B5563"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Base case
                      </text>
                    </svg>
                  )}
                </div>
              </div>

              {/* Right Panel - TPP Table */}
              <div className="table-panel">
                <h2 className="text-lg font-semibold text-[#0D0C24] mb-2">Target Product Profile Comparison</h2>
                <div className="tpp-table-container">
                  <table className="tpp-table">
                    <thead>
                      <tr>
                        <th className="table-header">TPP</th>
                        <th className="table-header">
                          {scenarioTabs.find((t) => t.id === activeTab)?.label}
                        </th>
                        {showTwoBarChart && (
                          <th className="table-header">Better efficacy</th>
                        )}
                        {showThreeBarChart && (
                          <>
                            <th className="table-header">Better efficacy</th>
                            <th className="table-header">Lower safety</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {tppAttributes.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "row-even" : "row-odd"}
                        >
                          <td className="table-cell cell-attribute">
                            {item.attribute}
                          </td>
                          <td className="table-cell cell-value">
                            {item.value}
                          </td>
                          {showTwoBarChart && (
                            <td className="table-cell cell-value">
                              {item.betterEfficacyValue}
                            </td>
                          )}
                          {showThreeBarChart && (
                            <>
                              <td className="table-cell cell-value">
                                {item.betterEfficacyValue}
                              </td>
                              <td className="table-cell cell-value">
                                {item.lowerSafetyValue}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 1: 24-Month Peak Access by Channel */}
            <div className="access-section-container">
              <div className="section-header-with-select">
                <div className="section-header-left">
                  <TrendingUpIcon className="w-6 h-6 text-[#FF5A5F]" />
                  <h2 className="text-xl font-semibold text-[#0D0C24]">
                    24-Month Peak Access by Channel
                  </h2>
                </div>
                {activeTab === "scenario2" && (
                  <div className="filter-with-label">
                    <label className="filter-label">Scenario</label>
                    <div className="select-scenario-inline-compact">
                      <Select
                        label=""
                        placeholder="Select scenario"
                        options={["Base Case", "Better efficacy"]}
                        value={selectedPeakAccessScenario}
                        onChange={(value) =>
                          setSelectedPeakAccessScenario(value)
                        }
                      />
                    </div>
                  </div>
                )}
                {activeTab === "scenario4" && (
                  <div className="filter-with-label">
                    <label className="filter-label">Scenario</label>
                    <div className="select-scenario-inline-compact">
                      <Select
                        label=""
                        placeholder="Select scenario"
                        options={[
                          "Base Case",
                          "Better efficacy",
                          "Lower safety",
                        ]}
                        value={selectedPeakAccessScenarioS4}
                        onChange={(value) =>
                          setSelectedPeakAccessScenarioS4(value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="chart-grid">
                {renderDonutChart("Commercial")}
                {renderDonutChart("Medicare")}
                {renderDonutChart("Medicaid")}
              </div>

              <div className="chart-legend">
                {Object.entries(TIER_COLORS).map(([name, color]) => (
                  <div key={name} className="legend-item">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Access Uptake by Channel */}
            <div className="access-section-container">
              <div className="section-header-with-select">
                <div className="section-header-left">
                  <BarChart3Icon className="w-6 h-6 text-[#FF5A5F]" />
                  <h2 className="text-xl font-semibold text-[#0D0C24]">
                    Access Uptake by Channel (24 months)
                  </h2>
                </div>
                <div className="select-filters-group">
                  {activeTab === "scenario2" && (
                    <div className="filter-with-label">
                      <label className="filter-label">Scenario</label>
                      <div className="select-scenario-inline-compact">
                        <Select
                          label=""
                          placeholder="Select scenario"
                          options={["Base Case", "Better efficacy"]}
                          value={selectedAccessUptakeScenario}
                          onChange={(value) =>
                            setSelectedAccessUptakeScenario(value)
                          }
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === "scenario4" && (
                    <div className="filter-with-label">
                      <label className="filter-label">Scenario</label>
                      <div className="select-scenario-inline-compact">
                        <Select
                          label=""
                          placeholder="Select scenario"
                          options={[
                            "Base Case",
                            "Better efficacy",
                            "Lower safety",
                          ]}
                          value={selectedAccessUptakeScenarioS4}
                          onChange={(value) =>
                            setSelectedAccessUptakeScenarioS4(value)
                          }
                        />
                      </div>
                    </div>
                  )}
                  <div className="filter-with-label">
                    <label className="filter-label">Channel</label>
                    <div className="select-channel-inline-compact">
                      <Select
                        label=""
                        placeholder="Select a channel"
                        options={channelOptions}
                        value={selectedChannel}
                        onChange={(value) =>
                          setSelectedChannel(
                            value as "Commercial" | "Medicare" | "Medicaid"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{width: '100%', margin: '0 auto'}}>
                <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={
                    activeTab === "scenario2" &&
                    selectedAccessUptakeScenario === "Better efficacy"
                      ? barDataBetterEfficacy[selectedChannel]
                      : activeTab === "scenario4"
                      ? selectedAccessUptakeScenarioS4 === "Better efficacy"
                        ? barDataBetterEfficacy[selectedChannel]
                        : selectedAccessUptakeScenarioS4 === "Lower safety"
                        ? barDataLowerSafety[selectedChannel]
                        : barData[selectedChannel]
                      : barData[selectedChannel]
                  }
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="quarter"
                    tick={{
                      fill: "#6B7280",
                      fontSize: 12,
                    }}
                    axisLine={{
                      stroke: "#E5E7EB",
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    label={{
                      value: "% Lives",
                      angle: -90,
                      position: "insideBottomLeft",
                      offset: 5,
                      style: {
                        fill: "#6B7280",
                        fontSize: 12,
                      },
                    }}
                    tick={{
                      fill: "#6B7280",
                      fontSize: 12,
                    }}
                    axisLine={{
                      stroke: "#E5E7EB",
                    }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "20px",
                    }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="Restrictive tier"
                    stackId="a"
                    fill={TIER_COLORS["Restrictive tier"]}
                    radius={[0, 0, 0, 0]}
                    label={renderBarLabel}
                  />
                  <Bar
                    dataKey="Non-preferred"
                    stackId="a"
                    fill={TIER_COLORS["Non-preferred"]}
                    radius={[0, 0, 0, 0]}
                    label={renderBarLabel}
                  />
                  <Bar
                    dataKey="Non-preferred with intervention"
                    stackId="a"
                    fill={TIER_COLORS["Non-preferred with interventions"]}
                    radius={[0, 0, 0, 0]}
                    label={renderBarLabel}
                  />
                  <Bar
                    dataKey="Preferred with intervention"
                    stackId="a"
                    fill={TIER_COLORS["Preferred with interventions"]}
                    radius={[0, 0, 0, 0]}
                    label={renderBarLabel}
                  />
                  <Bar
                    dataKey="Preferred"
                    stackId="a"
                    fill={TIER_COLORS["Preferred"]}
                    radius={[4, 4, 0, 0]}
                    label={renderBarLabel}
                  />
                </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Sub-Navigation Pane */}
            {renderScenarioNavigation(false)}
          </>
        )}

        {/* Scenario 1 - TPP and Market Profile Forms */}
        {activeTab === "scenario1" && (
          <>
            <div className="scenario-forms">
              <CollapsibleSection
                title="TPP Design"
                subtitle="Product profile"
                icon={<FlaskConicalIcon size={24} />}
              >
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Product name" />
                        Product name
                      </label>
                      <Input
                        label=""
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="HEOR/CE" />
                          HEOR/CE
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={heorCe}
                          onChange={setHeorCe}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Demonstrated efficacy in sub-population" />
                        Demonstrated efficacy in sub-population
                      </label>
                      <Toggle
                        label=""
                        checked={demonstratedEfficacy}
                        onChange={setDemonstratedEfficacy}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Relative cost ratio" />
                          Relative cost ratio
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={relativeCostRatio}
                          onChange={setRelativeCostRatio}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-3">
                        <InfoTooltip label="Efficacy vs SoC" />
                        Efficacy vs SoC
                      </label>
                      <RangeSlider
                        label=""
                        value={efficacyVsSoc}
                        onChange={setEfficacyVsSoc}
                        showValue={true}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-3">
                        <InfoTooltip label="Safety vs SoC" />
                        Safety vs SoC
                      </label>
                      <RangeSlider
                        label=""
                        value={safetyVsSoc}
                        onChange={setSafetyVsSoc}
                        showValue={true}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                      <InfoTooltip label="Cost per treatment per annum" />
                      Cost per treatment per annum
                    </label>
                    <Input
                      label=""
                      type="number"
                      placeholder="Enter cost"
                      value={costPerTreatment}
                      onChange={(e) => setCostPerTreatment(e.target.value)}
                    />
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Market profile"
                subtitle="Select the attribute options for the baseline forecast"
                icon={<TrendingUpIcon size={24} />}
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#00A699] mb-4">
                      Channel Mix (%)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Commercial (%)" />
                          Commercial (%)
                        </label>
                        <Input
                          label=""
                          type="number"
                          value={commercial}
                          onChange={(e) => setCommercial(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Medicare (%)" />
                          Medicare (%)
                        </label>
                        <Input
                          label=""
                          type="number"
                          value={medicare}
                          onChange={(e) => setMedicare(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Medicaid (%)" />
                          Medicaid (%)
                        </label>
                        <Input
                          label=""
                          type="number"
                          value={medicaid}
                          onChange={(e) => setMedicaid(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: Remaining allocation is directed to other channels
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Unmet need in therapy area" />
                          Unmet need in therapy area
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High", "Very High"]}
                          value={unmetNeed}
                          onChange={setUnmetNeed}
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Advocacy" />
                          Advocacy
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High", "Very High"]}
                          value={advocacy}
                          onChange={setAdvocacy}
                        />
                      </div>
                    </div>

                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Low cost option usage" />
                          Low cost option usage
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={lowCostOption}
                          onChange={setLowCostOption}
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Treatment options" />
                          Treatment options
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={treatmentOptions}
                          onChange={setTreatmentOptions}
                        />
                      </div>
                    </div>

                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Budget impact of disease treated by drug" />
                          Budget impact of disease treated by drug
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={budgetImpact}
                          onChange={setBudgetImpact}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Orphan status" />
                        Orphan status
                      </label>
                      <Toggle
                        label=""
                        checked={orphanStatus}
                        onChange={setOrphanStatus}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Portfolio leverage" />
                        Portfolio leverage
                      </label>
                      <Toggle
                        label=""
                        checked={portfolioLeverage}
                        onChange={setPortfolioLeverage}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Higher value to patient relative to plan" />
                        Higher value to patient relative to plan
                      </label>
                      <Toggle
                        label=""
                        checked={higherValue}
                        onChange={setHigherValue}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Order of entry" />
                        Order of entry
                      </label>
                      <Select
                        label=""
                        placeholder="Select order"
                        options={orderOfEntry}
                        value={orderEntry}
                        onChange={setOrderEntry}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Competitive branded launches" />
                        Competitive branded launches
                      </label>
                      <Select
                        label=""
                        placeholder="Select range"
                        options={competitiveLaunches}
                        value={competitiveBranded}
                        onChange={setCompetitiveBranded}
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <div className="flex items-center justify-center pt-8">
                <Button
                  type="button"
                  onClick={handleMarketProfileSubmit}
                  className="px-8 bg-[#FF5A5F] hover:bg-[#E04E52]"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Bottom Sub-Navigation Pane */}
            {renderScenarioNavigation(false)}
          </>
        )}

        {/* Scenario 3 - TPP and Market Profile Forms (Replicated from Scenario 1) */}
        {activeTab === "scenario3" && (
          <>
            <div className="scenario-forms">
              <CollapsibleSection
                title="TPP Design"
                subtitle="Product profile"
                icon={<FlaskConicalIcon size={24} />}
              >
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Product name" />
                        Product name
                      </label>
                      <Input
                        label=""
                        type="text"
                        placeholder="Enter product name"
                        value={productName3}
                        onChange={(e) => setProductName3(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="HEOR/CE" />
                          HEOR/CE
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={heorCe3}
                          onChange={setHeorCe3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Demonstrated efficacy in sub-population" />
                        Demonstrated efficacy in sub-population
                      </label>
                      <Toggle
                        label=""
                        checked={demonstratedEfficacy3}
                        onChange={setDemonstratedEfficacy3}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Relative cost ratio" />
                          Relative cost ratio
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={relativeCostRatio3}
                          onChange={setRelativeCostRatio3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-3">
                        <InfoTooltip label="Efficacy vs SoC" />
                        Efficacy vs SoC
                      </label>
                      <RangeSlider
                        label=""
                        value={efficacyVsSoc3}
                        onChange={setEfficacyVsSoc3}
                        showValue={true}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-3">
                        <InfoTooltip label="Safety vs SoC" />
                        Safety vs SoC
                      </label>
                      <RangeSlider
                        label=""
                        value={safetyVsSoc3}
                        onChange={setSafetyVsSoc3}
                        showValue={true}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                      <InfoTooltip label="Cost per treatment per annum" />
                      Cost per treatment per annum
                    </label>
                    <Input
                      label=""
                      type="number"
                      placeholder="Enter cost"
                      value={costPerTreatment3}
                      onChange={(e) => setCostPerTreatment3(e.target.value)}
                    />
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Market profile"
                subtitle="Select the attribute options for the baseline forecast"
                icon={<TrendingUpIcon size={24} />}
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#00A699] mb-4">
                      Channel Mix (%)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Commercial (%)" />
                          Commercial (%)
                        </label>
                        <Input
                          label=""
                          type="number"
                          value={commercial3}
                          onChange={(e) => setCommercial3(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Medicare (%)" />
                          Medicare (%)
                        </label>
                        <Input
                          label=""
                          type="number"
                          value={medicare3}
                          onChange={(e) => setMedicare3(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Medicaid (%)" />
                          Medicaid (%)
                        </label>
                        <Input
                          label=""
                          type="number"
                          value={medicaid3}
                          onChange={(e) => setMedicaid3(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: Remaining allocation is directed to other channels
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Unmet need in therapy area" />
                          Unmet need in therapy area
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High", "Very High"]}
                          value={unmetNeed3}
                          onChange={setUnmetNeed3}
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Advocacy" />
                          Advocacy
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High", "Very High"]}
                          value={advocacy3}
                          onChange={setAdvocacy3}
                        />
                      </div>
                    </div>

                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Low cost option usage" />
                          Low cost option usage
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={lowCostOption3}
                          onChange={setLowCostOption3}
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Treatment options" />
                          Treatment options
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={treatmentOptions3}
                          onChange={setTreatmentOptions3}
                        />
                      </div>
                    </div>

                    <div className="flex items-end">
                      <div className="w-full">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                          <InfoTooltip label="Budget impact of disease treated by drug" />
                          Budget impact of disease treated by drug
                        </label>
                        <SegmentedControl
                          label=""
                          options={["Low", "Medium", "High"]}
                          value={budgetImpact3}
                          onChange={setBudgetImpact3}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Orphan status" />
                        Orphan status
                      </label>
                      <Toggle
                        label=""
                        checked={orphanStatus3}
                        onChange={setOrphanStatus3}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Portfolio leverage" />
                        Portfolio leverage
                      </label>
                      <Toggle
                        label=""
                        checked={portfolioLeverage3}
                        onChange={setPortfolioLeverage3}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Higher value to patient relative to plan" />
                        Higher value to patient relative to plan
                      </label>
                      <Toggle
                        label=""
                        checked={higherValue3}
                        onChange={setHigherValue3}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Order of entry" />
                        Order of entry
                      </label>
                      <Select
                        label=""
                        placeholder="Select order"
                        options={orderOfEntry}
                        value={orderEntry3}
                        onChange={setOrderEntry3}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                        <InfoTooltip label="Competitive branded launches" />
                        Competitive branded launches
                      </label>
                      <Select
                        label=""
                        placeholder="Select range"
                        options={competitiveLaunches}
                        value={competitiveBranded3}
                        onChange={setCompetitiveBranded3}
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <div className="flex items-center justify-center pt-8">
                <Button
                  type="button"
                  onClick={handleMarketProfileSubmit3}
                  className="px-8 bg-[#FF5A5F] hover:bg-[#E04E52]"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Bottom Sub-Navigation Pane */}
            {renderScenarioNavigation(false)}
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
          padding: 0 2rem 2rem 2rem;
          box-sizing: border-box;
        }

        /* Sub-Navigation Pane */
        .sub-navigation-pane {
          background: rgba(15, 23, 42, 0.05);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(8px);
        }

        .sub-nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .scenario-tabs {
          display: flex;
          gap: 0.75rem;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding: 0.25rem 0;
          scrollbar-width: thin;
          scrollbar-color: #CBD5E1 transparent;
        }

        .scenario-tabs::-webkit-scrollbar {
          height: 4px;
        }

        .scenario-tabs::-webkit-scrollbar-track {
          background: transparent;
        }

        .scenario-tabs::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 2px;
        }

        .scenario-tab {
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .scenario-tab-active {
          background: #0F172A;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
        }

        .scenario-tab-inactive {
          background: rgba(255, 255, 255, 0.4);
          color: #475569;
        }

        .scenario-tab-inactive:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        /* Add Scenario Button */
        .add-scenario-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .add-scenario-button:hover:not(:disabled) {
          background: rgba(20, 184, 166, 0.1);
          transform: translateY(-1px);
        }

        .add-scenario-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .add-scenario-button:disabled:hover {
          background: transparent;
          transform: none;
        }

        /* Add Scenario Button Inline - For base case */
        .add-scenario-button-inline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .add-scenario-button-inline:hover {
          background: rgba(20, 184, 166, 0.1);
          transform: translateY(-1px);
        }

        .add-icon-circle {
          width: 1.5rem;
          height: 1.5rem;
          background: #14B8A6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(20, 184, 166, 0.3);
        }

        .add-icon {
          width: 1rem;
          height: 1rem;
          color: #FFFFFF;
        }

        .add-scenario-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0E7490;
        }

        /* Checkbox Styles */
        .checkbox-container {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          margin-left: 0.5rem;
        }

        .scenario-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-checkmark {
          width: 1.5rem;
          height: 1.5rem;
          border: 2px solid #14B8A6;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: relative;
        }

        .checkbox-checkmark::after {
          content: '';
          position: absolute;
          display: none;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background: #14B8A6;
        }

        .scenario-checkbox:checked ~ .checkbox-checkmark {
          background: #14B8A6;
          border-color: #14B8A6;
        }

        .scenario-checkbox:checked ~ .checkbox-checkmark::after {
          display: block;
          background: #FFFFFF;
        }

        .checkbox-container:hover .checkbox-checkmark {
          border-color: #0D9488;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
        }

        /* Content Layout */
        .content-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1.5rem;
          align-items: start;
          margin-bottom: 2rem;
        }

        /* Chart Panel - SVG Based */
        .chart-panel {
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          height: 100%;
        }

        .chart-svg-container {
          width: 100%;
          height: 100%;
          min-height: 450px;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
        }

        /* Table Panel */
        .table-panel {
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          height: 100%;
        }

        .tpp-table-container {
          width: 100%;
          overflow-y: auto;
          max-height: 450px;
        }

        .tpp-table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header {
          background: #0F172A;
          color: #FFFFFF;
          padding: 0.875rem 1rem;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .table-header:first-child {
          border-radius: 8px 0 0 0;
        }

        .table-header:last-child {
          border-radius: 0 8px 0 0;
        }

        .table-cell {
          padding: 0.875rem 1rem;
          font-size: 0.875rem;
          border-bottom: 1px solid #E2E8F0;
        }

        .cell-attribute {
          font-weight: 500;
          color: #334155;
        }

        .cell-value {
          color: #0F172A;
          font-weight: 600;
        }

        .row-even {
          background: #FFFFFF;
        }

        .row-odd {
          background: #F9FAFB;
        }

        .tpp-table tbody tr:hover {
          background: #F1F5F9;
        }

        /* Access Section Container */
        .access-section-container {
          width: 100%;
          margin: 0 0 2rem 0;
          padding: 1.5rem;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        /* Section Header */
        .section-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        /* Section Header with Select */
        .section-header-with-select {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: nowrap;
        }

        .section-header-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        /* Select Channel Wrapper */
        .select-channel-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Select Filters Group - For multiple filters side by side */
        .select-filters-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: nowrap;
          flex-shrink: 0;
        }

        /* Filter with Label - Wrapper for label + dropdown */
        .filter-with-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        /* Filter Label */
        .filter-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          white-space: nowrap;
          line-height: 1;
          padding-top: 0.125rem;
        }

        /* Select Channel Label */
        .select-channel-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #374151;
          white-space: nowrap;
        }

        /* Select Channel Inline */
        .select-channel-inline {
          width: 260px;
          flex-shrink: 0;
        }

        /* Select Channel Inline Compact - For Access Uptake section */
        .select-channel-inline-compact {
          width: 240px;
          flex-shrink: 0;
        }

        .select-channel-inline-compact button {
          font-size: 0.875rem;
          padding: 0.75rem 1rem;
        }

        .select-channel-inline-compact .Select__menu {
          font-size: 0.875rem;
        }

        /* Select Scenario Inline */
        .select-scenario-inline {
          width: 260px;
          flex-shrink: 0;
        }

        /* Select Scenario Inline Compact - For 24-Month Peak Access section */
        .select-scenario-inline-compact {
          width: 200px;
          flex-shrink: 0;
        }

        .select-scenario-inline-compact button {
          font-size: 0.875rem;
          padding: 0.75rem 1rem;
        }

        .select-scenario-inline-compact .Select__menu {
          font-size: 0.875rem;
        }

        /* Chart Grid */
        .chart-grid {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding: 1rem 0;
        }

        /* Donut Chart Wrapper */
        .donut-chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeInGrow 0.6s ease-out;
        }

        /* Donut Chart Container */
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

        .channel-name {
          font-weight: 600;
          color: #111827;
          font-size: 0.9rem;
          display: block;
        }

        /* Legend */
        .chart-legend {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #E5E7EB;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Scenario Forms */
        .scenario-forms {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0F172A;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 2rem;
          line-height: 1;
          color: #64748B;
          cursor: pointer;
          padding: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .modal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .scenario-option-button {
          width: 100%;
          background: #FFFFFF;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .scenario-option-button:hover {
          border-color: #14B8A6;
          background: #F0FDFA;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.15);
        }

        .scenario-option-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .scenario-option-icon {
          color: #14B8A6;
          flex-shrink: 0;
        }

        .scenario-option-text {
          flex: 1;
        }

        .scenario-option-title {
          font-size: 1rem;
          font-weight: 600;
          color: #0F172A;
          margin: 0 0 0.25rem 0;
        }

        .scenario-option-description {
          font-size: 0.875rem;
          color: #64748B;
          margin: 0;
          line-height: 1.4;
        }

        /* Animation */
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

        /* Responsive Breakpoints */

        /* Large Desktop: ≥1400px */
        @media (min-width: 1400px) {
          .page-container {
            padding: 2rem 1rem;
          }
        }

        /* Desktop: 1024px - 1399px */
        @media (min-width: 1024px) and (max-width: 1399px) {
          .page-container {
            max-width: 1200px;
            padding: 0 2rem 2rem 2rem;
          }
        }

        /* Tablet: 768px - 1279px */
        @media (max-width: 1279px) {
          .content-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .chart-panel,
          .table-panel {
            width: 100%;
          }

          .section-header-with-select {
            flex-wrap: wrap;
          }

          .select-filters-group {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .filter-with-label {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
          }

          .select-channel-wrapper {
            width: 100%;
          }

          .select-channel-inline {
            flex: 1;
            width: auto;
            max-width: 260px;
          }

          .select-channel-inline-compact {
            flex: 1;
            width: auto;
            max-width: 240px;
          }

          .select-scenario-inline-compact {
            flex: 1;
            width: auto;
            max-width: 200px;
          }
        }

        /* Tablet: ≤1023px */
        @media (max-width: 1023px) {
          .page-container {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }

          .sub-navigation-pane {
            padding: 0.875rem 1rem;
          }

          .sub-nav-content {
            flex-direction: column;
            align-items: stretch;
          }

          .scenario-tabs {
            width: 100%;
            justify-content: flex-start;
          }

          .add-scenario-button {
            width: 100%;
            justify-content: center;
          }

          .chart-svg-container {
            min-height: 400px;
          }

          .chart-grid {
            flex-direction: column;
            gap: 1.5rem;
          }

          .donut-chart-container {
            width: 240px;
            height: 240px;
          }
        }

        /* Mobile: ≤767px */
        @media (max-width: 767px) {
          .page-container {
            padding: 0 1rem 1rem 1rem;
          }

          .chart-panel,
          .table-panel,
          .access-section-container {
            padding: 1.25rem;
          }

          .chart-svg-container {
            min-height: 350px;
          }

          .scenario-tab {
            font-size: 0.8125rem;
            padding: 0.5rem 1rem;
          }

          .chart-legend {
            gap: 0.75rem 1rem;
          }
        }

        /* Small Mobile: ≤480px */
        @media (max-width: 480px) {
          .page-container {
            padding: 0 0.75rem 0.75rem 0.75rem;
          }

          .sub-navigation-pane {
            padding: 0.75rem;
            border-radius: 8px;
          }

          .scenario-tabs {
            gap: 0.5rem;
          }

          .scenario-tab {
            padding: 0.5rem 0.875rem;
          }

          .chart-panel,
          .table-panel,
          .access-section-container {
            padding: 1rem;
          }

          .chart-svg-container {
            min-height: 320px;
          }

          .table-cell {
            padding: 0.75rem 0.875rem;
            font-size: 0.8125rem;
          }

          .donut-chart-container {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>
    </div>
  );
}
