import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InfrastructureStatusTable = () => {
  const [sortField, setSortField] = useState('riskScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock infrastructure status data
  const infrastructureData = [
    {
      id: 'power-grid-central',
      name: 'Central Power Grid',
      type: 'Power',
      location: 'Downtown District',
      status: 'operational',
      capacity: 850,
      currentLoad: 720,
      riskScore: 8.2,
      lastMaintenance: '2025-10-15',
      nextMaintenance: '2025-11-15',
      dependencies: ['Water Treatment', 'Telecom Hub'],
      alerts: 2,
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    {
      id: 'water-treatment-main',
      name: 'Main Water Treatment Plant',
      type: 'Water',
      location: 'Industrial Zone',
      status: 'operational',
      capacity: 500,
      currentLoad: 380,
      riskScore: 6.1,
      lastMaintenance: '2025-10-12',
      nextMaintenance: '2025-11-12',
      dependencies: ['Power Grid', 'Chemical Supply'],
      alerts: 0,
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    {
      id: 'telecom-primary',
      name: 'Primary Telecom Hub',
      type: 'Telecommunications',
      location: 'Central District',
      status: 'operational',
      capacity: 1000,
      currentLoad: 650,
      riskScore: 4.3,
      lastMaintenance: '2025-10-10',
      nextMaintenance: '2025-11-10',
      dependencies: ['Power Grid', 'Backup Generators'],
      alerts: 1,
      coordinates: { lat: 25.2084, lng: 55.2719 }
    },
    {
      id: 'metro-station-alpha',
      name: 'Metro Station Alpha',
      type: 'Transportation',
      location: 'City Center',
      status: 'degraded',
      capacity: 2000,
      currentLoad: 1200,
      riskScore: 7.8,
      lastMaintenance: '2025-10-08',
      nextMaintenance: '2025-10-25',
      dependencies: ['Power Grid', 'Traffic Control'],
      alerts: 3,
      coordinates: { lat: 25.2061, lng: 55.2731 }
    },
    {
      id: 'highway-junction-b',
      name: 'Highway Junction B',
      type: 'Transportation',
      location: 'Eastern District',
      status: 'critical',
      capacity: 3000,
      currentLoad: 2100,
      riskScore: 9.1,
      lastMaintenance: '2025-09-28',
      nextMaintenance: '2025-10-20',
      dependencies: ['Traffic Signals', 'Emergency Services'],
      alerts: 5,
      coordinates: { lat: 25.1995, lng: 55.2801 }
    },
    {
      id: 'hospital-regional',
      name: 'Regional Medical Center',
      type: 'Healthcare',
      location: 'Medical District',
      status: 'emergency',
      capacity: 400,
      currentLoad: 380,
      riskScore: 9.7,
      lastMaintenance: '2025-10-16',
      nextMaintenance: '2025-11-16',
      dependencies: ['Power Grid', 'Water Supply', 'Oxygen Supply'],
      alerts: 7,
      coordinates: { lat: 25.2115, lng: 55.2692 }
    }
  ];

  const statusConfig = {
    operational: { color: 'text-success', bg: 'bg-success/10', label: 'Operational', icon: 'CheckCircle' },
    degraded: { color: 'text-warning', bg: 'bg-warning/10', label: 'Degraded', icon: 'AlertTriangle' },
    critical: { color: 'text-error', bg: 'bg-error/10', label: 'Critical', icon: 'AlertCircle' },
    emergency: { color: 'text-error', bg: 'bg-error/20', label: 'Emergency', icon: 'Siren' }
  };

  const typeIcons = {
    'Power': 'Zap',
    'Water': 'Droplets',
    'Telecommunications': 'Radio',
    'Transportation': 'Car',
    'Healthcare': 'Heart'
  };

  const filteredData = filterStatus === 'all' 
    ? infrastructureData 
    : infrastructureData?.filter(item => item?.status === filterStatus);

  const sortedData = [...filteredData]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getRiskColor = (score) => {
    if (score >= 8) return 'text-error';
    if (score >= 6) return 'text-warning';
    if (score >= 4) return 'text-warning';
    return 'text-success';
  };

  const getLoadPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100);
  };

  const getLoadColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Infrastructure Status Monitor</h2>
          <p className="text-sm text-muted-foreground">Real-time operational status and risk assessment</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="degraded">Degraded</option>
            <option value="critical">Critical</option>
            <option value="emergency">Emergency</option>
          </select>

          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig)?.map(([status, config]) => {
          const count = infrastructureData?.filter(item => item?.status === status)?.length;
          return (
            <div key={status} className={`${config?.bg} border border-border rounded-lg p-3`}>
              <div className="flex items-center space-x-2">
                <Icon name={config?.icon} size={16} color={`var(--color-${config?.color?.split('-')?.[1]})`} />
                <span className="text-sm font-medium text-foreground">{config?.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{count}</p>
            </div>
          );
        })}
      </div>
      {/* Infrastructure Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Infrastructure</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('currentLoad')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Load</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('riskScore')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Risk Score</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Alerts</span>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((item) => {
              const statusInfo = statusConfig?.[item?.status];
              const loadPercentage = getLoadPercentage(item?.currentLoad, item?.capacity);
              
              return (
                <tr key={item?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                        <Icon name={typeIcons?.[item?.type]} size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item?.name}</p>
                        <p className="text-xs text-muted-foreground">{item?.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full ${statusInfo?.bg}`}>
                      <Icon name={statusInfo?.icon} size={12} color={`var(--color-${statusInfo?.color?.split('-')?.[1]})`} />
                      <span className={`text-xs font-medium ${statusInfo?.color}`}>
                        {statusInfo?.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{loadPercentage}%</span>
                        <span className="text-xs text-muted-foreground">
                          {item?.currentLoad}/{item?.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${getLoadColor(loadPercentage)}`}
                          style={{ width: `${loadPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${getRiskColor(item?.riskScore)}`}>
                        {item?.riskScore?.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">/10</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    {item?.alerts > 0 ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-error rounded-full pulse-urgent"></div>
                        <span className="text-sm font-medium text-error">{item?.alerts}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">None</span>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye" />
                      <Button variant="ghost" size="sm" iconName="MapPin" />
                      <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {sortedData?.length} of {infrastructureData?.length} infrastructure assets
        </p>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <Button variant="ghost" size="sm" iconName="RefreshCw" className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default InfrastructureStatusTable;