import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const CardNewsComponent = ({
  title,
  class_title,
  classes,
  date,
  is_bisnis_category,
  img_url,
  slug,
}: {
  title?: string;
  class_title?: string;
  classes?: string;
  date?: string;
  is_bisnis_category?: string;
  img_url?: any;
  slug?: number;
}) => {
  return (
    <>
      <div
        className={`relative group overflow-hidden ${classes ? classes : ""}`}
      >
        <img
          src={img_url}
          className="!relative !w-full !h-full rounded-md"
          alt="News"
        />

        {/* Category Badge - Animasi dari atas */}
        <div className="absolute top-4 right-4 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="text-xs font-bold text-white bg-[#2F5673] rounded-2xl w-max px-3.5 py-2 shadow-lg">
            {is_bisnis_category}
          </div>
        </div>

        <div className="absolute top-0 w-full h-full">
          <Image
            src="/assets/shadow.png"
            className="!relative !w-full !h-full"
            fill
            priority
            alt="News"
          />
          <div className="absolute bottom-0 text-white p-3 sm:p-4 w-full">
            {/* Tanggal dan Judul - naik ke atas saat hover untuk beri ruang tombol */}
            <div className="transform transition-all duration-500 mb-[-30px] group-hover:-translate-y-11">
              <div className="mb-1 flex gap-x-1.5 items-center">
                <Image
                  src="/assets/calendar.png"
                  className="!relative !w-[18px] !h-[18px]"
                  fill
                  priority
                  alt="News"
                />
                <span className="text-xs font-extralight">
                  {formatDate(date ?? "", "dd MMMM yyyy")}
                </span>
              </div>
              <h2
                className={`font-medium !text-lg ${class_title ? class_title : ""}`}
              >
                {title}
              </h2>
            </div>

            {/* Button - Animasi dari bawah */}
            <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
              <div className="px-3 sm:px-4 py-1 bg-white rounded-2xl w-max shadow-lg hover:bg-gray-100 transition-colors duration-200">
                <Link
                  href={`/informasi/${slug}`}
                  className="text-sm text-[#2F5673] font-medium"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay untuk efek hover yang lebih halus */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></div>
      </div>
    </>
  );
};

export default CardNewsComponent;
