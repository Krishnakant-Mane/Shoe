
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qywalridbnftyzglkgat.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5d2FscmlkYm5mdHl6Z2xrZ2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjQ3MTYsImV4cCI6MjA4NjIwMDcxNn0.P-E54t2W8PMdjlWS8BDR_J6X0s_tTlXipEHGuuiPm0o";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchProducts() {
    try {
        const { data, error } = await supabase.from('products').select('*').limit(1);
        if (error) {
            console.error('Error:', error.message);
        } else if (data.length > 0) {
            console.log('KEYS:', Object.keys(data[0]).join(', '));
            const p = data[0];
            console.log('IMAGE FIELDS:', JSON.stringify({
                image: p.image,
                images: p.images,
                image_url: p.image_url,
                thumbnail: p.thumbnail,
                url: p.url,
                picture: p.picture
            }, null, 2));
        } else {
            console.log('No products found.');
        }
    } catch (err) {
        console.error('Exception:', err);
    }
}

fetchProducts();
