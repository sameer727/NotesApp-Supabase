import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mvduplliweacblncyzjo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12ZHVwbGxpd2VhY2JsbmN5empvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzQ5ODksImV4cCI6MjA2NjcxMDk4OX0.ybArOCdIsiBHhJomON-UzDu4SFtxXhE4QNbuMT-OOYg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 