import React, { useState } from 'react';
import { Info, User } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

export const WelcomePage: React.FC<Props> = ({ state, updateState }) => {
  const [name, setName] = useState(state.studentName || '');
  
  const isDoneToday = state.confirmed;
  
  const handleStart = () => {
    if (isDoneToday) {
      alert('今日抽取次数已用完，请明日再试');
      return;
    }
    updateState({ studentName: name.trim(), currentPage: 'draw' });
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-[#5151E5] mb-5 mt-2">
        <User size={36} strokeWidth={2} />
      </div>
      <h2 className="text-2xl font-bold text-[#1F2937]">欢迎参加考试</h2>
      <p className="text-[#6B7280] text-sm mt-1">请输入您的姓名开始</p>

      <div className="w-full bg-[#FFFBEB] rounded-[16px] p-4 flex gap-3 shadow-sm border border-yellow-200/60 mt-8">
        <Info className="text-orange-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-[#1F2937] font-bold text-sm mb-1.5">系统规则说明</h3>
          <ul className="text-[13px] text-[#6B7280] space-y-1 list-disc pl-4 leading-relaxed">
            <li>每人同一设备，无论更改多少次名字，每天仅限抽取三次</li>
            <li>题目必须于当天抽取，每日限抽三次</li>
            <li>改名不影响抽取次数</li>
            <li>一旦选定并确认题目，即不可再次抽取</li>
          </ul>
        </div>
      </div>

      <div className="w-full mt-8 flex flex-col gap-2">
        <label className="text-[#1F2937] font-semibold text-sm px-1">考生姓名</label>
        <input
          className="w-full bg-white border border-gray-200 rounded-[16px] px-4 py-4 text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#5151E5]/40 shadow-sm transition-all text-base placeholder:text-gray-400 font-medium"
          placeholder="请输入姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isDoneToday}
        />
      </div>

      <div className="mt-auto w-full pt-10">
        <button
          className="w-full bg-gradient-to-r from-[#5151E5] to-[#9333EA] text-white rounded-[16px] py-4 font-bold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-[0.98] active:shadow-sm"
          disabled={!name.trim() || isDoneToday}
          onClick={handleStart}
        >
          {isDoneToday ? '今日已完成' : '开始考试'}
        </button>
        <p className="text-center text-[12px] text-gray-400 mt-5 font-mono">
          设备ID: {state.deviceId.substring(0, 16)}...
        </p>
      </div>
    </div>
  );
};
