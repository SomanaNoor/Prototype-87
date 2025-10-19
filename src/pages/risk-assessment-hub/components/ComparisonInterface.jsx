import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonInterface = () => {
  const [leftScenario, setLeftScenario] = useState('current');
  const [rightScenario, setRightScenario] = useState('projected');

  const scenarioOptions = [
    { value: 'current', label: 'Current Conditions (2024)' },
    { value: 'projected', label: 'Projected 2030 (+1.5°C)' },
    { value: 'extreme', label: 'Extreme Scenario (+2.5°C)' },
    { value: 'historical', label: 'Historical Baseline (2020)' },
    { value: 'optimistic', label: 'Mitigation Success (-0.5°C)' }
  ];

  const locationOptions = [
    { value: 'dubai', label: 'Dubai, UAE' },
    { value: 'riyadh', label: 'Riyadh, Saudi Arabia' },
    { value: 'cairo', label: 'Cairo, Egypt' },
    { value: 'doha', label: 'Doha, Qatar' },
    { value: 'kuwait', label: 'Kuwait City, Kuwait' }
  ];

  const riskData = {
    current: {
      heatwaves: { probability: 65, impact: 7.2, trend: 'stable' },
      flooding: { probability: 23, impact: 5.8, trend: 'increasing' },
      drought: { probability: 45, impact: 6.1, trend: 'increasing' },
      storms: { probability: 18, impact: 4.3, trend: 'stable' }
    },
    projected: {
      heatwaves: { probability: 85, impact: 8.7, trend: 'increasing' },
      flooding: { probability: 34, impact: 7.2, trend: 'increasing' },
      drought: { probability: 67, impact: 7.8, trend: 'increasing' },
      storms: { probability: 28, impact: 5.9, trend: 'increasing' }
    }
  };

  const getRiskColor = (value) => {
    if (value >= 7) return 'text-error';
    if (value >= 5) return 'text-warning';
    return 'text-success';
  };

  const getRiskBg = (value) => {
    if (value >= 7) return 'bg-error/10';
    if (value >= 5) return 'bg-warning/10';
    return 'bg-success/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Scenario Comparison</h2>
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
          Export Analysis
        </Button>
      </div>
      {/* Scenario Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <Select
            label="Left Scenario"
            options={scenarioOptions}
            value={leftScenario}
            onChange={setLeftScenario}
            className="mb-3"
          />
          <Select
            label="Location"
            options={locationOptions}
            value="dubai"
            onChange={() => {}}
          />
        </div>
        <div>
          <Select
            label="Right Scenario"
            options={scenarioOptions}
            value={rightScenario}
            onChange={setRightScenario}
            className="mb-3"
          />
          <Select
            label="Location"
            options={locationOptions}
            value="dubai"
            onChange={() => {}}
          />
        </div>
      </div>
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Scenario */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <h3 className="font-medium text-foreground">
              {scenarioOptions?.find(s => s?.value === leftScenario)?.label}
            </h3>
          </div>
          
          {Object.entries(riskData?.[leftScenario] || riskData?.current)?.map(([hazard, data]) => (
            <div key={hazard} className={`p-4 rounded-lg border ${getRiskBg(data?.impact)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium capitalize text-foreground">{hazard}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={data?.trend === 'increasing' ? 'TrendingUp' : data?.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                    color={data?.trend === 'increasing' ? 'var(--color-error)' : data?.trend === 'decreasing' ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                  <div className="text-lg font-semibold text-foreground">{data?.probability}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Impact</div>
                  <div className={`text-lg font-semibold ${getRiskColor(data?.impact)}`}>
                    {data?.impact}/10
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scenario */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <h3 className="font-medium text-foreground">
              {scenarioOptions?.find(s => s?.value === rightScenario)?.label}
            </h3>
          </div>
          
          {Object.entries(riskData?.[rightScenario] || riskData?.projected)?.map(([hazard, data]) => (
            <div key={hazard} className={`p-4 rounded-lg border ${getRiskBg(data?.impact)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium capitalize text-foreground">{hazard}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={data?.trend === 'increasing' ? 'TrendingUp' : data?.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                    color={data?.trend === 'increasing' ? 'var(--color-error)' : data?.trend === 'decreasing' ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                  <div className="text-lg font-semibold text-foreground">{data?.probability}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Impact</div>
                  <div className={`text-lg font-semibold ${getRiskColor(data?.impact)}`}>
                    {data?.impact}/10
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comparison Summary */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
          <span className="text-sm font-medium text-foreground">Key Differences</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Projected scenario shows 31% increase in heatwave probability and 20% higher impact severity. 
          Flooding risk increases by 48% with infrastructure exposure rising significantly in coastal areas.
        </p>
      </div>
    </div>
  );
};

export default ComparisonInterface;