import React from 'react';
import { Accessibility, Hand, Activity, Footprints, HandMetal, PersonStanding } from 'lucide-react';

export const JointIcon = ({ name, size = 24 }: { name: string, size?: number }) => {
  switch (name) {
    case '肩关节': return <Accessibility size={size} strokeWidth={2} />;
    case '肘关节': return <HandMetal size={size} strokeWidth={2} />;
    case '腕关节': return <Hand size={size} strokeWidth={2} />;
    case '髋关节': return <PersonStanding size={size} strokeWidth={2} />;
    case '膝关节': return <Activity size={size} strokeWidth={2} />;
    case '踝关节': return <Footprints size={size} strokeWidth={2} />;
    default: return <Activity size={size} strokeWidth={2} />;
  }
};
