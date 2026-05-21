import React from 'react';
import { CheckCircle2, Folder } from 'lucide-react';
import { AppState } from '../types';
import { JointIcon } from './JointIcon';

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

export const ConfirmedPage: React.FC<Props> = ({ state, updateState }) => {
  return (
    <div className="flex flex-col items-center mt-2 h-full">
      <div className="w-[84px] h-[84px] bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-5 shadow-sm border border-green-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-400/20 blur-xl animate-pulse"></div>
        <CheckCircle2 size={44} strokeWidth={2} className="relative z-10" />
      </div>
      <h2 className="text-[22px] font-bold text-[#1F2937] tracking-wide">考试题目已确定</h2>

      <div className="w-full bg-[#F3F4F6] rounded-[20px] p-5 mt-8 space-y-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center px-1">
          <span className="text-[#6B7280] font-medium text-[15px]">考生姓名</span>
          <span className="text-[#1F2937] font-bold text-lg">{state.studentName}</span>
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-[#6B7280] font-medium text-[15px]">考试关节</span>
          <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-4 py-2 rounded-[14px] flex items-center gap-2.5 font-bold shadow-md shadow-green-200/50">
            <JointIcon name={state.currentJoint || ''} size={18} />
            {state.currentJoint}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#EFF6FF] rounded-[20px] p-5 mt-4 border border-blue-100/50 flex gap-4 shadow-sm">
        <div className="text-blue-500 shrink-0 mt-0.5">
          <Folder size={24} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[#1F2937] font-bold text-[15px] mb-2 tracking-wide">评估说明</h3>
          <p className="text-[#4B5563] text-[13px] mb-2.5 leading-relaxed">
            每个关节的活动类型都应从以下五个方面说明：
          </p>
          <ul className="text-[#4B5563] text-[13px] list-disc pl-4 space-y-1.5 marker:text-blue-400">
            <li>固定臂</li>
            <li>移动臂</li>
            <li>中心点</li>
            <li>患者体位</li>
            <li>观察面</li>
          </ul>
        </div>
      </div>

      <p className="text-[#6B7280] text-[13px] mt-8 mb-6 text-center px-4 font-medium leading-relaxed">
        请根据抽中的关节进行活动度评估，祝您考试顺利！
      </p>

      <div className="mt-auto w-full pt-4">
        <button
          className="w-full bg-gradient-to-r from-[#5151E5] to-[#9333EA] text-white rounded-[16px] py-4 font-bold text-lg shadow-md active:scale-[0.98] transition-transform"
          onClick={() => {
            updateState({
              examStartTime: Date.now(),
              currentPage: 'exam'
            });
          }}
        >
          开始考试
        </button>
      </div>
    </div>
  );
};
