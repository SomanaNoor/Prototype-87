import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DisplacementAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock displacement data
  const displacementData = [
    {
      id: 'central-district',
      region: 'Central District',
      totalPopulation: 45000,
      insidePopulation: 32000,
      displacedPopulation: 13000,
      uncertaintyRange: { min: 11500, max: 14800 },
      confidence: 0.82,
      trend: 'increasing',
      lastUpdated: '2025-10-18T18:35:00Z',
      criticalInfrastructure: ['power-grid-1', 'hospital-1']
    },
    {
      id: 'riverside-area',
      region: 'Riverside Area',
      totalPopulation: 28000,
      insidePopulation: 18500,
      displacedPopulation: 9500,
      uncertaintyRange: { min: 8200, max: 11000 },
      confidence: 0.75,
      trend: 'stable',
      lastUpdated: '2025-10-18T18:32:00Z',
      criticalInfrastructure: ['water-1', 'transport-2']
    },
    {
      id: 'industrial-zone',
      region: 'Industrial Zone',
      totalPopulation: 15000,
      insidePopulation: 12800,
      displacedPopulation: 2200,
      uncertaintyRange: { min: 1800, max: 2800 },
      confidence: 0.91,
      trend: 'decreasing',
      lastUpdated: '2025-10-18T18:38:00Z',
      criticalInfrastructure: ['power-grid-1', 'transport-1']
    },
    {
      id: 'northern-suburbs',
      region: 'Northern Suburbs',
      totalPopulation: 62000,
      insidePopulation: 58000,
      displacedPopulation: 4000,
      uncertaintyRange: { min: 3200, max: 4900 },
      confidence: 0.88,
      trend: 'stable',
      lastUpdated: '2025-10-18T18:36:00Z',
      criticalInfrastructure: ['telecom-1']
    }
  ];

  const timeframes = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' }
  ];

  const filteredData = selectedRegion === 'all' 
    ? displacementData 
    : displacementData?.filter(item => item?.id === selectedRegion);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-error';
      case 'decreasing': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-success';
    if (confidence >= 0.6) return 'text-warning';
    return 'text-error';
  };

  const formatLastUpdated = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Displacement Analytics</h2>
          <p className="text-sm text-muted-foreground">Population impact with uncertainty ranges</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Timeframe Selector */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            {timeframes?.map((timeframe) => (
              <option key={timeframe?.value} value={timeframe?.value}>
                {timeframe?.label}
              </option>
            ))}
          </select>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            <option value="all">All Regions</option>
            {displacementData?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.region}
              </option>
            ))}
          </select>

          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Displacement Charts */}
      <div className="space-y-4">
        {filteredData?.map((item) => {
          const displacementPercentage = (item?.displacedPopulation / item?.totalPopulation) * 100;
          const insidePercentage = (item?.insidePopulation / item?.totalPopulation) * 100;
          
          return (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-4">
              {/* Region Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-foreground">{item?.region}</h3>
                  <div className={`flex items-center space-x-1 ${getTrendColor(item?.trend)}`}>
                    <Icon name={getTrendIcon(item?.trend)} size={14} />
                    <span className="text-xs capitalize">{item?.trend}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Updated {formatLastUpdated(item?.lastUpdated)}</span>
                  <div className={`flex items-center space-x-1 ${getConfidenceColor(item?.confidence)}`}>
                    <Icon name="Target" size={12} />
                    <span>{Math.round(item?.confidence * 100)}% confidence</span>
                  </div>
                </div>
              </div>
              {/* Population Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{item?.totalPopulation?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Population</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{item?.insidePopulation?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Remaining Inside</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-error">{item?.displacedPopulation?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Displaced</p>
                </div>
              </div>
              {/* Dual Bar Chart */}
              <div className="space-y-3">
                {/* Inside Population Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary">Inside Population</span>
                    <span className="text-sm text-muted-foreground">{insidePercentage?.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${insidePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Displaced Population Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-error">Displaced Population</span>
                    <span className="text-sm text-muted-foreground">{displacementPercentage?.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-error h-3 rounded-full transition-all duration-500"
                      style={{ width: `${displacementPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* Uncertainty Range */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Displacement Uncertainty Range</span>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Info" size={14} />
                    <span className="text-xs">95% confidence interval</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Min: {item?.uncertaintyRange?.min?.toLocaleString()}
                  </span>
                  <span className="font-semibold text-foreground">
                    Current: {item?.displacedPopulation?.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">
                    Max: {item?.uncertaintyRange?.max?.toLocaleString()}
                  </span>
                </div>
                
                {/* Uncertainty Range Visualization */}
                <div className="mt-2 relative">
                  <div className="w-full bg-border h-1 rounded-full"></div>
                  <div
                    className="absolute top-0 bg-warning/50 h-1 rounded-full"
                    style={{
                      left: `${(item?.uncertaintyRange?.min / item?.totalPopulation) * 100}%`,
                      width: `${((item?.uncertaintyRange?.max - item?.uncertaintyRange?.min) / item?.totalPopulation) * 100}%`
                    }}
                  ></div>
                  <div
                    className="absolute top-0 w-1 h-1 bg-error rounded-full transform -translate-x-0.5"
                    style={{
                      left: `${(item?.displacedPopulation / item?.totalPopulation) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
              {/* Critical Infrastructure */}
              <div className="mt-4 flex items-center space-x-2">
                <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
                <span className="text-xs text-muted-foreground">
                  Affected Infrastructure: {item?.criticalInfrastructure?.length} critical assets
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Summary Statistics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Regional Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">
              {filteredData?.reduce((sum, item) => sum + item?.totalPopulation, 0)?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Population</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">
              {filteredData?.reduce((sum, item) => sum + item?.insidePopulation, 0)?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Inside</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-error">
              {filteredData?.reduce((sum, item) => sum + item?.displacedPopulation, 0)?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Displaced</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">
              {Math.round(filteredData?.reduce((sum, item) => sum + item?.confidence, 0) / filteredData?.length * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">Avg. Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplacementAnalytics;