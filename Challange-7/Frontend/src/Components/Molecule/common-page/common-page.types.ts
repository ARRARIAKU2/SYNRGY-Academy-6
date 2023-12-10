import { BoxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ICommonPageProps extends BoxProps {
  actionElement?: ReactNode;
  title?: string;
  withBack?: boolean;
}
