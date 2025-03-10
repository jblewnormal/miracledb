import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MiracleCreateView } from 'src/sections/dashboard/miracle/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Create a new miracle | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <MiracleCreateView />;
}
