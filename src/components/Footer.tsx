import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleCategoryClick = () => {
    if (location.pathname === "/") {
      const categoriesSection = document.getElementById("categories");
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const categoriesSection = document.getElementById("categories");
        if (categoriesSection) {
          categoriesSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (lang === "O'zbek") {
      i18n.changeLanguage("uz");
    } else if (lang === "Rus") {
      i18n.changeLanguage("ru");
    } else if (lang === "English") {
      i18n.changeLanguage("en");
    }
  };

  return (
    <>
      {/* Desktop / Tablet Footer */}
      <div className="shadow-inner shadow-gray-300 overflow-x-hidden bg-white">
        <div className="lg:py-[93px] sm:py-[60px] py-6 md:px-10 lg:px-5 mx-auto lg:max-w-[819px] md:max-w-[819px] max-w-[400px] text-[13px] font-medium text-[#000000] flex flex-col-reverse md:flex-row lg:flex-row justify-between lg:gap-10 gap-6">
          {/* Left Section: Icons + Language */}
          <div className="w-full lg:w-1/2 px-4 sm:px-0 md:px-0 lg:px-0">
            {/* Social Media Icons */}
            <span className="flex items-center gap-[30px] mb-5">
              <a
                href="https://www.instagram.com/ustatop.org.uz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 cursor-pointer hover:text-[#00A945] transition-colors duration-200" />
              </a>
              <a
                href="https://t.me/+LKiM3Q-46xg5NTMy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram className="w-6 h-6 cursor-pointer hover:text-[#00A945] transition-colors duration-200" />
              </a>

              <FaFacebook className="w-6 h-6 cursor-pointer hover:text-[#00A945] transition-colors duration-200" />
            </span>

            {/* Language select – only md and lg */}
            <fieldset className="fieldset hidden md:block lg:block">
              <legend className="fieldset-legend">
                {t("footer.language")}
              </legend>
              <select
                defaultValue="O'zbek"
                className="select lg:max-w-[250px] md:max-w-[250px] h-[40px] bg-transparent border rounded px-2"
                onChange={handleLanguageChange}
              >
                <option>O'zbek</option>
                <option>Rus</option>
                <option>English</option>
              </select>
            </fieldset>
          </div>

          <hr className="border-[#90A4BB] lg:hidden md:hidden" />

          {/* Right Section: Links */}
          <div className="flex lg:flex-row lg:justify-between md:gap-8 gap-10 w-full px-4">
            <div className="flex flex-col gap-3">
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/BizHaqimizda"
              >
                {t("footer.aboutUs")}
              </Link>
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/ElonBeruvchilargaBagishlangan"
              >
                {t("footer.forAdvertisers")}
              </Link>
              <a
                href="https://t.me/nazarov_mk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
              >
                {t("footer.contactAdmin")}
              </a>
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/QollabQuvvatlash"
              >
                {t("footer.support")}
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/personalInformation"
              >
                {t("footer.personalAccount")}
              </Link>
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/elonjoylash"
              >
                {t("footer.postAd")}
              </Link>
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/ElonJoylashtirishQoidalari"
              >
                {t("footer.adRules")}
              </Link>
              <Link
                className="hover:text-[#00A945] transition-colors duration-200 text-sm lg:text-[14px]"
                to="/HamkorlikUchun"
              >
                {t("footer.forPartnership")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sticky bottom-0 left-0 w-full shadow-[4px_4px_20px_0px_#0099661A,_-4px_-4px_20px_0px_#0099661A] bg-white z-50">
        <div className="md:hidden lg:hidden flex justify-between mx-auto max-w-[639px] px-5 w-full py-3">
          <Link to="/" className="flex flex-col items-center gap-1">
            <AiFillHome className="w-6 h-6 text-[#444950]" />
            <p className="text-[12px]">{t("footer.home")}</p>
          </Link>
          <button
            onClick={handleCategoryClick}
            className="flex flex-col items-center gap-1"
          >
            <RxHamburgerMenu className="w-6 h-6 text-[#444950]" />
            <p className="text-[12px]">{t("footer.category")}</p>
          </button>
          <Link to="/elonjoylash" className="flex flex-col items-center gap-1">
            <IoIosAddCircle className="w-6 h-6 text-[#444950]" />
            <p className="text-[12px]">{t("footer.postAdMobile")}</p>
          </Link>
          <Link
            to="/personalInformation"
            className="flex flex-col items-center gap-1"
          >
            <CgProfile className="w-6 h-6 text-[#444950]" />
            <p className="text-[12px]">{t("footer.profile")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
