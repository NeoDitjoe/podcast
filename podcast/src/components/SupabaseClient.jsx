/* this code sets up authentication using Supabase and integrates the Supabase authentication UI component into a React application.
The Auth component provides a ready-to-use UI for authentication, and the Supabase client instance is configured to interact with the Supabase backend.
The Supa component can be used to display the authentication UI within the application.*/
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