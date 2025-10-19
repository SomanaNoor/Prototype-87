import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const PredictiveModeling = () => {
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [timeHorizon, setTimeHorizon] = useState('5year');

  const modelOptions = [
    { value: 'ensemble', label: 'Ensemble Model (Recommended)' },
    { value: 'climate_ai', label: 'Climate AI Neural Network' },
    { value: 'statistical', label: 'Statistical Regression' },
    { value: 'machine_learning', label: 'Machine Learning Hybrid' }
  ];

  const timeHorizonOptions = [
    { value: '1year', label: '1 Year Forecast' },
    { value: '5year', label: '5 Year Projection' },
    { value: '10year', label: '10 Year Outlook' },
    { value: '30year', label: '30 Year Climate Scenario' }
  ];

  const forecastData = [
    { month: 'Jan 2024', risk: 6.2, confidence: 92, uncertainty: 0.8 },
    { month: 'Apr 2024', risk: 7.1, confidence: 89, uncertainty: 1.2 },
    { month: 'Jul 2024', risk: 8.5, confidence: 85, uncertainty: 1.5 },
    { month: 'Oct 2024', risk: 7.8, confidence: 87, uncertainty: 1.3 },
    { month: 'Jan 2025', risk: 6.8, confidence: 82, uncertainty: 1.8 },
    { month: 'Apr 2025', risk: 7.9, confidence: 78, uncertainty: 2.2 },
    { month: 'Jul 2025', risk: 9.1, confidence: 75, uncertainty: 2.5 },
    { month: 'Oct 2025', risk: 8.4, confidence: 77, uncertainty: 2.3 },
    { month: 'Jan 2026', risk: 7.2, confidence: 73, uncertainty: 2.7 },
    { month: 'Apr 2026', risk: 8.3, confidence: 70, uncertainty: 3.0 }
  ];

  const modelAccuracy = [
    { model: 'Ensemble', accuracy: 94.2, rmse: 0.68, mae: 0.52 },
    { model: 'Climate AI', accuracy: 91.8, rmse: 0.74, mae: 0.58 },
    { model: 'Statistical', accuracy: 87.3, rmse: 0.89, mae: 0.71 },
    { model: 'ML Hybrid', accuracy: 89.6, rmse: 0.81, mae: 0.63 }
  ];

  const uncertaintyFactors = [
    { factor: 'Climate Model Variability', impact: 'High', weight: 35 },
    { factor: 'Socioeconomic Scenarios', impact: 'Medium', weight: 25 },
    { factor: 'Infrastructure Changes', impact: 'Medium', weight: 20 },
    { factor: 'Policy Interventions', impact: 'Low', weight: 15 },
    { factor: 'Technological Adaptation', impact: 'Low', weight: 5 }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Model Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Predictive Modeling</h2>
          <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
            Run Forecast
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Select
            label="Prediction Model"
            options={modelOptions}
            value={selectedModel}
            onChange={setSelectedModel}
          />
          <Select
            label="Time Horizon"
            options={timeHorizonOptions}
            value={timeHorizon}
            onChange={setTimeHorizon}
          />
        </div>

        {/* Risk Forecast Chart */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Risk Forecast with Uncertainty Bands</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={[0, 10]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Model Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-success">94.2%</div>
            <div className="text-xs text-muted-foreground">Ensemble model performance</div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Confidence Level</span>
            </div>
            <div className="text-2xl font-bold text-primary">82%</div>
            <div className="text-xs text-muted-foreground">Average forecast confidence</div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">Uncertainty Range</span>
            </div>
            <div className="text-2xl font-bold text-warning">±2.1</div>
            <div className="text-xs text-muted-foreground">Risk score variance</div>
          </div>
        </div>
      </div>
      {/* Model Performance Comparison */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Model Performance Comparison</h3>
        <div className="space-y-3">
          {modelAccuracy?.map((model, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  model?.model === 'Ensemble' ? 'bg-success' : 
                  model?.model === 'Climate AI' ? 'bg-primary' : 
                  model?.model === 'Statistical' ? 'bg-warning' : 'bg-accent'
                }`}></div>
                <span className="text-sm font-medium text-foreground">{model?.model}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                  <div className="text-sm font-semibold text-foreground">{model?.accuracy}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">RMSE</div>
                  <div className="text-sm font-semibold text-foreground">{model?.rmse}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">MAE</div>
                  <div className="text-sm font-semibold text-foreground">{model?.mae}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Uncertainty Quantification */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Uncertainty Quantification</h3>
        <div className="space-y-3">
          {uncertaintyFactors?.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{factor?.factor}</span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-background/50 ${getImpactColor(factor?.impact)}`}>
                    {factor?.impact}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${factor?.weight}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{factor?.weight}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">Methodology Transparency</div>
              <p className="text-xs text-muted-foreground mt-1">
                Uncertainty estimates incorporate model ensemble spread, observational constraints, 
                and expert judgment. Confidence intervals represent 90% prediction bounds based on 
                historical validation performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveModeling;