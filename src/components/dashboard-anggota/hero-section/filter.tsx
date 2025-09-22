"use client";
import Link from 'next/link';

export default function FilterHeroSectionComponent() {
  return (
    <>
      <div className='flex justify-end mb-8'>
        <Link href="/dashboard/hero-sections/edit-hero" className='!bg-[#2f5673] mt-1 w-max block h-[37px] leading-[37px] px-5 text-sm rounded-3xl text-white'>
          Edit Hero Section
        </Link>
      </div>
    </>
  );
}
