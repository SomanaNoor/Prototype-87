import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkTopologyVisualization = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef(null);

  // Mock network data
  const networkNodes = [
    {
      id: 'power-grid-1',
      type: 'power',
      name: 'Central Power Station',
      x: 200,
      y: 150,
      capacity: 850,
      currentLoad: 720,
      riskLevel: 'high',
      status: 'operational',
      connections: ['water-1', 'telecom-1', 'transport-1'],
      confidence: 0.87,
      description: 'Primary electrical distribution hub serving downtown district'
    },
    {
      id: 'water-1',
      type: 'water',
      name: 'Water Treatment Plant',
      x: 350,
      y: 200,
      capacity: 500,
      currentLoad: 380,
      riskLevel: 'medium',
      status: 'operational',
      connections: ['power-grid-1', 'transport-2'],
      confidence: 0.92,
      description: 'Main water processing facility with backup generators'
    },
    {
      id: 'telecom-1',
      type: 'telecom',
      name: 'Communications Hub',
      x: 150,
      y: 280,
      capacity: 1000,
      currentLoad: 650,
      riskLevel: 'low',
      status: 'operational',
      connections: ['power-grid-1', 'transport-1'],
      confidence: 0.95,
      description: 'Primary telecommunications switching center'
    },
    {
      id: 'transport-1',
      type: 'transport',
      name: 'Metro Station Alpha',
      x: 280,
      y: 320,
      capacity: 2000,
      currentLoad: 1200,
      riskLevel: 'medium',
      status: 'degraded',
      connections: ['power-grid-1', 'telecom-1', 'transport-2'],
      confidence: 0.78,
      description: 'Major transit hub with reduced capacity due to flooding'
    },
    {
      id: 'transport-2',
      type: 'transport',
      name: 'Highway Junction B',
      x: 420,
      y: 280,
      capacity: 3000,
      currentLoad: 2100,
      riskLevel: 'high',
      status: 'critical',
      connections: ['water-1', 'transport-1'],
      confidence: 0.65,
      description: 'Critical highway intersection with structural damage'
    },
    {
      id: 'hospital-1',
      type: 'healthcare',
      name: 'Regional Medical Center',
      x: 320,
      y: 100,
      capacity: 400,
      currentLoad: 380,
      riskLevel: 'critical',
      status: 'emergency',
      connections: ['power-grid-1', 'water-1'],
      confidence: 0.58,
      description: 'Primary healthcare facility operating on backup power'
    }
  ];

  const assetTypes = {
    power: { icon: 'Zap', color: '#F59E0B', label: 'Power Grid' },
    water: { icon: 'Droplets', color: '#3B82F6', label: 'Water Systems' },
    telecom: { icon: 'Radio', color: '#8B5CF6', label: 'Telecommunications' },
    transport: { icon: 'Car', color: '#10B981', label: 'Transportation' },
    healthcare: { icon: 'Heart', color: '#DC2626', label: 'Healthcare' }
  };

  const riskColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#F97316',
    critical: '#DC2626'
  };

  const statusColors = {
    operational: '#10B981',
    degraded: '#F59E0B',
    critical: '#F97316',
    emergency: '#DC2626'
  };

  const filteredNodes = networkNodes?.filter(node => {
    const typeMatch = filterType === 'all' || node?.type === filterType;
    const riskMatch = filterRisk === 'all' || node?.riskLevel === filterRisk;
    return typeMatch && riskMatch;
  });

  const handleNodeClick = (node) => {
    setSelectedAsset(node);
  };

  const getConnectionPath = (node1, node2) => {
    return `M ${node1?.x} ${node1?.y} L ${node2?.x} ${node2?.y}`;
  };

  const renderConnections = () => {
    const connections = [];
    filteredNodes?.forEach(node => {
      node?.connections?.forEach(connectionId => {
        const connectedNode = filteredNodes?.find(n => n?.id === connectionId);
        if (connectedNode && node?.id < connectionId) {
          connections?.push(
            <path
              key={`${node?.id}-${connectionId}`}
              d={getConnectionPath(node, connectedNode)}
              stroke="var(--color-border)"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Infrastructure Network Topology</h2>
          <p className="text-sm text-muted-foreground">Asset interconnections and failure propagation paths</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Asset Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            <option value="all">All Assets</option>
            {Object.entries(assetTypes)?.map(([type, config]) => (
              <option key={type} value={type}>{config?.label}</option>
            ))}
          </select>

          {/* Risk Level Filter */}
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical Risk</option>
          </select>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
              iconName="ZoomOut"
            />
            <span className="text-xs text-muted-foreground px-2">{Math.round(zoomLevel * 100)}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
              iconName="ZoomIn"
            />
          </div>
        </div>
      </div>
      {/* Network Visualization */}
      <div className="relative bg-background border border-border rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 600 400"
          className="cursor-crosshair"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connections */}
          <g className="connections">
            {renderConnections()}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {filteredNodes?.map((node) => {
              const assetConfig = assetTypes?.[node?.type];
              const loadPercentage = (node?.currentLoad / node?.capacity) * 100;
              
              return (
                <g key={node?.id} className="cursor-pointer" onClick={() => handleNodeClick(node)}>
                  {/* Node Circle */}
                  <circle
                    cx={node?.x}
                    cy={node?.y}
                    r="20"
                    fill={statusColors?.[node?.status]}
                    stroke={riskColors?.[node?.riskLevel]}
                    strokeWidth="3"
                    opacity="0.8"
                    className="transition-all duration-200 hover:opacity-1 hover:r-22"
                  />
                  {/* Load Indicator */}
                  <circle
                    cx={node?.x}
                    cy={node?.y}
                    r="15"
                    fill="none"
                    stroke="var(--color-background)"
                    strokeWidth="2"
                    strokeDasharray={`${(loadPercentage / 100) * 94.2} 94.2`}
                    transform={`rotate(-90 ${node?.x} ${node?.y})`}
                  />
                  {/* Asset Icon */}
                  <foreignObject x={node?.x - 8} y={node?.y - 8} width="16" height="16">
                    <Icon name={assetConfig?.icon} size={16} color="var(--color-background)" />
                  </foreignObject>
                  {/* Confidence Badge */}
                  <circle
                    cx={node?.x + 15}
                    cy={node?.y - 15}
                    r="8"
                    fill={node?.confidence > 0.8 ? '#10B981' : node?.confidence > 0.6 ? '#F59E0B' : '#DC2626'}
                  />
                  <text
                    x={node?.x + 15}
                    y={node?.y - 11}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white"
                  >
                    {Math.round(node?.confidence * 100)}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 space-y-2">
          <h4 className="text-xs font-semibold text-foreground">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-xs text-muted-foreground">Operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs text-muted-foreground">Degraded</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-xs text-muted-foreground">Critical/Emergency</span>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Asset Details */}
      {selectedAsset && (
        <div className="mt-4 bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Icon name={assetTypes?.[selectedAsset?.type]?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedAsset?.name}</h3>
                  <p className="text-sm text-muted-foreground">{assetTypes?.[selectedAsset?.type]?.label}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{selectedAsset?.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">Capacity</span>
                  <p className="font-semibold text-foreground">{selectedAsset?.capacity}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Current Load</span>
                  <p className="font-semibold text-foreground">{selectedAsset?.currentLoad}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Risk Level</span>
                  <p className="font-semibold capitalize" style={{ color: riskColors?.[selectedAsset?.riskLevel] }}>
                    {selectedAsset?.riskLevel}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Confidence</span>
                  <p className="font-semibold text-foreground">{Math.round(selectedAsset?.confidence * 100)}%</p>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAsset(null)}
              iconName="X"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTopologyVisualization;