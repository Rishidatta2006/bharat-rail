
import React from 'react';
import { TrainFront } from 'lucide-react';

export type TrainType = 'rajdhani' | 'shatabdi' | 'vande-bharat' | 'default';

interface TrainIconProps {
  trainType?: TrainType;
  trainName?: string;
  className?: string;
  size?: number;
}

/**
 * Component to display a consistent train icon/image based on train type
 */
const TrainIcons: React.FC<TrainIconProps> = ({ 
  trainType = 'default', 
  trainName = '', 
  className = '', 
  size = 24 
}) => {
  // Determine train type from name if not explicitly provided
  const determineTrainType = (): TrainType => {
    if (trainType !== 'default') return trainType;
    
    const nameLower = trainName.toLowerCase();
    if (nameLower.includes('rajdhani')) return 'rajdhani';
    if (nameLower.includes('shatabdi')) return 'shatabdi';
    if (nameLower.includes('vande bharat')) return 'vande-bharat';
    return 'default';
  };
  
  const type = determineTrainType();
  
  // Color schemes for different train types
  const colorScheme = {
    'rajdhani': {
      primary: '#D32F2F',
      secondary: '#FFCDD2'
    },
    'shatabdi': {
      primary: '#1976D2',
      secondary: '#BBDEFB'
    },
    'vande-bharat': {
      primary: '#388E3C',
      secondary: '#C8E6C9'
    },
    'default': {
      primary: '#616161',
      secondary: '#E0E0E0'
    }
  };
  
  const colors = colorScheme[type];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-md"
        style={{ 
          backgroundColor: colors.secondary,
          width: size * 2,
          height: size * 2
        }}
      >
        <TrainFront 
          size={size} 
          color={colors.primary} 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};

export default TrainIcons;
