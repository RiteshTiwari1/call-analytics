import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserChartData {
  id?: string
  email: string
  chart_data: Record<string, number[]>
  created_at?: string
  updated_at?: string
}

export async function getUserChartData(email: string): Promise<UserChartData | null> {
  const { data, error } = await supabase
    .from('user_chart_data')
    .select('*')
    .eq('email', email)
    .single()

  if (error) return null
  return data
}

export async function saveUserChartData(email: string, chartData: Record<string, number[]>): Promise<boolean> {
  const existing = await getUserChartData(email)

  if (existing) {
    const { error } = await supabase
      .from('user_chart_data')
      .update({ chart_data: chartData, updated_at: new Date().toISOString() })
      .eq('email', email)
    return !error
  } else {
    const { error } = await supabase
      .from('user_chart_data')
      .insert({ email, chart_data: chartData })
    return !error
  }
}
