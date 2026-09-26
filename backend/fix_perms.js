
const Database = require('better-sqlite3');
const db = new Database('.tmp/data.db');

try {
  // Get Public Role ID
  const role = db.prepare('SELECT id FROM up_roles WHERE type = ?').get('public');
  if (!role) throw new Error('Public role not found');
  console.log('Public role ID:', role.id);

  // Check if upload permission exists in up_permissions
  let perm = db.prepare('SELECT id FROM up_permissions WHERE action = ?').get('plugin::upload.api.upload');
  
  if (!perm) {
    console.log('Permission not found in up_permissions, creating it...');
    const result = db.prepare('INSERT INTO up_permissions (action, created_at, updated_at) VALUES (?, datetime('now'), datetime('now'))').run('plugin::upload.api.upload');
    perm = { id: result.lastInsertRowid };
    console.log('Created permission with ID:', perm.id);
  } else {
    console.log('Permission exists in up_permissions with ID:', perm.id);
  }

  // Check if link exists
  const link = db.prepare('SELECT id FROM up_permissions_role_lnk WHERE permission_id = ? AND role_id = ?').get(perm.id, role.id);
  
  if (!link) {
    console.log('Link not found, creating it...');
    db.prepare('INSERT INTO up_permissions_role_lnk (permission_id, role_id) VALUES (?, ?)').run(perm.id, role.id);
    console.log('Successfully linked permission to public role!');
  } else {
    console.log('Link already exists!');
  }
} catch(err) {
  console.error(err);
}
db.close();

