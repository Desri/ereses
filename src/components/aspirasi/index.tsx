"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Dapil } from "@/types/dapil";
import { useForm } from "react-hook-form";
import { getDapil } from "@/services/api/dapil";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { aspirasiSchema } from "@/schema/aspirasiSchema";
import {
  getDetailDistricts,
  getDetailVillages,
  getKategoriAspirasi,
  postAspirasi,
} from "@/services/api/aspirasi";
import { Upload, FileText } from "lucide-react";
import { useAuthStore } from "@/store/profileStore";
import { getlistAkunAnggota } from "@/services/api/anggota";
import { Anggota } from "@/types/anggota";
import { useRouter } from "next/navigation";
import { showSuccessToast } from "@/utils/toast";

type AspirasiInput = z.infer<typeof aspirasiSchema>;
type ImagePreview = {
  id: number;
  file: File;
  preview: string | ArrayBuffer | null;
};

export default function AspirasiComponent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AspirasiInput>({
    resolver: zodResolver(aspirasiSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const [listDapil, setListDapil] = useState<Dapil>();
  const [categoryAspirasi, setCategoryAspirasi] = useState<Dapil>();
  const [listAnggota, setListAnggota] = useState<Anggota>();
  const [listDistricts, setListDistricts] = useState([]);
  const [listVillages, setListVillages] = useState([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [kelurahan, setKelurahan] = useState("");
  const [anggotaSelected, setAnggotaSelected] = useState("");

  useEffect(() => {
    fetchListDapil();
    fetchListCategoryAspiration();
    fetchAnggotaDpr();
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
    if (user?.phone) {
      setValue("phone", user.phone);
    }
  }, [user?.name, user?.phone, setValue]);

  const fetchAnggotaDpr = () => {
    getlistAkunAnggota()
      .then((res: any) => {
        setListAnggota(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const fetchDistricts = () => {
    getDetailDistricts()
      .then((res: any) => {
        setListDistricts(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const handleSelectKecamatan = (value: string) => {
    getDetailVillages({ id: value })
      .then((res) => {
        setListVillages(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleSelectAnggota = (value: string) => {
    setAnggotaSelected(value);
  };

  const handleSelectKelurahan = (value: string) => {
    setKelurahan(value);
  };

  const fetchListDapil = () => {
    getDapil()
      .then((res: any) => {
        setListDapil(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const fetchListCategoryAspiration = () => {
    getKategoriAspirasi()
      .then((res: any) => {
        setCategoryAspirasi(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const validateFile = (file: any, type: any) => {
    const maxSize = 30 * 1024 * 1024; // 30MB
    if (file.size > maxSize) {
      return "File size must be less than 30MB";
    }
    if (type === "image") {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        return "Only JPG and PNG files are allowed";
      }
    } else if (type === "document") {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        return "Only PDF and WORD files are allowed";
      }
    }
    return null;
  };

  const handleImageUpload = (event: any) => {
    const files = Array.from(event.target.files) as File[];
    if (!files.length) return;

    const validFiles: File[] = [];
    const validPreviews: ImagePreview[] = [];
    let hasError = false;

    files.forEach((file) => {
      const error = validateFile(file, "image");
      if (error) {
        // setErrors(prev => ({ ...prev, image: error }));
        hasError = true;
        return;
      }

      validFiles.push(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          validPreviews.push({
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
          });
        }

        // Update previews when all files are processed
        if (validPreviews.length === validFiles.length) {
          setImagePreviews((prev) => [...prev, ...validPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (!hasError) {
      // setErrors(prev => ({ ...prev, image: null }));
      setImageFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleDocumentUpload = (event: any) => {
    const files = Array.from(event.target.files) as File[];
    if (!files.length) return;

    const validFiles: File[] = [];
    let hasError = false;

    files.forEach((file) => {
      const error = validateFile(file, "document");
      if (error) {
        hasError = true;
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setDocumentFiles((prev) => [...prev, ...validFiles]);
    }

    // Clear the input
    event.target.value = "";
  };

  const removeImage = (indexToRemove: any) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    // setErrors(prev => ({ ...prev, image: null }));
  };

  const removeAllImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
    // setErrors(prev => ({ ...prev, image: null }));
  };

  const removeDocument = (indexToRemove: any) => {
    setDocumentFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const removeAllDocuments = () => {
    setDocumentFiles([]);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Create FormData object
  //   const submitData = new FormData();

  //   // Add form fields
  //   Object.keys(formData).forEach(key => {
  //     submitData.append(key, formData[key]);
  //   });

  //   // Add files
  //   if (imageFile) {
  //     submitData.append('image', imageFile);
  //   }
  //   if (documentFile) {
  //     submitData.append('document', documentFile);
  //   }

  //   console.log("Form Data:", {
  //     ...formData,
  //     imageFile: imageFile ? imageFile.name : null,
  //     documentFile: documentFile ? documentFile.name : null
  //   });

  //   // Here you would typically send the submitData to your API
  //   // Example: await fetch('/api/aspirasi', { method: 'POST', body: submitData });
  // };

  // const handleInputChange = (field, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  const onSubmit = (data: any) => {
    const payload = {
      address: data.address,
      anggota: anggotaSelected,
      categoryAspirationId: data.categoryAspirationId,
      dapilId: data.dapilId,
      description: data.description,
      ktp: data.ktp,
      name: data.name,
      phone: data.phone,
      proposal: data.proposal,
      image: imagePreviews,
      dokumen: documentFiles,
      subDistrict: data.subDistrict,
      village: kelurahan,
      district: "1612",
      regency: "16",
    };

    postAspirasi({ payload })
      .then((res) => {
        console.log("CHECK", res.message);
        if (res.message === "Success") {
          showSuccessToast("Create Aspiration sukses!");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Aspirasi</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className="border-2 border-solid border-[#dddddd] p-5 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="nama-lengkap" className="text-sm">
                Nama Lengkap <em className="text-[#ff0000] not-italic">*</em>
              </label>
              <Input
                type="text"
                placeholder="Masukkan Nama Lengkap"
                className="bg-white rounded-2xl py-2 mt-1"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="no-ktp" className="text-sm">
                No KTP <em className="text-[#ff0000] not-italic">*</em>
              </label>
              <Input
                type="text"
                placeholder="Masukkan NO KTP"
                className="bg-white rounded-2xl py-2 mt-1"
                {...register("ktp")}
              />
              {errors.ktp && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.ktp.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="no-hp" className="text-sm">
                No HP <em className="text-[#ff0000] not-italic">*</em>
              </label>
              <Input
                type="text"
                placeholder="Masukkan NO HP"
                className="bg-white rounded-2xl py-2 mt-1"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6">
              <div>
                <div className="mb-4">
                  <label htmlFor="kecamatan" className="text-sm">
                    Kecamatan <em className="text-[#ff0000] not-italic">*</em>
                  </label>
                  <select
                    className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 px-2"
                    {...register("subDistrict", {
                      onChange: (e) => handleSelectKecamatan(e.target.value),
                    })}
                  >
                    <option value="">Pilih Kategori Kecamatan</option>
                    {listDistricts?.map((item) => (
                      <option key={item.id} value={item.full_code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.kecamatan && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.kecamatan.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="kelurahan" className="text-sm">
                    Kelurahan <em className="text-[#ff0000] not-italic">*</em>
                  </label>
                  <select
                    className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 px-2"
                    {...register("village", {
                      onChange: (e) => handleSelectKelurahan(e.target.value),
                    })}
                  >
                    <option value="">Pilih Kategori Kelurahan</option>
                    {listVillages?.map((item) => (
                      <option key={item.id} value={item.full_code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.kelurahan && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.kelurahan.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="uraian-permasalahan" className="text-sm">
                Alamat <em className="text-[#ff0000] not-italic">*</em>
              </label>
              <Textarea
                rows={6}
                placeholder="Masukkan Alamat"
                className="bg-white rounded-2xl py-2 mt-1"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="bg-[#2F5673] p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6">
                <div>
                  <div className="mb-4">
                    <label htmlFor="dapil" className="text-sm text-white">
                      Dapil <em className="text-[#ff0000] not-italic">*</em>
                    </label>
                    <select
                      className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 px-2"
                      {...register("dapilId")}
                    >
                      <option value="">Pilih Kategori Dapil</option>
                      {listDapil?.items?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.dapilId && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.dapilId.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="anggota-dewan"
                      className="text-sm text-white"
                    >
                      Anggota Dewan{" "}
                      <em className="text-[#ff0000] not-italic">*</em>
                    </label>
                    <select
                      className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 px-2"
                      {...register("anggota", {
                        onChange: (e) => handleSelectAnggota(e.target.value),
                      })}
                    >
                      <option value="">Pilih Anggota Dewan</option>
                      {listAnggota?.items?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.anggota && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.anggota.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryAspirationId"
                  className="text-sm text-white"
                >
                  Kategori Aspirasi{" "}
                  <em className="text-[#ff0000] not-italic">*</em>
                </label>
                <select
                  className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 px-2"
                  {...register("categoryAspirationId")}
                >
                  <option value="">Pilih Kategori Aspirasi</option>
                  {categoryAspirasi?.items?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.categoryAspirationId && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.categoryAspirationId.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="usulan" className="text-sm text-white">
                  Usulan <em className="text-[#ff0000] not-italic">*</em>
                </label>
                <Input
                  type="text"
                  placeholder="Masukkan Usulan"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("proposal")}
                />
                {errors.proposal && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.proposal.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="uraian-permasalahan"
                  className="text-sm text-white"
                >
                  Uraian Permasalahan{" "}
                  <em className="text-[#ff0000] not-italic">*</em>
                </label>
                <Textarea
                  rows={6}
                  placeholder="Masukkan Uraian Permasalahan"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6">
                <div>
                  <label htmlFor="tambah-foto" className="text-sm text-white">
                    Tambah Foto <em className="text-[#ff0000] not-italic">*</em>
                  </label>
                  <div className="text-center mt-0.5 relative">
                    <div className="text-center relative">
                      <div className="border-2 border-dotted border-[#dddddd] text-[#8d8d8d] px-4 py-1.5 text-xs w-full rounded-[6px] h-[170px] bg-[#f7f7f7] flex flex-col items-center justify-center hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                        <Upload size={24} className="mb-2" />
                        <p className="mb-1">JPG or PNG</p>
                        <span className="text-xs">(Max 30 Mb)</span>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageUpload}
                        className="w-full absolute mx-auto left-0 top-0 opacity-0 h-full cursor-pointer"
                      />
                      <div className="flex items-center gap-x-3">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index + 1}
                            className="mt-2 relative border-2 border-solid border-[#dddddd] rounded-[6px] h-[95px] w-[95px] bg-white overflow-hidden"
                          >
                            <img
                              src={preview.preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute w-[19px] h-[19px] text-[8px] top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="document-upload"
                    className="text-sm text-white"
                  >
                    Tambah File <em className="text-[#ff0000] not-italic">*</em>
                  </label>
                  <div className="text-center relative">
                    <div className="relative">
                      <div className="border-2 border-dotted border-[#dddddd] text-[#8d8d8d] px-4 py-1.5 text-xs w-full rounded-[6px] h-[170px] bg-[#f7f7f7] flex flex-col items-center justify-center hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                        <Upload size={24} className="mb-2" />
                        <p className="mb-1">PDF or WORD</p>
                        <span className="text-xs">(Max 30 Mb)</span>
                      </div>
                      <input
                        id="document-upload"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleDocumentUpload}
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    {documentFiles.length > 0 && (
                      <div className="mt-2 relative">
                        <div className="flex items-center gap-x-3">
                          {documentFiles.map((file, index) => (
                            <div
                              key={`doc-${index}`}
                              className="rounded-[6px] h-[95px] w-[95px] p-3 border relative"
                            >
                              <>
                                <FileText
                                  size={20}
                                  className="text-blue-400 mb-2.5 mx-auto"
                                />
                                <div>
                                  <p className="text-xs text-white font-medium truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="absolute w-[19px] h-[19px] text-[8px] top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="default"
                type="submit"
                className="!bg-[#2F5673] w-40 mt-12 px-6 rounded-2xl text-white"
              >
                Ajukan Aspirasi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
