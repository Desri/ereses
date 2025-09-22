import { useEffect, useState } from "react";
import Image from "next/image";
import { Dapil } from "@/types/dapil";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import "./style.css";
import FilterAspirasiComponent from "./filter";
import {
  deleteKategoriAspirasi,
  getKategoriAspirasi,
} from "@/services/api/aspirasi";

export default function DashboardAspirasiComponent() {
  const [categoryAspirasi, setCategoryAspirasi] = useState<Dapil>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectDapil, setSelectDapil] = useState<
    { name: string; id: number } | undefined
  >(undefined);

  useEffect(() => {
    fetchListKategoriAspirasi();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchListKategoriAspirasi = () => {
    getKategoriAspirasi()
      .then((res: any) => {
        setCategoryAspirasi(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const closeDialogEdit = () => {
    setIsOpenEdit(false);
  };

  const handleClick = (item: any) => {
    setIsOpen(true);
    setSelectDapil(item);
  };

  const showPopupEdit = (item: any) => {
    setIsOpenEdit(true);
    setSelectDapil(item);
    setValue("name", item.name);
  };

  const handleDelete = (id: number) => {
    deleteKategoriAspirasi({ id })
      .then((res: any) => {
        fetchListKategoriAspirasi();
        setIsOpen(false);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const onSubmit = (data: any) => {
    // const payload = {
    //   name: data.name,
    //   kecamatan: selectedItems
    // };
    // postDapil({ payload })
    // .then((res: any) => {
    //   if(res.status === 201) {
    //     router.push('/dashboard/dapil');
    //   }
    // })
    // .catch((err: any) => {
    //   console.log('Error', err)
    // })
  };
  return (
    <div className="bg-white">
      <div className="font-bold mb-3.5">Kategori Aspirasi</div>
      <FilterAspirasiComponent />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className="font-medium">No</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Kategori</span>
            </TableHead>

            <TableHead className="text-right">
              <span className="font-medium mr-1.5">Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryAspirasi?.items?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <div className="dropdown float-right mr-1 cursor-pointer">
                  <Image
                    src="/assets/dots.png"
                    className="!relative !w-[5px] !h-[16px] float-right mr-4"
                    fill
                    priority
                    alt="Printer"
                  />
                  <div className="dropdown-content right-0 absolute bg-transparent hidden">
                    <div className="box-shadows bg-white mt-[21px]">
                      <a href="#" onClick={() => showPopupEdit(item)}>
                        Edit
                      </a>
                      <a href="#" onClick={() => handleClick(item)}>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogPortal>
          <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
            <DialogTitle className="DialogTitle">
              <h2 className="text-lg">Edit Kategori Aspirasi</h2>
            </DialogTitle>
            <div className="DialogDescription">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-sm text-sm">Kategori Aspirasi</label>
                <Input
                  type="text"
                  placeholder="Masukkan kategori aspirasi"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("name", {
                    required: "Kategori aspirasi is required",
                  })}
                />
                <div className="mx-auto flex">
                  <div className="mt-5 text-center flex items-center gap-x-3 mx-auto">
                    <div
                      className="cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-white border border-[#2F5673] text-[#2F5673]"
                      onClick={() => closeDialogEdit()}
                    >
                      Batal
                    </div>
                    <Button
                      variant="default"
                      type="submit"
                      className="!block cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-[#2F5673] text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
            <DialogTitle className="DialogTitle">
              <Image
                src="/assets/x.png"
                className="!relative !w-[90px] mx-auto"
                fill
                priority
                alt="Printer"
              />
            </DialogTitle>
            <div className="DialogDescription text-center">
              <h3 className="text-lg">
                Anda yakin ingin Menghapus <br /> &quot;
                <span className="text-[#D39C55]">{selectDapil?.name}</span>
                &quot;
              </h3>
            </div>
            <div className="mt-5 flex items-center gap-x-3 mx-auto">
              <div
                className="cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-white border border-[#2F5673] text-[#2F5673]"
                onClick={() => closeDialog()}
              >
                Batal
              </div>
              <div
                className="cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-[#2F5673] text-white"
                onClick={() =>
                  selectDapil?.id !== undefined && handleDelete(selectDapil.id)
                }
              >
                Ya
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
