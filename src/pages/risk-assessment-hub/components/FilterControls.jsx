import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/CheckBox';

const FilterControls = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    hazardTypes: [],
    probabilityThreshold: 50,
    impactSeverity: 'all',
    timeRange: '5year',
    confidenceLevel: 80
  });

  const hazardTypeOptions = [
    { id: 'heatwave', label: 'Extreme Heat Events', checked: false },
    { id: 'flooding', label: 'Coastal & Flash Flooding', checked: false },
    { id: 'drought', label: 'Water Scarcity & Drought', checked: false },
    { id: 'storms', label: 'Severe Weather Systems', checked: false },
    { id: 'dust', label: 'Dust Storms & Air Quality', checked: false },
    { id: 'seismic', label: 'Seismic Activity', checked: false }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severity Levels' },
    { value: 'critical', label: 'Critical (8.0-10.0)' },
    { value: 'high', label: 'High (6.0-7.9)' },
    { value: 'medium', label: 'Medium (4.0-5.9)' },
    { value: 'low', label: 'Low (0.0-3.9)' }
  ];

  const timeRangeOptions = [
    { value: '1year', label: 'Next 12 Months' },
    { value: '5year', label: 'Next 5 Years' },
    { value: '10year', label: '10-Year Outlook' },
    { value: '30year', label: '30-Year Projection' }
  ];

  const probabilityOptions = [
    { value: 25, label: '25% or higher' },
    { value: 50, label: '50% or higher' },
    { value: 75, label: '75% or higher' },
    { value: 90, label: '90% or higher' }
  ];

  const confidenceOptions = [
    { value: 60, label: '60% confidence' },
    { value: 70, label: '70% confidence' },
    { value: 80, label: '80% confidence' },
    { value: 90, label: '90% confidence' }
  ];

  const handleHazardTypeChange = (hazardId, checked) => {
    const updatedTypes = checked 
      ? [...filters?.hazardTypes, hazardId]
      : filters?.hazardTypes?.filter(id => id !== hazardId);
    
    const updatedFilters = { ...filters, hazardTypes: updatedTypes };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      hazardTypes: [],
      probabilityThreshold: 50,
      impactSeverity: 'all',
      timeRange: '5year',
      confidenceLevel: 80
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.hazardTypes?.length > 0) count++;
    if (filters?.probabilityThreshold !== 50) count++;
    if (filters?.impactSeverity !== 'all') count++;
    if (filters?.timeRange !== '5year') count++;
    if (filters?.confidenceLevel !== 80) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="left"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Advanced Filters
          </Button>
          {getActiveFilterCount() > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-6">
          {/* Hazard Types */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Hazard Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {hazardTypeOptions?.map((hazard) => (
                <Checkbox
                  key={hazard?.id}
                  label={hazard?.label}
                  checked={filters?.hazardTypes?.includes(hazard?.id)}
                  onChange={(e) => handleHazardTypeChange(hazard?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Probability Threshold"
              options={probabilityOptions?.map(opt => ({ 
                value: opt?.value?.toString(), 
                label: opt?.label 
              }))}
              value={filters?.probabilityThreshold?.toString()}
              onChange={(value) => handleFilterChange('probabilityThreshold', parseInt(value))}
            />

            <Select
              label="Impact Severity"
              options={severityOptions}
              value={filters?.impactSeverity}
              onChange={(value) => handleFilterChange('impactSeverity', value)}
            />

            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={filters?.timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
            />

            <Select
              label="Confidence Level"
              options={confidenceOptions?.map(opt => ({ 
                value: opt?.value?.toString(), 
                label: opt?.label 
              }))}
              value={filters?.confidenceLevel?.toString()}
              onChange={(value) => handleFilterChange('confidenceLevel', parseInt(value))}
            />
          </div>

          {/* Quick Filter Presets */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Presets</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                High Risk Only
              </Button>
              <Button variant="outline" size="sm">
                Near-term (1 Year)
              </Button>
              <Button variant="outline" size="sm">
                Climate Extremes
              </Button>
              <Button variant="outline" size="sm">
                Infrastructure Focus
              </Button>
              <Button variant="outline" size="sm">
                Population Impact
              </Button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Filter" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">Active Filters</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {filters?.hazardTypes?.length > 0 && `${filters?.hazardTypes?.length} hazard types, `}
                    {filters?.probabilityThreshold !== 50 && `≥${filters?.probabilityThreshold}% probability, `}
                    {filters?.impactSeverity !== 'all' && `${filters?.impactSeverity} severity, `}
                    {filters?.timeRange !== '5year' && `${timeRangeOptions?.find(t => t?.value === filters?.timeRange)?.label}, `}
                    {filters?.confidenceLevel !== 80 && `≥${filters?.confidenceLevel}% confidence`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;