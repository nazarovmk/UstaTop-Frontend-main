// src/components/ElonJoylash.tsx
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  MdCampaign,
  MdOutlineManageAccounts,
  MdOutlineContactPhone,
} from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type Kategoriya = {
  key: string;
  label: string;
  icon?: React.ComponentType<any>;
};

const kategoriyalar: Kategoriya[] = [
  { key: "category.construction", label: "Qurilish va ta'mirlash" },
  { key: "category.electrical", label: "Elekterik va santexnika" },
  { key: "category.cooling", label: "Sovutish va isitish texnikasi" },
  { key: "category.camera", label: "Kamera" },
  { key: "category.furniture", label: "Mebel va interyer" },
  { key: "category.auto", label: "Avto xizmatlar" },
  { key: "category.garden", label: "Bog' xizmatlari" },
  { key: "category.tech", label: "Texnika va gadjetlar" },
];

const IMGBB_API_KEY = "949369692e037ce08b224819cc59c30d";

export default function ElonJoylash() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedKategoriya, setSelectedKategoriya] =
    useState<Kategoriya | null>(null);

  const [manzil, setManzil] = useState("");
  const [ism, setIsm] = useState("");
  const [murojaatVaqti, setMurojaatVaqti] = useState("");
  const [mutaxasislik, setMutaxasislik] = useState("");
  const [narx, setNarx] = useState("");
  const [yosh, setYosh] = useState("");
  const [tajriba, setTajriba] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");

  // Fayl list (File ob'ektlari) va preview (object URLs)
  const [fileList, setFileList] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fayl tanlash
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFileList((prev) => {
      const next = [...prev, ...files].slice(0, 3);
      return next;
    });
    // previewlarni yangilash
    const newPreviews = Array.from(e.target.files).map((f) =>
      URL.createObjectURL(f)
    );
    setPreviews((prev) => [...prev, ...newPreviews].slice(0, 3));
  };

  const removeImage = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
    // free object URL
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ImgBB ga file yuborish va URL olish (axios bilan)
  const uploadFileToImgbb = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Axios orqali ImgBB API ga so'rov
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data && res.data.data && res.data.data.url) {
        return res.data.data.url as string;
      } else {
        throw new Error("ImgBB: response missing url");
      }
    } catch (error: any) {
      console.error("Rasm yuklashda xato:", error);
      throw new Error(
        `ImgBB upload failed: ${error.response?.status || error.message}`
      );
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error(t("alert.loginRequired") || "Avval tizimga kiring");
      return;
    }

    // Basic validation
    if (
      !manzil.trim() ||
      !ism.trim() ||
      !murojaatVaqti.trim() ||
      !mutaxasislik.trim() ||
      !narx.trim() ||
      !yosh.trim() ||
      !tajriba.trim() ||
      !bio.trim() ||
      !phone.trim() ||
      !telegram.trim() ||
      !selectedKategoriya
    ) {
      toast.warning(
        t("alert.fillAllFields") || "Iltimos barcha maydonlarni to'ldiring"
      );
      return;
    }

    setUploading(true);
    try {
      // 1) Rasmlarni ImgBB ga yuklash (parallel yuklash)
      const uploadPromises = fileList.map((file) => uploadFileToImgbb(file));
      const urls = await Promise.all(uploadPromises);

      // 2) Firestore ga ma'lumot yozish
      const docData = {
        manzil,
        ism,
        murojaatVaqti,
        kategoriya: selectedKategoriya.label,
        mutaxasislik,
        narx,
        yosh,
        tajriba,
        bio,
        phone,
        telegram,
        rasmlar: urls,
        fayl_soni: urls.length,
        createdAt: new Date(),
        uid: currentUser.uid,
      };

      const ref = await addDoc(collection(db, "ustalar"), docData);
      console.log("Hujjat qo'shildi ID:", ref.id);
      toast.success(t("alert.success") || "Elon muvaffaqiyatli joylandi!");

      // form tozalash
      setManzil("");
      setIsm("");
      setMurojaatVaqti("");
      setMutaxasislik("");
      setNarx("");
      setYosh("");
      setTajriba("");
      setBio("");
      setPhone("");
      setTelegram("");
      setSelectedKategoriya(null);
      // revoke all previews
      previews.forEach((p) => URL.revokeObjectURL(p));
      setPreviews([]);
      setFileList([]);
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error("Xatolik: " + (err?.message || err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <h2 className="font-medium text-2xl text-[#0F172B] mb-8 flex items-center gap-2">
        <MdCampaign />
        {t("postAd.title") || "E'lon joylash"}
      </h2>

      <div className="bg-[#F8F9FA] rounded-2xl border border-[#AAB2BD] p-5 md:px-10 md:py-12">
        <h2 className="text-[#0F172B] text-xl mb-5 flex items-center gap-2">
          <MdOutlineManageAccounts />
          <span className="font-medium">
            {t("postAd.yourInfo.title") || "Siz haqingizda"}
          </span>
        </h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("postAd.yourInfo.address") || "Manzil"}
              </legend>
              <input
                type="text"
                value={manzil}
                onChange={(e) => setManzil(e.target.value)}
                className="input w-full max-w-[500px]"
                placeholder={
                  t("postAd.yourInfo.addressPlaceholder") || "Manzilingiz"
                }
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("postAd.yourInfo.fullName") || "To'liq ism"}
              </legend>
              <input
                type="text"
                value={ism}
                onChange={(e) => setIsm(e.target.value)}
                className="input w-full max-w-[500px]"
                placeholder={
                  t("postAd.yourInfo.fullNamePlaceholder") || "Ismingiz"
                }
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("postAd.yourInfo.contactTime") || "Murojaat vaqti"}
              </legend>
              <input
                type="text"
                value={murojaatVaqti}
                onChange={(e) => setMurojaatVaqti(e.target.value)}
                className="input w-full max-w-[500px]"
                placeholder={
                  t("postAd.yourInfo.contactTimePlaceholder") ||
                  "Masalan: 09:00-18:00"
                }
              />
            </fieldset>

            <div className="flex flex-col md:flex-row items-start gap-4">
              <fieldset className="fieldset w-full md:w-1/2">
                <legend className="fieldset-legend">
                  {t("postAd.yourInfo.category") || "Kategoriya"}
                </legend>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="select w-full cursor-pointer flex justify-between items-center border border-gray-300 px-3 py-2 rounded"
                  >
                    {selectedKategoriya ? (
                      <span>{selectedKategoriya.label}</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <TbCategoryPlus />{" "}
                        {t("postAd.yourInfo.selectCategory") ||
                          "Kategoriya tanlash"}
                      </span>
                    )}
                  </button>

                  {open && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow z-10 max-h-60 overflow-auto">
                      {kategoriyalar.map((k, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="kategoriya"
                            checked={selectedKategoriya?.label === k.label}
                            onChange={() => {
                              setSelectedKategoriya(k);
                              setOpen(false);
                            }}
                            className="accent-blue-600"
                          />
                          <span>{t(k.key) || k.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </fieldset>

              <fieldset className="fieldset w-full md:w-1/2">
                <legend className="fieldset-legend">
                  {t("postAd.yourInfo.specialization") || "Mutaxassislik"}
                </legend>
                <input
                  type="text"
                  value={mutaxasislik}
                  onChange={(e) => setMutaxasislik(e.target.value)}
                  className="input w-full"
                  placeholder={
                    t("postAd.yourInfo.specializationPlaceholder") ||
                    "Masalan: Elektrik"
                  }
                />
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("postAd.yourInfo.price") || "Narx"}
              </legend>
              <input
                type="text"
                value={narx}
                onChange={(e) => setNarx(e.target.value)}
                className="input w-full max-w-[500px]"
                placeholder={
                  t("postAd.yourInfo.pricePlaceholder") || "Narx (so'm)"
                }
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("postAd.yourInfo.age") || "Yosh"}
              </legend>
              <input
                type="text"
                value={yosh}
                onChange={(e) => setYosh(e.target.value)}
                className="input w-full max-w-[500px]"
                placeholder={t("postAd.yourInfo.agePlaceholder") || "Yosh"}
              />
            </fieldset>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("postAd.yourInfo.experience") || "Tajriba"}
            </legend>
            <input
              type="text"
              value={tajriba}
              onChange={(e) => setTajriba(e.target.value)}
              className="input w-full max-w-[500px]"
              placeholder={
                t("postAd.yourInfo.experiencePlaceholder") || "Masalan: 3 yil"
              }
            />
          </fieldset>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <fieldset className="fieldset w-full md:w-auto">
              <legend className="fieldset-legend">
                {t("postAd.yourInfo.additionalInfo") || "Qo'shimcha ma'lumot"}
              </legend>
              <textarea
                className="textarea h-24 w-full md:w-[500px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={
                  t("postAd.yourInfo.bio") || "Ish tajribangiz haqida qisqacha"
                }
              ></textarea>
            </fieldset>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-gray-900 font-medium">
                  {t("postAd.yourInfo.uploadPhoto") || "Rasm yuklash"}
                </p>
                <p className="text-gray-500 text-sm">
                  {t("postAd.yourInfo.uploadHint") ||
                    "Rasmlarni yuklang (jpg, png). Maks 10 ta."}
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <label className="w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-emerald-500">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                  ) : (
                    <Plus className="text-emerald-600 w-8 h-8" />
                  )}
                </label>

                {previews.map((p, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={p}
                      alt={`preview-${idx}`}
                      className="w-[100px] h-[100px] object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-[#0F172B] text-xl mt-8 mb-6 flex items-center gap-2">
          <MdOutlineContactPhone />
          <span className="font-medium text-[#0F172B]">
            {t("postAd.contactInfo.title") || "Kontakt ma'lumotlari"}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("postAd.contactInfo.phone") || "Telefon"}
            </legend>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input w-full"
              placeholder={
                t("postAd.contactInfo.phonePlaceholder") || "+9989..."
              }
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("postAd.contactInfo.telegram") || "Telegram"}
            </legend>
            <input
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="input w-full"
              placeholder={
                t("postAd.contactInfo.telegramPlaceholder") || "@username"
              }
            />
          </fieldset>

          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-success w-5 h-5"
                required
              />
              <h3 className="text-[#0F172B] text-[13px] font-medium">
                {t("postAd.agreement.part1") || "Men roziman"}{" "}
                <span className="text-[#009966] font-bold">
                  {t("postAd.agreement.part2") || "shartlarga"}
                </span>
              </h3>
            </label>

            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="h-[40px] md:w-auto w-full rounded-[5px] bg-[#009966] text-[#FFFFFF] font-medium text-sm"
            >
              {uploading
                ? t("postAd.uploading") || "Yuklanmoqda..."
                : t("postAd.submitButton") || "E'lon joylash"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
