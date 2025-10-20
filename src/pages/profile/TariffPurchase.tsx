import React, { useState, useRef, useEffect } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import {
  FiUploadCloud,
  FiX,
  FiCheck,
  FiCreditCard,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

interface Message {
  type: "success" | "error";
  text: string;
}

interface Tariff {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  vip?: boolean;
}

const TariffPurchase = () => {
  const CARD_NUMBER = "9860 2466 0212 3183";
  const CARD_OWNER = "Muhammadnazar Nazarov";
  const MAX_BYTES = 5 * 1024 * 1024; // 5MB

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const tariff = location.state?.tariff as Tariff;

  useEffect(() => {
    if (!tariff) {
      navigate("/tariffs");
    }
  }, [tariff, navigate]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const copyCard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CARD_NUMBER).then(
        () => {
          setMessage({ type: "success", text: "Karta raqami nusxalandi" });
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        () => setMessage({ type: "error", text: "Nusxalashda xato yuz berdi" })
      );
    } else {
      setMessage({
        type: "error",
        text: "Brauzeringiz clipboard API ni qo'llab-quvvatlamaydi",
      });
    }
    setTimeout(() => setMessage(null), 2000);
  };

  const validateAndSetFile = (f: File | undefined) => {
    setFileError("");
    if (!f) return;
    if (f.size > MAX_BYTES) {
      setFileError("Fayl hajmi 5MB dan katta bo'lishi mumkin emas.");
      return;
    }
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    if (!allowed.includes(f.type)) {
      setFileError("Faqat rasm (png, jpg, webp) yoki PDF fayl qabul qilinadi.");
      return;
    }
    setFile(f);
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    validateAndSetFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    validateAndSetFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!file) {
      setFileError("To'lov chekini yuklash majburiy.");
      return;
    }
    if (fileError) return;

    const formData = new FormData();
    formData.append("planId", tariff.id);
    formData.append("amount", tariff.price);
    formData.append("cardNumber", CARD_NUMBER);
    formData.append("cardOwner", CARD_OWNER);
    formData.append("receipt", file);

    try {
      setSubmitting(true);
      // API ga so'rov yuborish simulyatsiyasi
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessage({
        type: "success",
        text: "To'lov ma'lumotlari yuborildi. Tez orada tekshiriladi.",
      });
      setFile(null);
      setPreviewUrl(null);
      if (inputRef.current) inputRef.current.value = "";
      setStep(3);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: "Yuborishda xatolik: " + (err.message || "unknown"),
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setFileError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!tariff) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <button
            onClick={() => navigate("/tariffs")}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" /> Ortga qaytish
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
              <FiCreditCard className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {tariff.name} Tarifini Sotib Olish
            </h3>
            <p className="text-gray-600">
              To'lovni amalga oshirish uchun quyidagi qadamlarni bajaring
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center w-full max-w-md">
              <div
                className={`flex flex-col items-center ${
                  step >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-blue-100 border-2 border-blue-600"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <span className="font-semibold">1</span>
                </div>
                <span className="text-xs mt-1">To'lov</span>
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center ${
                  step >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? "bg-blue-100 border-2 border-blue-600"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <span className="font-semibold">2</span>
                </div>
                <span className="text-xs mt-1">Yuklash</span>
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 3 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center ${
                  step >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3
                      ? "bg-blue-100 border-2 border-blue-600"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <span className="font-semibold">3</span>
                </div>
                <span className="text-xs mt-1">Tasdiq</span>
              </div>
            </div>
          </div>

          <div className="mb-8 p-5 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-700 text-center">
              Bizda tarif sotib olish uchun to'lov P2P — kartaga pul o'tkazish
              yo'li bilan amalga oshiriladi.
            </p>
          </div>

          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-lg font-semibold text-gray-900">
                Karta ma'lumotlari
              </label>
              <span className="text-sm font-medium bg-green-100 text-green-800 py-1 px-3 rounded-full">
                To'lov: {tariff.price} {tariff.period}
              </span>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="font-mono text-lg md:text-xl tracking-wide text-gray-900 mb-2 md:mb-0">
                  {CARD_NUMBER}
                </div>
                <button
                  type="button"
                  onClick={copyCard}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    copied
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-4 h-4" />
                      Nusxalandi
                    </>
                  ) : (
                    <>
                      <HiOutlineClipboardCopy className="w-4 h-4" />
                      Nusxa olish
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-700 flex items-center">
              <span className="font-medium text-gray-900 mr-2">
                Karta egasi:
              </span>
              {CARD_OWNER}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                To'lov chekini yuklang <span className="text-red-500">*</span>
              </label>

              <div
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative rounded-xl border-dashed border-2 p-6 text-center cursor-pointer transition-all duration-300 ${
                  dragOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex flex-col items-center justify-center gap-4 py-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FiUploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Faylni sudrab keltiring yoki tanlang
                    </div>
                    <div className="text-gray-500 text-sm">
                      Rasm yoki PDF formatida (maks. 5MB)
                    </div>
                  </div>
                </div>

                {file && (
                  <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt="preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 border rounded-lg text-xs font-medium text-gray-600">
                          PDF
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={clearFile}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm"
                    >
                      <FiX className="w-4 h-4" /> O'chirish
                    </button>
                  </div>
                )}

                {fileError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                    {fileError}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-60 flex items-center justify-center hover:bg-blue-700"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Jo'natilmoqda...
                  </>
                ) : (
                  "Jo'natish"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  clearFile();
                  setMessage(null);
                }}
                className="w-full md:w-auto py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-300"
              >
                Bekor qilish
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl border ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 flex-shrink-0 ${
                    message.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message.type === "success" ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <FiX className="w-5 h-5" />
                  )}
                </div>
                <div className="font-medium">{message.text}</div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-xs text-gray-500">
            To'lov ma'lumotlari tekshirilgach, tarifingiz faollashtiriladi
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffPurchase;
