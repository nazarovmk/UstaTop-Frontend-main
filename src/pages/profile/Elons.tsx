import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import ProfileSidebar from "./ProfileSidebar";
import { CiStar } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "sonner";

interface ElonData {
  id: string;
  ism: string;
  manzil: string;
  mutaxasislik: string;
  narx: string;
  kategoriya: string;
  murojaatVaqti: string;
  yosh: string;
  tajriba: string;
  bio: string;
  phone: string;
  telegram: string;
  fayl_soni: number;
  createdAt: any;
  uid: string;
  avatarUrl?: string;
}

function Elons() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [elons, setElons] = useState<ElonData[]>([]);
  const [editingElon, setEditingElon] = useState<ElonData | null>(null);
  const [formData, setFormData] = useState<Partial<ElonData>>({});
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<Record<string, any>>({}); // Foydalanuvchi ma'lumotlari

  useEffect(() => {
    // Foydalanuvchi ma'lumotlarini yuklash
    const fetchUsersData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersDataMap: Record<string, any> = {};
        usersSnapshot.forEach((doc) => {
          usersDataMap[doc.id] = doc.data();
        });
        setUsersData(usersDataMap);
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini yuklashda xato:", error);
      }
    };

    fetchUsersData();
  }, []);

  // Fetch user's announcements
  useEffect(() => {
    const fetchElons = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const q = query(
          collection(db, "ustalar"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const elonData: ElonData[] = [];
        querySnapshot.forEach((doc) => {
          elonData.push({ id: doc.id, ...doc.data() } as ElonData);
        });
        setElons(elonData);
      } catch (error) {
        console.error(t("elons.errors.fetchError"), error);
      } finally {
        setLoading(false);
      }
    };
    fetchElons();
  }, [currentUser, t]);

  // To'g'ri avatar URL ni olish funksiyasi
  const getAvatarUrl = (master: ElonData) => {
    // Agar masterda uid maydoni bo'lsa va ushbu foydalanuvchining yangi avatari bo'lsa
    if (master.uid && usersData[master.uid] && usersData[master.uid].avatar) {
      return usersData[master.uid].avatar;
    }
    // Aks holda masterdagi avatarUrl dan foydalanish
    return master.avatarUrl || "/default-avatar.png";
  };

  // Handle delete
  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "ustalar", id));
      setElons(elons.filter((elon) => elon.id !== id));
      toast.success(t("elons.alerts.deleteSuccess") || "E'lon o‘chirildi!");
    } catch (error) {
      console.error(t("elons.errors.deleteError"), error);
      toast.error(t("elons.alerts.deleteError") || "Xatolik yuz berdi");
    }
  };

  // Handle edit
  const handleEdit = (elon: ElonData) => {
    setEditingElon(elon);
    setFormData({
      ism: elon.ism,
      manzil: elon.manzil,
      mutaxasislik: elon.mutaxasislik,
      narx: elon.narx,
      kategoriya: elon.kategoriya,
      murojaatVaqti: elon.murojaatVaqti,
      yosh: elon.yosh,
      tajriba: elon.tajriba,
      bio: elon.bio,
      phone: elon.phone,
      telegram: elon.telegram,
    });
  };

  // Handle form change
  const handleChange =
    (field: keyof ElonData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSave = async () => {
    if (!editingElon || !currentUser) return;
    try {
      const elonRef = doc(db, "ustalar", editingElon.id);
      await updateDoc(elonRef, formData);
      setElons(
        elons.map((elon) =>
          elon.id === editingElon.id ? { ...elon, ...formData } : elon
        )
      );
      setEditingElon(null);
      toast.success(t("elons.alerts.updateSuccess") || "E'lon yangilandi!");
    } catch (error) {
      console.error(t("elons.errors.updateError"), error);
      toast.error(t("elons.alerts.updateError") || "Xatolik yuz berdi");
    }
  };

  const formFields = [
    {
      label: t("elons.editForm.fields.name.label"),
      placeholder: t("elons.editForm.fields.name.placeholder"),
      key: "ism" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.address.label"),
      placeholder: t("elons.editForm.fields.address.placeholder"),
      key: "manzil" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.specialization.label"),
      placeholder: t("elons.editForm.fields.specialization.placeholder"),
      key: "mutaxasislik" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.price.label"),
      placeholder: t("elons.editForm.fields.price.placeholder"),
      key: "narx" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.category.label"),
      placeholder: t("elons.editForm.fields.category.placeholder"),
      key: "kategoriya" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.contactTime.label"),
      placeholder: t("elons.editForm.fields.contactTime.placeholder"),
      key: "murojaatVaqti" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.age.label"),
      placeholder: t("elons.editForm.fields.age.placeholder"),
      key: "yosh" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.experience.label"),
      placeholder: t("elons.editForm.fields.experience.placeholder"),
      key: "tajriba" as keyof ElonData,
      type: "text",
    },
    {
      label: t("elons.editForm.fields.phone.label"),
      placeholder: t("elons.editForm.fields.phone.placeholder"),
      key: "phone" as keyof ElonData,
      type: "tel",
    },
    {
      label: t("elons.editForm.fields.telegram.label"),
      placeholder: t("elons.editForm.fields.telegram.placeholder"),
      key: "telegram" as keyof ElonData,
      type: "text",
    },
  ];

  return (
    <div className="lg:px-4 lg:py-8">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px]">
          <ProfileSidebar />
        </div>
        {/* Content */}
        <div className="w-full flex-1 px-5 pb-5">
          <h2 className="text-[#0F172B] text-xl font-semibold mb-5">
            {t("elons.title")}
          </h2>

          {/* Tab contents */}
          <div className="mt-5">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : elons.length > 0 ? (
              elons.map((elon) => {
                const avatarUrl = getAvatarUrl(elon);

                return (
                  <div
                    key={elon.id}
                    className="p-5 border border-[#90A4BB] rounded-lg mb-4"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Left Block */}
                      <div className="flex md:flex-col items-center md:items-start gap-2 shrink-0">
                        <img
                          src={avatarUrl}
                          alt={t("elons.userAlt")}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            // Agar rasm yuklanmasa, default rasmni ko'rsatish
                            e.currentTarget.src = "/default-avatar.png";
                          }}
                        />
                        <p className="text-sm font-medium text-[#0F172BB2]">
                          {elon.kategoriya}
                        </p>
                        <p className="text-sm font-medium text-[#90A4BB]">
                          {elon.narx} {t("elons.currency")}
                        </p>
                      </div>
                      {/* Center Block */}
                      <div className="flex flex-col md:w-[200px]">
                        <p className="text-[#0F172B] text-base font-semibold">
                          {elon.ism}
                        </p>
                        <div className="flex gap-2 items-center mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <CiStar
                                key={i}
                                className="w-4 h-4 text-yellow-500"
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#0F172BB2]">
                            {t("elons.reviews", { count: 5 })}
                          </p>
                        </div>
                      </div>
                      {/* Right Block */}
                      <div className="flex flex-col flex-1">
                        <h3 className="text-[#0F172B] text-sm md:text-base font-medium mb-2">
                          {elon.mutaxasislik}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-[#90A4BB] text-xs md:text-sm">
                          <div className="flex items-center gap-1">
                            <IoLocation />
                            <span>{elon.manzil}</span>
                          </div>
                          <span className="ml-auto md:ml-0">
                            {elon.createdAt?.toDate
                              ? elon.createdAt
                                  .toDate()
                                  .toLocaleDateString("uz-UZ")
                              : t("elons.noData")}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-4">
                      <MdModeEditOutline
                        className="text-[#009966] cursor-pointer w-5 h-5"
                        onClick={() => handleEdit(elon)}
                        title={t("elons.actions.edit")}
                      />
                      <FaTrashCan
                        className="text-red-600 cursor-pointer w-5 h-5"
                        onClick={() => handleDelete(elon.id)}
                        title={t("elons.actions.delete")}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">{t("elons.noActiveAds")}</p>
            )}
          </div>

          {/* Edit Form */}
          {editingElon && (
            <div className="mt-5 p-5 border border-[#90A4BB] rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {t("elons.editForm.title")}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {formFields.map((field, index) => (
                  <fieldset key={index} className="fieldset">
                    <legend className="fieldset-legend">{field.label}</legend>
                    {field.key === "bio" ? (
                      <textarea
                        value={formData[field.key] || ""}
                        onChange={handleChange(field.key)}
                        className="textarea w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        placeholder={t("elons.editForm.fields.bio.placeholder")}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key] || ""}
                        onChange={handleChange(field.key)}
                        className="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        placeholder={field.placeholder}
                      />
                    )}
                  </fieldset>
                ))}
                <fieldset className="fieldset md:col-span-2">
                  <legend className="fieldset-legend">
                    {t("elons.editForm.fields.bio.label")}
                  </legend>
                  <textarea
                    value={formData.bio || ""}
                    onChange={handleChange("bio")}
                    className="textarea w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder={t("elons.editForm.fields.bio.placeholder")}
                  ></textarea>
                </fieldset>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#009966] text-white rounded-lg font-medium hover:bg-[#007d50]"
                >
                  {t("elons.editForm.buttons.save")}
                </button>
                <button
                  onClick={() => setEditingElon(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400"
                >
                  {t("elons.editForm.buttons.cancel")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Elons;
