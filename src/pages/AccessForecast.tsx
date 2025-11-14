import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUpIcon, BarChart3Icon, CheckCircleIcon } from 'lucide-react';
import { Select } from '../components/Select';
// Color palette for tiers - Updated with new brand colors
const TIER_COLORS = {
  'Restrictive tier': '#32190A',
  'Non-preferred': '#BA5422',
  'Non-preferred with interventions': '#EB6620',
  'Preferred with interventions': '#EE8045',
  Preferred: '#FCC9B1'
};
// Helper function to determine if text should be white or black based on background color
const getContrastColor = (hexColor: string | undefined): string => {
  // Handle undefined or null colors
  if (!hexColor || typeof hexColor !== 'string' || !hexColor.startsWith('#')) {
    return '#FFFFFF'; // Default to white
  }
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
// Mock data for donut charts
const donutData = {
  Commercial: [{
    name: 'Preferred',
    value: 35
  }, {
    name: 'Preferred with interventions',
    value: 25
  }, {
    name: 'Non-preferred with interventions',
    value: 20
  }, {
    name: 'Non-preferred',
    value: 10
  }, {
    name: 'Restrictive tier',
    value: 10
  }],
  Medicare: [{
    name: 'Preferred',
    value: 40
  }, {
    name: 'Preferred with interventions',
    value: 35
  }, {
    name: 'Non-preferred with interventions',
    value: 15
  }, {
    name: 'Non-preferred',
    value: 5
  }, {
    name: 'Restrictive tier',
    value: 5
  }],
  Medicaid: [{
    name: 'Preferred',
    value: 38
  }, {
    name: 'Preferred with interventions',
    value: 33
  }, {
    name: 'Non-preferred with interventions',
    value: 20
  }, {
    name: 'Non-preferred',
    value: 6
  }, {
    name: 'Restrictive tier',
    value: 3
  }]
};
// Mock data for stacked bar chart
const barData = {
  Commercial: [{
    quarter: 'Launch Quarter',
    'Restrictive tier': 31.82,
    'Non-preferred': 41.53,
    'Non-preferred with intervention': 7.4,
    'Preferred with intervention': 4.99,
    Preferred: 14.26
  }, {
    quarter: 'L+2',
    'Restrictive tier': 32.14,
    'Non-preferred': 40.7,
    'Non-preferred with intervention': 7.51,
    'Preferred with intervention': 4.55,
    Preferred: 15.1
  }, {
    quarter: 'L+3',
    'Restrictive tier': 32.1,
    'Non-preferred': 40.1,
    'Non-preferred with intervention': 7.27,
    'Preferred with intervention': 5.03,
    Preferred: 15.5
  }, {
    quarter: 'L+4',
    'Restrictive tier': 32.55,
    'Non-preferred': 39.5,
    'Non-preferred with intervention': 7.27,
    'Preferred with intervention': 4.88,
    Preferred: 15.8
  }, {
    quarter: 'L+5',
    'Restrictive tier': 32.94,
    'Non-preferred': 39.2,
    'Non-preferred with intervention': 7.2,
    'Preferred with intervention': 4.56,
    Preferred: 16.1
  }, {
    quarter: 'L+6',
    'Restrictive tier': 33.16,
    'Non-preferred': 38.5,
    'Non-preferred with intervention': 7.35,
    'Preferred with intervention': 4.29,
    Preferred: 16.7
  }, {
    quarter: 'L+7',
    'Restrictive tier': 33.16,
    'Non-preferred': 38.2,
    'Non-preferred with intervention': 7.78,
    'Preferred with intervention': 3.96,
    Preferred: 16.9
  }, {
    quarter: 'L+8',
    'Restrictive tier': 33.66,
    'Non-preferred': 37.5,
    'Non-preferred with intervention': 7.97,
    'Preferred with intervention': 3.77,
    Preferred: 17.1
  }],
  Medicare: [{
    quarter: 'Launch Quarter',
    'Restrictive tier': 28.5,
    'Non-preferred': 38.2,
    'Non-preferred with intervention': 8.3,
    'Preferred with intervention': 6.5,
    Preferred: 18.5
  }, {
    quarter: 'L+2',
    'Restrictive tier': 28.8,
    'Non-preferred': 37.9,
    'Non-preferred with intervention': 8.4,
    'Preferred with intervention': 6.3,
    Preferred: 18.6
  }, {
    quarter: 'L+3',
    'Restrictive tier': 29.1,
    'Non-preferred': 37.6,
    'Non-preferred with intervention': 8.5,
    'Preferred with intervention': 6.1,
    Preferred: 18.7
  }, {
    quarter: 'L+4',
    'Restrictive tier': 29.4,
    'Non-preferred': 37.3,
    'Non-preferred with intervention': 8.6,
    'Preferred with intervention': 5.9,
    Preferred: 18.8
  }, {
    quarter: 'L+5',
    'Restrictive tier': 29.7,
    'Non-preferred': 37.0,
    'Non-preferred with intervention': 8.7,
    'Preferred with intervention': 5.7,
    Preferred: 18.9
  }, {
    quarter: 'L+6',
    'Restrictive tier': 30.0,
    'Non-preferred': 36.7,
    'Non-preferred with intervention': 8.8,
    'Preferred with intervention': 5.5,
    Preferred: 19.0
  }, {
    quarter: 'L+7',
    'Restrictive tier': 30.3,
    'Non-preferred': 36.4,
    'Non-preferred with intervention': 8.9,
    'Preferred with intervention': 5.3,
    Preferred: 19.1
  }, {
    quarter: 'L+8',
    'Restrictive tier': 30.6,
    'Non-preferred': 36.1,
    'Non-preferred with intervention': 9.0,
    'Preferred with intervention': 5.1,
    Preferred: 19.2
  }],
  Medicaid: [{
    quarter: 'Launch Quarter',
    'Restrictive tier': 25.3,
    'Non-preferred': 42.5,
    'Non-preferred with intervention': 9.2,
    'Preferred with intervention': 7.8,
    Preferred: 15.2
  }, {
    quarter: 'L+2',
    'Restrictive tier': 25.6,
    'Non-preferred': 42.2,
    'Non-preferred with intervention': 9.3,
    'Preferred with intervention': 7.6,
    Preferred: 15.3
  }, {
    quarter: 'L+3',
    'Restrictive tier': 25.9,
    'Non-preferred': 41.9,
    'Non-preferred with intervention': 9.4,
    'Preferred with intervention': 7.4,
    Preferred: 15.4
  }, {
    quarter: 'L+4',
    'Restrictive tier': 26.2,
    'Non-preferred': 41.6,
    'Non-preferred with intervention': 9.5,
    'Preferred with intervention': 7.2,
    Preferred: 15.5
  }, {
    quarter: 'L+5',
    'Restrictive tier': 26.5,
    'Non-preferred': 41.3,
    'Non-preferred with intervention': 9.6,
    'Preferred with intervention': 7.0,
    Preferred: 15.6
  }, {
    quarter: 'L+6',
    'Restrictive tier': 26.8,
    'Non-preferred': 41.0,
    'Non-preferred with intervention': 9.7,
    'Preferred with intervention': 6.8,
    Preferred: 15.7
  }, {
    quarter: 'L+7',
    'Restrictive tier': 27.1,
    'Non-preferred': 40.7,
    'Non-preferred with intervention': 9.8,
    'Preferred with intervention': 6.6,
    Preferred: 15.8
  }, {
    quarter: 'L+8',
    'Restrictive tier': 27.4,
    'Non-preferred': 40.4,
    'Non-preferred with intervention': 9.9,
    'Preferred with intervention': 6.4,
    Preferred: 15.9
  }]
};
interface AccessForecastProps {
  selectedAnalogs?: string[];
}
export function AccessForecast({
  selectedAnalogs = []
}: AccessForecastProps) {
  const [selectedChannel, setSelectedChannel] = useState<'Commercial' | 'Medicare' | 'Medicaid'>('Commercial');
  const channelOptions = ['Commercial', 'Medicare', 'Medicaid'];
  // Custom tooltip for pie charts
  const CustomPieTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{payload[0].value}%</p>
        </div>;
    }
    return null;
  };
  // Enhanced custom label for donut charts with contrast colors
  const renderDonutLabel = (props: any) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      value,
      name
    } = props;
    // Calculate position on the arc
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    // Get the color for this segment
    const fillColor = TIER_COLORS[name as keyof typeof TIER_COLORS];
    const textColor = getContrastColor(fillColor);
    return <text x={x} y={y} fill={textColor} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600">
        {`${value}%`}
      </text>;
  };
  // Enhanced bar label with contrast-aware colors and individual percentages
  const renderBarLabel = (props: any) => {
    const {
      x,
      y,
      width,
      height,
      value,
      index,
      payload
    } = props;
    // Only show label if segment height is large enough (value > 5%)
    if (value < 5) return null;
    // Determine which tier this segment belongs to by checking the data
    // The payload contains all the data for this bar
    let tierColor = '#32190A'; // Default to darkest color
    // Find which tier this value belongs to
    if (payload) {
      if (payload['Restrictive tier'] === value) {
        tierColor = TIER_COLORS['Restrictive tier'];
      } else if (payload['Non-preferred'] === value) {
        tierColor = TIER_COLORS['Non-preferred'];
      } else if (payload['Non-preferred with intervention'] === value) {
        tierColor = TIER_COLORS['Non-preferred with interventions'];
      } else if (payload['Preferred with intervention'] === value) {
        tierColor = TIER_COLORS['Preferred with interventions'];
      } else if (payload['Preferred'] === value) {
        tierColor = TIER_COLORS['Preferred'];
      }
    }
    // Determine text color based on background
    const textColor = getContrastColor(tierColor);
    return <text x={x + width / 2} y={y + height / 2} fill={textColor} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600">
        {`${value.toFixed(1)}%`}
      </text>;
  };
  const renderDonutChart = (channel: 'Commercial' | 'Medicare' | 'Medicaid') => {
    const data = donutData[channel];
    return <div className="donut-chart-wrapper">
        <div className="donut-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius="55%" outerRadius="85%" paddingAngle={2} dataKey="value" animationBegin={0} animationDuration={600} label={renderDonutLabel} labelLine={false}>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={TIER_COLORS[entry.name as keyof typeof TIER_COLORS]} />)}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center-label">
            <span className="channel-name">{channel}</span>
          </div>
        </div>
      </div>;
  };
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-[#0D0C24] mb-2">
            {payload[0].payload.quarter}
          </p>
          {payload.reverse().map((entry: any, index: number) => <p key={index} className="text-sm" style={{
          color: entry.color
        }}>
              {entry.name}: {entry.value.toFixed(1)}%
            </p>)}
        </div>;
    }
    return null;
  };
  return <div className="w-full space-y-4">
      {/* Selected Analogs Display */}
      {selectedAnalogs.length > 0 && <div className="selected-analogs-banner">
          <div className="banner-content">
            <div className="banner-header">
              <CheckCircleIcon className="w-5 h-5 text-[#10B981]" />
              <h3 className="banner-title">
                Selected Analogs ({selectedAnalogs.length})
              </h3>
            </div>
            <div className="analogs-list">
              {selectedAnalogs.map((analog, index) => <div key={index} className="analog-chip">
                  {analog}
                </div>)}
            </div>
          </div>
        </div>}

      {/* Section 1: 24-Month Peak Access by Channel */}
      <div className="section-container">
        <div className="section-header">
          <TrendingUpIcon className="w-6 h-6 text-[#FF5A5F]" />
          <h2 className="text-xl font-semibold text-[#0D0C24]">
            24-Month Peak Access by Channel
          </h2>
        </div>

        <div className="chart-grid">
          {renderDonutChart('Commercial')}
          {renderDonutChart('Medicare')}
          {renderDonutChart('Medicaid')}
        </div>

        {/* Legend */}
        <div className="chart-legend">
          {Object.entries(TIER_COLORS).map(([name, color]) => <div key={name} className="legend-item">
              <div className="w-4 h-4 rounded-full" style={{
            backgroundColor: color
          }}></div>
              <span className="text-sm text-gray-700">{name}</span>
            </div>)}
        </div>
      </div>

      {/* Section 2: Access Uptake by Channel */}
      <div className="section-container">
        <div className="section-header-with-select">
          <div className="section-header-left">
            <BarChart3Icon className="w-6 h-6 text-[#FF5A5F]" />
            <h2 className="text-xl font-semibold text-[#0D0C24]">
              Access Uptake by Channel (24 months)
            </h2>
          </div>
          <div className="select-channel-inline">
            <label className="channel-filter-label">Channel:</label>
            <div className="channel-dropdown-wrapper">
              <Select label="Channel" placeholder="Select a channel" options={channelOptions} value={selectedChannel} onChange={value => setSelectedChannel(value as 'Commercial' | 'Medicare' | 'Medicaid')} />
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={barData[selectedChannel]} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20
          }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="quarter" tick={{
              fill: '#6B7280',
              fontSize: 12
            }} axisLine={{
              stroke: '#E5E7EB'
            }} />
            <YAxis
              label={{
                value: '% Lives',
                angle: -90,
                position: 'insideLeft',
                style: {
                  fill: '#6B7280',
                  fontSize: 12
                }
              }}
              tick={{
                fill: '#6B7280',
                fontSize: 12
              }}
              axisLine={{
                stroke: '#E5E7EB'
              }}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={value => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{
              paddingTop: '20px'
            }} iconType="circle" />
            <Bar dataKey="Restrictive tier" stackId="a" fill={TIER_COLORS['Restrictive tier']} radius={[0, 0, 0, 0]} label={renderBarLabel} />
            <Bar dataKey="Non-preferred" stackId="a" fill={TIER_COLORS['Non-preferred']} radius={[0, 0, 0, 0]} label={renderBarLabel} />
            <Bar dataKey="Non-preferred with intervention" stackId="a" fill={TIER_COLORS['Non-preferred with interventions']} radius={[0, 0, 0, 0]} label={renderBarLabel} />
            <Bar dataKey="Preferred with intervention" stackId="a" fill={TIER_COLORS['Preferred with interventions']} radius={[0, 0, 0, 0]} label={renderBarLabel} />
            <Bar dataKey="Preferred" stackId="a" fill={TIER_COLORS['Preferred']} radius={[4, 4, 0, 0]} label={renderBarLabel} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        /* Selected Analogs Banner */
        .selected-analogs-banner {
          width: 100%;
          background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
          border: 2px solid #10B981;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 8px;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1);
          animation: slideDown 0.4s ease-out;
        }

        .banner-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .banner-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .banner-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #065F46;
          margin: 0;
        }

        .analogs-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .analog-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background: white;
          border: 1px solid #10B981;
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #065F46;
          box-shadow: 0 1px 3px rgba(16, 185, 129, 0.1);
          transition: all 0.2s ease;
        }

        .analog-chip:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
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

        /* Section Container - Full width, edge-to-edge with minimal padding */
        .section-container {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 16px 20px;
          background-color: #fff;
          border-radius: 0;
          box-shadow: none;
          border-bottom: 1px solid #E5E7EB;
        }

        /* Section Header - Compact spacing */
        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 0;
          margin-bottom: 16px;
        }

        /* Section Header with Select - Horizontal layout */
        .section-header-with-select {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 0;
          margin-bottom: 20px;
        }

        .section-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Select Channel Inline - Horizontal layout with label */
        .select-channel-inline {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .channel-filter-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4B5563;
          white-space: nowrap;
        }

        .channel-dropdown-wrapper {
          width: 240px;
        }

        /* Override Select component styles for this specific dropdown */
        .channel-dropdown-wrapper select,
        .channel-dropdown-wrapper button {
          font-size: 0.875rem !important;
          padding: 0.75rem 1rem !important;
        }

        /* Select Channel Wrapper - Fixed width, left-aligned (for first section if needed) */
        .select-channel-wrapper {
          width: 260px;
          margin-bottom: 20px;
        }

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

        .channel-name {
          font-weight: 600;
          color: #111827;
          font-size: 0.9rem;
          display: block;
        }

        /* Legend - Compact spacing */
        .chart-legend {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px 24px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #E5E7EB;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
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

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .selected-analogs-banner {
            padding: 12px 16px;
          }

          .banner-title {
            font-size: 0.875rem;
          }

          .analog-chip {
            font-size: 0.75rem;
            padding: 4px 10px;
          }

          .section-container {
            padding: 12px 16px;
          }

          .section-header-with-select {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .select-channel-inline {
            width: 100%;
            justify-content: flex-start;
          }

          .channel-dropdown-wrapper {
            flex: 1;
            max-width: 180px;
          }

          .select-channel-wrapper {
            width: 100%;
            max-width: 260px;
          }

          .chart-grid {
            flex-direction: column;
            gap: 20px;
          }

          .donut-chart-container {
            width: 240px;
            height: 240px;
          }

          .chart-legend {
            gap: 12px 16px;
          }
        }
      `}</style>
    </div>;
}