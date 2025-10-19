import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveGlobe = ({ selectedLocation, onLocationSelect }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [layersVisible, setLayersVisible] = useState({
    population: true,
    infrastructure: true,
    hazards: true,
    satellite: true,
    grid: true,
    atmosphere: true,
    dayNight: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [dayNightRotation, setDayNightRotation] = useState(0);
  const globeRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const transitionRef = useRef(null);
  const dayNightAnimationRef = useRef(null);

  // Enhanced disaster hotspots with more detailed data
  const disasterHotspots = [
    {
      id: 'uae-floods',
      lat: 25.2048,
      lng: 55.2708,
      severity: 'critical',
      type: 'flood',
      magnitude: 8.5,
      affectedPopulation: 1250000,
      infrastructureAtRisk: 4,
      title: 'United Arab Emirates',
      name: 'UAE',
      country: 'United Arab Emirates',
      events: 3,
      displaced: '1,250',
      lastUpdate: '2 min ago',
      description: 'Severe flooding affecting multiple emirates with infrastructure damage'
    },
    {
      id: 'manila-earthquake',
      lat: 14.5995,
      lng: 120.9842,
      severity: 'critical',
      type: 'earthquake',
      magnitude: 7.2,
      affectedPopulation: 2400000,
      infrastructureAtRisk: 8,
      title: 'Manila Earthquake Zone',
      name: 'Manila',
      country: 'Philippines',
      events: 5,
      displaced: '2,400',
      lastUpdate: '5 min ago',
      description: 'Major seismic activity with aftershocks continuing'
    },
    {
      id: 'dubai-infrastructure',
      lat: 25.0760,
      lng: 55.0750,
      severity: 'high',
      type: 'infrastructure',
      magnitude: 6.8,
      affectedPopulation: 850000,
      infrastructureAtRisk: 6,
      title: 'Dubai Infrastructure Risk',
      name: 'Dubai',
      country: 'United Arab Emirates',
      events: 2,
      displaced: '850',
      lastUpdate: '8 min ago',
      description: 'Critical infrastructure monitoring for flood damage'
    },
    {
      id: 'cebu-cyclone',
      lat: 10.3157,
      lng: 123.8854,
      severity: 'high',
      type: 'cyclone',
      magnitude: 4,
      affectedPopulation: 1200000,
      infrastructureAtRisk: 5,
      title: 'Cebu Cyclone Path',
      name: 'Cebu',
      country: 'Philippines',
      events: 3,
      displaced: '1,200',
      lastUpdate: '12 min ago',
      description: 'Tropical cyclone approaching with high winds'
    },
    {
      id: 'riyadh-wildfire',
      lat: 24.7136,
      lng: 46.6753,
      severity: 'medium',
      type: 'wildfire',
      magnitude: 6.2,
      affectedPopulation: 450000,
      infrastructureAtRisk: 3,
      title: 'Riyadh Desert Fire',
      name: 'Riyadh',
      country: 'Saudi Arabia',
      events: 2,
      displaced: '450',
      lastUpdate: '15 min ago',
      description: 'Desert wildfire with moderate containment efforts'
    },
    {
      id: 'jakarta-drought',
      lat: -6.2088,
      lng: 106.8456,
      severity: 'medium',
      type: 'drought',
      magnitude: 5.1,
      affectedPopulation: 3200000,
      infrastructureAtRisk: 7,
      title: 'Jakarta Water Crisis',
      name: 'Jakarta',
      country: 'Indonesia',
      events: 1,
      displaced: '3,200',
      lastUpdate: '1 hour ago',
      description: 'Extended drought conditions affecting water supply'
    }
  ];

  useEffect(() => {
    // Simulate realistic globe initialization with terrain loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Day-night animation effect
  useEffect(() => {
    if (layersVisible?.dayNight) {
      dayNightAnimationRef.current = setInterval(() => {
        setDayNightRotation(prev => (prev + 0.3) % 360);
      }, 100);
    } else {
      if (dayNightAnimationRef?.current) {
        clearInterval(dayNightAnimationRef?.current);
      }
    }

    return () => {
      if (dayNightAnimationRef?.current) {
        clearInterval(dayNightAnimationRef?.current);
      }
    };
  }, [layersVisible?.dayNight]);

  // Enhanced location coordinates mapping with more locations
  const getLocationCoordinates = (location) => {
    const coordinates = {
      // Cities
      'dubai': { lat: 25.2048, lng: 55.2708, zoom: 4.5, tilt: 35 },
      'abu-dhabi': { lat: 24.4539, lng: 54.3773, zoom: 4.5, tilt: 35 },
      'riyadh': { lat: 24.7136, lng: 46.6753, zoom: 4.0, tilt: 35 },
      'jeddah': { lat: 21.4858, lng: 39.1925, zoom: 4.0, tilt: 35 },
      'manila': { lat: 14.5995, lng: 120.9842, zoom: 4.2, tilt: 35 },
      'cebu': { lat: 10.3157, lng: 123.8854, zoom: 4.5, tilt: 35 },
      'jakarta': { lat: -6.2088, lng: 106.8456, zoom: 4.0, tilt: 35 },
      'surabaya': { lat: -7.2575, lng: 112.7521, zoom: 4.5, tilt: 35 },
      
      // Countries
      'uae': { lat: 24.5, lng: 54.5, zoom: 3.0, tilt: 30 },
      'united arab emirates': { lat: 24.5, lng: 54.5, zoom: 3.0, tilt: 30 },
      'saudi': { lat: 24.0, lng: 45.0, zoom: 2.5, tilt: 25 },
      'saudi arabia': { lat: 24.0, lng: 45.0, zoom: 2.5, tilt: 25 },
      'philippines': { lat: 12.8797, lng: 121.7740, zoom: 2.8, tilt: 30 },
      'indonesia': { lat: -2.5489, lng: 118.0149, zoom: 2.2, tilt: 25 },
      
      // Regions
      'middle-east': { lat: 29.0, lng: 47.0, zoom: 1.8, tilt: 20 },
      'asia-pacific': { lat: 15.0, lng: 120.0, zoom: 1.5, tilt: 20 },
      'southeast-asia': { lat: 10.0, lng: 110.0, zoom: 1.8, tilt: 25 },
      
      // Global
      'global': { lat: 15.0, lng: 0.0, zoom: 1.0, tilt: 15 }
    };

    const locationKey = location?.id || location?.name?.toLowerCase() || location?.country?.toLowerCase();
    return coordinates?.[locationKey] || { lat: 0, lng: 0, zoom: 1.0, tilt: 15 };
  };

  // Enhanced smooth camera transition with tilt support
  const flyToLocation = (location) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const coords = getLocationCoordinates(location);
    
    // Clear existing transition
    if (transitionRef?.current) {
      clearInterval(transitionRef?.current);
    }
    
    const startRotation = { ...rotation };
    const startZoom = zoomLevel;
    const targetRotation = { 
      x: -(coords?.tilt || 35), // Apply tilt for better viewing angle
      y: -coords?.lng * 0.8 // Enhanced longitude conversion
    };
    const targetZoom = coords?.zoom;
    
    const duration = 2000; // 2 seconds for smooth transition
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    transitionRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Quadratic ease-out for smooth natural motion
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      // Interpolate rotation with smooth curves
      const newRotation = {
        x: startRotation?.x + (targetRotation?.x - startRotation?.x) * easedProgress,
        y: startRotation?.y + (targetRotation?.y - startRotation?.y) * easedProgress
      };
      
      // Interpolate zoom with acceleration
      const newZoom = startZoom + (targetZoom - startZoom) * easedProgress;
      
      setRotation(newRotation);
      setZoomLevel(newZoom);
      
      if (currentStep >= steps) {
        clearInterval(transitionRef?.current);
        setIsTransitioning(false);
        
        // After transition, calculate popup position if node selected
        if (location && globeRef?.current) {
          const nodePosition = projectToScreen(
            location?.lat || coords?.lat, 
            location?.lng || coords?.lng
          );
          if (nodePosition?.visible) {
            const rect = globeRef?.current?.getBoundingClientRect();
            const safeX = Math.min(rect?.width - 280, Math.max(20, (nodePosition?.x / 100) * rect?.width + 15));
            const safeY = Math.max(60, (nodePosition?.y / 100) * rect?.height - 40);
            
            setPopupPosition({ x: safeX, y: safeY });
            setSelectedNode(location);
          }
        }
      }
    }, stepDuration);
  };

  // Watch for location selection changes
  useEffect(() => {
    if (selectedLocation && !isDragging) {
      flyToLocation(selectedLocation);
    }
  }, [selectedLocation]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#D32F2F'; // Red with stronger presence
      case 'high': return '#F57C00';     // Orange
      case 'medium': return '#FBC02D';   // Yellow
      case 'low': return '#388E3C';      // Green
      default: return '#64748B';
    }
  };

  const getSeverityGlow = (severity) => {
    switch (severity) {
      case 'critical': return '#FF1744';
      case 'high': return '#FF9800';
      case 'medium': return '#FFEB3B';
      case 'low': return '#4CAF50';
      default: return '#607D8B';
    }
  };

  const handleMouseDown = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    dragStart.current = { x: e?.clientX, y: e?.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isTransitioning) return;
    
    const deltaX = e?.clientX - dragStart?.current?.x;
    const deltaY = e?.clientY - dragStart?.current?.y;
    
    setRotation(prev => ({
      x: Math.max(-80, Math.min(80, prev?.x + deltaY * 0.3)), // Increased rotation range
      y: prev?.y + deltaX * 0.5
    }));
    
    dragStart.current = { x: e?.clientX, y: e?.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction) => {
    if (isTransitioning) return;
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev * 1.3 : prev / 1.3;
      return Math.max(0.4, Math.min(8, newZoom)); // Increased zoom range
    });
  };

  const toggleLayer = (layerName) => {
    setLayersVisible(prev => ({
      ...prev,
      [layerName]: !prev?.[layerName]
    }));
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedNode(hotspot);
    flyToLocation(hotspot);
    onLocationSelect?.(hotspot);
  };

  const closePopup = () => {
    setSelectedNode(null);
  };

  // Handle outside click to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedNode && !event?.target?.closest('.popup-container')) {
        closePopup();
      }
    };

    const handleEscKey = (event) => {
      if (event?.key === 'Escape' && selectedNode) {
        closePopup();
      }
    };

    document?.addEventListener('mousedown', handleClickOutside);
    document?.addEventListener('keydown', handleEscKey);

    return () => {
      document?.removeEventListener('mousedown', handleClickOutside);
      document?.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedNode]);

  // Enhanced lat/lng to screen position projection
  const projectToScreen = (lat, lng) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    
    // Apply rotation transformations
    const rotX = rotation?.x * (Math.PI / 180);
    const rotY = rotation?.y * (Math.PI / 180);
    
    // Rotate around Y axis (longitude)
    const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
    const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
    
    // Rotate around X axis (latitude)
    const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
    
    // Enhanced projection with proper scaling
    const scale = 200 * zoomLevel;
    const screenX = 50 + (x1 * scale / 400) * 100;
    const screenY = 50 - (y2 * scale / 400) * 100;
    
    return { 
      x: Math.max(0, Math.min(100, screenX)), 
      y: Math.max(0, Math.min(100, screenY)), 
      visible: z2 > 0.1 // Enhanced visibility threshold
    };
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-2 border-2 border-blue-300 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          </div>
          <p className="text-slate-200 text-lg font-semibold">Initializing Google Earth-Style Globe</p>
          <p className="text-slate-400 text-sm mt-2">Loading satellite imagery, terrain elevation & atmospheric data...</p>
          <div className="mt-6 bg-slate-700 rounded-full h-2 w-80 mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full animate-pulse transition-all duration-1000" style={{ width: '85%' }} />
          </div>
          <p className="text-slate-500 text-xs mt-3">Rendering photorealistic Earth surface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black rounded-lg overflow-hidden">
      {/* Enhanced Starfield background with depth */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(150)]?.map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Globe Container */}
      <div
        ref={globeRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Photorealistic 3D Globe */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
          style={{
            transform: `rotateX(${rotation?.x}deg) rotateY(${rotation?.y}deg) scale(${zoomLevel})`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Enhanced Globe Base with Google Earth-style textures */}
          <div className="relative w-96 h-96 rounded-full overflow-hidden" style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.25) 0%, transparent 35%),
              conic-gradient(from 45deg at 50% 50%, 
                #0B132B 0deg, 
                #1E3A5F 45deg, 
                #22543D 90deg, 
                #2D5016 135deg, 
                #8B4513 180deg, 
                #1E3A5F 225deg, 
                #0F172A 270deg, 
                #0B132B 315deg, 
                #0B132B 360deg),
              radial-gradient(ellipse 80% 60% at 50% 50%, 
                #1D3557 15%, 
                #0F172A 60%, 
                #020617 85%)
            `,
            boxShadow: `
              inset -50px -50px 100px rgba(0,0,0,0.8),
              inset 50px 50px 100px rgba(59, 130, 246, 0.15),
              inset 0 0 200px rgba(16, 185, 129, 0.1),
              0 30px 80px rgba(0,0,0,0.6),
              0 0 200px rgba(37, 99, 235, 0.1)
            `
          }}>
            
            {/* Enhanced Atmospheric Glow with realistic rim lighting */}
            {layersVisible?.atmosphere && (
              <>
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 82%, rgba(37, 99, 235, 0.3) 90%, rgba(59, 130, 246, 0.5) 95%, rgba(147, 197, 253, 0.7) 100%)',
                    filter: 'blur(3px)'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.2) 85%, transparent 95%)',
                    filter: 'blur(1px)',
                    animationDuration: '4s'
                  }}
                />
              </>
            )}
            
            {/* More detailed continent shapes with realistic geography */}
            <div className="absolute inset-0 rounded-full opacity-90">
              <svg className="w-full h-full" viewBox="0 0 400 400" style={{ 
                filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 10px rgba(34, 197, 94, 0.2))'
              }}>
                {/* North America with more detail */}
                <path d="M70 110 Q85 95 95 100 Q110 85 130 95 Q155 90 175 105 Q195 115 200 140 Q205 160 190 175 Q175 190 155 185 Q135 180 115 175 Q95 170 80 155 Q65 140 70 125 Q68 115 70 110" 
                      fill="#22C55E" opacity="0.85" />
                
                {/* Greenland */}
                <path d="M140 60 Q155 55 165 65 Q170 75 165 85 Q155 90 145 85 Q135 80 135 70 Q135 60 140 60" 
                      fill="#F0FDF4" opacity="0.9" />
                
                {/* Europe */}
                <path d="M180 130 Q190 125 200 128 Q210 130 220 135 Q230 140 235 150 Q240 160 235 170 Q230 180 220 175 Q210 170 200 168 Q190 165 185 155 Q180 145 180 135 Q178 130 180 130" 
                      fill="#16A34A" opacity="0.85" />
                
                {/* Africa */}
                <path d="M190 180 Q200 175 210 180 Q220 185 225 200 Q230 220 225 240 Q220 255 210 260 Q200 265 190 260 Q180 255 178 240 Q175 220 180 200 Q185 185 190 180" 
                      fill="#15803D" opacity="0.8" />
                
                {/* Asia with more realistic shape */}
                <path d="M240 110 Q270 95 290 100 Q315 105 335 115 Q350 125 355 140 Q360 155 350 170 Q340 185 320 180 Q300 175 285 170 Q270 165 260 155 Q250 145 245 130 Q240 120 240 110" 
                      fill="#15803D" opacity="0.85" />
                
                {/* Middle East */}
                <path d="M220 155 Q235 150 245 155 Q255 160 260 170 Q265 180 260 190 Q255 200 245 195 Q235 190 230 180 Q225 170 220 160 Q218 155 220 155" 
                      fill="#22C55E" opacity="0.8" />
                
                {/* Indian Subcontinent */}
                <path d="M280 180 Q290 175 300 180 Q310 185 315 195 Q320 210 315 220 Q310 230 300 225 Q290 220 285 210 Q280 200 280 190 Q278 180 280 180" 
                      fill="#16A34A" opacity="0.8" />
                
                {/* Southeast Asia & Indonesia */}
                <path d="M320 200 Q335 195 350 200 Q365 205 370 215 Q375 225 370 235 Q365 245 350 240 Q335 235 330 225 Q325 215 320 205 Q318 200 320 200" 
                      fill="#22C55E" opacity="0.8" />
                
                {/* Australia */}
                <path d="M310 260 Q325 255 340 260 Q350 265 355 275 Q360 285 355 295 Q350 305 340 300 Q325 295 320 285 Q315 275 310 265 Q308 260 310 260" 
                      fill="#16A34A" opacity="0.8" />
                
                {/* Japan */}
                <path d="M350 140 Q355 135 360 140 Q365 145 365 155 Q360 165 355 160 Q350 155 348 150 Q348 145 350 140" 
                      fill="#15803D" opacity="0.8" />
                
                {/* South America with Amazon basin */}
                <path d="M110 200 Q130 190 150 195 Q170 200 175 220 Q180 245 175 270 Q170 295 150 305 Q130 310 115 305 Q100 300 98 275 Q95 250 100 225 Q105 210 110 200" 
                      fill="#22C55E" opacity="0.85" />
                
                {/* Antarctica */}
                <path d="M80 340 Q200 330 320 340 Q370 345 390 350 Q370 370 200 375 Q30 370 80 340" 
                      fill="#F0FDF4" opacity="0.95" />
              </svg>
            </div>
            
            {/* Enhanced Ocean depth gradients */}
            <div className="absolute inset-0 rounded-full" style={{
              background: `
                radial-gradient(ellipse 70% 50% at 25% 75%, rgba(15, 23, 42, 0.4) 0%, transparent 60%),
                radial-gradient(ellipse 50% 70% at 75% 25%, rgba(30, 58, 138, 0.3) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 60% 60%, rgba(29, 78, 216, 0.2) 0%, transparent 50%)
              `
            }} />
            
            {/* Mountain ranges and elevation highlighting */}
            <div className="absolute inset-0 rounded-full opacity-60">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                {/* Himalayas */}
                <path d="M280 150 Q290 145 295 150 Q300 155 295 160 Q290 165 285 160 Q280 155 280 150" 
                      fill="#8B5CF6" opacity="0.6" />
                {/* Andes */}
                <path d="M140 220 Q145 250 150 280 Q155 285 150 290 Q145 285 140 280 Q135 250 140 220" 
                      fill="#8B5CF6" opacity="0.6" />
                {/* Rocky Mountains */}
                <path d="M100 140 Q105 160 110 180 Q115 185 110 190 Q105 185 100 180 Q95 160 100 140" 
                      fill="#8B5CF6" opacity="0.6" />
              </svg>
            </div>
            
            {/* Enhanced Longitude/Latitude Grid */}
            {layersVisible?.grid && (
              <div className="absolute inset-0 rounded-full opacity-30">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Longitude lines with perspective */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8]?.map(i => (
                    <ellipse key={`lng-${i}`} cx="200" cy="200" rx={190 - i * 8} ry="190" 
                             fill="none" stroke="#475569" strokeWidth="0.5" opacity={0.8 - i * 0.08} />
                  ))}
                  {/* Latitude lines with curvature */}
                  {[0, 1, 2, 3, 4, 5, 6, 7]?.map(i => (
                    <ellipse key={`lat-${i}`} cx="200" cy="200" rx="190" ry={190 - i * 12} 
                             fill="none" stroke="#475569" strokeWidth="0.5" opacity={0.8 - i * 0.08} />
                  ))}
                  {/* Tropic lines */}
                  <ellipse cx="200" cy="200" rx="190" ry="150" fill="none" stroke="#64748B" strokeWidth="0.8" opacity="0.4" />
                  <ellipse cx="200" cy="200" rx="190" ry="120" fill="none" stroke="#64748B" strokeWidth="0.8" opacity="0.4" />
                </svg>
              </div>
            )}
            
            {/* Enhanced Disaster Hotspots with billboard effect */}
            {disasterHotspots?.map((hotspot) => {
              const position = projectToScreen(hotspot?.lat, hotspot?.lng);
              if (!position?.visible) return null;
              
              return (
                <div
                  key={hotspot?.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${position?.x}%`,
                    top: `${position?.y}%`,
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                >
                  <div className="relative">
                    {/* Outer pulse ring - enhanced visibility */}
                    <div 
                      className="absolute inset-0 w-12 h-12 rounded-full border-2 animate-ping opacity-60"
                      style={{ 
                        backgroundColor: getSeverityGlow(hotspot?.severity) + '20',
                        borderColor: getSeverityGlow(hotspot?.severity),
                        boxShadow: `0 0 20px ${getSeverityGlow(hotspot?.severity)}80`
                      }}
                    />
                    
                    {/* Middle ring */}
                    <div 
                      className="absolute inset-2 w-8 h-8 rounded-full border border-white animate-pulse opacity-75"
                      style={{ 
                        backgroundColor: getSeverityColor(hotspot?.severity) + '60',
                        boxShadow: `0 0 15px ${getSeverityColor(hotspot?.severity)}60`
                      }}
                    />
                    
                    {/* Main hotspot marker with enhanced glow */}
                    <div 
                      className="relative w-6 h-6 top-1 left-1 rounded-full border-2 border-white shadow-xl transition-all duration-300 hover:scale-150 hover:shadow-2xl"
                      style={{ 
                        backgroundColor: getSeverityColor(hotspot?.severity),
                        boxShadow: `
                          0 0 25px ${getSeverityGlow(hotspot?.severity)}90,
                          0 0 50px ${getSeverityGlow(hotspot?.severity)}50,
                          inset 0 0 10px rgba(255,255,255,0.3)
                        `
                      }}
                    >
                      {/* Emissive center dot */}
                      <div 
                        className="absolute inset-1 bg-white rounded-full animate-pulse shadow-inner"
                        style={{
                          boxShadow: `0 0 8px ${getSeverityGlow(hotspot?.severity)}FF`
                        }}
                      />
                      
                      {/* Severity type indicator */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border border-gray-300 flex items-center justify-center">
                        <div className="text-xs font-bold" style={{ color: getSeverityColor(hotspot?.severity) }}>
                          {hotspot?.type === 'earthquake' ? '🌊' : 
                           hotspot?.type === 'flood' ? '🌊' :
                           hotspot?.type === 'cyclone' ? '🌀' :
                           hotspot?.type === 'wildfire' ? '🔥' :
                           hotspot?.type === 'drought' ? '🏜️' : '⚠️'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-all duration-300 z-30 border border-slate-600 shadow-xl">
                      <div className="font-semibold text-blue-300">{hotspot?.title}</div>
                      <div className="text-slate-300">Severity: <span className="capitalize text-orange-300">{hotspot?.severity}</span></div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Enhanced Day/Night Terminator with realistic shading */}
            {layersVisible?.dayNight && (
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `linear-gradient(${135 + dayNightRotation}deg, 
                    transparent 40%, 
                    rgba(0,0,0,0.15) 47%, 
                    rgba(0,0,0,0.4) 50%, 
                    rgba(0,0,0,0.7) 53%, 
                    rgba(0,0,0,0.9) 60%, 
                    transparent 67%)`,
                  transition: 'background 0.1s ease-out'
                }}
              />
            )}
            
            {/* Surface lighting effects */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none opacity-40"
              style={{
                background: `
                  radial-gradient(ellipse 120% 80% at 35% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 80% 120% at 65% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
                `
              }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Anchored Pop-up */}
      {selectedNode && (
        <div 
          className="popup-container absolute z-40 transition-all duration-300 transform"
          style={{
            left: `${popupPosition?.x}px`,
            top: `${popupPosition?.y}px`,
          }}
        >
          <div className="relative bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg shadow-2xl min-w-72 max-w-80">
            {/* Pointer triangle */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-slate-800 transform rotate-45 border-r border-b border-slate-600" />
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-600">
              <div className="flex items-center space-x-2">
                <div className="text-lg">🌍</div>
                <h3 className="text-white font-bold text-base">{selectedNode?.country || selectedNode?.title}</h3>
              </div>
              <button 
                onClick={closePopup}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <div className="text-slate-400 text-xs uppercase tracking-wide">Active Events</div>
                  <div className="text-white font-semibold text-lg">{selectedNode?.events || 0}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <div className="text-slate-400 text-xs uppercase tracking-wide">People Displaced</div>
                  <div className="text-white font-semibold text-lg">
                    {selectedNode?.displaced || '0'} <span className="text-xs text-orange-300">(±15%)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-2">
                <div className="text-slate-400 text-xs uppercase tracking-wide">Infrastructure at Risk</div>
                <div className="text-white font-semibold">{selectedNode?.infrastructureAtRisk || 0} facilities</div>
              </div>
              
              <div className="border-t border-slate-600 pt-3">
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Last Update</div>
                <div className="text-blue-300 text-sm">{selectedNode?.lastUpdate || 'Just now'}</div>
              </div>
              
              {selectedNode?.description && (
                <div className="border-t border-slate-600 pt-3">
                  <div className="text-slate-300 text-xs leading-relaxed">{selectedNode?.description}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Control Panel with better positioning */}
      <div className="absolute top-4 right-4 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg p-3 space-y-3 shadow-xl">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleZoom('in')}
            disabled={isTransitioning}
            className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded transition-all duration-200 hover:scale-105 hover:shadow-lg"
            title="Zoom In"
          >
            <Icon name="Plus" size={16} color="white" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            disabled={isTransitioning}
            className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded transition-all duration-200 hover:scale-105 hover:shadow-lg"
            title="Zoom Out"
          >
            <Icon name="Minus" size={16} color="white" />
          </button>
        </div>
        
        {/* Enhanced Zoom Level Indicator */}
        <div className="text-center">
          <div className="text-xs text-slate-300 mb-1">Altitude</div>
          <div className="bg-slate-700 rounded-full h-2 w-16 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (zoomLevel / 8) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">{(zoomLevel * 1000)?.toFixed(0)}km</div>
        </div>
      </div>

      {/* Enhanced Layer Controls */}
      <div className="absolute bottom-4 left-4 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg p-4 shadow-xl">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center">
          <Icon name="Layers" size={14} color="rgb(226, 232, 240)" className="mr-2" />
          Display Layers
        </h3>
        <div className="space-y-2">
          {Object.entries(layersVisible)?.map(([layer, visible]) => (
            <label key={layer} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={visible}
                onChange={() => toggleLayer(layer)}
                className="w-3 h-3 rounded border-slate-500 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800 transition-all"
              />
              <span className="text-xs text-slate-300 capitalize group-hover:text-slate-200 transition-colors">
                {layer === 'dayNight' ? 'Day/Night Cycle' : layer}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Enhanced Legend with better visibility */}
      <div className="absolute bottom-4 right-4 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg p-4 shadow-xl">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center">
          <Icon name="AlertTriangle" size={14} color="rgb(226, 232, 240)" className="mr-2" />
          Threat Levels
        </h3>
        <div className="space-y-2">
          {['critical', 'high', 'medium', 'low']?.map((severity) => (
            <div key={severity} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border border-white shadow-lg transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: getSeverityColor(severity),
                  boxShadow: `0 0 12px ${getSeverityGlow(severity)}80`
                }}
              />
              <span className="text-xs text-slate-300 capitalize">{severity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Connection Status */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg px-3 py-2 shadow-xl">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg" style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }} />
        <span className="text-xs text-slate-200 font-medium">Live Satellite Feed</span>
        <div className="text-green-400 text-xs">●</div>
      </div>

      {/* Enhanced Transition indicator */}
      {isTransitioning && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg px-6 py-3 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-1 w-3 h-3 border border-blue-300 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
            <span className="text-sm text-slate-200 font-medium">Flying to location...</span>
          </div>
        </div>
      )}

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
            opacity: 0.8;
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
            opacity: 1;
          }
        }
        
        .popup-container {
          animation: fadeInScale 0.3s ease-out;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveGlobe;