import { useEffect, useState } from "react";
import CardAnggotaComponent from "../card/cardAnggota";
import { getlistAnggota } from "@/services/api/anggota";
import { Anggota } from "@/types/anggota";

export default function AnggotaDprdComponent() {
  const [listAnggota, setListAnggota] = useState<Anggota>();

  useEffect(() => {
    fetchAnggotaDpr();
  }, []);

  const fetchAnggotaDpr = () => {
    getlistAnggota()
      .then((res: any) => {
        setListAnggota(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Anggota DPRD</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-7">
          {listAnggota?.items?.map((item, idx) => (
            <CardAnggotaComponent
              key={idx}
              name={item.name}
              fraksi={item.fraksi?.name}
              slug={
                item.userDPRDHistory?.length > 0
                  ? `${item.userDPRDHistory[0].levelSlug}/${item.slug}`
                  : (item.slug ?? "")
              }
              img_url={item.imageUrl ?? "/assets/dpr-no.webp"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
