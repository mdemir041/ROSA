const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src', 'api');

const apis = [
  {
    name: 'application',
    singularName: 'application',
    pluralName: 'applications',
    displayName: 'Application',
    attributes: {
      name: { type: 'string', required: true },
      surname: { type: 'string', required: true },
      topic: { type: 'text', required: true },
      supportType: { type: 'enumeration', enum: ['Sosyal', 'Hukuki', 'Psikolojik'], required: true },
      phone: { type: 'string', required: true },
      isEmergency: { type: 'boolean', default: false },
    }
  },
  {
    name: 'event',
    singularName: 'event',
    pluralName: 'events',
    displayName: 'Event',
    attributes: {
      title: { type: 'string', required: true },
      date: { type: 'datetime', required: true },
      type: { type: 'enumeration', enum: ['Etkinlik', 'Dava'], required: true },
      description: { type: 'text' },
      locationOrLink: { type: 'string' },
      imgUrl: { type: 'string' }
    }
  },
  {
    name: 'article',
    singularName: 'article',
    pluralName: 'articles',
    displayName: 'Article',
    attributes: {
      title: { type: 'string', required: true },
      slug: { type: 'uid', targetField: 'title', required: true },
      category: { type: 'enumeration', enum: ['Icerik', 'Bilgilendirme'], required: true },
      subcategory: { type: 'string' },
      content: { type: 'richtext', required: true },
      imgUrl: { type: 'string' }
    }
  }
];

apis.forEach(api => {
  const baseDir = path.join(apiDir, api.name);
  
  // Create directories
  fs.mkdirSync(path.join(baseDir, 'content-types', api.name), { recursive: true });
  fs.mkdirSync(path.join(baseDir, 'controllers'), { recursive: true });
  fs.mkdirSync(path.join(baseDir, 'routes'), { recursive: true });
  fs.mkdirSync(path.join(baseDir, 'services'), { recursive: true });

  // 1. schema.json
  const schema = {
    kind: 'collectionType',
    collectionName: api.pluralName,
    info: {
      singularName: api.singularName,
      pluralName: api.pluralName,
      displayName: api.displayName,
    },
    options: {
      draftAndPublish: true,
    },
    pluginOptions: {},
    attributes: api.attributes
  };
  fs.writeFileSync(
    path.join(baseDir, 'content-types', api.name, 'schema.json'),
    JSON.stringify(schema, null, 2)
  );

  // 2. controller
  const controller = `/**
 * ${api.name} controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::${api.name}.${api.name}');
`;
  fs.writeFileSync(path.join(baseDir, 'controllers', `${api.name}.ts`), controller);

  // 3. route
  const route = `/**
 * ${api.name} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${api.name}.${api.name}');
`;
  fs.writeFileSync(path.join(baseDir, 'routes', `${api.name}.ts`), route);

  // 4. service
  const service = `/**
 * ${api.name} service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${api.name}.${api.name}');
`;
  fs.writeFileSync(path.join(baseDir, 'services', `${api.name}.ts`), service);

  console.log(`Created API: ${api.name}`);
});
