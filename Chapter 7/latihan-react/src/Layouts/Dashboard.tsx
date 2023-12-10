import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Avatar, Box, Divider, MenuItem, MenuList, Stack } from '@mui/material';

interface IDashboardProps extends PropsWithChildren { }

const DashboardContainerStyled = styled.div`
  height: 100vh;
  background: #f2f2f2;
`;
const SidebarStyled = styled.aside`
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;

  z-index: 20;
`;
const MainStyled = styled.main`
  height: 100%;
  overflow-y: auto;
  padding-left: 250px;
`;

const MainPageStyled = styled.div`
  padding: 1rem;
`;

function Dashboard({ children }: IDashboardProps) {
    const handleLogout = () => {
        const c = confirm('are you sure want to logout?');
        if (c) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    return (
        <DashboardContainerStyled>
            <SidebarStyled>
                <Box sx={{ position: 'relative', height: '100%' }}>
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                        <MenuList>
                            <Divider />
                            <MenuItem sx={{ py: 1 }} onClick={handleLogout}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar>H</Avatar>
                                    <Box>Username</Box>
                                </Stack>
                            </MenuItem>
                        </MenuList>
                    </Box>
                </Box>
            </SidebarStyled>
            <MainStyled>
                <MainPageStyled>{children}</MainPageStyled>
            </MainStyled>
        </DashboardContainerStyled>
    );
}

export default Dashboard;
