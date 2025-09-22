import { Button } from "../../ui/button";

type Props = {
  user: any;
};

export default function DashboardProfileInformasiSummaryComponent({
  user,
}: Props) {
  const getGender = (status: string) => {
    switch (status) {
      case "Male":
        return "Laki-laki";
      case "Female":
        return "Perempuan";
      default:
        return "-";
    }
  };
  return (
    <div className="border border-solid border-[#dddddd] rounded-xl p-5">
      <div className="text-center">
        <img
          src={user?.imageUrl}
          className="!relative !w-[90px] !h-[90px] !mx-auto !mb-4 rounded-full"
          alt="Avatar"
        />
        <Button
          variant="default"
          type="submit"
          className="!bg-[#2f5673] w-40 mb-2 rounded-full text-white"
        >
          Upload foto baru
        </Button>
        <p className="text-xs text-[#2f5673]">JPG or PNG</p>
        <p className="text-xs text-[#2f5673]">(Max 450 x 450 px)</p>
      </div>
      <hr className="my-6" />
      <table>
        <tbody>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">Nama Lengkap</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">{user?.name}</td>
          </tr>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">NIP</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">-</td>
          </tr>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">Umur</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">
              {user?.dateOfBirth ? user.dateOfBirth : "-"}
            </td>
          </tr>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">Jenis Kelamin</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">{getGender(user?.gender)}</td>
          </tr>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">Dapil</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">{user?.dapil ? user.dapil : "-"}</td>
          </tr>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">Fraksi</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">{user?.fraksi ? user.fraksi : "-"}</td>
          </tr>
          <tr>
            <td className="pb-2.5">
              <span className="font-bold">Komisi</span>
            </td>
            <td className="px-1.5 pb-2.5">:</td>
            <td className="pb-2.5">{user?.komisi ? user.komisi : "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
