import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Overview',
      path: '/global-disaster-overview',
      icon: 'Globe',
      tooltip: 'Global disaster monitoring and real-time situational awareness'
    },
    {
      label: 'Infrastructure',
      path: '/infrastructure-impact',
      icon: 'Building2',
      tooltip: 'Critical asset analysis and cascading failure assessment'
    },
    {
      label: 'Population',
      path: '/population-displacement',
      icon: 'Users',
      tooltip: 'Displacement tracking and humanitarian resource coordination'
    },
    {
      label: 'Risk Assessment',
      path: '/risk-assessment-hub',
      icon: 'AlertTriangle',
      tooltip: 'Predictive modeling and comparative analysis'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation bg-background border-b border-border shadow-elevation-2">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/global-disaster-overview" className="flex items-center space-x-3 transition-smooth hover:opacity-80">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Shield" size={24} color="var(--color-primary-foreground)" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">CIF-AI</span>
              <span className="text-xs text-muted-foreground">Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={16} 
                color={isActivePath(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
              />
              <span>{item?.label}</span>
              {isActivePath(item?.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Global Filters - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
              Filters
            </Button>
            <Button variant="outline" size="sm" iconName="Clock" iconPosition="left">
              Last 24h
            </Button>
          </div>

          {/* Live Alerts Indicator */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full pulse-urgent">
                <span className="sr-only">3 active alerts</span>
              </span>
            </Button>
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <Button variant="ghost" size="sm" iconName="User" iconPosition="left">
              <span className="hidden sm:inline">Emergency Coord.</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-3">
          <nav className="px-4 py-3 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  color={isActivePath(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
                />
                <div className="flex flex-col">
                  <span>{item?.label}</span>
                  <span className="text-xs text-muted-foreground">{item?.tooltip}</span>
                </div>
              </Link>
            ))}
            
            {/* Mobile Filters */}
            <div className="pt-3 mt-3 border-t border-border space-y-2">
              <Button variant="outline" size="sm" fullWidth iconName="Filter" iconPosition="left">
                Global Filters
              </Button>
              <Button variant="outline" size="sm" fullWidth iconName="Clock" iconPosition="left">
                Time Range: Last 24h
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;