// Create orders table in Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function createOrdersTable() {
  try {
    // Create the table
    const { error: tableError } = await supabase.rpc('create_orders_table_if_not_exists', {})
    
    if (tableError) {
      console.error('Error creating table:', tableError)
      return
    }
    
    console.log('Orders table created successfully')
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the migration
createOrdersTable()
