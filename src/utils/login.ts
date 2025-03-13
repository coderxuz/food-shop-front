export const formatPhoneNumber = (value: string): string => {
  // Faqat raqam va + belgisi qoldiriladi
  let digits = value.replace(/[^\d+]/g, "");

  // Agar `+998` bilan boshlanmasa, uni qo‘shamiz
  if (!digits.startsWith("+998")) {
    digits = "+998";
  }

  // `+998` dan keyingi raqamlarni olib tashlash
  let cleanDigits = digits.replace(/\D/g, "").slice(3); // `+998` dan keyingi raqamlar

  // 9 tadan ortiq raqam bo‘lsa, faqat birinchisini olamiz
  cleanDigits = cleanDigits.slice(0, 9);

  // Raqamlarni formatlash
  let formatted = "+998";
  if (cleanDigits.length > 0) formatted += ` ${cleanDigits.slice(0, 2)}`;
  if (cleanDigits.length > 2) formatted += ` ${cleanDigits.slice(2, 5)}`;
  if (cleanDigits.length > 5) formatted += ` ${cleanDigits.slice(5, 7)}`;
  if (cleanDigits.length > 7) formatted += ` ${cleanDigits.slice(7, 9)}`;

  return formatted;
};
