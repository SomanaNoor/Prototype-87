import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ShelterCapacityChart = () => {
  const shelterData = [
    {
      name: 'Al-Zahra Camp',
      capacity: 5000,
      occupied: 4800,
      occupancyRate: 96,
      status: 'critical'
    },
    {
      name: 'Refugee Center A',
      capacity: 3500,
      occupied: 2100,
      occupancyRate: 60,
      status: 'normal'
    },
    {
      name: 'Emergency Shelter B',
      capacity: 2800,
      occupied: 2650,
      occupancyRate: 95,
      status: 'warning'
    },
    {
      name: 'Community Hall C',
      capacity: 1200,
      occupied: 800,
      occupancyRate: 67,
      status: 'normal'
    },
    {
      name: 'School Shelter D',
      capacity: 2000,
      occupied: 1950,
      occupancyRate: 98,
      status: 'critical'
    }
  ];

  const getBarColor = (status) => {
    switch (status) {
      case 'critical':
        return '#DC2626';
      case 'warning':
        return '#F59E0B';
      default:
        return '#10B981';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              Capacity: <span className="text-foreground font-medium">{data?.capacity?.toLocaleString()}</span>
            </p>
            <p className="text-muted-foreground">
              Occupied: <span className="text-foreground font-medium">{data?.occupied?.toLocaleString()}</span>
            </p>
            <p className="text-muted-foreground">
              Rate: <span className="text-foreground font-medium">{data?.occupancyRate}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Shelter Capacity vs Demand</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">&lt;80%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">80-95%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">&gt;95%</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={shelterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#CBD5E1', fontSize: 12 }}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis 
              tick={{ fill: '#CBD5E1', fontSize: 12 }}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="capacity" fill="#64748B" name="Capacity" opacity={0.6} />
            <Bar dataKey="occupied" name="Occupied">
              {shelterData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry?.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShelterCapacityChart;