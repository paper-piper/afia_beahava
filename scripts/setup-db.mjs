import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log('Setting up orders table...')
    
    // Create the orders table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.orders (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          cake_type TEXT,
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'pending'
        );
        
        CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at DESC);
        CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders(status);
      `
    })

    if (error) {
      console.log('RPC method not available, trying direct SQL...')
      // If RPC doesn't work, we'll handle it differently
    } else {
      console.log('Orders table created successfully!')
    }
  } catch (err) {
    console.error('Error setting up database:', err)
  }
}

setupDatabase()
