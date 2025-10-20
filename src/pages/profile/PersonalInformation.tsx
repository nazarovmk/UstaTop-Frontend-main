import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import ProfileSidebar from "./ProfileSidebar";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  email: string;
  phone: string;
  telegram: string;
  serviceType: string;
  speciality: string;
  avatar?: string;
}

function PersonalInformation() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    password: "",
    address: "",
    email: "",
    phone: "",
    telegram: "",
    serviceType: "",
    speciality: "",
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  // Foydalanuvchi ma'lumotlarini olish
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid); // Har bir user uchun alohida UID
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data() as FormData);
          setIsEditing(false);
        }
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSave = async () => {
    if (!userId) {
      toast.error(t("personalInfo.alert.noUser") || "Foydalanuvchi topilmadi");
      return;
    }

    try {
      await setDoc(doc(db, "users", userId), formData, { merge: true });
      setIsEditing(false);
      toast.success(t("personalInfo.alert.saved") || "Ma'lumotlar saqlandi!");
    } catch (err: any) {
      console.error("Xatolik:", err);
      toast.error(
        t("personalInfo.alert.error") ||
          "Xatolik yuz berdi, qayta urinib ko‘ring"
      );
    }
  };

  const formFields = [
    {
      label: t("personalInfo.fields.firstName.label"),
      placeholder: t("personalInfo.fields.firstName.placeholder"),
      type: "text",
      key: "firstName",
    },
    {
      label: t("personalInfo.fields.lastName.label"),
      placeholder: t("personalInfo.fields.lastName.placeholder"),
      type: "text",
      key: "lastName",
    },
    {
      label: t("personalInfo.fields.email.label"),
      placeholder: t("personalInfo.fields.email.placeholder"),
      type: "email",
      key: "email",
    },
    {
      label: t("personalInfo.fields.password.label"),
      placeholder: t("personalInfo.fields.password.placeholder"),
      type: "password",
      key: "password",
    },
    {
      label: t("personalInfo.fields.address.label"),
      placeholder: t("personalInfo.fields.address.placeholder"),
      type: "text",
      key: "address",
    },
  ];

  const contactFields = [
    {
      label: t("personalInfo.contact.phone.label"),
      placeholder: t("personalInfo.contact.phone.placeholder"),
      type: "tel",
      key: "phone",
    },
    {
      label: t("personalInfo.contact.telegram.label"),
      placeholder: t("personalInfo.contact.telegram.placeholder"),
      type: "text",
      key: "telegram",
    },
  ];

  return (
    <div className="lg:px-4 lg:py-8">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px]">
          <ProfileSidebar />
        </div>

        {/* Forma */}
        <div className="w-full flex-1 px-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[#0F172B] text-xl font-semibold">
              {t("personalInfo.title")}
            </h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2 text-sm text-white bg-[#FE9A00] px-4 py-2 rounded-full hover:bg-[#e68a00]"
            >
              <CiEdit className="w-4 h-4" />
              {isEditing
                ? t("personalInfo.buttons.save")
                : t("personalInfo.buttons.edit")}
            </button>
          </div>

          {/* Maʼlumotlar */}
          {formFields.map((field, idx) => (
            <div key={idx} className="mb-4">
              <label className="text-xs text-gray-700 font-medium block mb-1">
                {field.label}
              </label>
              {isEditing ? (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof FormData] || ""}
                  onChange={handleChange(field.key as keyof FormData)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
                />
              ) : (
                <p className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  {field.key === "password"
                    ? "••••••"
                    : formData[field.key as keyof FormData] || "—"}
                </p>
              )}
            </div>
          ))}

          <h2 className="text-[#0F172B] text-lg font-semibold mt-8 mb-4">
            {t("personalInfo.contact.title")}
          </h2>

          {contactFields.map((field, idx) => (
            <div key={idx} className="mb-4">
              <label className="text-xs text-gray-700 font-medium block mb-1">
                {field.label}
              </label>
              {isEditing ? (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof FormData] || ""}
                  onChange={handleChange(field.key as keyof FormData)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
                />
              ) : (
                <p className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  {formData[field.key as keyof FormData] || "—"}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
