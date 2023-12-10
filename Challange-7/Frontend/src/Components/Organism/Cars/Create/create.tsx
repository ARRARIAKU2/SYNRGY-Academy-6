import { Box, TextField } from '@mui/material';
import CommonPage from '../../../Molecule/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useAction from './create.hooks';
import { VisuallyHiddenInput } from './create.styled';

export default function Create() {
    const {
        formValues,
        handleSubmit,
        handleUploadPicture,
        loadingPicture,
        loadingSubmit,
        setFormValues,
        fileItem,
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
                    label="Title"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            title: e.target.value,
                        })
                    }
                    variant="filled"
                    value={formValues?.title}
                />
                <TextField
                    name="price"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Price"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            price: e.target.value,
                        })
                    }
                    variant="filled"
                />
                <TextField
                    name="available"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Available"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            available: e.target.value === 'true' ? true : false,
                        })
                    }
                    variant="filled"
                />
                <TextField
                    name="status"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Status"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            status: e.target.value,
                        })
                    }
                    variant="filled"
                />
                <LoadingButton
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{ mb: 3 }}
                    loading={loadingPicture}
                >
                    Upload Car Picture
                    <VisuallyHiddenInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleUploadPicture}
                    />
                </LoadingButton>
                {fileItem && (
                    <Box>
                        <img
                            src={fileItem}
                            alt="preview"
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                )}
            </Box>
        </CommonPage>
    );
}
