import React from 'react';
import { CustomManufacturing } from '../components/CustomManufacturing';

export const MachineryPage: React.FC = () => {
  return (
    <div className="bg-[#02060D] min-h-screen">
      <div className="bg-[#02060D] py-20 px-4 text-center mt-[50px] pl-[17px]">
        <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter">
          Heavy <span className="text-[#FFB800]">Machinery</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
          Advanced Solutions for Earthmoving and Industrial Fleets
        </p>
      </div>
      <CustomManufacturing onSelectMachinery={() => {}} />
    </div>
  );
};
