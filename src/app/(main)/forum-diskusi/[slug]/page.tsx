"use client";
import { useParams } from "next/navigation";
import ForumDiskusiComponent from "@/components/forum-diskusi";

export default function ForumDiskusi() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="main-page">
      <ForumDiskusiComponent slug={slug} />
    </div>
  );
}
