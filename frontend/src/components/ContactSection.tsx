'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Phone, Mail, ShieldCheck, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactContent, UIStrings } from '@/types/cms';
import { submitContactFormAction } from '@/app/actions/contact';
import { contactSchema, ContactSchemaType } from '@/lib/security/contact-schema';

interface ContactSectionProps {
  contact: ContactContent;
  ui: UIStrings;
}

export default function ContactSection({ contact, ui }: ContactSectionProps): React.JSX.Element {
  const [formStatus, setFormStatus] = useState<{ state: 'idle' | 'success' | 'error'; error: string }>({
    state: 'idle',
    error: '',
  });
  const [isPending, startTransition] = useTransition();

  const [dynamicContact, setDynamicContact] = useState(contact);
  const [socials, setSocials] = useState({
    instagram: 'https://instagram.com/rosakadindernegi',
    twitter: 'https://twitter.com/rosakadinderne1',
    facebook: 'https://www.facebook.com/rosakadin',
    youtube: 'https://youtube.com',
    pinterest: 'https://pinterest.com',
    telegram: 'https://telegram.org'
  });

  useEffect(() => {
    fetch('/api/strapi/iletisims')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          setDynamicContact(prev => ({
            ...prev,
            phone: item.phone || prev.phone,
            email: item.email || prev.email,
            address: item.address || prev.address
          }));
          setSocials(prev => ({
            instagram: item.instagram || prev.instagram,
            twitter: item.twitter || prev.twitter,
            facebook: item.facebook || prev.facebook,
            youtube: item.youtube || prev.youtube,
            pinterest: item.pinterest || prev.pinterest,
            telegram: item.telegram || prev.telegram
          }));
        }
      })
      .catch(console.error);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      contact: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactSchemaType): void => {
    setFormStatus({ state: 'idle', error: '' });

    const payload = new FormData();
    if (data.name) payload.append('name', data.name);
    payload.append('contact', data.contact);
    payload.append('message', data.message);

    startTransition(async () => {
      const response = await submitContactFormAction(null, payload);
      if (response.success) {
        setFormStatus({ state: 'success', error: '' });
        reset();
      } else {
        setFormStatus({ state: 'error', error: response.error || ui.formError });
      }
    });
  };

  const rawPhone = dynamicContact.phone.replace(/\s+/g, '');

  return (
    <section id="iletisim" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5 space-y-10 animate-cinematic-reveal">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 text-[#18151A] dark:text-white">{dynamicContact.title}</h2>
            <p className="text-[#5A5260] dark:text-[#B2AAC0] text-lg font-medium mb-8">{dynamicContact.desc}</p>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5A5260] dark:text-[#B2AAC0] mb-2">{ui.socialMedia}</div>
            <div className="flex flex-wrap gap-3">
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#1877F2] hover:scale-110 transition-all shadow-sm group">
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
                </a>
              )}
              {socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noreferrer" title="YouTube" className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#FF0000] hover:scale-110 transition-all shadow-sm group">
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#E1306C] hover:scale-110 transition-all shadow-sm group">
                  <svg className="w-5 h-5 stroke-current fill-none stroke-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noreferrer" title="Twitter / X" className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#18151A] dark:text-white hover:scale-110 transition-all shadow-sm group">
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {socials.pinterest && (
                <a href={socials.pinterest} target="_blank" rel="noreferrer" title="Pinterest" className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#E60023] hover:scale-110 transition-all shadow-sm group">
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.433 2.981 7.433 6.963 0 4.156-2.63 7.502-6.282 7.502-1.222 0-2.367-.635-2.763-1.383l-.752 2.865c-.272 1.043-.999 2.348-1.491 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/></svg>
                </a>
              )}
              {socials.telegram && (
                <a href={socials.telegram} target="_blank" rel="noreferrer" title="Telegram" className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#0088cc] hover:scale-110 transition-all shadow-sm group">
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <a
              href={`tel:${rawPhone}`}
              className="flex items-center justify-between glass-panel p-5 rounded-2xl border border-black/5 dark:border-white/10 hover:border-[#FF6B5B]/50 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#FF6B5B]/10 rounded-xl flex items-center justify-center border border-[#FF6B5B]/20 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-[#FF6B5B]" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-1">{dynamicContact.phoneTitle}</div>
                  <div className="text-lg font-black tracking-widest text-[#18151A] dark:text-white group-hover:text-[#FF6B5B] transition-colors">{dynamicContact.phone}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#5A5260] dark:text-[#B2AAC0] group-hover:text-[#FF6B5B] transition-colors opacity-70 group-hover:opacity-100" />
            </a>

            <a
              href={`mailto:${dynamicContact.email}`}
              className="flex items-center justify-between glass-panel p-5 rounded-2xl border border-black/5 dark:border-white/10 hover:border-[#76BA5B]/50 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#76BA5B]/10 rounded-xl flex items-center justify-center border border-[#76BA5B]/20 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#76BA5B]" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-1">{dynamicContact.emailTitle}</div>
                  <div className="text-base font-bold text-[#18151A] dark:text-white group-hover:text-[#76BA5B] transition-colors">{dynamicContact.email}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#5A5260] dark:text-[#B2AAC0] group-hover:text-[#76BA5B] transition-colors opacity-70 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-10 md:p-14 rounded-[3rem] animate-cinematic-reveal border border-black/5 dark:border-white/10 shadow-2xl bg-gradient-to-br from-white/20 to-transparent flex flex-col justify-center min-h-[500px]">
          {formStatus.state === 'success' ? (
            <div className="text-center">
              <CheckCircle className="w-20 h-20 text-[#76BA5B] mx-auto mb-8" />
              <h3 className="text-3xl font-serif font-black text-[#18151A] dark:text-white mb-4">{ui.formSuccessTitle}</h3>
              <p className="text-[#5A5260] dark:text-[#B2AAC0] text-lg mb-10">{ui.formSuccessDesc}</p>
              <button
                onClick={() => setFormStatus({ state: 'idle', error: '' })}
                className="bg-[#3D154B] dark:bg-white text-white dark:text-[#0F0C12] font-black uppercase tracking-widest py-4 px-10 rounded-xl hover:bg-[#5A206E] transition-all"
              >
                {ui.btnNewMsg}
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-2xl font-black mb-8 text-[#18151A] dark:text-white flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#76BA5B]" /> {ui.formTitle}
              </h3>
              {formStatus.error && <div className="text-red-500 text-sm font-bold mb-4">{formStatus.error}</div>}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-2">{ui.labelName}</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-5 text-[#18151A] dark:text-white outline-none focus:border-[#3D154B] dark:focus:border-[#FF6B5B] transition-all"
                  placeholder={ui.pl1}
                />
                {errors.name && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-2">{ui.labelChan}</label>
                <input
                  type="text"
                  {...register('contact')}
                  className="w-full bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-5 text-[#18151A] dark:text-white outline-none focus:border-[#3D154B] dark:focus:border-[#FF6B5B] transition-all"
                  placeholder={ui.pl2}
                />
                {errors.contact && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.contact.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-2">{ui.labelMsg}</label>
                <textarea
                  rows={4}
                  {...register('message')}
                  className="w-full bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-5 text-[#18151A] dark:text-white outline-none focus:border-[#3D154B] dark:focus:border-[#FF6B5B] transition-all resize-none"
                  placeholder={ui.pl3}
                />
                {errors.message && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#3D154B] dark:bg-white text-white dark:text-[#0F0C12] font-black uppercase tracking-[0.2em] py-5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : ui.btnSend}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
