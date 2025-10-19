import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ResourceAllocationPanel = () => {
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const scenarioOptions = [
    { value: 'current', label: 'Current Situation' },
    { value: 'optimistic', label: 'Optimistic Scenario' },
    { value: 'pessimistic', label: 'Pessimistic Scenario' },
    { value: 'worst-case', label: 'Worst Case Scenario' }
  ];

  const timeframeOptions = [
    { value: '24h', label: 'Next 24 Hours' },
    { value: '72h', label: 'Next 3 Days' },
    { value: '1w', label: 'Next Week' },
    { value: '1m', label: 'Next Month' }
  ];

  const resourceData = [
    {
      category: 'Emergency Shelter',
      current: 41,
      needed: 67,
      gap: 26,
      priority: 'critical',
      cost: 2600000,
      timeline: '48 hours',
      confidence: 85
    },
    {
      category: 'Medical Supplies',
      current: 78,
      needed: 95,
      gap: 17,
      priority: 'high',
      cost: 850000,
      timeline: '24 hours',
      confidence: 92
    },
    {
      category: 'Food Distribution',
      current: 156,
      needed: 180,
      gap: 24,
      priority: 'high',
      cost: 1200000,
      timeline: '12 hours',
      confidence: 88
    },
    {
      category: 'Clean Water Access',
      current: 234,
      needed: 326,
      gap: 92,
      priority: 'critical',
      cost: 4600000,
      timeline: '36 hours',
      confidence: 79
    },
    {
      category: 'Transportation',
      current: 45,
      needed: 78,
      gap: 33,
      priority: 'medium',
      cost: 1650000,
      timeline: '72 hours',
      confidence: 76
    }
  ];

  const allocationRecommendations = [
    {
      id: 1,
      title: 'Immediate Shelter Expansion',
      description: 'Deploy 26 additional emergency shelters in high-displacement zones within 48 hours.',
      impact: 'High',
      cost: '$2.6M',
      timeline: '48h',
      resources: ['Tents', 'Personnel', 'Transport'],
      confidence: 85
    },
    {
      id: 2,
      title: 'Water Infrastructure Repair',
      description: 'Restore damaged water treatment facilities and establish temporary distribution points.',
      impact: 'Critical',
      cost: '$4.6M',
      timeline: '36h',
      resources: ['Equipment', 'Specialists', 'Materials'],
      confidence: 79
    },
    {
      id: 3,
      title: 'Medical Response Scale-up',
      description: 'Increase medical supply distribution and deploy additional healthcare teams.',
      impact: 'High',
      cost: '$850K',
      timeline: '24h',
      resources: ['Medical Supplies', 'Healthcare Workers'],
      confidence: 92
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Critical':
        return 'text-error';
      case 'High':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Resource Allocation Planning</h3>
          <div className="flex items-center space-x-3">
            <Select
              options={scenarioOptions}
              value={selectedScenario}
              onChange={setSelectedScenario}
              className="w-48"
            />
            <Select
              options={timeframeOptions}
              value={selectedTimeframe}
              onChange={setSelectedTimeframe}
              className="w-40"
            />
          </div>
        </div>

        {/* Resource Gap Analysis */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">Resource Gap Analysis</h4>
          
          <div className="space-y-3">
            {resourceData?.map((resource, index) => (
              <div key={index} className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h5 className="font-medium text-foreground">{resource?.category}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(resource?.priority)}`}>
                      {resource?.priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{resource?.timeline}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{resource?.current}</p>
                    <p className="text-xs text-muted-foreground">Current</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{resource?.needed}</p>
                    <p className="text-xs text-muted-foreground">Needed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-error">{resource?.gap}</p>
                    <p className="text-xs text-muted-foreground">Gap</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">${(resource?.cost / 1000000)?.toFixed(1)}M</p>
                    <p className="text-xs text-muted-foreground">Est. Cost</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Coverage</span>
                    <span className="text-foreground font-medium">{Math.round((resource?.current / resource?.needed) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-smooth"
                      style={{ width: `${Math.min((resource?.current / resource?.needed) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Confidence: {resource?.confidence}%</span>
                    <span>Gap: {resource?.gap} units</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Allocation Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-foreground">Priority Recommendations</h4>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Recalculate
          </Button>
        </div>

        <div className="space-y-4">
          {allocationRecommendations?.map((rec) => (
            <div key={rec?.id} className="p-4 border border-border rounded-lg hover:shadow-elevation-2 transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium text-foreground">{rec?.title}</h5>
                    <span className={`text-sm font-medium ${getImpactColor(rec?.impact)}`}>
                      {rec?.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{rec?.cost}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{rec?.timeline}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{rec?.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  <Button variant="default" size="sm">
                    Approve
                  </Button>
                </div>
              </div>

              {/* Resource Tags */}
              <div className="flex flex-wrap gap-2">
                {rec?.resources?.map((resource, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Total estimated cost: <span className="text-foreground font-medium">$8.05M</span> • 
            Expected timeline: <span className="text-foreground font-medium">72 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Plan
            </Button>
            <Button variant="default" size="sm" iconName="Send">
              Submit for Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocationPanel;