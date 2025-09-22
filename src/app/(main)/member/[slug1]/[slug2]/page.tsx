"use client";
import ProfileAnggotaDprdComponent from "@/components/anggota-dprd/profile";

interface PageProps {
  params: {
    slug1: string;
    slug2: string;
  };
}

export default function ProfileAnggotaDrpd({ params }: PageProps) {
  return (
    <div className="main-page">
      <ProfileAnggotaDprdComponent slug1={params.slug1} slug2={params.slug2} />
    </div>
  );
}
