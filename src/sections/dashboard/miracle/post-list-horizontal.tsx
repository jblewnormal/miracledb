import type { Miracle } from 'src/types/db';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

import { PostItemSkeleton } from './post-skeleton';
import { PostItemHorizontal } from './post-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  miracles: Miracle[];
  loading?: boolean;
};

export function PostListHorizontal({ miracles, loading }: Props) {
  const renderLoading = () => <PostItemSkeleton variant="horizontal" />;

  const renderList = () =>
    miracles.map((miracle) => (
      <PostItemHorizontal
        key={miracle.id}
        miracle={miracle}
        detailsHref={paths.dashboard.miracle.details(miracle.title)}
        editHref={paths.dashboard.miracle.edit(miracle.title)}
      />
    ));

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      {miracles.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
