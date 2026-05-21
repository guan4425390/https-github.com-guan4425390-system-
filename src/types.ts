export interface AppState {
  deviceId: string;
  currentDate: string;
  drawCount: number;
  currentJoint: string | null;
  confirmed: boolean;
  studentName: string;
  extractedTime: number | null;
  examStartTime: number | null;
  examEndTime: number | null;
  currentPage: 'welcome' | 'draw' | 'confirmed' | 'exam';
}

export const JOINTS = [
  '肩关节',
  '肘关节',
  '腕关节',
  '髋关节',
  '膝关节',
  '踝关节'
];
