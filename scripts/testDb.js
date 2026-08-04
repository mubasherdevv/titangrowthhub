const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rnkypvjkrprdxsfeivbi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3lwdmprcnByZHhzZmVpdmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDUzNzksImV4cCI6MjEwMTQyMTM3OX0.pz61FrSoohj-wm_n-d2fSQHTze8L_c0hAi_yqaJt7As';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check(tableName) {
  const { data, error } = await supabase.from(tableName).select('*').limit(1);
  if (error) {
    console.log(`Table '${tableName}' error/does not exist:`, error.message);
  } else {
    console.log(`Table '${tableName}' EXISTS. Sample:`, data);
  }
}

async function test() {
  await check('global_seo');
  await check('seo');
  await check('site_settings');
  await check('options');
}

test();
