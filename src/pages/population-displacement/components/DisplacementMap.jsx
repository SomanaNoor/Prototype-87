import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DisplacementMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapView, setMapView] = useState('displacement');

  const displacementData = [
    {
      id: 1,
      region: 'Northern Gaza',
      coordinates: { lat: 31.5, lng: 34.4 },
      displaced: 125000,
      severity: 'critical',
      trend: 'increasing',
      shelters: 12,
      capacity: 98000
    },
    {
      id: 2,
      region: 'Aleppo Province',
      coordinates: { lat: 36.2, lng: 37.1 },
      displaced: 89000,
      severity: 'high',
      trend: 'stable',
      shelters: 8,
      capacity: 95000
    },
    {
      id: 3,
      region: 'Idlib Region',
      coordinates: { lat: 35.9, lng: 36.6 },
      displaced: 67000,
      severity: 'medium',
      trend: 'decreasing',
      shelters: 15,
      capacity: 78000
    },
    {
      id: 4,
      region: 'Daraa Governorate',
      coordinates: { lat: 32.6, lng: 36.1 },
      displaced: 45000,
      severity: 'medium',
      trend: 'stable',
      shelters: 6,
      capacity: 52000
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#DC2626';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#FBC02D';
      default:
        return '#10B981';
    }
  };

  const getMarkerSize = (displaced) => {
    if (displaced > 100000) return 'w-8 h-8';
    if (displaced > 50000) return 'w-6 h-6';
    return 'w-4 h-4';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Displacement Visualization</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'displacement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('displacement')}
            >
              Displacement
            </Button>
            <Button
              variant={mapView === 'density' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('density')}
            >
              Density
            </Button>
            <Button
              variant={mapView === 'routes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('routes')}
            >
              Routes
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full pulse-urgent"></div>
            <span className="text-muted-foreground">Critical (&gt;100k)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">High (50k-100k)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Medium (&lt;50k)</span>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-slate-800">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Population Displacement Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=33.8869,35.5131&z=6&output=embed"
          className="absolute inset-0"
        />

        {/* Overlay Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {displacementData?.map((region) => (
            <div
              key={region?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
              style={{
                left: `${20 + (region?.id * 15)}%`,
                top: `${30 + (region?.id * 10)}%`
              }}
              onClick={() => setSelectedRegion(region)}
            >
              <div
                className={`${getMarkerSize(region?.displaced)} rounded-full border-2 border-white shadow-elevation-3 ${
                  region?.severity === 'critical' ? 'pulse-urgent' : ''
                }`}
                style={{ backgroundColor: getSeverityColor(region?.severity) }}
              />
              
              {/* Tooltip */}
              {selectedRegion?.id === region?.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover border border-border rounded-lg p-3 shadow-elevation-3 min-w-48 z-10">
                  <div className="text-sm space-y-2">
                    <h4 className="font-semibold text-foreground">{region?.region}</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Displaced: <span className="text-foreground font-medium">{region?.displaced?.toLocaleString()}</span></p>
                      <p>Shelters: <span className="text-foreground font-medium">{region?.shelters}</span></p>
                      <p>Capacity: <span className="text-foreground font-medium">{region?.capacity?.toLocaleString()}</span></p>
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name={region?.trend === 'increasing' ? 'TrendingUp' : region?.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} 
                          size={14} 
                          color={region?.trend === 'increasing' ? '#DC2626' : region?.trend === 'decreasing' ? '#10B981' : '#64748B'}
                        />
                        <span className="capitalize">{region?.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="icon" className="bg-background/90">
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-background/90">
            <Icon name="ZoomOut" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-background/90">
            <Icon name="Layers" size={16} />
          </Button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">326K</p>
            <p className="text-sm text-muted-foreground">Total Displaced</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">41</p>
            <p className="text-sm text-muted-foreground">Active Shelters</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">323K</p>
            <p className="text-sm text-muted-foreground">Total Capacity</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-error">101%</p>
            <p className="text-sm text-muted-foreground">Occupancy Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplacementMap;