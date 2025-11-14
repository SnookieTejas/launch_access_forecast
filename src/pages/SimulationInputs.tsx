import React, { useEffect, useState } from "react";
import {
  FlaskConicalIcon,
  TrendingUpIcon,
  InfoIcon,
  FlaskRoundIcon,
} from "lucide-react";
import { Header } from "../components/Header";
import { TabNavigation } from "../components/TabNavigation";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { SegmentedControl } from "../components/SegmentedControl";
import { Toggle } from "../components/Toggle";
import { RangeSlider } from "../components/RangeSlider";
import { Button } from "../components/Button";
import { MultiSelect } from "../components/MultiSelect";
import { AnalogComparisonTable } from "../components/AnalogComparisonTable";
import { ScenarioFormData } from "../components/CreateScenarioModal";
// Field descriptions for tooltips
const fieldDescriptions: Record<string, string> = {
  "Therapy Area": "Select therapy area of interest from the dropdown",
  Indication: "Select the indications for the therapy",
  "Timeframe for forecast": "Select the timeframe of forecast",
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
const mainTabs = [
  {
    id: "simulation",
    label: "Simulation Inputs",
  },
  {
    id: "access",
    label: "Access and Demand Prediction",
  },
  {
    id: "integration",
    label: "Data Integration",
  },
];
const subTabs = [
  {
    id: "asset",
    label: "Asset Attributes",
  },
  {
    id: "analog",
    label: "Analog Selection",
  },
];
const therapyAreas = [
  "Oncology",
  "Cardiology",
  "Neurology",
  "Immunology",
  "Respiratory",
];
const indications = [
  "Breast Cancer",
  "Lung Cancer",
  "Hypertension",
  "Diabetes",
  "Asthma",
];
const orderOfEntry = ["1", "2", "3", "4", "more than 5"];
const competitiveLaunches = ["0", "2", "more than 3"];
// Mock analog data
const mockAnalogData = [
  {
    name: "Actovant",
    similarityScore: 92,
    costPerTreatment: 150000,
    relativeCostRatio: "High" as const,
    safetyVsSoc: 78,
    efficacyVsSoc: 85,
    heorCe: "High" as const,
    competitiveLaunches: "3-5",
    orderOfEntry: "2nd",
    portfolioLeverage: true,
    unmetNeed: "Very High" as const,
  },
  {
    name: "Actovion",
    similarityScore: 89,
    costPerTreatment: 145000,
    relativeCostRatio: "High" as const,
    safetyVsSoc: 75,
    efficacyVsSoc: 82,
    heorCe: "High" as const,
    competitiveLaunches: "3-5",
    orderOfEntry: "1st",
    portfolioLeverage: true,
    unmetNeed: "Very High" as const,
  },
  {
    name: "Aeronyx",
    similarityScore: 87,
    costPerTreatment: 140000,
    relativeCostRatio: "High" as const,
    safetyVsSoc: 72,
    efficacyVsSoc: 80,
    heorCe: "Medium" as const,
    competitiveLaunches: ">5",
    orderOfEntry: "3rd",
    portfolioLeverage: false,
    unmetNeed: "High" as const,
  },
  {
    name: "Aerovent",
    similarityScore: 84,
    costPerTreatment: 135000,
    relativeCostRatio: "Medium" as const,
    safetyVsSoc: 70,
    efficacyVsSoc: 77,
    heorCe: "Medium" as const,
    competitiveLaunches: ">5",
    orderOfEntry: "4th",
    portfolioLeverage: false,
    unmetNeed: "High" as const,
  },
  {
    name: "Aetherion",
    similarityScore: 81,
    costPerTreatment: 130000,
    relativeCostRatio: "Medium" as const,
    safetyVsSoc: 68,
    efficacyVsSoc: 74,
    heorCe: "Medium" as const,
    competitiveLaunches: ">5",
    orderOfEntry: "5th",
    portfolioLeverage: false,
    unmetNeed: "Medium" as const,
  },
  {
    name: "Alerionex",
    similarityScore: 78,
    costPerTreatment: 125000,
    relativeCostRatio: "Medium" as const,
    safetyVsSoc: 65,
    efficacyVsSoc: 71,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Medium" as const,
  },
  {
    name: "Allotrex",
    similarityScore: 75,
    costPerTreatment: 120000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 62,
    efficacyVsSoc: 68,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Atherion",
    similarityScore: 72,
    costPerTreatment: 115000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 60,
    efficacyVsSoc: 65,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Axiovant",
    similarityScore: 69,
    costPerTreatment: 110000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 58,
    efficacyVsSoc: 62,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Betrovex",
    similarityScore: 66,
    costPerTreatment: 105000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 55,
    efficacyVsSoc: 59,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Bioflorin",
    similarityScore: 63,
    costPerTreatment: 100000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 52,
    efficacyVsSoc: 56,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Bioflorine",
    similarityScore: 60,
    costPerTreatment: 95000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 50,
    efficacyVsSoc: 53,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Bionetra",
    similarityScore: 57,
    costPerTreatment: 90000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 48,
    efficacyVsSoc: 50,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Bionova",
    similarityScore: 54,
    costPerTreatment: 85000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 45,
    efficacyVsSoc: 47,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
  {
    name: "Biotrinix",
    similarityScore: 51,
    costPerTreatment: 80000,
    relativeCostRatio: "Low" as const,
    safetyVsSoc: 42,
    efficacyVsSoc: 44,
    heorCe: "Low" as const,
    competitiveLaunches: "<3",
    orderOfEntry: ">5th",
    portfolioLeverage: false,
    unmetNeed: "Low" as const,
  },
];
interface SimulationInputsProps {
  activeSubsection: string;
  onSubsectionChange?: (subsection: string) => void;
  onNavigateToAccess?: (selectedAnalogs: string[]) => void;
  initialFormData?: ScenarioFormData | null;
}
export function SimulationInputs({
  activeSubsection,
  onSubsectionChange,
  onNavigateToAccess,
  initialFormData,
}: SimulationInputsProps) {
  const [activeMainTab, setActiveMainTab] = useState("simulation");
  const [activeSubTab, setActiveSubTab] = useState("asset");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form state - Initialize with data from modal if available
  const [therapyArea, setTherapyArea] = useState("");
  const [indication, setIndication] = useState("");
  const [timeframeStart, setTimeframeStart] = useState("");
  const [timeframeEnd, setTimeframeEnd] = useState("");
  const [productName, setProductName] = useState("");
  const [heorCe, setHeorCe] = useState("Medium");
  const [demonstratedEfficacy, setDemonstratedEfficacy] = useState(false);
  const [efficacyVsSoc, setEfficacyVsSoc] = useState(50);
  const [safetyVsSoc, setSafetyVsSoc] = useState(50);
  const [relativeCostRatio, setRelativeCostRatio] = useState("Medium");
  const [costPerTreatment, setCostPerTreatment] = useState("");
  // Market Profile
  const [commercial, setCommercial] = useState("60");
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
  // Analog Selection state
  const [selectedAnalogs, setSelectedAnalogs] = useState<string[]>([]);
  const [similarityRange, setSimilarityRange] = useState<[number, number]>([
    0, 100,
  ]);
  // Effect to populate form fields when initialFormData is provided
  useEffect(() => {
    if (initialFormData) {
      setTherapyArea(initialFormData.therapyArea);
      setIndication(initialFormData.indication);
      setTimeframeStart(initialFormData.startDate);
      setTimeframeEnd(initialFormData.endDate);
    }
  }, [initialFormData]);
  const handleSubmit = () => {
    console.log("Submitting simulation inputs...");
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      if (onSubsectionChange) {
        onSubsectionChange("analog");
      }
    }, 600);
  };
  const handleSaveDraft = () => {
    console.log("Saving draft...");
  };
  const handleAnalogSubmit = () => {
    console.log("Submitting analog selection...");
    console.log("Selected analogs:", selectedAnalogs);
    console.log("Similarity range:", similarityRange);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onNavigateToAccess) {
        onNavigateToAccess(selectedAnalogs);
      }
    }, 3000);
  };
  const analogOptions = mockAnalogData.map((a) => a.name);
  const renderContent = () => {
    if (activeSubsection === "analog") {
      return (
        <div className="analog-selection-page">
          {/* Filter Section */}
          <div className="filters-container">
            <div className="filters-row">
              {/* Multi-select Dropdown */}
              <div className="filter-item dropdown-filter">
                <MultiSelect
                  label="Select Analogs"
                  placeholder="All analogs"
                  options={analogOptions}
                  value={selectedAnalogs}
                  onChange={setSelectedAnalogs}
                />
              </div>

              {/* Similarity Range Slider */}
              <div className="filter-item slider-filter">
                <div className="slider-header">
                  <label className="slider-label">Similarity Score Range</label>
                  <div className="slider-values">
                    <span className="value-display">{similarityRange[0]}</span>
                    <span className="value-separator">–</span>
                    <span className="value-display">{similarityRange[1]}</span>
                  </div>
                </div>

                <div className="slider-container">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={similarityRange[0]}
                    onChange={(e) => {
                      const newMin = Number(e.target.value);
                      if (newMin <= similarityRange[1]) {
                        setSimilarityRange([newMin, similarityRange[1]]);
                      }
                    }}
                    className="range-input range-min"
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={similarityRange[1]}
                    onChange={(e) => {
                      const newMax = Number(e.target.value);
                      if (newMax >= similarityRange[0]) {
                        setSimilarityRange([similarityRange[0], newMax]);
                      }
                    }}
                    className="range-input range-max"
                  />
                  <div className="slider-track">
                    <div
                      className="slider-track-active"
                      style={{
                        left: `${similarityRange[0]}%`,
                        width: `${similarityRange[1] - similarityRange[0]}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="slider-marks">
                  <span className="mark-label">Very Low</span>
                  <span className="mark-label">At Parity</span>
                  <span className="mark-label">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analog Comparison Table */}
          <AnalogComparisonTable
            data={mockAnalogData}
            similarityRange={similarityRange}
            selectedAnalogs={selectedAnalogs}
          />

          {/* Submit Button */}
          <div className="submit-button-container">
            <Button
              type="button"
              onClick={handleAnalogSubmit}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="submit-button"
            >
              Submit Selection
            </Button>
          </div>
        </div>
      );
    }
    // Asset Attributes
    return (
      <div
        className={`space-y-6 md:space-y-6 ${
          isTransitioning ? "animate-slideOutLeft" : ""
        }`}
      >
        {/* Top Fields */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                <InfoTooltip label="Therapy Area" />
                Therapy Area
              </label>
              <Select
                label=""
                placeholder="Select therapy area"
                options={therapyAreas}
                value={therapyArea}
                onChange={setTherapyArea}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                <InfoTooltip label="Indication" />
                Indication
              </label>
              <Select
                label=""
                placeholder="Select indication"
                options={indications}
                value={indication}
                onChange={setIndication}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                <InfoTooltip label="Timeframe for forecast" />
                Timeframe for forecast
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={timeframeStart}
                  onChange={(e) => setTimeframeStart(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={timeframeEnd}
                  onChange={(e) => setTimeframeEnd(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TPP Design Section */}
        <CollapsibleSection
          title="Target Product Profile"
          subtitle=""
          icon={<FlaskConicalIcon size={24} />}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
              {/* <div style={{ width: "40%" }}>
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
                  className="w-full"
                />
              </div> */}
              <div style={{ width: "80%" }}>
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
                  className="w-full"
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

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
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

            <div style={{ width: "40%" }}>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                <InfoTooltip label="Annual Cost of Treatment" />
                Annual Cost of Treatment
              </label>
              <Input
                label=""
                type="number"
                placeholder="Enter cost"
                value={costPerTreatment}
                onChange={(e) => setCostPerTreatment(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Market Profile Section */}
        <CollapsibleSection
          title="Market profile"
          subtitle="Select the attribute options for the baseline forecast"
          icon={<TrendingUpIcon size={24} />}
        >
          <div
            className="space-y-6"
            style={{ overflow: "visible", position: "relative", zIndex: 30 }}
          >
            <div>
              <label className="block text-sm font-medium text-[#00A699] mb-4">
                Channel Mix (%)
              </label>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                style={{ overflow: "visible" }}
              >
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

              <div style={{ width: "60%" }}>
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
              <div style={{ width: "60%" }}>
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

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4 pt-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSaveDraft}
            className="px-8"
          >
            Save Draft
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="px-8 bg-[#FF5A5F] hover:bg-[#E04E52]"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="page-container">{renderContent()}</div>
      </div>

      <style>{`
        /* Page Wrapper - Outermost container */
        .page-wrapper {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          background: #F8FAFC;
          min-height: 100vh;
        }

        /* Page Container - Content container with max-width */
        .page-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }

        /* Analog Selection Page */
        .analog-selection-page {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Filters Container */
        .filters-container {
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 1.25rem;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          z-index: 100;
        }

        .filters-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 1.5rem;
          width: 100%;
        }

        .filter-item {
          flex: 1 1 auto;
          min-width: 0;
          box-sizing: border-box;
        }

        /* Dropdown Filter */
        .dropdown-filter {
          flex: 0 0 280px;
          max-width: 280px;
          position: relative;
          z-index: 60;
        }

        /* Slider Filter */
        .slider-filter {
          flex: 1 1 400px;
          min-width: 300px;
          max-width: 600px;
          position: relative;
          z-index: 40;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .slider-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #334155;
        }

        .slider-values {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .value-display {
          font-size: 1.125rem;
          font-weight: 700;
          color: #EF4444;
          min-width: 32px;
          text-align: center;
        }

        .value-separator {
          color: #94A3B8;
          font-weight: 500;
        }

        /* Slider Container */
        .slider-container {
          position: relative;
          height: 40px;
          margin-bottom: 0.75rem;
          width: 100%;
        }

        .slider-track {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, #E2E8F0 0%, #CBD5E1 100%);
          border-radius: 4px;
        }

        .slider-track-active {
          position: absolute;
          height: 100%;
          background: linear-gradient(90deg, #FEE2E2 0%, #FDBA74 50%, #EF4444 100%);
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .range-input {
          position: absolute;
          width: 100%;
          height: 8px;
          top: 50%;
          transform: translateY(-50%);
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          pointer-events: none;
          cursor: pointer;
        }

        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 3px solid #EF4444;
          box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
          cursor: pointer;
          pointer-events: all;
          transition: all 0.2s ease;
        }

        .range-input::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.4);
        }

        .range-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 3px solid #EF4444;
          box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
          cursor: pointer;
          pointer-events: all;
          transition: all 0.2s ease;
        }

        .range-input::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.4);
        }

        .range-min {
          z-index: 3;
        }

        .range-max {
          z-index: 4;
        }

        /* Slider Marks */
        .slider-marks {
          display: flex;
          justify-content: space-between;
          padding: 0 4px;
          width: 100%;
        }

        .mark-label {
          font-size: 0.75rem;
          color: #64748B;
          font-weight: 500;
        }

        /* Submit Button Container */
        .submit-button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.75rem 0 1rem 0;
        }

        .submit-button {
          min-width: 200px;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          background: #FF5A5F;
          color: white;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .submit-button:hover:not(:disabled) {
          background: #E04E52;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 90, 95, 0.3);
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
            padding: 2rem 1rem;
          }
          
          .filters-row {
            flex-wrap: nowrap;
          }
        }

        /* Tablet: 768px - 1023px */
        @media (max-width: 1023px) {
          .page-container {
            padding: 1.5rem 1.5rem;
          }

          .filters-row {
            flex-direction: column;
          }

          .dropdown-filter,
          .slider-filter {
            flex: 1 1 100%;
            max-width: 100%;
          }

          .slider-header {
            flex-wrap: wrap;
          }
        }

        /* Mobile: ≤767px */
        @media (max-width: 767px) {
          .page-container {
            padding: 1rem 1rem;
          }

          .filters-container {
            padding: 1rem;
            border-radius: 8px;
          }

          .filters-row {
            gap: 1rem;
          }

          .slider-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .submit-button-container {
            padding: 1.5rem 0 0.5rem 0;
          }

          .submit-button {
            width: 100%;
            min-width: auto;
          }
        }

        /* Small Mobile: ≤480px */
        @media (max-width: 480px) {
          .page-container {
            padding: 0.75rem 0.75rem;
          }

          .filters-container {
            padding: 0.75rem;
          }

          .slider-label {
            font-size: 0.8125rem;
          }

          .value-display {
            font-size: 1rem;
          }

          .mark-label {
            font-size: 0.6875rem;
          }
        }
      `}</style>
    </>
  );
}
