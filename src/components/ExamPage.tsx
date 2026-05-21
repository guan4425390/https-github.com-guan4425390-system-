import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import { JointIcon } from './JointIcon';

const EXAM_DURATION = 300; 

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

export const ExamPage: React.FC<Props> = ({ state, updateState }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - state.examStartTime!) / 1000);
    return Math.max(0, EXAM_DURATION - elapsed);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.examStartTime!) / 1000);
      const remaining = Math.max(0, EXAM_DURATION - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleEndExam();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [state.examStartTime]);

  const handleEndExam = () => {
    updateState({
      examEndTime: Date.now(),
      currentPage: 'welcome'
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center mt-2 h-full">
      <h2 className="text-[22px] font-bold text-[#1F2937] tracking-wide">考试进行中</h2>
      <p className="text-[#6B7280] text-[13px] mt-1.5 font-medium">请完成关节活动度评估</p>

      <div className="w-full bg-[#F3F4F6] rounded-[24px] p-8 mt-10 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-7 relative overflow-hidden">
        {/* Subtle decorative background for exam card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="relative z-10 w-full">
          <p className="text-[#6B7280] text-[13px] mb-1.5 font-medium">考生姓名</p>
          <p className="text-xl font-bold text-[#1F2937] tracking-wide">{state.studentName}</p>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <p className="text-[#6B7280] text-[13px] mb-2.5 font-medium">考试关节</p>
          <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-2.5 rounded-[14px] flex items-center justify-center gap-2.5 font-bold shadow-md shadow-green-200/50">
            <JointIcon name={state.currentJoint || ''} size={20} />
            {state.currentJoint}
          </div>
        </div>

        <div className="relative z-10 w-full">
          <p className="text-[#6B7280] text-[13px] mb-1 font-medium">抽取时间</p>
          <p className="text-[15px] font-semibold text-[#1F2937] opacity-90">{formatDate(state.extractedTime || Date.now())}</p>
        </div>

        <div className="pt-6 border-t border-gray-200/80 w-full relative z-10">
          <p className="text-[#6B7280] text-[13px] mb-2 font-medium">剩余时间</p>
          <p className="text-[44px] leading-none font-black text-[#2563EB] tracking-wider tabular-nums drop-shadow-sm font-sans">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-10 w-full">
        <button
          className="w-full bg-[#F3F4F6] text-[#4B5563] rounded-[16px] py-4 font-bold text-lg shadow-sm border border-gray-200 active:scale-[0.98] transition-transform"
          onClick={handleEndExam}
        >
          结束考试
        </button>
      </div>
    </div>
  );
};
