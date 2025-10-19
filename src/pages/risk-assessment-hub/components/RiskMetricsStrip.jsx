import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskMetricsStrip = () => {
  const riskMetrics = [
    {
      id: 'environmental',
      label: 'Environmental Vulnerability',
      value: 7.8,
      maxValue: 10,
      trend: 'up',
      trendValue: '+0.3',
      confidence: 92,
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'Thermometer'
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure Exposure',
      value: 6.4,
      maxValue: 10,
      trend: 'up',
      trendValue: '+0.1',
      confidence: 88,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'Building2'
    },
    {
      id: 'population',
      label: 'Population Susceptibility',
      value: 5.9,
      maxValue: 10,
      trend: 'down',
      trendValue: '-0.2',
      confidence: 85,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: 'Users'
    },
    {
      id: 'economic',
      label: 'Economic Impact Potential',
      value: 8.2,
      maxValue: 10,
      trend: 'up',
      trendValue: '+0.5',
      confidence: 90,
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'DollarSign'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {riskMetrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-4 transition-smooth hover:shadow-elevation-2">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={20} color={`var(--color-${metric?.id === 'environmental' || metric?.id === 'economic' ? 'error' : metric?.id === 'infrastructure' ? 'warning' : 'primary'})`} />
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Confidence</div>
              <div className="text-sm font-medium">{metric?.confidence}%</div>
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-sm font-medium text-foreground mb-1">{metric?.label}</h3>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${metric?.color}`}>
                {metric?.value}
              </span>
              <span className="text-sm text-muted-foreground">/ {metric?.maxValue}</span>
              <div className={`flex items-center text-xs ${
                metric?.trend === 'up' ? 'text-error' : 'text-success'
              }`}>
                <Icon 
                  name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  className="mr-1"
                />
                {metric?.trendValue}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metric?.value >= 7 ? 'bg-error' : 
                metric?.value >= 5 ? 'bg-warning': 'bg-success'
              }`}
              style={{ width: `${(metric?.value / metric?.maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskMetricsStrip;