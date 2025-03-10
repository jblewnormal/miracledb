'use client';

import type { Miracle } from 'src/types/db';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MiracleNewEditForm } from '../miracle-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  miracle?: Miracle;
};

export function MiracleEditView({ miracle }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.miracle.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Miracles', href: paths.dashboard.miracle.root },
          { name: miracle?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MiracleNewEditForm currentMiracle={miracle} />
    </DashboardContent>
  );
}
