import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['tr'],
    translations: {
      tr: {
        'app.components.LeftMenu.navbrand.title': 'Rosa Kadın Derneği',
        'app.components.LeftMenu.navbrand.workplace': 'Yönetim Paneli',
        'Auth.form.welcome.title': 'Rosa Kadın Derneği',
        'Auth.form.welcome.subtitle': 'Yönetim paneline giriş yapın',
      },
      en: {
        'app.components.LeftMenu.navbrand.title': 'Rosa Kadın Derneği',
        'app.components.LeftMenu.navbrand.workplace': 'Management Panel',
        'Auth.form.welcome.title': 'Rosa Kadın Derneği',
        'Auth.form.welcome.subtitle': 'Log in to your account',
      },
    }
  },
  bootstrap(app: StrapiApp) {
    // Force the browser tab title
    if (typeof document !== 'undefined') {
      document.title = 'Rosa Kadın Derneği';
      
      // Attempt to prevent React Helmet from reverting it to "Strapi"
      const observer = new MutationObserver(() => {
        if (!document.title.includes('Rosa Kadın Derneği')) {
          document.title = 'Rosa Kadın Derneği';
        }
      });
      observer.observe(document.querySelector('title') || document.head, { childList: true, characterData: true, subtree: true });

      // Intercept logo click to open frontend in new tab
      const redirectLogo = () => {
        const links = document.querySelectorAll('nav a');
        links.forEach(link => {
          if ((link.innerHTML.includes('Yönetim Paneli') || link.innerHTML.includes('Management Panel')) && !link.hasAttribute('data-custom-link')) {
            link.setAttribute('data-custom-link', 'true');
            link.setAttribute('title', 'Ana Sayfaya Git (Yeni Sekme)');
            link.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const frontendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                ? 'http://localhost:3000' 
                : window.location.origin.replace('admin.', '').replace(':1337', '');
              window.open(frontendUrl, '_blank');
            }, true);
          }
        });
      };

      const navObserver = new MutationObserver(() => {
        redirectLogo();
      });
      navObserver.observe(document.body, { childList: true, subtree: true });
    }
  },
};
