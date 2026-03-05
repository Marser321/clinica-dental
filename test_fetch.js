require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_INSFORGE_BASE_URL,
    process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY
);

async function check() {
    const { data, error } = await supabase
        .from('appointments')
        .select(`
            id,
            status,
            time_range,
            notes,
            patients(first_name, last_name, phone),
            services(name, duration_minutes)
        `)
        .order('created_at', { ascending: false });

    console.log("Error:", error);
    console.log("Data:", JSON.stringify(data, null, 2));
}

check();
