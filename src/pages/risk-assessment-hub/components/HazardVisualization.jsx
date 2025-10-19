import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HazardVisualization = () => {
  const [activeLayer, setActiveLayer] = useState('environmental');
  const [timeRange, setTimeRange] = useState('5year');

  const layerOptions = [
    { id: 'environmental', label: 'Environmental Hazards', icon: 'Thermometer', color: 'error' },
    { id: 'infrastructure', label: 'Infrastructure Vulnerabilities', icon: 'Building2', color: 'warning' },
    { id: 'social', label: 'Social Vulnerability', icon: 'Users', color: 'primary' }
  ];

  const timeRangeOptions = [
    { id: '1year', label: '1 Year' },
    { id: '5year', label: '5 Years' },
    { id: '10year', label: '10 Years' },
    { id: '30year', label: '30 Years' }
  ];

  const hazardData = [
    {
      id: 'heat_dome',
      name: 'Heat Dome Formation',
      severity: 'critical',
      probability: 78,
      location: { lat: 25.2048, lng: 55.2708 },
      impact: 'Extreme temperatures affecting 2.3M residents',
      trend: 'increasing'
    },
    {
      id: 'coastal_flooding',
      name: 'Coastal Flooding Risk',
      severity: 'high',
      probability: 45,
      location: { lat: 25.1972, lng: 55.2744 },
      impact: 'Infrastructure damage in Marina district',
      trend: 'stable'
    },
    {
      id: 'dust_storm',
      name: 'Severe Dust Storm',
      severity: 'medium',
      probability: 62,
      location: { lat: 25.2582, lng: 55.3047 },
      impact: 'Air quality degradation, transport disruption',
      trend: 'decreasing'
    },
    {
      id: 'water_stress',
      name: 'Water Resource Stress',
      severity: 'high',
      probability: 85,
      location: { lat: 25.2285, lng: 55.2856 },
      impact: 'Supply chain vulnerabilities',
      trend: 'increasing'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      default: return 'text-success';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'high': return 'bg-warning/10 border-warning/20';
      case 'medium': return 'bg-primary/10 border-primary/20';
      default: return 'bg-success/10 border-success/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Hazard Severity Mapping</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Layers" iconPosition="left">
            Layers
          </Button>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Configure
          </Button>
        </div>
      </div>
      {/* Layer Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {layerOptions?.map((layer) => (
          <Button
            key={layer?.id}
            variant={activeLayer === layer?.id ? 'default' : 'outline'}
            size="sm"
            iconName={layer?.icon}
            iconPosition="left"
            onClick={() => setActiveLayer(layer?.id)}
          >
            {layer?.label}
          </Button>
        ))}
      </div>
      {/* Time Range Controls */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm text-muted-foreground">Time Range:</span>
        {timeRangeOptions?.map((option) => (
          <Button
            key={option?.id}
            variant={timeRange === option?.id ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setTimeRange(option?.id)}
          >
            {option?.label}
          </Button>
        ))}
      </div>
      {/* Map Visualization Area */}
      <div className="relative bg-muted/30 rounded-lg h-96 mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Dubai Risk Assessment Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=25.2048,55.2708&z=11&output=embed"
            className="rounded-lg"
          />
        </div>
        
        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" size="icon">
              <Icon name="ZoomIn" size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="ZoomOut" size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <div className="text-xs font-medium text-foreground mb-2">Risk Severity</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Critical (&gt;8.0)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">High (6.0-8.0)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs text-muted-foreground">Medium (4.0-6.0)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Low (&lt;4.0)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Hazard List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Active Hazards</h3>
        {hazardData?.map((hazard) => (
          <div key={hazard?.id} className={`p-4 rounded-lg border ${getSeverityBg(hazard?.severity)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">{hazard?.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full bg-background/50 ${getSeverityColor(hazard?.severity)}`}>
                    {hazard?.severity?.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{hazard?.impact}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Percent" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">
                      {hazard?.probability}% probability
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={hazard?.trend === 'increasing' ? 'TrendingUp' : hazard?.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} 
                      size={12} 
                      color={hazard?.trend === 'increasing' ? 'var(--color-error)' : hazard?.trend === 'decreasing' ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                    />
                    <span className="text-xs text-muted-foreground capitalize">{hazard?.trend}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MapPin" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HazardVisualization;