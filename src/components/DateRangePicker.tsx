import React, { useEffect, useState, useRef } from 'react';
import { CalendarIcon, XIcon } from 'lucide-react';
interface DateRangePickerProps {
  label?: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  error?: string;
  required?: boolean;
}
export function DateRangePicker({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  error,
  required = false
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'start' | 'end' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedInput(null);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  const formatDisplayDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getDisplayText = () => {
    if (startDate && endDate) {
      return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
    } else if (startDate) {
      return `${formatDisplayDate(startDate)} - Select end date`;
    } else {
      return 'Select date range';
    }
  };
  const clearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartDateChange('');
    onEndDateChange('');
  };
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  return <div className="date-range-picker-container" ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>}

      <div className={`date-range-display ${error ? 'error' : ''} ${isOpen ? 'focused' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <CalendarIcon className="icon" size={20} />
        <span className={`display-text ${!startDate && !endDate ? 'placeholder' : ''}`}>
          {getDisplayText()}
        </span>
        {(startDate || endDate) && <button type="button" className="clear-button" onClick={clearDates} aria-label="Clear dates">
            <XIcon size={16} />
          </button>}
      </div>

      {error && <p className="error-message">{error}</p>}

      {isOpen && <div className="date-range-dropdown">
          <div className="date-inputs-grid">
            <div className="date-input-wrapper">
              <label className="date-label">Start Date</label>
              <input type="date" value={startDate} onChange={e => {
            onStartDateChange(e.target.value);
            if (!endDate) {
              setFocusedInput('end');
            }
          }} max={endDate || undefined} className={`date-input ${focusedInput === 'start' ? 'focused' : ''}`} onFocus={() => setFocusedInput('start')} onBlur={() => setFocusedInput(null)} />
            </div>

            <div className="date-separator">→</div>

            <div className="date-input-wrapper">
              <label className="date-label">End Date</label>
              <input type="date" value={endDate} onChange={e => onEndDateChange(e.target.value)} min={startDate || getTodayString()} className={`date-input ${focusedInput === 'end' ? 'focused' : ''}`} onFocus={() => setFocusedInput('end')} onBlur={() => setFocusedInput(null)} />
            </div>
          </div>

          <div className="quick-actions">
            <button type="button" className="quick-action-btn" onClick={() => {
          const today = new Date();
          const oneYearLater = new Date(today);
          oneYearLater.setFullYear(today.getFullYear() + 1);
          onStartDateChange(today.toISOString().split('T')[0]);
          onEndDateChange(oneYearLater.toISOString().split('T')[0]);
        }}>
              Next 1 Year
            </button>
            <button type="button" className="quick-action-btn" onClick={() => {
          const today = new Date();
          const threeYearsLater = new Date(today);
          threeYearsLater.setFullYear(today.getFullYear() + 3);
          onStartDateChange(today.toISOString().split('T')[0]);
          onEndDateChange(threeYearsLater.toISOString().split('T')[0]);
        }}>
              Next 3 Years
            </button>
            <button type="button" className="quick-action-btn" onClick={() => {
          const today = new Date();
          const fiveYearsLater = new Date(today);
          fiveYearsLater.setFullYear(today.getFullYear() + 5);
          onStartDateChange(today.toISOString().split('T')[0]);
          onEndDateChange(fiveYearsLater.toISOString().split('T')[0]);
        }}>
              Next 5 Years
            </button>
          </div>
        </div>}

      <style>{`
        .date-range-picker-container {
          position: relative;
          width: 100%;
        }

        .date-range-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 2px solid #E5E7EB;
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .date-range-display:hover {
          border-color: #D1D5DB;
        }

        .date-range-display.focused {
          border-color: #E67E22;
          box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
        }

        .date-range-display.error {
          border-color: #EF4444;
        }

        .date-range-display .icon {
          color: #9CA3AF;
          flex-shrink: 0;
        }

        .display-text {
          flex: 1;
          font-size: 0.875rem;
          color: #1F2937;
        }

        .display-text.placeholder {
          color: #9CA3AF;
        }

        .clear-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 0.25rem;
          color: #9CA3AF;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .clear-button:hover {
          background: #F3F4F6;
          color: #6B7280;
        }

        .error-message {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #EF4444;
        }

        .date-range-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 1.25rem;
          z-index: 50;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .date-inputs-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }

        .date-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .date-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .date-input {
          padding: 0.625rem 0.75rem;
          border: 2px solid #E5E7EB;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #1F2937;
          transition: all 0.2s ease;
          background: white;
        }

        .date-input:hover {
          border-color: #D1D5DB;
        }

        .date-input:focus,
        .date-input.focused {
          outline: none;
          border-color: #E67E22;
          box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
        }

        .date-separator {
          color: #9CA3AF;
          font-size: 1.25rem;
          font-weight: 600;
          padding-top: 1.25rem;
        }

        .quick-actions {
          display: flex;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid #E5E7EB;
        }

        .quick-action-btn {
          flex: 1;
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #6B7280;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-action-btn:hover {
          background: #E67E22;
          color: white;
          border-color: #E67E22;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(230, 126, 34, 0.2);
        }

        @media (max-width: 640px) {
          .date-inputs-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .date-separator {
            display: none;
          }

          .quick-actions {
            flex-direction: column;
          }

          .date-range-dropdown {
            left: -1rem;
            right: -1rem;
          }
        }
      `}</style>
    </div>;
}