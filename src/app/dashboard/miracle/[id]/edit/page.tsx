import type { Metadata } from 'next';

import { kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';
import { supabase } from 'src/lib/supabase';

import { MiracleEditView } from 'src/sections/dashboard/miracle/view/miracle-edit-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Miracle edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const { miracle } = await getMiracle(id);

  return <MiracleEditView miracle={miracle} />;
}

// ----------------------------------------------------------------------

async function getMiracle(title: string) {
  const { data, error } = await supabase.from('miracles').select();

  return data;
}

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const res = await axios.get(endpoints.post.list);

    return res.data.posts.map((post: { title: string }) => ({ title: kebabCase(post.title) }));
  }
  return [];
}
