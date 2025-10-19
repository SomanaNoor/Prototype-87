import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import RiskMetricsStrip from './components/RiskMetricsStrip';
import ComparisonInterface from './components/ComparisonInterface';
import HazardVisualization from './components/HazardVisualization';
import PredictiveModeling from './components/PredictiveModeling';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RiskAssessmentHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({});

  const tabOptions = [
    { id: 'overview', label: 'Risk Overview', icon: 'BarChart3' },
    { id: 'comparison', label: 'Scenario Comparison', icon: 'GitCompare' },
    { id: 'mapping', label: 'Hazard Mapping', icon: 'Map' },
    { id: 'modeling', label: 'Predictive Models', icon: 'TrendingUp' }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <RiskMetricsStrip />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <HazardVisualization />
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Risk Trends Analysis</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="TrendingUp" size={20} color="var(--color-error)" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Heat Risk Increasing</div>
                        <div className="text-xs text-muted-foreground">+23% over last 5 years</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-error">8.7/10</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Droplets" size={20} color="var(--color-warning)" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Flood Risk Stable</div>
                        <div className="text-xs text-muted-foreground">+5% seasonal variation</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-warning">6.2/10</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="TrendingDown" size={20} color="var(--color-success)" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Storm Risk Decreasing</div>
                        <div className="text-xs text-muted-foreground">-12% improved forecasting</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-success">4.1/10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'comparison':
        return <ComparisonInterface />;
      case 'mapping':
        return <HazardVisualization />;
      case 'modeling':
        return <PredictiveModeling />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Risk Assessment Hub</h1>
              <p className="text-muted-foreground">
                Comprehensive hazard analysis and predictive modeling for climate risk evaluation
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="FileText" iconPosition="left">
                Generate Report
              </Button>
              <Button variant="default" iconName="AlertTriangle" iconPosition="left">
                Create Alert
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 mb-6 bg-muted/30 p-1 rounded-lg">
            {tabOptions?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? 'default' : 'ghost'}
                size="sm"
                iconName={tab?.icon}
                iconPosition="left"
                onClick={() => setActiveTab(tab?.id)}
                className="flex-1"
              >
                {tab?.label}
              </Button>
            ))}
          </div>

          {/* Filter Controls */}
          <FilterControls onFiltersChange={handleFiltersChange} />

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Emergency Alerts Banner */}
          <div className="mt-8 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-error/20 rounded-lg">
                <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">Active Risk Alerts</h3>
                  <span className="text-xs text-muted-foreground">
                    Last updated: {new Date()?.toLocaleTimeString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-error rounded-full pulse-urgent"></div>
                    <span className="text-sm text-foreground">
                      Extreme heat warning issued for Dubai Metro area - Expected 48°C+ temperatures
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm text-foreground">
                      Dust storm probability increased to 67% for next 72 hours
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <Button variant="outline" size="xs">
                    View All Alerts
                  </Button>
                  <Button variant="ghost" size="xs">
                    Configure Notifications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiskAssessmentHub;