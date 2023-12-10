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
        handleUploadPicture,
        loadingPicture,
        loadingSubmit,
        setFormValues,
        fileItem,
        data
    } = useAction();
    console.log(data);
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
                    name="price"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            price: e.target.value,
                        })
                    }
                    placeholder={data.price}
                    value={formValues?.price}
                    variant="filled"
                />
                <TextField
                    name="available"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            available: e.target.value === 'true' ? true : false,
                        })
                    }
                    placeholder={data.available ? "true" : "false"}
                    value={formValues?.available}
                    variant="filled"
                />
                <TextField
                    name="status"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            status: e.target.value,
                        })
                    }
                    placeholder={data.status}
                    value={formValues?.status}
                    variant="filled"
                />
                <LoadingButton
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{ background: 'black' }}
                    loading={loadingPicture}
                >
                    Update Book Picture
                    <VisuallyHiddenInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleUploadPicture}
                    />
                </LoadingButton>
                {(fileItem) ? (fileItem && (
                    <Box>
                        <img
                            src={fileItem}
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
