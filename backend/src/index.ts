// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    // Automatically grant public access to the custom APIs during development
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
        populate: ['permissions'],
      });

      if (publicRole) {
        const permissionsToGrant = [
          'api::haber.haber.find',
          'api::haber.haber.findOne',
          'api::haber.haber.create',
          'api::haber.haber.update',
          'api::haber.haber.delete',
          'api::rapor.rapor.find',
          'api::rapor.rapor.findOne',
          'api::rapor.rapor.create',
          'api::rapor.rapor.update',
          'api::rapor.rapor.delete',
          'api::banka-hesabi.banka-hesabi.find',
          'api::banka-hesabi.banka-hesabi.findOne',
          'api::banka-hesabi.banka-hesabi.create',
          'api::banka-hesabi.banka-hesabi.update',
          'api::banka-hesabi.banka-hesabi.delete',
          'api::slider.slider.find', 'api::slider.slider.findOne', 'api::slider.slider.create', 'api::slider.slider.update', 'api::slider.slider.delete',
          'api::module.module.find', 'api::module.module.findOne', 'api::module.module.create', 'api::module.module.update', 'api::module.module.delete',
          'api::gallery.gallery.find', 'api::gallery.gallery.findOne', 'api::gallery.gallery.create', 'api::gallery.gallery.update', 'api::gallery.gallery.delete',
          'api::announcement.announcement.find', 'api::announcement.announcement.findOne', 'api::announcement.announcement.create', 'api::announcement.announcement.update', 'api::announcement.announcement.delete',
          'api::faq.faq.find', 'api::faq.faq.findOne', 'api::faq.faq.create', 'api::faq.faq.update', 'api::faq.faq.delete',
          'api::site-setting.site-setting.find', 'api::site-setting.site-setting.create', 'api::site-setting.site-setting.update', 'api::site-setting.site-setting.delete',
          'api::contact-message.contact-message.create', 'api::contact-message.contact-message.find', 'api::contact-message.contact-message.findOne', 'api::contact-message.contact-message.update', 'api::contact-message.contact-message.delete',
          'api::iletisim.iletisim.create', 'api::iletisim.iletisim.find', 'api::iletisim.iletisim.findOne', 'api::iletisim.iletisim.update', 'api::iletisim.iletisim.delete',
          'api::media.media.find', 'api::media.media.findOne', 'api::media.media.create', 'api::media.media.update', 'api::media.media.delete',
          'api::team-member.team-member.find', 'api::team-member.team-member.findOne', 'api::team-member.team-member.create', 'api::team-member.team-member.update', 'api::team-member.team-member.delete',
          'api::nav-translation.nav-translation.find', 'api::nav-translation.nav-translation.findOne', 'api::nav-translation.nav-translation.create', 'api::nav-translation.nav-translation.update', 'api::nav-translation.nav-translation.delete',
          'api::event.event.find', 'api::event.event.findOne', 'api::event.event.create', 'api::event.event.update', 'api::event.event.delete',
        ];

        for (const action of permissionsToGrant) {
          const exists = publicRole.permissions.find((p: any) => p.action === action);
          if (!exists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
              },
            });
            strapi.log.info(`Granted ${action} to Public role`);
          }
        }
      }
    } catch (err) {
      strapi.log.error('Failed to grant public permissions:', err);
    }
  },
};
