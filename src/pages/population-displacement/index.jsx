import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import DisplacementMetricsCard from './components/DisplacementMetricsCard';
import ShelterCapacityChart from './components/ShelterCapacityChart';
import DisplacementMap from './components/DisplacementMap';
import TimelineSlider from './components/TimelineSlider';
import DemographicBreakdown from './components/DemographicBreakdown';
import ResourceAllocationPanel from './components/ResourceAllocationPanel';

const PopulationDisplacement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Auto-refresh data every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'gaza', label: 'Gaza Strip' },
    { value: 'aleppo', label: 'Aleppo Province' },
    { value: 'idlib', label: 'Idlib Region' },
    { value: 'daraa', label: 'Daraa Governorate' }
  ];

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '72h', label: 'Last 3 Days' },
    { value: '1w', label: 'Last Week' },
    { value: '1m', label: 'Last Month' }
  ];

  const metricsData = [
    {
      title: 'Total Displaced Persons',
      value: '326,000',
      change: '+12.3%',
      changeType: 'increase',
      icon: 'Users',
      color: 'error'
    },
    {
      title: 'Shelter Occupancy Rate',
      value: '101%',
      change: '+8.5%',
      changeType: 'increase',
      icon: 'Home',
      color: 'warning'
    },
    {
      title: 'Resource Gap',
      value: '23%',
      change: '-2.1%',
      changeType: 'decrease',
      icon: 'Package',
      color: 'success'
    },
    {
      title: 'Vulnerable Population',
      value: '78,400',
      change: '+5.7%',
      changeType: 'increase',
      icon: 'AlertTriangle',
      color: 'warning'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Displacement Overview', icon: 'BarChart3' },
    { id: 'shelter', label: 'Shelter Status', icon: 'Home' },
    { id: 'resources', label: 'Resource Planning', icon: 'Package' }
  ];

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date?.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Population Displacement Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor displacement patterns, shelter capacity, and resource allocation across affected regions
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
                </div>
                <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                  Refresh Data
                </Button>
                <Button variant="default" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select
                options={regionOptions}
                value={selectedRegion}
                onChange={setSelectedRegion}
                placeholder="Select Region"
                className="w-48"
              />
              <Select
                options={timeRangeOptions}
                value={selectedTimeRange}
                onChange={setSelectedTimeRange}
                placeholder="Select Time Range"
                className="w-48"
              />
              <Button variant="outline" size="sm" iconName="Filter">
                Advanced Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-error/10 border-b border-error/20 px-6 py-3">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            <div className="flex-1">
              <p className="text-error font-medium">
                Critical Alert: Shelter capacity exceeded in 3 regions. Immediate resource deployment required.
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-error border-error hover:bg-error/10">
              View Details
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <DisplacementMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Main Visualization Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Displacement Map - 8 columns equivalent */}
                  <div className="xl:col-span-2">
                    <DisplacementMap />
                  </div>
                  
                  {/* Shelter Analysis Sidebar - 4 columns equivalent */}
                  <div className="space-y-6">
                    <ShelterCapacityChart />
                  </div>
                </div>

                {/* Timeline Analysis */}
                <TimelineSlider />

                {/* Demographic Analysis */}
                <DemographicBreakdown />
              </>
            )}

            {activeTab === 'shelter' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <ShelterCapacityChart />
                <DemographicBreakdown />
              </div>
            )}

            {activeTab === 'resources' && (
              <ResourceAllocationPanel />
            )}
          </div>
        </div>

        {/* Live Updates Toast */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-card border border-border rounded-lg shadow-elevation-4 p-4 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full pulse-urgent"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Live Updates Active</p>
                <p className="text-xs text-muted-foreground">Next refresh in 2m 15s</p>
              </div>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PopulationDisplacement;