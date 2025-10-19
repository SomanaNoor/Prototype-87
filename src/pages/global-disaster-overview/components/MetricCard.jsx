import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, change, changeType, icon, severity, confidence }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-slate-300';
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase': return 'text-red-400';
      case 'decrease': return 'text-green-400';
      case 'stable': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 transition-smooth hover:bg-slate-750">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-slate-700 ${getSeverityColor(severity)}`}>
            <Icon name={icon} size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300">{title}</h3>
            {confidence && (
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Target" size={12} color="var(--color-muted-foreground)" />
                <span className="text-xs text-slate-400">{confidence}% confidence</span>
              </div>
            )}
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon name={getChangeIcon(changeType)} size={14} />
            <span className="text-xs font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className={`text-2xl font-bold ${getSeverityColor(severity)}`}>
          {value?.toLocaleString()}
        </span>
        {unit && (
          <span className="text-sm text-slate-400">{unit}</span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;