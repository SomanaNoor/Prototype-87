import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InfrastructureKPIStrip from './components/InfrastructureKPIStrip';
import NetworkTopologyVisualization from './components/NetworkTopologyVisualization';
import DisplacementAnalytics from './components/DisplacementAnalytics';
import InfrastructureStatusTable from './components/InfrastructureStatusTable';
import ComparativeCityAnalysis from './components/ComparativeCityAnalysis';

const InfrastructureImpact = () => {
  const [activeTab, setActiveTab] = useState('topology');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const tabs = [
    {
      id: 'topology',
      label: 'Network Topology',
      icon: 'GitBranch',
      description: 'Asset interconnections and failure propagation'
    },
    {
      id: 'displacement',
      label: 'Displacement Analytics',
      icon: 'Users',
      description: 'Population impact analysis with uncertainty'
    },
    {
      id: 'status',
      label: 'Status Monitor',
      icon: 'Activity',
      description: 'Real-time infrastructure operational status'
    },
    {
      id: 'comparison',
      label: 'City Comparison',
      icon: 'BarChart3',
      description: 'Multi-location comparative analysis'
    }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'central', label: 'Central District' },
    { value: 'riverside', label: 'Riverside Area' },
    { value: 'industrial', label: 'Industrial Zone' },
    { value: 'northern', label: 'Northern Suburbs' }
  ];

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date?.toLocaleDateString();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'topology':
        return <NetworkTopologyVisualization />;
      case 'displacement':
        return <DisplacementAnalytics />;
      case 'status':
        return <InfrastructureStatusTable />;
      case 'comparison':
        return <ComparativeCityAnalysis />;
      default:
        return <NetworkTopologyVisualization />;
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
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name="Building2" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Infrastructure Impact Dashboard</h1>
                  <p className="text-muted-foreground">
                    Cascading system failures and vulnerability assessment across critical assets
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e?.target?.value)}
                className="bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground"
              >
                {regions?.map((region) => (
                  <option key={region?.value} value={region?.value}>
                    {region?.label}
                  </option>
                ))}
              </select>

              {/* Refresh Controls */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Updated {formatLastUpdated(lastUpdated)}</span>
              </div>

              <Button
                variant="outline"
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                loading={isRefreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>

              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Report
              </Button>
            </div>
          </div>

          {/* KPI Strip */}
          <InfrastructureKPIStrip />

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`group relative flex items-center space-x-2 py-4 px-1 text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon 
                    name={tab?.icon} 
                    size={16} 
                    color={activeTab === tab?.id ? 'var(--color-primary)' : 'currentColor'} 
                  />
                  <div className="text-left">
                    <div>{tab?.label}</div>
                    <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                      {tab?.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-6">
            {/* Primary Content (10 columns) */}
            <div className="lg:col-span-10">
              {renderTabContent()}
            </div>

            {/* Right Sidebar (6 columns) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth iconName="AlertTriangle" iconPosition="left">
                    View Active Alerts
                  </Button>
                  <Button variant="outline" fullWidth iconName="MapPin" iconPosition="left">
                    Asset Location Map
                  </Button>
                  <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
                    Generate Assessment Report
                  </Button>
                  <Button variant="outline" fullWidth iconName="Settings" iconPosition="left">
                    Configure Thresholds
                  </Button>
                </div>
              </div>

              {/* Live Alerts */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Live Infrastructure Alerts</h3>
                  <div className="w-2 h-2 bg-error rounded-full pulse-urgent"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                    <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Highway Junction B Critical</p>
                      <p className="text-xs text-muted-foreground">Structural damage detected, capacity reduced to 70%</p>
                      <p className="text-xs text-error mt-1">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Power Grid Load Warning</p>
                      <p className="text-xs text-muted-foreground">Central grid approaching 85% capacity threshold</p>
                      <p className="text-xs text-warning mt-1">8 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <Icon name="Radio" size={16} color="var(--color-warning)" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Telecom Redundancy Lost</p>
                      <p className="text-xs text-muted-foreground">Backup communication link offline for maintenance</p>
                      <p className="text-xs text-warning mt-1">15 minutes ago</p>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" fullWidth className="mt-4" iconName="ExternalLink">
                  View All Alerts
                </Button>
              </div>

              {/* System Health Summary */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4">System Health Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={16} color="var(--color-warning)" />
                      <span className="text-sm text-foreground">Power Systems</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">72%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Droplets" size={16} color="var(--color-success)" />
                      <span className="text-sm text-foreground">Water Systems</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">89%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Car" size={16} color="var(--color-error)" />
                      <span className="text-sm text-foreground">Transportation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="bg-error h-2 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">58%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Radio" size={16} color="var(--color-success)" />
                      <span className="text-sm text-foreground">Communications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">94%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sources */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4">Data Sources</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Infrastructure Sensors</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Population Tracking</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Weather Services</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-warning">Delayed</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Satellite Imagery</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfrastructureImpact;