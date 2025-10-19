import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparativeCityAnalysis = () => {
  const [selectedCities, setSelectedCities] = useState(['dubai', 'abu-dhabi']);
  const [comparisonMetric, setComparisonMetric] = useState('resilience');

  // Mock city data for comparison
  const cityData = {
    'dubai': {
      id: 'dubai',
      name: 'Dubai',
      country: 'UAE',
      population: 3500000,
      resilienceScore: 72.4,
      infrastructureAssets: 156,
      criticalAssets: 14,
      displacedPopulation: 28500,
      cascadeProbability: 38.7,
      recoveryTime: 4.2,
      riskLevel: 'medium',
      lastAssessment: '2025-10-18T18:30:00Z',
      keyVulnerabilities: ['Coastal flooding', 'Power grid interdependency', 'Water scarcity'],
      strengths: ['Advanced early warning', 'Redundant systems', 'Emergency response'],
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    'abu-dhabi': {
      id: 'abu-dhabi',
      name: 'Abu Dhabi',
      country: 'UAE',
      population: 1500000,
      resilienceScore: 78.1,
      infrastructureAssets: 98,
      criticalAssets: 8,
      displacedPopulation: 12000,
      cascadeProbability: 28.3,
      recoveryTime: 3.1,
      riskLevel: 'low',
      lastAssessment: '2025-10-18T18:25:00Z',
      keyVulnerabilities: ['Desert storms', 'Oil infrastructure', 'Heat stress'],
      strengths: ['Distributed power', 'Water reserves', 'Modern infrastructure'],
      coordinates: { lat: 24.4539, lng: 54.3773 }
    },
    'doha': {
      id: 'doha',
      name: 'Doha',
      country: 'Qatar',
      population: 2400000,
      resilienceScore: 69.8,
      infrastructureAssets: 112,
      criticalAssets: 11,
      displacedPopulation: 18200,
      cascadeProbability: 42.1,
      recoveryTime: 4.8,
      riskLevel: 'medium',
      lastAssessment: '2025-10-18T18:20:00Z',
      keyVulnerabilities: ['Extreme heat', 'Water dependency', 'Single point failures'],
      strengths: ['Gas reserves', 'Investment in resilience', 'Smart city tech'],
      coordinates: { lat: 25.2854, lng: 51.5310 }
    },
    'riyadh': {
      id: 'riyadh',
      name: 'Riyadh',
      country: 'Saudi Arabia',
      population: 7000000,
      resilienceScore: 65.2,
      infrastructureAssets: 203,
      criticalAssets: 22,
      displacedPopulation: 45000,
      cascadeProbability: 51.4,
      recoveryTime: 6.1,
      riskLevel: 'high',
      lastAssessment: '2025-10-18T18:15:00Z',
      keyVulnerabilities: ['Sandstorms', 'Water scarcity', 'Urban heat island'],
      strengths: ['Economic resources', 'Vision 2030 projects', 'Regional hub'],
      coordinates: { lat: 24.7136, lng: 46.6753 }
    }
  };

  const availableCities = Object.values(cityData);
  
  const comparisonMetrics = [
    { value: 'resilience', label: 'Resilience Score', unit: '/100' },
    { value: 'displacement', label: 'Displaced Population', unit: 'people' },
    { value: 'cascade', label: 'Cascade Probability', unit: '%' },
    { value: 'recovery', label: 'Recovery Time', unit: 'days' },
    { value: 'assets', label: 'Critical Assets', unit: 'count' }
  ];

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-success/10';
      case 'medium': return 'bg-warning/10';
      case 'high': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  const getMetricValue = (city, metric) => {
    switch (metric) {
      case 'resilience': return city?.resilienceScore;
      case 'displacement': return city?.displacedPopulation;
      case 'cascade': return city?.cascadeProbability;
      case 'recovery': return city?.recoveryTime;
      case 'assets': return city?.criticalAssets;
      default: return 0;
    }
  };

  const formatMetricValue = (value, metric) => {
    switch (metric) {
      case 'displacement':
        return value?.toLocaleString();
      case 'resilience': case'cascade': case'recovery':
        return value?.toFixed(1);
      default:
        return value?.toString();
    }
  };

  const handleCitySelection = (cityId) => {
    if (selectedCities?.includes(cityId)) {
      if (selectedCities?.length > 1) {
        setSelectedCities(selectedCities?.filter(id => id !== cityId));
      }
    } else {
      if (selectedCities?.length < 4) {
        setSelectedCities([...selectedCities, cityId]);
      }
    }
  };

  const selectedCityData = selectedCities?.map(id => cityData?.[id]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Comparative City Analysis</h2>
          <p className="text-sm text-muted-foreground">Multi-location infrastructure impact assessment</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Comparison Metric Selector */}
          <select
            value={comparisonMetric}
            onChange={(e) => setComparisonMetric(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            {comparisonMetrics?.map((metric) => (
              <option key={metric?.value} value={metric?.value}>
                Compare by {metric?.label}
              </option>
            ))}
          </select>

          <Button variant="outline" size="sm" iconName="Download">
            Export Comparison
          </Button>
        </div>
      </div>
      {/* City Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Select Cities to Compare (max 4)</h3>
        <div className="flex flex-wrap gap-2">
          {availableCities?.map((city) => (
            <button
              key={city?.id}
              onClick={() => handleCitySelection(city?.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                selectedCities?.includes(city?.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {city?.name}, {city?.country}
            </button>
          ))}
        </div>
      </div>
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {selectedCityData?.map((city) => (
          <div key={city?.id} className="bg-muted/50 border border-border rounded-lg p-4">
            {/* City Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{city?.name}</h3>
                <p className="text-xs text-muted-foreground">{city?.country}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(city?.riskLevel)} ${getRiskBgColor(city?.riskLevel)}`}>
                {city?.riskLevel?.toUpperCase()}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Population</span>
                <span className="text-sm font-medium text-foreground">
                  {city?.population?.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Resilience Score</span>
                <span className="text-sm font-medium text-foreground">
                  {city?.resilienceScore?.toFixed(1)}/100
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Critical Assets</span>
                <span className="text-sm font-medium text-foreground">
                  {city?.criticalAssets}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Displaced</span>
                <span className="text-sm font-medium text-error">
                  {city?.displacedPopulation?.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Recovery Time</span>
                <span className="text-sm font-medium text-foreground">
                  {city?.recoveryTime?.toFixed(1)} days
                </span>
              </div>
            </div>

            {/* Resilience Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Resilience</span>
                <span className="text-xs text-foreground">{city?.resilienceScore?.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${city?.resilienceScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Metric</th>
              {selectedCityData?.map((city) => (
                <th key={city?.id} className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                  {city?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonMetrics?.map((metric) => (
              <tr key={metric?.value} className="border-b border-border">
                <td className="py-3 px-2 text-sm font-medium text-foreground">
                  {metric?.label}
                </td>
                {selectedCityData?.map((city) => {
                  const value = getMetricValue(city, metric?.value);
                  const formattedValue = formatMetricValue(value, metric?.value);
                  
                  return (
                    <td key={city?.id} className="py-3 px-2 text-center">
                      <span className="text-sm font-medium text-foreground">
                        {formattedValue}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        {metric?.unit}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Vulnerability Analysis */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedCityData?.slice(0, 2)?.map((city) => (
          <div key={city?.id} className="bg-muted/50 border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">{city?.name} Analysis</h4>
            
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-error mb-2">Key Vulnerabilities</h5>
                <ul className="space-y-1">
                  {city?.keyVulnerabilities?.map((vulnerability, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={12} color="var(--color-error)" />
                      <span className="text-xs text-muted-foreground">{vulnerability}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-success mb-2">Strengths</h5>
                <ul className="space-y-1">
                  {city?.strengths?.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={12} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Comparison Summary */}
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Comparison Insights</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on current analysis, {selectedCityData?.find(city => city?.resilienceScore === Math.max(...selectedCityData?.map(c => c?.resilienceScore)))?.name} shows the highest infrastructure resilience, 
              while {selectedCityData?.find(city => city?.displacedPopulation === Math.max(...selectedCityData?.map(c => c?.displacedPopulation)))?.name} has the largest displaced population. 
              Recovery times vary from {Math.min(...selectedCityData?.map(c => c?.recoveryTime))?.toFixed(1)} to {Math.max(...selectedCityData?.map(c => c?.recoveryTime))?.toFixed(1)} days across selected cities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeCityAnalysis;