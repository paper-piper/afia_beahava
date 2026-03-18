import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function ensureOrdersTableExists() {
  try {
    // Check if table exists by trying to query it
    const { error } = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })

    if (error?.code === 'PGRST205') {
      // Table doesn't exist, create it using SQL
      console.log('Creating orders table...')
      const { error: createError } = await supabase.rpc('http_request', {
        method: 'POST',
        url: `${supabaseUrl}/rest/v1/rpc/sql`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
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
          `
        })
      }).catch(() => ({ error: null }))

      if (createError) {
        console.log('Could not auto-create table with RPC')
      }
    }
  } catch (err) {
    console.error('Error checking/creating table:', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, cakeType, message } = body

    // Ensure table exists first
    await ensureOrdersTableExists()

    // Insert the order
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          name,
          phone,
          cake_type: cakeType,
          message,
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('[v0] Supabase POST error:', error)
      
      // If table doesn't exist error, give user instruction
      if (error.code === 'PGRST205') {
        return NextResponse.json(
          { 
            error: 'Database table not initialized. Please run setup in Supabase dashboard.',
            code: 'TABLE_NOT_FOUND'
          },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    console.log('[v0] Order created successfully:', data)
    return NextResponse.json({
      success: true,
      order: data,
    })
  } catch (error) {
    console.error('[v0] Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Ensure table exists first
    await ensureOrdersTableExists()

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Supabase GET error:', error)
      
      // If table doesn't exist error, give user instruction
      if (error.code === 'PGRST205') {
        return NextResponse.json(
          { 
            orders: [],
            error: 'Database table not initialized',
            code: 'TABLE_NOT_FOUND'
          }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch orders', orders: [] },
        { status: 500 }
      )
    }

    console.log('[v0] Orders fetched:', data?.length || 0)
    return NextResponse.json({ orders: data || [] })
  } catch (error) {
    console.error('[v0] Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error', orders: [] },
      { status: 500 }
    )
  }
}

