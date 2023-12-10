import { Box, TextField } from '@mui/material';
import CommonPage from '../../../Molecule/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useAction from './update.hooks';
import { VisuallyHiddenInput } from './update.styled';

export default function Create() {
    const {
        formValues,
        handleSubmit,
        handleUploadCover,
        loadingCover,
        loadingSubmit,
        setFormValues,
        fileItem,
        data
    } = useAction();
    return (
        <CommonPage
            withBack
            component={'form'}
            title="Create new Book"
            actionElement={
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loadingSubmit}
                >
                    Submit
                </LoadingButton>
            }
            onSubmit={handleSubmit}
        >
            <Box
                sx={{
                    width: '50%',
                }}
            >
                <TextField
                    name="title"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            title: e.target.value,
                        })
                    }
                    variant="filled"
                    placeholder={data.title}
                    value={formValues?.title}
                />
                <TextField
                    name="author"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            author: e.target.value,
                        })
                    }
                    placeholder={data.author}
                    value={formValues?.author}
                    variant="filled"
                />
                <TextField
                    name="isbn"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            isbn: e.target.value,
                        })
                    }
                    placeholder={data.isbn}
                    value={formValues?.isbn}
                    variant="filled"
                />
                <TextField
                    name="published_year"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            published_year: e.target.value,
                        })
                    }
                    placeholder={data.published_year}
                    value={formValues?.published_year}
                    variant="filled"
                />
                <TextField
                    name="genre"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            genre: e.target.value,
                        })
                    }
                    placeholder={data.genre}
                    value={formValues?.genre}
                    variant="filled"
                />
                <TextField
                    name="total_copies"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            total_copies: Number(e.target.value),
                        })
                    }
                    placeholder={data.total_copies}
                    value={formValues?.total_copies}
                    variant="filled"
                />
                <TextField
                    name="copies_available"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            copies_available: Number(e.target.value),
                        })
                    }
                    placeholder={data.copies_available}
                    value={formValues?.copies_available}
                    variant="filled"
                />
                <LoadingButton
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{ background: 'black' }}
                    loading={loadingCover}
                >
                    Update Book Cover
                    <VisuallyHiddenInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleUploadCover}
                    />
                </LoadingButton>
                {(fileItem) ? (fileItem && fileItem.url && (
                    <Box>
                        <img
                            src={fileItem.secure_url}
                            alt="preview"
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                )) : (data?.cover == null ? null : <Box>
                    <img
                        src={data?.cover?.url}
                        alt="preview"
                        style={{ width: '100%', objectFit: 'cover' }}
                    />
                </Box>)}
            </Box>
        </CommonPage>
    );
}
