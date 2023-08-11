import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, } from '@supabase/auth-ui-shared'

export const Supabase = createClient(
  "https://gmgtygfxvqwgjshsjkrz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZ3R5Z2Z4dnF3Z2pzaHNqa3J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTEzNjYwMiwiZXhwIjoyMDA2NzEyNjAyfQ.iwjXvZwcDl_GOGK6xRwJCcbaOcBQ05voYoeVtDALkok")


  export default function Supa() {
  return (
    <Auth
      supabaseClient={Supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  )
}