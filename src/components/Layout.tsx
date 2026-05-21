import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans w-full selection:bg-[#5151E5] selection:text-white">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl flex flex-col relative overflow-hidden sm:rounded-[24px] sm:my-6 sm:min-h-[800px] sm:h-[800px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5151E5] to-[#9333EA] pt-14 pb-5 px-4 text-center shrink-0 rounded-t-[16px] z-10 shadow-sm border-b border-white/10">
             <h1 className="text-white text-[22px] font-bold tracking-widest leading-none">关节活动度考试系统</h1>
             <p className="text-white/90 text-[13px] mt-2 opacity-90 tracking-wide font-medium">六大关节随机抽题</p>
          </div>
          
          <div className="flex-1 overflow-y-auto px-5 py-6 bg-white flex flex-col w-full relative scrollbar-hide">
             {children}
          </div>
      </div>
    </div>
  );
};
