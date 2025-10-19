import React from 'react';
import Icon from '../../../components/AppIcon';

const DisplacementMetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase':
        return 'text-error';
      case 'decrease':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover:shadow-elevation-2">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default DisplacementMetricsCard;