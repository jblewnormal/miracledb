import { AuthSplitLayout } from 'src/layouts/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthSplitLayout>{children}</AuthSplitLayout>;
}
