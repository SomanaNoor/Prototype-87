import React from 'react';
import Icon from '../../../components/AppIcon';

const InfrastructureKPIStrip = () => {
  const kpiData = [
    {
      id: 'resilience',
      title: 'Infrastructure Resilience Score',
      value: '72.4',
      unit: '/100',
      trend: 'down',
      trendValue: '-3.2%',
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Overall system robustness against cascading failures'
    },
    {
      id: 'at-risk',
      title: 'Systems at Risk',
      value: '14',
      unit: 'assets',
      trend: 'up',
      trendValue: '+2',
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      description: 'Critical infrastructure components with high vulnerability'
    },
    {
      id: 'cascade-prob',
      title: 'Cascade Probability',
      value: '38.7',
      unit: '%',
      trend: 'up',
      trendValue: '+5.3%',
      icon: 'GitBranch',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Likelihood of failure propagation across systems'
    },
    {
      id: 'recovery-time',
      title: 'Est. Recovery Time',
      value: '4.2',
      unit: 'days',
      trend: 'down',
      trendValue: '-0.8d',
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Projected time to restore full operational capacity'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-error' : 'text-success';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData?.map((kpi) => (
        <div
          key={kpi?.id}
          className="bg-card border border-border rounded-lg p-4 transition-smooth hover:shadow-elevation-2"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${kpi?.bgColor}`}>
              <Icon name={kpi?.icon} size={20} color={`var(--color-${kpi?.color?.split('-')?.[1]})`} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(kpi?.trend)}`}>
              <Icon name={getTrendIcon(kpi?.trend)} size={14} />
              <span className="text-xs font-medium">{kpi?.trendValue}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi?.title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">{kpi?.value}</span>
              <span className="text-sm text-muted-foreground">{kpi?.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{kpi?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfrastructureKPIStrip;