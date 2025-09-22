import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import CardNewsComponent from "../card/cardNews";
import CardDapilComponent from "../card/cardDapil";
import { getNews } from "@/services/api/news";
import { News } from "@/types/news";
import { getDapil, getDapilTotal } from "@/services/api/dapil";
import { Dapil } from "@/types/dapil";

const LeafletMap = dynamic(() => import("../map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[650px] bg-gray-200 animate-pulse rounded-lg"></div>
  ),
});

export default function HomePageComponent() {
  const [news, setNews] = useState<News>();
  const [dapil, setDapil] = useState<Dapil>();

  useEffect(() => {
    fetchListNews();
    fetchListDapil();
    fetchDapilTotal();
  }, []);

  const fetchListNews = () => {
    getNews("6")
      .then((res: any) => {
        setNews(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };
  const fetchListDapil = () => {
    getDapil()
      .then((res: any) => {
        setDapil(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const fetchDapilTotal = () => {
    getDapilTotal()
      .then((res: any) => {
        // setDapil(res.data);
        console.log("Check", res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto sm:flex items-center gap-x-6 mt-16 px-4 sm:px-0">
        <div className="sm:w-7/12">
          <h1 className="text-2xl sm:text-5xl font-bold mb-5 text-[#2F5673]">
            <span className="text-[#D39C55]">SELAMAT DATANG</span> DI WEBSITE
            RESMI <span className="text-[#D39C55]">E-RESES DPRD PALI</span>
          </h1>
          <p className="text-[#2F5673] font-bold text-lg">
            Sampaikan Aspirasi Anda dengan Mudah dan Cepat!!
          </p>
          <p className="text-[#473D3D] text-lg">
            E-Reses DPRD PALI adalah platform digital untuk masyarakat
            mengajukan aspirasi secara langsung kepada DPRD Kabupaten PALI. Mari
            bersama wujudkan pembangunan yang lebih baik!
          </p>
        </div>
        <div className="hidden sm:block w-5/12">
          <Image
            src="/assets/banner.png"
            width={550}
            height={180}
            alt="Banner"
          />
        </div>
      </div>

      <div className="bg-[#f8f8f8] py-12 mt-12">
        <h3 className="font-bold text-[#2F5673] text-2xl sm:text-3xl text-center">
          Anggota Dewan Perwakilan Rakyat Daerah PALI
        </h3>
        <div className="pt-8 max-w-screen-xl mx-auto px-4">
          <LeafletMap className="h-[650px] w-full" />
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-0">
          <h3 className="font-bold text-[#2F5673] text-2xl sm:text-3xl text-center">
            Berikut Daftar Dapil DRPD PALI
          </h3>
          <div className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
              {dapil?.items?.map((item, idx) => (
                <CardDapilComponent
                  key={idx}
                  id={item.id}
                  region=""
                  dapil={item.name}
                  btnDapil={`Anggota Dapil`}
                  is_background_image={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-[#e8eff6]">
        <div className="max-w-screen-xl scontainer mx-auto px-4 sm:px-0">
          <h3 className="font-bold text-[#2F5673] text-2xl sm:text-3xl">
            Berita Terkini
          </h3>
          <div className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {news?.items?.map((item, idx) =>
                item.slug != null ? (
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
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
