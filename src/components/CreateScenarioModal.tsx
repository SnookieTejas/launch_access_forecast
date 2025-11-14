import React, { useEffect, useState } from 'react';
import { XIcon, FlaskConicalIcon, ActivityIcon } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { DateRangePicker } from './DateRangePicker';
export interface ScenarioFormData {
  scenarioName: string;
  therapyArea: string;
  indication: string;
  startDate: string;
  endDate: string;
}
interface CreateScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: ScenarioFormData) => void;
}
// Therapy Area to Indication mapping
const therapyAreaIndicationMap: Record<string, string[]> = {
  Immunology: ['Rheumatoid Arthritis (RA)', 'Psoriatic Arthritis (PsA)', 'Ankylosing Spondylitis / axSpA', 'Systemic Lupus Erythematosus (SLE)', 'Juvenile Idiopathic Arthritis (JIA)', "Sjögren's Syndrome", 'Systemic Sclerosis / Scleroderma', 'Vasculitis (GPA, MPA)', 'Psoriasis (PsO)', 'Atopic Dermatitis (AD)', 'Hidradenitis Suppurativa (HS)', 'Chronic Spontaneous Urticaria (CSU)', "Crohn's Disease (CD)", 'Ulcerative Colitis (UC)', 'Celiac Disease', 'Sarcoidosis'],
  Neurology: ['Multiple Sclerosis (MS)', 'Neuromyelitis Optica Spectrum Disorder (NMOSD)', 'Myasthenia Gravis (MG)', 'Amyotrophic Lateral Sclerosis (ALS)', 'Epilepsy', "Parkinson's Disease", "Alzheimer's Disease", "Huntington's Disease", 'Migraine'],
  Oncology: ['Breast Cancer', 'Lung Cancer (NSCLC / SCLC)', 'Colorectal Cancer', 'Prostate Cancer', 'Ovarian Cancer', 'Pancreatic Cancer', 'Acute Leukemia (AML / ALL)', 'Multiple Myeloma', 'Lymphoma (NHL / HL)', 'Melanoma', 'Gastric Cancer', 'Bladder Cancer'],
  Cardiology: ['Hypertension', 'Heart Failure', 'Atherosclerosis', 'Myocardial Infarction', 'Hyperlipidemia', 'Atrial Fibrillation', 'Pulmonary Hypertension', 'Peripheral Artery Disease'],
  Endocrinology: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Obesity', 'Thyroid Disorders', 'Osteoporosis', 'Growth Hormone Deficiency', "Cushing's Disease", 'PCOS'],
  Respiratory: ['Asthma', 'COPD', 'CRSwNP', 'Allergic Rhinitis', 'Pulmonary Fibrosis', 'Eosinophilic Esophagitis (EoE)'],
  Gastroenterology: ["Crohn's Disease", 'Ulcerative Colitis', 'Celiac Disease', 'GERD', 'IBS', 'Pancreatitis'],
  'Infectious Diseases': ['HIV', 'Hepatitis B', 'Hepatitis C', 'COVID-19', 'Influenza', 'Tuberculosis', 'RSV', 'HPV'],
  Hematology: ['Hemophilia A/B', 'Von Willebrand Disease', 'Sickle Cell Disease', 'Beta-Thalassemia', 'Aplastic Anemia', 'ITP', 'TTP'],
  Ophthalmology: ['Wet AMD', 'Dry AMD', 'Diabetic Retinopathy', 'DME', 'Uveitis', 'Glaucoma'],
  Nephrology: ['Chronic Kidney Disease (CKD)', 'Lupus Nephritis', 'IgA Nephropathy', 'Polycystic Kidney Disease', 'Nephrotic Syndrome'],
  'Rare / Genetic': ['Cystic Fibrosis', 'Spinal Muscular Atrophy (SMA)', 'Fabry Disease', 'Pompe Disease', 'Gaucher Disease', 'Duchenne Muscular Dystrophy (DMD)', 'Prader-Willi Syndrome']
};
const therapyAreas = Object.keys(therapyAreaIndicationMap).sort();
export function CreateScenarioModal({
  isOpen,
  onClose,
  onSubmit
}: CreateScenarioModalProps) {
  const [scenarioName, setScenarioName] = useState('');
  const [therapyArea, setTherapyArea] = useState('');
  const [indication, setIndication] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableIndications, setAvailableIndications] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    scenarioName: '',
    therapyArea: '',
    indication: '',
    timeframe: ''
  });
  // Update available indications when therapy area changes
  useEffect(() => {
    if (therapyArea) {
      const indications = therapyAreaIndicationMap[therapyArea] || [];
      setAvailableIndications(indications);
      // Reset indication when therapy area changes
      setIndication('');
    } else {
      setAvailableIndications([]);
      setIndication('');
    }
  }, [therapyArea]);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    const newErrors = {
      scenarioName: '',
      therapyArea: '',
      indication: '',
      timeframe: ''
    };
    if (!scenarioName) newErrors.scenarioName = 'Scenario name is required';
    if (!therapyArea) newErrors.therapyArea = 'Therapy area is required';
    if (!indication) newErrors.indication = 'Indication is required';
    if (!startDate || !endDate) newErrors.timeframe = 'Both start and end dates are required';
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }
    // Create form data object
    const formData: ScenarioFormData = {
      scenarioName,
      therapyArea,
      indication,
      startDate,
      endDate
    };
    // Placeholder for create logic
    console.log('Creating scenario:', formData);
    // Reset form
    setScenarioName('');
    setTherapyArea('');
    setIndication('');
    setStartDate('');
    setEndDate('');
    setAvailableIndications([]);
    setErrors({
      scenarioName: '',
      therapyArea: '',
      indication: '',
      timeframe: ''
    });
    // Call onSubmit callback with form data
    if (onSubmit) {
      onSubmit(formData);
    } else {
      onClose();
    }
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-slideUp max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XIcon size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#0D0C24] mb-6">
          Create New Scenario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Scenario Name" type="text" placeholder="Enter scenario name" value={scenarioName} onChange={e => {
          setScenarioName(e.target.value);
          setErrors({
            ...errors,
            scenarioName: ''
          });
        }} error={errors.scenarioName} required />

          <Select label="Therapy Area" placeholder="Select therapy area" options={therapyAreas} value={therapyArea} onChange={value => {
          setTherapyArea(value);
          setErrors({
            ...errors,
            therapyArea: ''
          });
        }} icon={<FlaskConicalIcon size={20} />} error={errors.therapyArea} required />

          <Select label="Indication" placeholder={therapyArea ? 'Select indication' : 'Select therapy area first'} options={availableIndications} value={indication} onChange={value => {
          setIndication(value);
          setErrors({
            ...errors,
            indication: ''
          });
        }} icon={<ActivityIcon size={20} />} error={errors.indication} required disabled={!therapyArea} />

          <DateRangePicker label="Timeframe for Forecast" startDate={startDate} endDate={endDate} onStartDateChange={date => {
          setStartDate(date);
          setErrors({
            ...errors,
            timeframe: ''
          });
        }} onEndDateChange={date => {
          setEndDate(date);
          setErrors({
            ...errors,
            timeframe: ''
          });
        }} error={errors.timeframe} required />

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#6C5DD3] hover:bg-[#5a4ec4]">
              Create Scenario
            </Button>
          </div>
        </form>
      </div>
    </div>;
}