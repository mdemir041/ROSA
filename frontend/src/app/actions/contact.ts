'use server';

import { contactSchema } from '@/lib/security/contact-schema';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { headers } from 'next/headers';

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactFormAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const headersList = await headers();
    const clientIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'anonymous-client';

    const rateLimit = checkRateLimit(clientIp, 5, 60000);
    if (!rateLimit.success) {
      return {
        success: false,
        error: 'Çok fazla istek gönderdiniz. Lütfen 1 dakika sonra tekrar deneyin.',
      };
    }

    const rawData = {
      name: (formData.get('name') as string) || '',
      contact: (formData.get('contact') as string) || '',
      subject: (formData.get('subject') as string) || '',
      message: (formData.get('message') as string) || '',
    };

    const validationResult = contactSchema.safeParse(rawData);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Lütfen tüm alanları doğru doldurun.';
      return {
        success: false,
        error: firstError,
      };
    }

    // Process validated & sanitized data securely
    const sanitizedData = validationResult.data;
    
    // Post to Strapi
    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      const strapiResponse = await fetch(`${strapiUrl}/api/contact-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: sanitizedData.name,
            contact: sanitizedData.contact,
            subject: sanitizedData.subject,
            message: sanitizedData.message,
            isRead: false
          }
        }),
      });

      if (!strapiResponse.ok) {
        throw new Error('Strapi API returned an error');
      }
    } catch (apiError) {
      console.error('[API-ERROR] Failed to save contact message to Strapi:', apiError);
      return {
        success: false,
        error: 'Sistemde geçici bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      };
    }

    console.log('[SECURITY-LOG] Secure Contact Form Submitted:', {
      ip: clientIp,
      contact: sanitizedData.contact,
      messageLength: sanitizedData.message.length,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Mesajınız %100 gizlilik ilkesiyle güvenle iletildi.',
    };
  } catch {
    return {
      success: false,
      error: 'Güvenlik doğrulaması sırasında bir sorun oluştu. Lütfen tekrar deneyin.',
    };
  }
}
