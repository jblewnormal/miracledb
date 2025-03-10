'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MiracleNewEditForm } from '../miracle-new-edit-form';

// ----------------------------------------------------------------------

export function MiracleCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new miracle"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Miracle', href: paths.dashboard.miracle.root },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MiracleNewEditForm />
    </DashboardContent>
  );
}
