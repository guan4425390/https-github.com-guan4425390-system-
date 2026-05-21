import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AppState, JOINTS } from '../types';
import { JointIcon } from './JointIcon';

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

export const DrawPage: React.FC<Props> = ({ state, updateState }) => {
  const [isRolling, setIsRolling] = useState(false);

  const drawRandomJoint = useCallback((increment: boolean = true) => {
    if (state.drawCount >= 3 && increment) return;
    
    setIsRolling(true);
    setTimeout(() => {
      const random = JOINTS[Math.floor(Math.random() * JOINTS.length)];
      updateState({
        currentJoint: random,
        drawCount: increment ? state.drawCount + 1 : state.drawCount
      });
      setIsRolling(false);
    }, 600);
  }, [state.drawCount, updateState]);

  useEffect(() => {
    if (state.drawCount === 0 && !state.currentJoint) {
      drawRandomJoint(true);
    }
  }, []);

  const handleConfirm = () => {
    updateState({
      confirmed: true,
      extractedTime: Date.now(),
      currentPage: 'confirmed'
    });
  };

  const handleRedraw = () => {
    drawRandomJoint(true);
  };

  return (
    <div className="flex flex-col items-center mt-4 h-full">
      <h2 className="text-2xl font-bold text-[#1F2937]">抽取考题</h2>
      <p className="text-[#6B7280] text-sm mt-1">
        第<span className="font-semibold text-[#5151E5]">{Math.max(1, state.drawCount)}</span>/3次抽取
      </p>

      <div className={`mt-12 bg-white border border-gray-100 shadow-xl rounded-[24px] p-8 flex flex-col items-center w-full max-w-[280px] transition-all duration-300 ${isRolling ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
        <div className="w-[100px] h-[100px] bg-green-50 text-green-600 rounded-[28px] flex items-center justify-center mb-6 shadow-inner">
          {isRolling ? (
             <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-200 border-t-green-600"></div>
          ) : (
            <JointIcon name={state.currentJoint || ''} size={50} />
          )}
        </div>
        <h3 className="text-[32px] font-black text-[#1F2937] tracking-wider">
          {isRolling ? '抽取中...' : (state.currentJoint || '???')}
        </h3>
        <p className="text-[#6B7280] text-[13px] mt-2 font-medium">当前抽中的关节</p>
      </div>

      <div className="mt-auto w-full space-y-4 pt-10">
        <button
          className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-[16px] py-4 font-bold text-lg shadow-md active:scale-[0.98] transition-transform flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRolling || !state.currentJoint}
          onClick={handleConfirm}
        >
          <CheckCircle2 size={24} strokeWidth={2.5} />
          确定选择
        </button>
        <button
          className="w-full bg-[#F3F4F6] text-[#4B5563] rounded-[16px] py-4 font-bold text-lg active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200/60 shadow-sm"
          disabled={isRolling || state.drawCount >= 3}
          onClick={handleRedraw}
        >
          放弃重抽
        </button>
      </div>
    </div>
  );
};
