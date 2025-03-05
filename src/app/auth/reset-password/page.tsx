import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SupabaseResetPasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseResetPasswordView />;
}
