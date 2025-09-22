"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterAnggotaComponent from "./filter";
import { deleteUser } from "@/services/api/masyarakat";
import { putFraksi } from "@/services/api/fraksi";
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
import { getlistAkunAnggota } from "@/services/api/anggota";

export default function DashboardKelolaAkunAnggotaComponent() {
  const [akunAnggota, setAkunAnggota] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectUser, setSelectUser] = useState<
    { name: string; id: number } | undefined
  >(undefined);

  useEffect(() => {
    fetchListAnggota();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchListAnggota = () => {
    getlistAkunAnggota()
      .then((res: any) => {
        setAkunAnggota(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const handleToggle = (id: any) => {
    setAkunAnggota((prev) => {
      if (!prev?.items) return prev;

      return {
        ...prev,
        items: prev.items.map((user) =>
          user.id === id
            ? { ...user, isActive: !user.isActive }
            : user
        ),
      };
    });
    console.log("Check Ids", id);
  };

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

  const closeDialog = () => {
    setIsOpen(false);
  };

  const closeDialogEdit = () => {
    setIsOpenEdit(false);
  };

  const handleClick = (item: any) => {
    setIsOpen(true);
    setSelectUser(item);
  };

  const showPopupEdit = (item: any) => {
    setIsOpenEdit(true);
    setSelectUser(item);
    setValue("name", item.name);
  };

  const handleDelete = (id: number) => {
    deleteUser({ id })
      .then((res: any) => {
        fetchListAnggota();
        setIsOpen(false);
        const toast = document.getElementById("toast");
        if (toast) {
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      id: selectUser?.id,
    };
    putFraksi({ payload })
      .then((res: any) => {
        if (res.message === "Success") {
          fetchListAnggota();
          setIsOpenEdit(false);
        }
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  };
  return (
    <>
      <div
        id="toast"
        className="toast text-sm fixed bg-[#4ade80] text-white top-[20px] right-[20px] hidden"
      >
        Berhasil menghapus akun
      </div>
      <div className="bg-white">
        <div className="font-bold mb-3.5">Kelola Akun Anggota</div>
        <FilterAnggotaComponent />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <span className="font-medium">No</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Nama Anggota</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Email</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Dapil</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Jenis Kelamin</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Kecamatan</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Status</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="font-medium mr-1.5">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {akunAnggota?.items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-3.5">{idx + 1}</TableCell>
                <TableCell className="py-3.5">{item.name}</TableCell>
                <TableCell className="py-3.5">{item.email}</TableCell>
                <TableCell className="py-3.5">{item.dapil?.name}</TableCell>
                <TableCell>{getGender(item.gender)}</TableCell>
                <TableCell className="py-3.5">-</TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center">
                    <label
                      htmlFor={item.name}
                      className="relative inline-block w-12 h-5 cursor-pointer"
                    >
                      <input
                        id={item.name}
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isActive}
                        onChange={() => handleToggle(item.id)}
                      />
                      <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
                      <span className="absolute top-0.5 left-[6px] w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6" />
                    </label>
                  </div>
                </TableCell>
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
                        <a
                          href={`/dashboard/kelola-akun-anggota/edit/${item.id}`}
                        >
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
                <h2 className="text-lg">Edit Fraksi</h2>
              </DialogTitle>
              <div className="DialogDescription">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="text-sm text-sm">Fraksi</label>
                  <Input
                    type="text"
                    placeholder="Masukkan Nama Fraksi"
                    className="bg-white rounded-2xl py-2 mt-1 mb-4"
                    {...register("name", { required: "Fraksi is required" })}
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
                  <span className="text-[#D39C55]">{selectUser?.name}</span>
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
                    selectUser?.id !== undefined && handleDelete(selectUser.id)
                  }
                >
                  Ya
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </>
  );
}
