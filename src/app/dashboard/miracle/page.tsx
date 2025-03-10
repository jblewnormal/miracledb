import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MiracleListView } from 'src/sections/dashboard/miracle/view/miracle-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Miracle list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <MiracleListView />;
}
