import { z } from 'zod';

export function sanitizeInput(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export const contactSchema = z.object({
  name: z
    .string()
    .max(100, { message: 'İsim / Rumuz 100 karakterden uzun olamaz.' })
    .transform(sanitizeInput)
    .optional(),
  contact: z
    .string()
    .min(3, { message: 'Lütfen geçerli bir e-posta veya telefon numarası girin.' })
    .max(150, { message: 'İletişim bilgisi çok uzun.' })
    .transform(sanitizeInput),
  subject: z
    .string()
    .min(2, { message: 'Lütfen başvurulacak konuyu seçiniz.' })
    .max(50, { message: 'Geçersiz konu seçimi.' })
    .transform(sanitizeInput),
  message: z
    .string()
    .min(10, { message: 'Mesajınız en az 10 karakter olmalıdır.' })
    .max(2000, { message: 'Mesajınız en fazla 2000 karakter olabilir.' })
    .transform(sanitizeInput),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
