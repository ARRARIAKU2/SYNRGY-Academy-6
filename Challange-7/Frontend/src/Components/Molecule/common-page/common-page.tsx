import { CommonPageContainer, CommonPageHeader } from './common-page.styled';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { ICommonPageProps } from './common-page.types';

export default function CommonPage({
  children,
  actionElement,
  title,
  withBack,
  ...boxProps
}: ICommonPageProps) {
  const navigate = useNavigate();
  return (
    <Box {...boxProps}>
      <div>
        <h2>{title}</h2>
      </div>
      <CommonPageContainer>
        <CommonPageHeader>
          <Box>
            {withBack && (
              <Button
                startIcon={<ArrowBack />}
                type="button"
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            )}
          </Box>
          <Box>{actionElement}</Box>
        </CommonPageHeader>
        {children}
      </CommonPageContainer>
    </Box>
  );
}
