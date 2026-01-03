import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbannxrpeeydyddlungm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiYW5ueHJwZWV5ZHlkZGx1bmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5Mjk1MDcsImV4cCI6MjA4MjUwNTUwN30.9NAKtGYzc5BO8ALk8IbgqvEBu8JAN9PgwvDO6TBYfwc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)