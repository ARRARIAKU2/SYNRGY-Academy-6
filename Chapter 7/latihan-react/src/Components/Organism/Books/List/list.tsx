import {
    Box,
    Button,
    CircularProgress,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import useAction from './list.hooks';
import { IBooks } from '../Books.types';

import CommonPage from '../../../Molecule/common-page/common-page';
import { Link, useNavigate } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { HeaderElementStyled } from './list.styled';

export default function List() {
    const navigate = useNavigate();
    const {
        books,
        loading,
        setParams,
        params,
        meta,
        handleEdit,
        handleRemove,
        handleSearch,
    } = useAction();

    const renderLoading = () => {
        return (
            <TableCell colSpan={5}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem 0',
                    }}
                >
                    <CircularProgress />
                </div>
            </TableCell>
        );
    };
    const renderContent = () => {
        if (loading) {
            return renderLoading();
        }
        return books?.map((record: IBooks) => (
            <TableRow
                key={record.id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }}
                onClick={() => navigate(`/detail/${record.id}`)}
            >
                <TableCell component="th">
                    <Box sx={{ mb: 1 }}>{record.title}</Box>
                    <Box>
                        <strong>Author:</strong> {record.author}
                    </Box>
                </TableCell>

                <TableCell>{record.genre}</TableCell>
                <TableCell>{record.published_year}</TableCell>
                <TableCell align="right">{record.total_copies}</TableCell>
                <TableCell>
                    {format(parseISO(`${record.created_at}`), 'dd/MM/yyyy HH:mm:ss')}
                </TableCell>
                <TableCell>
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                            height: '100%',
                        }}
                        gap={1}
                    >
                        <Button
                            type="button"
                            variant="contained"
                            color="error"
                            onClick={(e) => handleRemove(e, record)}
                        >
                            Remove
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={(e) => handleEdit(e, record)}
                        >
                            Edit
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <CommonPage
            title="Books"
            actionElement={
                <HeaderElementStyled>
                    <TextField
                        name="search"
                        placeholder="Search books title or author"
                        onChange={handleSearch}
                        size="small"
                    />
                    <Link to={'/create'}>
                        <Button type="button" variant="contained">
                            Create new
                        </Button>
                    </Link>
                </HeaderElementStyled>
            }
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Genre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Published Year</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                Available
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderContent()}</TableBody>
                </Table>
            </TableContainer>
            <Pagination
                sx={{ mt: 3 }}
                count={meta?.totalPages}
                variant="outlined"
                shape="rounded"
                onChange={(_, page: number) => {
                    setParams({
                        ...params,
                        page,
                    });
                }}
            />
        </CommonPage>
    );
}

