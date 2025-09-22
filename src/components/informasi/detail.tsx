import { getDetailNews } from "@/services/api/news";
import { NewsDetail } from "@/types/news";
import { formatDate } from "date-fns";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailInformasiComponent() {
  const [detailNews, setDetailNews] = useState<NewsDetail>();

  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    fetchDetailNews();
  }, []);

  const fetchDetailNews = () => {
    getDetailNews(id)
      .then((res: any) => {
        setDetailNews(res.data.article);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Detail Informasi</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-12 sm:mt-14 mb-12 px-4 sm:px-0">
        <img
          src={detailNews?.imageUrl}
          className="!relative !w-full !h-[250px] sm:!h-[650px] rounded-lg"
          alt="Fauzan Hamid"
        />
        <div className="flex items-center gap-x-3 mt-6">
          <div>
            <div className="text-xs font-bold text-white bg-[#2F5673] rounded-2xl w-max px-3.5 py-2">
              {detailNews?.categoryArticle.name}
            </div>
          </div>
          <div>
            <div className="flex gap-x-1.5 items-center">
              <Image
                src="/assets/calendar-blue.png"
                className="!relative !w-[18px] !h-[18px]"
                fill
                priority
                alt="News"
              />
              <span className="text-sm text-[#2F5673]">
                {detailNews?.date
                  ? formatDate(detailNews.date, "dd MMMM yyyy")
                  : "-"}
              </span>
            </div>
          </div>
        </div>
        <h1 className="text-2xl text-[#473D3D] font-bold my-5">
          {detailNews?.title}
        </h1>
        <p
          className="text-[#473D3D] mb-3"
          dangerouslySetInnerHTML={{ __html: detailNews?.description || "" }}
        />
      </div>
    </>
  );
}
