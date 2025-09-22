import Link from "next/link";

const CardAnggotaComponent = ({
  name,
  fraksi,
  slug,
  img_url,
}: {
  name?: any;
  fraksi?: string;
  slug?: string;
  img_url?: any;
}) => {
  return (
    <div>
      <div className="relative">
        <img
          src={img_url}
          className="!relative !w-full !h-[250px] sm:!h-[420px]"
          alt={name}
        />
        <div className="absolute bottom-6 w-full text-white text-center">
          <h2 className="font-bold text-xl">{name}</h2>
          <p className="font-extralight text-sm">{fraksi}</p>
          <div className="py-1.5 rounded-3xl w-3/5 mx-auto mt-6 bg-white hover:bg-[#2F5673] hover:text-white text-[#2F5673]">
            <Link href={`/member/${slug}`} className="block">
              Lihat Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardAnggotaComponent;
