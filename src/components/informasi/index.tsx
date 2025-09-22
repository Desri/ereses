import { useEffect, useState } from "react";
import CardNewsComponent from "../card/cardNews";
import { News } from "@/types/news";
import { getNews } from "@/services/api/news";

export default function InformasiComponent() {
  const [news, setNews] = useState<News>();

  useEffect(() => {
    fetchListNews();
  }, []);

  const fetchListNews = () => {
    getNews("9")
      .then((res: any) => {
        setNews(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Informasi</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-7">
          {news?.items?.map((item, idx) => (
            <CardNewsComponent
              key={idx}
              title={item.title}
              classes="h-[255px]"
              class_title="leading-4 text-sm sm:text-base"
              date={item.date}
              is_bisnis_category={item.categoryArticle.name}
              img_url={item.imageUrl}
              slug={item.id}
            />
          ))}
        </div>
      </div>

      {/* <div className="py-12 bg-[#e8eff6]">
        <div className="max-w-screen-xl scontainer mx-auto px-4 sm:px-0">
          <h3 className="font-bold text-[#2F5673] text-2xl sm:text-3xl">
            Berita Lainnya
          </h3>
          <div className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {news?.items?.map((item, idx) => (
                <CardNewsComponent
                  key={idx}
                  title={item.title}
                  class_title="leading-6 sm:leading-base text-lg sm:text-xl"
                  classes="h-[355px]"
                  date={item.date}
                  is_bisnis_category={item.category}
                  img_url="/assets/news.png"
                  slug={item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
