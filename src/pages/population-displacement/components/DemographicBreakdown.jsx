import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemographicBreakdown = () => {
  const [activeView, setActiveView] = useState('age');

  const ageData = [
    { name: 'Children (0-17)', value: 45, count: 146700, color: '#2563EB' },
    { name: 'Adults (18-59)', value: 38, count: 123880, color: '#10B981' },
    { name: 'Elderly (60+)', value: 17, count: 55420, color: '#F59E0B' }
  ];

  const genderData = [
    { name: 'Female', value: 52, count: 169520, color: '#EC4899' },
    { name: 'Male', value: 48, count: 156480, color: '#3B82F6' }
  ];

  const vulnerabilityData = [
    { name: 'Unaccompanied Minors', count: 8500, percentage: 2.6 },
    { name: 'Pregnant Women', count: 12400, percentage: 3.8 },
    { name: 'Disabled Persons', count: 19600, percentage: 6.0 },
    { name: 'Chronic Illness', count: 15800, percentage: 4.8 },
    { name: 'Elderly Alone', count: 22100, percentage: 6.8 }
  ];

  const needsData = [
    { category: 'Medical Care', urgent: 45000, total: 78000 },
    { category: 'Food Security', urgent: 89000, total: 156000 },
    { category: 'Clean Water', urgent: 67000, total: 234000 },
    { category: 'Shelter', urgent: 123000, total: 326000 },
    { category: 'Education', urgent: 34000, total: 89000 }
  ];

  const getCurrentData = () => {
    switch (activeView) {
      case 'age':
        return ageData;
      case 'gender':
        return genderData;
      default:
        return ageData;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="font-medium text-foreground mb-1">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="text-foreground font-medium">{data?.count?.toLocaleString()}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="text-foreground font-medium">{data?.value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Demographic Analysis</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeView === 'age' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('age')}
          >
            Age Groups
          </Button>
          <Button
            variant={activeView === 'gender' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('gender')}
          >
            Gender
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">
            {activeView === 'age' ? 'Age Distribution' : 'Gender Distribution'}
          </h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getCurrentData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {getCurrentData()?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {getCurrentData()?.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-muted-foreground">{item?.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-foreground font-medium">{item?.count?.toLocaleString()}</span>
                  <span className="text-muted-foreground">{item?.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vulnerable Populations */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">Vulnerable Populations</h4>
          
          <div className="space-y-3">
            {vulnerabilityData?.map((item, index) => (
              <div key={index} className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item?.name}</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
                    <span className="text-sm text-warning font-medium">{item?.percentage}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">{item?.count?.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">persons</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Immediate Needs Assessment */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-md font-medium text-foreground mb-4">Immediate Needs Assessment</h4>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={needsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#CBD5E1', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis 
                tick={{ fill: '#CBD5E1', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Bar dataKey="total" fill="#64748B" name="Total Need" opacity={0.6} />
              <Bar dataKey="urgent" fill="#DC2626" name="Urgent Need" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-500 rounded-full opacity-60"></div>
              <span className="text-muted-foreground">Total Need</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Urgent Need</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemographicBreakdown;