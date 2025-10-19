import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineSlider = () => {
  const [currentTimeIndex, setCurrentTimeIndex] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const timelineData = [
    { date: '2024-10-12', label: 'Oct 12', displaced: 45000, events: ['Initial evacuation orders'] },
    { date: '2024-10-13', label: 'Oct 13', displaced: 78000, events: ['Mass displacement begins'] },
    { date: '2024-10-14', label: 'Oct 14', displaced: 125000, events: ['Emergency shelters opened'] },
    { date: '2024-10-15', label: 'Oct 15', displaced: 189000, events: ['International aid arrives'] },
    { date: '2024-10-16', label: 'Oct 16', displaced: 234000, events: ['Additional shelter capacity'] },
    { date: '2024-10-17', label: 'Oct 17', displaced: 298000, events: ['Peak displacement reached'] },
    { date: '2024-10-18', label: 'Today', displaced: 326000, events: ['Current situation'] },
    { date: '2024-10-19', label: 'Oct 19', displaced: 340000, events: ['Projected increase'], projected: true },
    { date: '2024-10-20', label: 'Oct 20', displaced: 355000, events: ['Forecast'], projected: true }
  ];

  const currentData = timelineData?.[currentTimeIndex];

  const handleTimeChange = (index) => {
    setCurrentTimeIndex(index);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = () => {
    const speeds = [0.5, 1, 2, 4];
    const currentIndex = speeds?.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds?.length;
    setPlaybackSpeed(speeds?.[nextIndex]);
  };

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTimeIndex((prev) => {
          if (prev >= timelineData?.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed, timelineData?.length]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Displacement Timeline Analysis</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayback}
            iconName={isPlaying ? 'Pause' : 'Play'}
            iconPosition="left"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={changeSpeed}
          >
            {playbackSpeed}x
          </Button>
        </div>
      </div>
      {/* Current Data Display */}
      <div className="mb-6 p-4 bg-muted/20 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-foreground">
              {currentData?.label}
              {currentData?.projected && (
                <span className="ml-2 text-sm text-warning font-normal">(Projected)</span>
              )}
            </h4>
            <p className="text-sm text-muted-foreground">{currentData?.date}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {currentData?.displaced?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Displaced Persons</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {currentData?.events?.map((event, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name="Circle" size={8} color="var(--color-primary)" />
              <span className="text-muted-foreground">{event}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Timeline Slider */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={timelineData?.length - 1}
            value={currentTimeIndex}
            onChange={(e) => handleTimeChange(parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(currentTimeIndex / (timelineData?.length - 1)) * 100}%, var(--color-muted) ${(currentTimeIndex / (timelineData?.length - 1)) * 100}%, var(--color-muted) 100%)`
            }}
          />
          
          {/* Timeline Markers */}
          <div className="flex justify-between mt-2">
            {timelineData?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleTimeChange(index)}
                className={`flex flex-col items-center space-y-1 text-xs transition-smooth ${
                  index === currentTimeIndex
                    ? 'text-primary'
                    : item?.projected
                    ? 'text-warning' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-smooth ${
                    index === currentTimeIndex
                      ? 'bg-primary border-primary'
                      : item?.projected
                      ? 'bg-warning border-warning' :'bg-muted border-muted-foreground'
                  }`}
                />
                <span className="whitespace-nowrap">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Displacement Trend Chart */}
        <div className="h-24 bg-muted/10 rounded-lg p-3">
          <div className="flex items-end justify-between h-full space-x-1">
            {timelineData?.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col justify-end"
              >
                <div
                  className={`w-full rounded-t transition-smooth ${
                    index === currentTimeIndex
                      ? 'bg-primary'
                      : item?.projected
                      ? 'bg-warning' :'bg-muted-foreground'
                  } ${index <= currentTimeIndex ? 'opacity-100' : 'opacity-30'}`}
                  style={{
                    height: `${(item?.displaced / Math.max(...timelineData?.map(d => d?.displaced))) * 100}%`,
                    minHeight: '4px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Modeling Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Historical Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Projected</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Timeline
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSlider;