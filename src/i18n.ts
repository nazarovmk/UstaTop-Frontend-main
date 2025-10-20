import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      uz: {
        translation: {
          hero: {
            title: "Karyerangizni biz bilan boshlang",
            desc: "Karyerangizni rivojlantirish uchun eng yaxshi imkoniyat shu yerda. Biz yillar davomida sizga a'lo darajadagi kadrlarni yollashda yordam beradi.",
          },
          header: {
            region: "Hudud",
            selectRegion: "Viloyatingizni tanlang!",
            select: "Tanlash",
            postAd: "E'lon joylash",
            profile: "Profil",
          },
          regions: {
            andijan: "Andijon viloyati",
            bukhara: "Buxoro viloyati",
            fergana: "Farg'ona viloyati",
            jizzakh: "Jizzax viloyati",
            namangan: "Namangan viloyati",
            navoiy: "Navoiy viloyati",
            kashkadarya: "Qashqadaryo viloyati",
            samarkand: "Samarqand viloyati",
            sirdarya: "Sirdaryo viloyati",
            surxondarya: "Surxondaryo viloyati",
            tashkentRegion: "Toshkent viloyati",
            khorezm: "Xorazm viloyati",
            karakalpakstan: "Qoraqalpoqiston Res",
          },
          home: {
            searchPlaceholder: "O'zingizga kerakli ustani qidiring",
            search: "Qidirish",
            yearsExperience: "yillik tajriba",
            servicePrice: "Xizmat narxi",
            currency: "so'm",
            order: "Buyurtma Berish",
            categoriesTitle: "Bizning kategoriyalarimiz",
            topMasters: "To'pdagi ustalar",
            notFound: "Hech narsa topilmadi...",
          },
          categories: {
            construction: "Qurilish va ta'mirlash",
            electricPlumbing: "Elekterik va santexnika",
            coolingHeating: "Sovutish va isitish texnikasi",
            camera: "Kamera",
            furniture: "Mebel va interyer",
            autoServices: "Avto xizmatlar",
            gardenServices: "Bog' xizmatlari",
            techGadgets: "Texnika va gadjetlar",
          },
          footer: {
            language: "Til",
            aboutUs: "Biz haqimizda",
            forAdvertisers: "E'lon beruvchilarga bag'ishlangan",
            contactAdmin: "Ustatop.uz adminiga yozish",
            support: "Qo'llab-quvvatlash",
            personalAccount: "Shaxsiy hisob",
            postAd: "E'lon joylashtirish",
            adRules: "E'lon joylashtirish qoidalari",
            forPartnership: "Hamkorlik uchun",
            home: "Home",
            category: "Kategoriya",
            postAdMobile: "E'lon joylash",
            profile: "Profil",
          },
          about: {
            title: "Biz haqimizda",
            desc1:
              "<strong>Ustatop.uz</strong> – ishonchli ustalar va mijozlarni bog‘laydigan zamonaviy platforma. Bizning vazifamiz — ustalarni topishni, xizmatlarga buyurtma berishni va sifatli natija olishni oson va qulay qilish.",
            list1: "✅ Tekshirilgan ustalar – faqat ishonchli mutaxassislar",
            list2: "✅ Reyting va sharhlar – eng yaxshisini tanlash imkoniyati",
            list3: "✅ Tezkor buyurtma – vaqtingizni tejash uchun",
            list4:
              "✅ Qulay interfeys – telefon va kompyuterdan birdek ishlaydi",
            desc2:
              "<strong>Bizning maqsadimiz</strong> – mijoz va usta o‘rtasida adolatli, shaffof va ishonchli tizim yaratish. <strong>Ustatop.uz</strong> – sizni ustalar bilan bog‘laydigan eng qulay va xavfsiz onlayn platforma!",
          },
          advertisers: {
            title: "Eʼlon beruvchilar uchun",
            desc1:
              "Hurmatli e’lon beruvchilar! Bizning platformamiz sizga <strong>xizmatlaringizni ko‘proq mijozlarga yetkazish</strong>, <strong>ish hajmingizni oshirish</strong> va <strong>barqaror daromadga ega bo‘lish</strong> imkoniyatini beradi.",
            list1:
              "🔑 Shaxsiy kabinet – e’lonlaringizni boshqarish va tahrirlash",
            list2:
              "⭐ Reyting tizimi – sifatli xizmat ko‘rsatsangiz, mijozlar sizni tanlaydi",
            list3:
              "📊 Statistika – e’lonlaringiz qanchalik ko‘rilayotganini kuzatish",
            list4: "💬 Tezkor aloqa – mijozlar bilan bevosita bog‘lanish",
            desc2:
              "<strong>Ustatop.uz</strong> yordamida xizmatlaringizni reklama qiling va yangi mijozlarga ega bo‘ling!",
          },
          support: {
            title: "Ustatop.uz’ni qo‘llab-quvvatlang",
            desc1:
              "Ustatop.uz — bu ustalar va mijozlarni bog‘lovchi bepul platforma. Bizning maqsadimiz xizmatlar bozorini soddalashtirish va ishonchli ustalarni topishni yanada oson qilish. Agar siz bizning ishimizdan mamnun bo‘lsangiz, saytni rivojlantirishga o‘z hissangizni qo‘shishingiz mumkin.",
            howTitle: "💵 Qanday qo‘llab-quvvatlash mumkin?",
            how1: "📲 Payme, Click yoki boshqa to‘lov tizimlari orqali",
            how2: "💳 Bank kartasi orqali o‘tkazma",
            how3: "🤝 Homiylik va reklama takliflari",
            paymentTitle: "🔗 To‘lov Turlari",
            payme: "💸 Payme orqali qo‘llab-quvvatlash | 9860 2466 0212 3183",
            visa: "💳 Visa orqali qo‘llab-quvvatlash | 4231 2000 1086 4410",
            footer:
              "Sizning qo‘llab-quvvatlashingiz platformamizni rivojlantirishga, yangi imkoniyatlar qo‘shishga va ustalar hamda mijozlar uchun yanada qulaylik yaratishga yordam beradi. Rahmat! 🙏",
          },
          rules: {
            title: "Eʼlon joylashtirish qoidalari",
            intro:
              "Foydalanuvchilarning ishonchini saqlash va sifatli bozor yaratish uchun quyidagi qoidalarga amal qilishingizni so‘raymiz:",
            rule1:
              "To‘g‘ri va aniq maʼlumot bering – noto‘g‘ri eʼlonlar rad etiladi.",
            rule2:
              "Faqat o‘zingiz bajaradigan yoki vakolatli xizmatlarni joylashtiring.",
            rule3:
              "Mijozlar va foydalanuvchilarga nisbatan hurmat bilan muomala qiling.",
            rule4: "Noqonuniy yoki odobga zid xizmatlarni eʼlon qilmang.",
            rule5:
              "Faqat aniq va real rasmlar qo‘shing – yolg‘on rasmlar olib tashlanadi.",
            note: "🚀 Eslatma: Qoidalarga rioya qilmagan e’lonlar ogohlantirilmasdan olib tashlanishi mumkin.",
          },
          partnership: {
            title: "🤝 Hamkorlik uchun",
            desc1:
              "— ustalar va mijozlarni bog‘lovchi innovatsion platforma. Biz doimiy ravishda xizmatlar sifatini oshirish va foydalanuvchilarimizga qulaylik yaratish ustida ishlaymiz.",
            intro: "Agar siz:",
            point1: "Ustalar xizmatini kengaytirishni istasangiz",
            point2:
              "Marketing va reklama bo‘yicha hamkorlik qilmoqchi bo‘lsangiz",
            point3: "Texnologik yechimlar taklif qilmoqchi bo‘lsangiz",
            point4:
              "Investitsiya yoki strategik sheriklik qilish niyatida bo‘lsangiz",
            desc2:
              "Biz siz bilan hamkorlik qilishdan mamnunmiz! Bizga Telegram orqali yoki elektron pochta orqali yozing — birgalikda foydali hamkorlikni boshlaymiz.",
            contactBtn: "Biz bilan bog‘lanish",
          },
          errors: {
            idNotFound: "ID topilmadi",
            notFound: "Usta profili topilmadi",
            fetchFailed: "Ma'lumotlarni yuklashda xatolik",
          },
          general: {
            yearsOfExperience: "yil tajriba",
            ageUnit: "yosh",
            filesUnit: "ta",
            noData: "Ma'lumot yo'q",
          },
          buttons: {
            call: "Qo'ng'iroq qilish",
          },
          sections: {
            generalInfo: "Umumiy ma'lumotlar",
            pricing: "Xizmat narxlari",
            about: "Usta haqida",
            contact: "Ustaga bog'lanish",
            photos: "Ustaning Ishlari",
          },
          labels: {
            age: "Yosh",
            category: "Kategoriya",
            address: "Manzil",
            contactTime: "Murojaat qilish vaqti",
            salary: "Ish haqi",
            files: "Fayllar soni",
            postDate: "E'lon joylangan sana",
          },
          postAd: {
            title: "E'lon joylash",
            yourInfo: {
              title: "Sizning ma'lumotlaringiz",
              address: "Manzilingiz",
              addressPlaceholder: "Masalan, Xorazm viloyati Urganch shahar",
              fullName: "Ism, Familiya",
              fullNamePlaceholder: "Ism, Familiya",
              contactTime: "Murojaat qilish vaqti",
              contactTimePlaceholder: "Masalan, 24/7",
              category: "Kategoriyalar (bitta tanlashingiz mumkin)",
              selectCategory: "Kategoriya tanlang",
              specialization: "Mutaxasislik (bir nechta yozishingiz mumkin)",
              specializationPlaceholder: "Masalan, Elektrik, Santexnik",
              price: "Xizmat narxi",
              pricePlaceholder: "Masalan, 100 000 so'm",
              age: "Yoshingiz",
              agePlaceholder: "Masalan, 21",
              experience: "Tajribangiz",
              experiencePlaceholder: "Masalan, 7 yil",
              additionalInfo: "Qo'shimcha ma'lumotlar",
              bio: "Bio",
              uploadPhoto: "Foto yuklash",
              uploadHint: "3 dona rasim yuklash mumkin",
            },
            contactInfo: {
              title: "Bog'lanish uchun ma'lumotlar",
              phone: "Telefon raqami",
              phonePlaceholder: "+998 _ _ _ _ _ _ _ _ _",
              telegram: "Telegram foydalnuvchi nomi",
              telegramPlaceholder: "Masalan, @Nazarov08",
            },
            agreement: {
              part1: "Men e'lon berish qoidalariga",
              part2: "roziman.",
            },
            submitButton: "E'lonni Joylash",
          },
          category: {
            construction: "Qurilish va ta'mirlash",
            electrical: "Elekterik va santexnika",
            cooling: "Sovutish va isitish texnikasi",
            camera: "Kamera",
            furniture: "Mebel va interyer",
            auto: "Avto xizmatlar",
            garden: "Bog' xizmatlari",
            tech: "Texnika va gadjetlar",
          },
          alert: {
            loginRequired: "E'lon joylash uchun tizimga kiring!",
            fillAllFields: "Iltimos, barcha maydonlarni to'ldiring ❗",
            success: "E'lon muvaffaqiyatli joylandi ✅",
            error: "Xatolik yuz berdi, qayta urinib ko'ring ❌",
          },
          profileSidebar: {
            logoutError: "Chiqishda xatolik",
            uploadError: "Avatar yuklashda xatolik",
            avatarAlt: "Profil rasmi",
            uploading: "Yuklanmoqda...",
            menu: {
              personalInfo: "Shaxsiy maʼlumotlar",
              myAds: "Eʼlonlarim",
              favoriteAds: "Sevimli eʼlonlar",
              tariffs: "Taʼriflar",
              rating: "Reyting",
              logout: "Chiqish",
            },
          },
          personalInfo: {
            title: "Shaxsiy maʼlumotlar",
            buttons: {
              save: "Saqlash",
              edit: "Tahrirlash",
            },
            fields: {
              firstName: {
                label: "Ism",
                placeholder: "Ismingiz",
              },
              lastName: {
                label: "Familiya",
                placeholder: "Familiyangiz",
              },
              email: {
                label: "Email",
                placeholder: "name@gmail.com",
              },
              password: {
                label: "Parol",
                placeholder: "* * * * * *",
              },
              address: {
                label: "Manzil",
                placeholder: "Masalan, Toshkent vil., Chilonzor",
              },
            },
            contact: {
              title: "Bog’lanish uchun maʼlumot",
              phone: {
                label: "Telefon raqami",
                placeholder: "+998 ** *** ** **",
              },
              telegram: {
                label: "Telegram username",
                placeholder: "@yourusername",
              },
            },
            alert: {
              noUser: "Foydalanuvchi topilmadi",
              saved: "Ma'lumotlar saqlandi!",
              error: "Xatolik yuz berdi, qayta urinib ko‘ring",
            },
          },
          elons: {
            title: "E'lonlarim",
            tabs: {
              active: "Faol e'lonlar",
              archived: "Arxivlangan e'lonlar",
            },
            currency: "so'm",
            reviews: "{{count}} ta izoh",
            noData: "Ma'lumot yo'q",
            userAlt: "Foydalanuvchi rasmi",
            noActiveAds: "Faol e'lonlar yo'q...",
            archivedContent: "Arxivlangan e'lonlar kontenti shu yerda chiqadi.",
            actions: {
              edit: "Tahrirlash",
              delete: "O'chirish",
            },
            alerts: {
              deleteSuccess: "E'lon muvaffaqiyatli o'chirildi ✅",
              deleteError: "E'lonni o'chirishda xatolik yuz berdi ❌",
              updateSuccess: "E'lon muvaffaqiyatli tahrirlandi ✅",
              updateError: "E'lonni tahrirlashda xatolik yuz berdi ❌",
            },
            errors: {
              fetchError: "E'lonlarni yuklashda xatolik",
              deleteError: "E'lonni o'chirishda xatolik",
              updateError: "E'lonni yangilashda xatolik",
            },
            editForm: {
              title: "E'lonni Tahrirlash",
              fields: {
                name: {
                  label: "Ism, Familiya",
                  placeholder: "Ism, Familiya",
                },
                address: {
                  label: "Manzilingiz",
                  placeholder: "Masalan, Xorazm viloyati Urganch shahar",
                },
                specialization: {
                  label: "Mutaxasislik",
                  placeholder: "Masalan, Elektrik, Santexnik",
                },
                price: {
                  label: "Xizmat narxi",
                  placeholder: "Masalan, 100 000 so'm",
                },
                category: {
                  label: "Kategoriya",
                  placeholder: "Masalan, Qurilish va ta'mirlash",
                },
                contactTime: {
                  label: "Murojaat qilish vaqti",
                  placeholder: "Masalan, 24/7",
                },
                age: {
                  label: "Yoshingiz",
                  placeholder: "Masalan, 21",
                },
                experience: {
                  label: "Tajribangiz",
                  placeholder: "Masalan, 7 yil",
                },
                phone: {
                  label: "Telefon raqami",
                  placeholder: "+998 _ _ _ _ _ _ _ _ _",
                },
                telegram: {
                  label: "Telegram foydalnuvchi nomi",
                  placeholder: "Masalan, @Nazarov08",
                },
                bio: {
                  label: "Qo'shimcha ma'lumotlar",
                  placeholder: "Bio",
                },
              },
              buttons: {
                save: "Saqlash",
                cancel: "Bekor qilish",
              },
            },
          },
          favorites: {
            title: "Sevimli E'lonlarim",
            defaultCategory: "Qurilish va ta'mirlash",
            defaultPrice: "1.000.000 so'm",
            defaultServices: "Ustaning xizmatlari",
            noAddress: "Manzil ko'rsatilmagan",
            reviews: "{{count}} ta izoh",
            noFavorites: "Hozircha sevimli ustalar yo'q",
            userAlt: "Foydalanuvchi rasmi",
            actions: {
              remove: "O'chirish",
              view: "Ko'rish",
            },
            goToList: "Ustalar ro'yxatiga o'tish",
            errors: {
              fetchError: "Sevimlilarni yuklashda xatolik",
              removeError: "Sevimlilardan o'chirishda xatolik",
            },
          },
          tariffs: {
            title: "E'lon berish bo'yicha ta'riflar",
            period: "/oylik",
            mostPopular: "Eng mashhur",
            starter: {
              name: "Boshlang'ich",
              description: "Ishni boshlash uchun ideal",
              price: "0 so'm",
              features: [
                "1 ta e'lon joylash",
                "E'lon 31 kun faol",
                "Asosiy ma'lumotlar ko'rsatiladi",
                "Qidiruvda pastroqda chiqadi",
              ],
              buttonText: "Boshlash",
            },
            pro: {
              name: "Faol Usta",
              description: "Professional ustalar uchun",
              price: "29,000 so'm",
              features: [
                "5 ta e'lon joylash",
                "E'lon 31 kun faol",
                "Elonda FAOL USTA yozuv turadi",
                "Qidiruvda yuqorida chiqadi",
              ],
              buttonText: "Sotib Olish",
            },
            premium: {
              name: "To'p Usta",
              description: "Eng yaxshi ustalar uchun",
              price: "49,000 so'm",
              features: [
                "Cheksiz e'lon joylash",
                "E'lon 31 kun faol",
                "Premium profil ko'rinishi",
                "Qidiruvda birinchi sahifada",
                "Vip belgisi va reklama",
              ],
              buttonText: "Sotib Olish",
            },
          },
          auth: {
            loginTitle: "Tizimga kirish",
            registerTitle: "Hisob yarating",
            loginSubtitle: "Xizmatimizdan foydalanish uchun kiring",
            registerSubtitle:
              "Xizmatimizdan foydalanish uchun ro'yxatdan o'ting",

            firstName: "Ism",
            lastName: "Familiya",
            firstNamePlaceholder: "Ismingiz",
            lastNamePlaceholder: "Familiyangiz",

            email: "Elektron pochta",
            password: "Parol",
            confirmPassword: "Parolni tasdiqlang",
            passwordPlaceholder: "Parolingiz",
            passwordMinLength: "Kamida 8 ta belgi",
            confirmPasswordPlaceholder: "Parolingizni takrorlang",

            rememberMe: "Eslab qolish",
            forgotPassword: "Parolni unutdingizmi?",

            agreeToTerms: "Men",
            termsAndConditions: "shartlar va sharoitlar",

            loading: "Yuklanmoqda...",
            loginButton: "Tizimga kirish",
            registerButton: "Ro'yxatdan o'tish",

            noAccount: "Hali hisobingiz yo'qmi?",
            haveAccount: "Allaqachon hisobingiz bormi?",
            registerHere: "Hisob yaratish",
            loginHere: "Tizimga kirish",

            success: {
              login: "Muvaffaqiyatli kirdingiz!",
              register: "Hisob muvaffaqiyatli yaratildi!",
            },
            errors: {
              passwordMismatch: "Parollar mos kelmadi",
              general: "Xatolik yuz berdi. Qayta urinib ko‘ring.",
              terms: "Shartlar va sharoitlarga rozilik bildirishingiz kerak",
            },
          },
        },
      },
      ru: {
        translation: {
          hero: {
            title: "Начни свою карьеру с нами",
            desc: "Лучшая возможность для развития карьеры — здесь. Мы помогаем вам набирать отличный персонал уже много лет.",
          },
          header: {
            region: "Регион",
            selectRegion: "Выберите свой регион!",
            select: "Выбрать",
            postAd: "Разместить объявление",
            profile: "Профиль",
          },
          regions: {
            andijan: "Андижанская область",
            bukhara: "Бухарская область",
            fergana: "Ферганская область",
            jizzakh: "Джизакская область",
            namangan: "Наманганская область",
            navoiy: "Навоийская область",
            kashkadarya: "Кашкадарьинская область",
            samarkand: "Самаркандская область",
            sirdarya: "Сырдарьинская область",
            surxondarya: "Сурхандарьинская область",
            tashkentRegion: "Ташкентская область",
            khorezm: "Хорезмская область",
            karakalpakstan: "Республика Каракалпакстан",
          },
          home: {
            searchPlaceholder: "Найдите нужного мастера",
            search: "Поиск",
            yearsExperience: "лет опыта",
            servicePrice: "Стоимость услуги",
            currency: "сум",
            order: "Заказать",
            categoriesTitle: "Наши категории",
            topMasters: "Лучшие мастера",
            notFound: "Ничего не найдено...",
          },
          categories: {
            construction: "Строительство и ремонт",
            electricPlumbing: "Электрика и сантехника",
            coolingHeating: "Охлаждение и отопление",
            camera: "Камеры",
            furniture: "Мебель и интерьер",
            autoServices: "Автоуслуги",
            gardenServices: "Садовые услуги",
            techGadgets: "Техника и гаджеты",
          },
          footer: {
            language: "Язык",
            aboutUs: "О нас",
            forAdvertisers: "Для рекламодателей",
            contactAdmin: "Написать администратору Ustatop.uz",
            support: "Поддержка",
            personalAccount: "Личный кабинет",
            postAd: "Разместить объявление",
            adRules: "Правила размещения объявлений",
            forPartnership: "Для партнерства",
            home: "Главная",
            category: "Категория",
            postAdMobile: "Разместить объявление",
            profile: "Профиль",
          },
          about: {
            title: "O нас",
            desc1:
              "<strong>Ustatop.uz</strong> – современная платформа, связывающая надежных мастеров и клиентов. Наша миссия — упростить поиск мастеров, заказ услуг и получение качественного результата.",
            list1: "✅ Проверенные мастера – только надежные специалисты",
            list2: "✅ Рейтинги и отзывы – возможность выбрать лучших",
            list3: "✅ Быстрый заказ – экономия вашего времени",
            list4:
              "✅ Удобный интерфейс – работает одинаково хорошо на телефоне и компьютере",
            desc2:
              "<strong>Наша цель</strong> – создать справедливую, прозрачную и надежную систему между клиентом и мастером. <strong>Ustatop.uz</strong> – самая удобная и безопасная онлайн-платформа для связи с мастерами!",
          },
          advertisers: {
            title: "Для рекламодателей",
            desc1:
              "Уважаемые рекламодатели! Наша платформа помогает вам <strong>донести свои услуги до большего числа клиентов</strong>, <strong>увеличить объем работы</strong> и <strong>получать стабильный доход</strong>.",
            list1:
              "🔑 Личный кабинет – управление и редактирование ваших объявлений",
            list2:
              "⭐ Система рейтинга – если вы качественно работаете, клиенты выбирают вас",
            list3:
              "📊 Статистика – отслеживайте, как часто просматриваются ваши объявления",
            list4: "💬 Быстрая связь – прямое общение с клиентами",
            desc2:
              "Рекламируйте свои услуги с <strong>Ustatop.uz</strong> и получайте новых клиентов!",
          },
          support: {
            title: "Поддержите Ustatop.uz",
            desc1:
              "Ustatop.uz — бесплатная платформа, объединяющая мастеров и клиентов. Наша цель — упростить рынок услуг и облегчить поиск надёжных мастеров. Если вы довольны нашей работой, вы можете внести свой вклад в развитие сайта.",
            howTitle: "💵 Как можно поддержать?",
            how1: "📲 Через Payme, Click или другие платежные системы",
            how2: "💳 Переводом на банковскую карту",
            how3: "🤝 Спонсорство и рекламные предложения",
            paymentTitle: "🔗 Способы оплаты",
            payme: "💸 Поддержка через Payme | 9860 2466 0212 3183",
            visa: "💳 Поддержка через Visa | 4231 2000 1086 4410",
            footer:
              "Ваша поддержка помогает нам развивать платформу, добавлять новые возможности и создавать больше удобств для мастеров и клиентов. Спасибо! 🙏",
          },
          rules: {
            title: "Правила размещения объявлений",
            intro:
              "Чтобы сохранить доверие пользователей и создать качественный рынок, просим соблюдать следующие правила:",
            rule1:
              "Указывайте точную и правдивую информацию – неверные объявления будут отклонены.",
            rule2:
              "Размещайте только те услуги, которые выполняете лично или на которые имеете право.",
            rule3: "Относитесь к клиентам и пользователям с уважением.",
            rule4: "Не размещайте незаконные или аморальные услуги.",
            rule5:
              "Добавляйте только реальные и качественные фото – ложные изображения будут удалены.",
            note: "🚀 Напоминание: Объявления, не соответствующие правилам, могут быть удалены без предупреждения.",
          },
          partnership: {
            title: "🤝 Для сотрудничества",
            desc1:
              "— это инновационная платформа, соединяющая мастеров и клиентов. Мы постоянно работаем над повышением качества услуг и удобством для пользователей.",
            intro: "Если вы:",
            point1: "Хотите расширить услуги мастеров",
            point2: "Желаете сотрудничать в сфере маркетинга и рекламы",
            point3: "Хотите предложить технологические решения",
            point4:
              "Имеете намерение инвестировать или стать стратегическим партнёром",
            desc2:
              "Мы будем рады сотрудничеству с вами! Напишите нам в Telegram или по электронной почте — вместе мы создадим выгодное партнёрство.",
            contactBtn: "Связаться с нами",
          },
          errors: {
            idNotFound: "ID не найден",
            notFound: "Профиль мастера не найден",
            fetchFailed: "Ошибка при загрузке данных",
          },
          general: {
            yearsOfExperience: "лет опыта",
            ageUnit: "лет",
            filesUnit: "шт",
            noData: "Нет данных",
          },
          buttons: {
            call: "Позвонить",
          },
          sections: {
            generalInfo: "Общая информация",
            pricing: "Цены на услуги",
            about: "О мастере",
            contact: "Связаться с мастером",
            photos: "Работы Мастера",
          },
          labels: {
            age: "Возраст",
            category: "Категория",
            address: "Адрес",
            contactTime: "Время для связи",
            salary: "Зарплата",
            files: "Количество файлов",
            postDate: "Дата публикации",
          },
          postAd: {
            title: "Разместить объявление",
            yourInfo: {
              title: "Ваша информация",
              address: "Ваш адрес",
              addressPlaceholder: "Например, Хорезмская область, город Ургенч",
              fullName: "Имя, Фамилия",
              fullNamePlaceholder: "Имя, Фамилия",
              contactTime: "Время для связи",
              contactTimePlaceholder: "Например, 24/7",
              category: "Категории (можно выбрать одну)",
              selectCategory: "Выберите категорию",
              specialization: "Специализация (можно указать несколько)",
              specializationPlaceholder: "Например, Электрик, Сантехник",
              price: "Стоимость услуги",
              pricePlaceholder: "Например, 100 000 сум",
              age: "Ваш возраст",
              agePlaceholder: "Например, 21",
              experience: "Ваш опыт",
              experiencePlaceholder: "Например, 7 лет",
              additionalInfo: "Дополнительная информация",
              bio: "Био",
              uploadPhoto: "Загрузить фото",
              uploadHint: "Вы можете загрузить 3 фотографии.",
            },
            contactInfo: {
              title: "Контактная информация",
              phone: "Номер телефона",
              phonePlaceholder: "+998 _ _ _ _ _ _ _ _ _",
              telegram: "Имя пользователя Telegram",
              telegramPlaceholder: "Например, @Nazarov08",
            },
            agreement: {
              part1: "Я согласен с правилами публикации.",
              part2: "согласен.",
            },
            submitButton: "Разместить объявление",
          },
          category: {
            construction: "Строительство и ремонт",
            electrical: "Электрика и сантехника",
            cooling: "Охлаждающая и отопительная техника",
            camera: "Камеры",
            furniture: "Мебель и интерьер",
            auto: "Автоуслуги",
            garden: "Садовые услуги",
            tech: "Техника и гаджеты",
          },
          alert: {
            loginRequired: "Для размещения объявления войдите в систему!",
            fillAllFields: "Пожалуйста, заполните все поля ❗",
            success: "Объявление успешно размещено ✅",
            error: "Произошла ошибка, попробуйте снова ❌",
          },
          profileSidebar: {
            logoutError: "Ошибка при выходе",
            uploadError: "Ошибка при загрузке аватара",
            avatarAlt: "Аватар профиля",
            uploading: "Загрузка...",
            menu: {
              personalInfo: "Личная информация",
              myAds: "Мои объявления",
              favoriteAds: "Избранные объявления",
              tariffs: "Тарифы",
              rating: "Рейтинг",
              logout: "Выйти",
            },
          },
          personalInfo: {
            title: "Личная информация",
            buttons: {
              save: "Сохранить",
              edit: "Редактировать",
            },
            fields: {
              firstName: {
                label: "Имя",
                placeholder: "Ваше имя",
              },
              lastName: {
                label: "Фамилия",
                placeholder: "Ваша фамилия",
              },
              email: {
                label: "Email",
                placeholder: "name@gmail.com",
              },
              password: {
                label: "Пароль",
                placeholder: "* * * * * *",
              },
              address: {
                label: "Адрес",
                placeholder: "Например, Ташкентская обл., Чиланзар",
              },
            },
            contact: {
              title: "Контактная информация",
              phone: {
                label: "Номер телефона",
                placeholder: "+998 ** *** ** **",
              },
              telegram: {
                label: "Имя пользователя Telegram",
                placeholder: "@yourusername",
              },
            },
            alert: {
              noUser: "Пользователь не найден",
              saved: "Данные сохранены!",
              error: "Произошла ошибка, попробуйте еще раз.",
            },
          },
          elons: {
            title: "Мои объявления",
            tabs: {
              active: "Активные объявления",
              archived: "Архивные объявления",
            },
            currency: "сум",
            reviews: "{{count}} отзывов",
            noData: "Нет данных",
            userAlt: "Фото пользователя",
            noActiveAds: "Нет активных объявлений...",
            archivedContent: "Содержимое архивных объявлений появится здесь.",
            actions: {
              edit: "Редактировать",
              delete: "Удалить",
            },
            alerts: {
              deleteSuccess: "Объявление успешно удалено ✅",
              deleteError: "Ошибка при удалении объявления ❌",
              updateSuccess: "Объявление успешно отредактировано ✅",
              updateError: "Ошибка при редактировании объявления ❌",
            },
            errors: {
              fetchError: "Ошибка при загрузке объявлений",
              deleteError: "Ошибка при удалении объявления",
              updateError: "Ошибка при обновлении объявления",
            },
            editForm: {
              title: "Редактирование объявления",
              fields: {
                name: {
                  label: "Имя, Фамилия",
                  placeholder: "Имя, Фамилия",
                },
                address: {
                  label: "Ваш адрес",
                  placeholder: "Например, Хорезмская область, город Ургенч",
                },
                specialization: {
                  label: "Специализация",
                  placeholder: "Например, Электрик, Сантехник",
                },
                price: {
                  label: "Стоимость услуги",
                  placeholder: "Например, 100 000 сум",
                },
                category: {
                  label: "Категория",
                  placeholder: "Например, Строительство и ремонт",
                },
                contactTime: {
                  label: "Время для связи",
                  placeholder: "Например, 24/7",
                },
                age: {
                  label: "Ваш возраст",
                  placeholder: "Например, 21",
                },
                experience: {
                  label: "Ваш опыт",
                  placeholder: "Например, 7 лет",
                },
                phone: {
                  label: "Номер телефона",
                  placeholder: "+998 _ _ _ _ _ _ _ _ _",
                },
                telegram: {
                  label: "Имя пользователя Telegram",
                  placeholder: "Например, @Nazarov08",
                },
                bio: {
                  label: "Дополнительная информация",
                  placeholder: "Био",
                },
              },
              buttons: {
                save: "Сохранить",
                cancel: "Отмена",
              },
            },
          },
          favorites: {
            title: "Избранные объявления",
            defaultCategory: "Строительство и ремонт",
            defaultPrice: "1,000,000 сум",
            defaultServices: "Услуги мастера",
            noAddress: "Адрес не указан",
            reviews: "{{count}} отзывов",
            noFavorites: "Пока нет избранных мастеров",
            userAlt: "Фото пользователя",
            actions: {
              remove: "Удалить",
              view: "Смотреть",
            },
            goToList: "Перейти к списку мастеров",
            errors: {
              fetchError: "Ошибка при загрузке избранного",
              removeError: "Ошибка при удалении из избранного",
            },
          },
          tariffs: {
            title: "Тарифы на размещение объявлений",
            period: "/месяц",
            mostPopular: "Самый популярный",
            starter: {
              name: "Начальный",
              description: "Идеально для начала работы",
              price: "0 сум",
              features: [
                "Размещение 1 объявления",
                "Объявление активно 7 дней",
                "Отображаются основные данные",
                "Показывается ниже в поиске",
              ],
              buttonText: "Начать",
            },
            pro: {
              name: "Активный Мастер",
              description: "Для профессиональных мастеров",
              price: "29,000 сум",
              features: [
                "Размещение 5 объявлений",
                "Объявление активно 14 дней",
                "Полный профиль и портфолио",
                "Показывается выше в поиске",
                "Отзывы клиентов",
              ],
              buttonText: "Купить",
            },
            premium: {
              name: "Топ Мастер",
              description: "Для лучших мастеров",
              price: "49,000 сум",
              features: [
                "Неограниченное количество объявлений",
                "Объявление активно 30 дней",
                "Премиальный вид профиля",
                "На первой странице поиска",
                "Vip-значок и реклама",
              ],
              buttonText: "Купить",
            },
          },
          auth: {
            loginTitle: "Вход в систему",
            registerTitle: "Создать аккаунт",
            loginSubtitle: "Войдите, чтобы воспользоваться нашим сервисом",
            registerSubtitle:
              "Зарегистрируйтесь, чтобы воспользоваться нашим сервисом",

            firstName: "Имя",
            lastName: "Фамилия",
            firstNamePlaceholder: "Ваше имя",
            lastNamePlaceholder: "Ваша фамилия",

            email: "Электронная почта",
            password: "Пароль",
            confirmPassword: "Подтвердите пароль",
            passwordPlaceholder: "Ваш пароль",
            passwordMinLength: "Минимум 8 символов",
            confirmPasswordPlaceholder: "Повторите пароль",

            rememberMe: "Запомнить меня",
            forgotPassword: "Забыли пароль?",

            agreeToTerms: "Я согласен с",
            termsAndConditions: "условиями использования",

            loading: "Загрузка...",
            loginButton: "Войти",
            registerButton: "Зарегистрироваться",

            noAccount: "Еще нет аккаунта?",
            haveAccount: "Уже есть аккаунт?",
            registerHere: "Создать аккаунт",
            loginHere: "Войти",

            success: {
              login: "Вы успешно вошли!",
              register: "Аккаунт успешно создан!",
            },
            errors: {
              passwordMismatch: "Пароли не совпадают",
              general: "Произошла ошибка. Попробуйте снова.",
            },
          },
        },
      },
      en: {
        translation: {
          hero: {
            title: "Start your career with us",
            desc: "The best opportunity to develop your career is here. We have been helping you recruit excellent personnel for years.",
          },
          header: {
            region: "Region",
            selectRegion: "Select your region!",
            select: "Select",
            postAd: "Post Ad",
            profile: "Profile",
          },
          regions: {
            andijan: "Andijan Region",
            bukhara: "Bukhara Region",
            fergana: "Fergana Region",
            jizzakh: "Jizzakh Region",
            namangan: "Namangan Region",
            navoiy: "Navoiy Region",
            kashkadarya: "Kashkadarya Region",
            samarkand: "Samarkand Region",
            sirdarya: "Sirdarya Region",
            surxondarya: "Surxondarya Region",
            tashkentRegion: "Tashkent Region",
            khorezm: "Khorezm Region",
            karakalpakstan: "Karakalpakstan Republic",
          },
          home: {
            searchPlaceholder: "Search for the master you need",
            search: "Search",
            yearsExperience: "years of experience",
            servicePrice: "Service price",
            currency: "sum",
            order: "Order",
            categoriesTitle: "Our categories",
            topMasters: "Top masters",
            notFound: "Nothing found...",
          },
          categories: {
            construction: "Construction and repair",
            electricPlumbing: "Electrical and plumbing",
            coolingHeating: "Cooling and heating",
            camera: "Cameras",
            furniture: "Furniture and interior",
            autoServices: "Auto services",
            gardenServices: "Garden services",
            techGadgets: "Technology and gadgets",
          },
          footer: {
            language: "Language",
            aboutUs: "About Us",
            forAdvertisers: "For Advertisers",
            contactAdmin: "Contact Ustatop.uz Admin",
            support: "Support",
            personalAccount: "Personal Account",
            postAd: "Post Ad",
            adRules: "Ad Placement Rules",
            forPartnership: "For Partnership",
            home: "Home",
            category: "Category",
            postAdMobile: "Post Ad",
            profile: "Profile",
          },
          about: {
            title: "About Us",
            desc1:
              "<strong>Ustatop.uz</strong> – a modern platform connecting reliable masters and clients. Our mission is to make it easy and convenient to find masters, order services, and get quality results.",
            list1: "✅ Verified masters – only trusted specialists",
            list2: "✅ Ratings and reviews – ability to choose the best",
            list3: "✅ Quick order – save your time",
            list4:
              "✅ User-friendly interface – works equally well on phone and computer",
            desc2:
              "<strong>Our goal</strong> – to create a fair, transparent, and reliable system between client and master. <strong>Ustatop.uz</strong> – the most convenient and secure online platform connecting you with masters!",
          },
          advertisers: {
            title: "For advertisers",
            desc1:
              "Dear advertisers! Our platform allows you to <strong>reach more customers with your services</strong>, <strong>increase your workload</strong>, and <strong>gain stable income</strong>.",
            list1: "🔑 Personal account – manage and edit your ads",
            list2:
              "⭐ Rating system – if you provide quality service, customers will choose you",
            list3: "📊 Statistics – track how often your ads are being viewed",
            list4: "💬 Quick communication – connect directly with customers",
            desc2:
              "Promote your services with <strong>Ustatop.uz</strong> and gain new customers!",
          },
          support: {
            title: "Support Ustatop.uz",
            desc1:
              "Ustatop.uz is a free platform connecting masters and clients. Our goal is to simplify the services market and make it easier to find reliable masters. If you are satisfied with our work, you can contribute to the development of the site.",
            howTitle: "💵 How can you support?",
            how1: "📲 Via Payme, Click or other payment systems",
            how2: "💳 Bank card transfer",
            how3: "🤝 Sponsorship and advertising offers",
            paymentTitle: "🔗 Payment Methods",
            payme: "💸 Support via Payme | 9860 2466 0212 3183",
            visa: "💳 Support via Visa | 4231 2000 1086 4410",
            footer:
              "Your support helps us develop the platform, add new features, and create more convenience for both masters and clients. Thank you! 🙏",
          },
          rules: {
            title: "Ad Posting Rules",
            intro:
              "To maintain user trust and build a reliable marketplace, please follow these rules:",
            rule1:
              "Provide accurate and truthful information – misleading ads will be rejected.",
            rule2:
              "Post only services you personally provide or are authorized to offer.",
            rule3: "Treat clients and users with respect.",
            rule4: "Do not post illegal or inappropriate services.",
            rule5:
              "Upload only clear and real images – fake photos will be removed.",
            note: "🚀 Note: Ads that violate the rules may be removed without warning.",
          },
          partnership: {
            title: "🤝 For Partnership",
            desc1:
              "— is an innovative platform connecting masters and clients. We continuously work on improving service quality and user convenience.",
            intro: "If you:",
            point1: "Want to expand master services",
            point2: "Wish to collaborate in marketing and advertising",
            point3: "Want to propose technological solutions",
            point4: "Intend to invest or form a strategic partnership",
            desc2:
              "We would be happy to cooperate with you! Contact us via Telegram or email — together we will build a beneficial partnership.",
            contactBtn: "Contact us",
          },
          errors: {
            idNotFound: "ID not found",
            notFound: "Master profile not found",
            fetchFailed: "Error loading data",
          },
          general: {
            yearsOfExperience: "years of experience",
            ageUnit: "years",
            filesUnit: "files",
            noData: "No data",
          },
          buttons: {
            call: "Call",
          },
          sections: {
            generalInfo: "General Information",
            pricing: "Service Prices",
            about: "About the Master",
            contact: "Contact the Master",
            photos: "Works of the Master",
          },
          labels: {
            age: "Age",
            category: "Category",
            address: "Address",
            contactTime: "Available Time",
            salary: "Salary",
            files: "Number of files",
            postDate: "Posted on",
          },
          postAd: {
            title: "Post an Ad",
            yourInfo: {
              title: "Your Information",
              address: "Your Address",
              addressPlaceholder: "e.g., Khorezm region, Urgench city",
              fullName: "Full Name",
              fullNamePlaceholder: "Full Name",
              contactTime: "Contact Time",
              contactTimePlaceholder: "e.g., 24/7",
              category: "Categories (you can select one)",
              selectCategory: "Select Category",
              specialization: "Specialization (you can write multiple)",
              specializationPlaceholder: "e.g., Electrician, Plumber",
              price: "Service Price",
              pricePlaceholder: "e.g., 100,000 UZS",
              age: "Your Age",
              agePlaceholder: "e.g., 21",
              experience: "Your Experience",
              experiencePlaceholder: "e.g., 7 years",
              additionalInfo: "Additional Information",
              bio: "Bio",
              uploadPhoto: "Upload Photo",
              uploadHint: "You can upload 3 pictures.",
            },
            contactInfo: {
              title: "Contact Information",
              phone: "Phone Number",
              phonePlaceholder: "+998 _ _ _ _ _ _ _ _ _",
              telegram: "Telegram Username",
              telegramPlaceholder: "e.g., @Nazarov08",
            },
            agreement: {
              part1: "I agree to the ad posting rules",
              part2: "I agree.",
            },
            submitButton: "Post Ad",
          },
          category: {
            construction: "Construction and Repair",
            electrical: "Electrical and Plumbing",
            cooling: "Cooling and Heating Equipment",
            camera: "Cameras",
            furniture: "Furniture and Interior",
            auto: "Auto Services",
            garden: "Garden Services",
            tech: "Technology and Gadgets",
          },
          alert: {
            loginRequired: "Please log in to post an ad!",
            fillAllFields: "Please fill in all fields ❗",
            success: "Ad posted successfully ✅",
            error: "An error occurred, please try again ❌",
          },
          profileSidebar: {
            logoutError: "Logout error",
            uploadError: "Avatar upload error",
            avatarAlt: "Profile picture",
            uploading: "Uploading...",
            menu: {
              personalInfo: "Personal Information",
              myAds: "My Ads",
              favoriteAds: "Favorite Ads",
              tariffs: "Tariffs",
              rating: "Rating",
              logout: "Logout",
            },
          },
          personalInfo: {
            title: "Personal Information",
            buttons: {
              save: "Save",
              edit: "Edit",
            },
            fields: {
              firstName: {
                label: "First Name",
                placeholder: "Your first name",
              },
              lastName: {
                label: "Last Name",
                placeholder: "Your last name",
              },
              email: {
                label: "Email",
                placeholder: "name@gmail.com",
              },
              password: {
                label: "Password",
                placeholder: "* * * * * *",
              },
              address: {
                label: "Address",
                placeholder: "e.g., Tashkent region, Chilanzar",
              },
            },
            contact: {
              title: "Contact Information",
              phone: {
                label: "Phone Number",
                placeholder: "+998 ** *** ** **",
              },
              telegram: {
                label: "Telegram Username",
                placeholder: "@yourusername",
              },
            },
            alert: {
              noUser: "User not found",
              saved: "Data saved!",
              error: "An error occurred, please try again.",
            },
          },
          elons: {
            title: "My Ads",
            tabs: {
              active: "Active Ads",
              archived: "Archived Ads",
            },
            currency: "UZS",
            reviews: "{{count}} reviews",
            noData: "No data",
            userAlt: "User photo",
            noActiveAds: "No active ads...",
            archivedContent: "Archived ads content will appear here.",
            actions: {
              edit: "Edit",
              delete: "Delete",
            },
            alerts: {
              deleteSuccess: "Ad successfully deleted ✅",
              deleteError: "Error deleting ad ❌",
              updateSuccess: "Ad successfully edited ✅",
              updateError: "Error editing ad ❌",
            },
            errors: {
              fetchError: "Error fetching ads",
              deleteError: "Error deleting ad",
              updateError: "Error updating ad",
            },
            editForm: {
              title: "Edit Ad",
              fields: {
                name: {
                  label: "Full Name",
                  placeholder: "Full Name",
                },
                address: {
                  label: "Your Address",
                  placeholder: "e.g., Khorezm region, Urgench city",
                },
                specialization: {
                  label: "Specialization",
                  placeholder: "e.g., Electrician, Plumber",
                },
                price: {
                  label: "Service Price",
                  placeholder: "e.g., 100,000 UZS",
                },
                category: {
                  label: "Category",
                  placeholder: "e.g., Construction and Repair",
                },
                contactTime: {
                  label: "Contact Time",
                  placeholder: "e.g., 24/7",
                },
                age: {
                  label: "Your Age",
                  placeholder: "e.g., 21",
                },
                experience: {
                  label: "Your Experience",
                  placeholder: "e.g., 7 years",
                },
                phone: {
                  label: "Phone Number",
                  placeholder: "+998 _ _ _ _ _ _ _ _ _",
                },
                telegram: {
                  label: "Telegram Username",
                  placeholder: "e.g., @Nazarov08",
                },
                bio: {
                  label: "Additional Information",
                  placeholder: "Bio",
                },
              },
              buttons: {
                save: "Save",
                cancel: "Cancel",
              },
            },
          },
          favorites: {
            title: "Favorite Ads",
            defaultCategory: "Construction and Repair",
            defaultPrice: "1,000,000 UZS",
            defaultServices: "Master's Services",
            noAddress: "Address not specified",
            reviews: "{{count}} reviews",
            noFavorites: "No favorite masters yet",
            userAlt: "User photo",
            actions: {
              remove: "Remove",
              view: "View",
            },
            goToList: "Go to Masters List",
            errors: {
              fetchError: "Error fetching favorites",
              removeError: "Error removing from favorites",
            },
          },
          tariffs: {
            title: "Pricing Plans for Ads",
            period: "/month",
            mostPopular: "Most Popular",
            starter: {
              name: "Starter",
              description: "Ideal for getting started",
              price: "0 UZS",
              features: [
                "Post 1 ad",
                "Ad active for 7 days",
                "Basic information displayed",
                "Lower in search results",
              ],
              buttonText: "Get Started",
            },
            pro: {
              name: "Pro Master",
              description: "For professional masters",
              price: "29,000 UZS",
              features: [
                "Post 5 ads",
                "Ad active for 14 days",
                "Full profile and portfolio",
                "Higher in search results",
                "Customer reviews",
              ],
              buttonText: "Buy Now",
            },
            premium: {
              name: "Top Master",
              description: "For the best masters",
              price: "49,000 UZS",
              features: [
                "Unlimited ads posting",
                "Ad active for 30 days",
                "Premium profile appearance",
                "First page in search results",
                "Vip badge and advertising",
              ],
              buttonText: "Buy Now",
            },
          },
          auth: {
            loginTitle: "Login",
            registerTitle: "Create Account",
            loginSubtitle: "Sign in to use our service",
            registerSubtitle: "Register to use our service",

            firstName: "First Name",
            lastName: "Last Name",
            firstNamePlaceholder: "Your first name",
            lastNamePlaceholder: "Your last name",

            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            passwordPlaceholder: "Your password",
            passwordMinLength: "At least 8 characters",
            confirmPasswordPlaceholder: "Repeat your password",

            rememberMe: "Remember me",
            forgotPassword: "Forgot password?",

            agreeToTerms: "I agree to the",
            termsAndConditions: "terms and conditions",

            loading: "Loading...",
            loginButton: "Login",
            registerButton: "Register",

            noAccount: "Don’t have an account?",
            haveAccount: "Already have an account?",
            registerHere: "Register here",
            loginHere: "Login here",

            success: {
              login: "Logged in successfully!",
              register: "Account created successfully!",
            },
            errors: {
              passwordMismatch: "Passwords do not match",
              general: "An error occurred. Please try again.",
            },
          },
        },
      },
    },
  });

export default i18n;
