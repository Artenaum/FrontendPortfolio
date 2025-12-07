import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Modal,
    OutlinedInput,
    Typography
} from '@mui/material'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'
import PageContentHolder from '../../shared/ui/PageContentHolder/PageContentHolder'
import EnhancedTable from '../../widgets/Tables/EnhancedTable/EnhancedTable'
import {useEffect, useState} from 'react'
import {
    CancelOutlined,
    CheckCircleOutlined,
    DeleteOutline,
    EditOutlined
} from '@mui/icons-material'
import InputStyles from '../../shared/styles/Inputs.module.css'
import {observer} from 'mobx-react-lite'
import {type Brand} from '../../shared/types/brand.types'
import Brands from '../../shared/store/Brands'
import {Controller, useForm, type SubmitHandler} from 'react-hook-form'
import {v4 as uuidv4} from 'uuid'
import TableInputField from '../../shared/ui/TableInputField/TableInputField'

interface EditModeBrandData {
    id: string
    icon: React.ReactNode
    name: React.ReactNode
    cancelBtn: React.ReactNode
    confirmBtn: React.ReactNode
}

interface FormattedBrandData {
    id: string
    icon: React.ReactNode
    name: string
    editBtn: React.ReactNode
    deleteBtn: React.ReactNode
    editMode: EditModeBrandData
}

interface BrandInput {
    name: string
    icon: string
}

const BrandsPage = observer(() => {
    const [formattedBrandData, setFormattedBrandData] = useState<FormattedBrandData[]>([])
    const [editId, setEditId] = useState<number | string>('')
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [currentBrandName, setCurrentBrandName] = useState<string>('')
    const [deleteId, setDeleteId] = useState<string>('')
    let currentNameValue = ''

    const toggleEditMode = (brand: Brand, enable: boolean) => {
        if (enable) {
            setEditId(brand.id)
        } else {
            setEditId('')
        }
    }

    const showModal = (brand: Brand) => {
        setDeleteId(brand.id)
        setCurrentBrandName(brand.name)
        setOpenDeleteModal(true)
    }

    const closeModal = () => {
        setDeleteId('')
        setOpenDeleteModal(false)
    }

    const handleDeleteBrand = async (id: string) => {
        console.log('handleDeleteId:', id)
        if (id.length) {
            await Brands.deleteBrand(id)
            await fetchBrands()
            closeModal()
        }
    }

    const getNameValue = (name: string) => {
        currentNameValue = name
    }

    const confirmChanges = async (brand: Brand) => {
        if (currentNameValue.length) {
            const newBrandData = {
                id: brand.id,
                name: currentNameValue,
                icon: brand.icon,
                margin: brand.margin
            }
            toggleEditMode(brand, false)
            currentNameValue = ''
            await Brands.editBrand(newBrandData, brand.id)
            await fetchBrands()
        }
    }

    const fetchBrands = async () => {
        await Brands.fetchBrands()

        if (Brands.brands.length) {
            const formattedBrandDataResult: FormattedBrandData[] = Brands.brands.map((brand) => {
                return {
                    id: brand.id,
                    icon: <img src={brand.icon} width={200} />,
                    name: brand.name,
                    editBtn: (
                        <IconButton onClick={() => toggleEditMode(brand, true)}>
                            <EditOutlined />
                        </IconButton>
                    ),
                    deleteBtn: (
                        <IconButton onClick={() => showModal(brand)}>
                            <DeleteOutline />
                        </IconButton>
                    ),
                    editMode: {
                        id: brand.id,
                        icon: <img src={brand.icon} width={200} />,
                        name: (
                            <TableInputField
                                initialValue={brand.name}
                                exportFieldValue={getNameValue}
                            />
                        ),
                        cancelBtn: (
                            <IconButton onClick={() => toggleEditMode(brand, false)}>
                                <CancelOutlined htmlColor="#fa2e2e" />
                            </IconButton>
                        ),
                        confirmBtn: (
                            <IconButton onClick={() => confirmChanges(brand)}>
                                <CheckCircleOutlined />
                            </IconButton>
                        )
                    }
                }
            })

            setFormattedBrandData(formattedBrandDataResult)
        }
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            icon: ''
        }
    })

    const onSubmit: SubmitHandler<BrandInput> = async (data) => {
        const newBrandData = {
            id: uuidv4(),
            name: data.name,
            icon: data.icon,
            margin: 0
        }

        reset()
        await Brands.createBrand(newBrandData)
        await fetchBrands()
    }

    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="brands" />
            <Box className={styles.headerAndContent}>
                <Header />
                <PageContentHolder>
                    <Box sx={{display: 'flex', gap: '8px'}}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{required: 'Введите название'}}
                            render={({field: {onChange, value}}) => (
                                <FormControl sx={{flex: 1}}>
                                    <OutlinedInput
                                        className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                        id="brand-name"
                                        placeholder="Введите название бренда"
                                        onChange={onChange}
                                        value={value}
                                        error={!!errors.name}
                                    />
                                    {errors.name && (
                                        <FormHelperText error id="name-error">
                                            {errors.name.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="icon"
                            control={control}
                            rules={{
                                required: 'Введите ссылку на логотип',
                                pattern: {
                                    value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                                    message: 'Неверный формат ссылки'
                                }
                            }}
                            render={({field: {onChange, value}}) => (
                                <FormControl sx={{flex: 1}}>
                                    <OutlinedInput
                                        className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                        id="brand-icon"
                                        placeholder="Загрузите логотип бренда"
                                        onChange={onChange}
                                        value={value}
                                        error={!!errors.icon}
                                    />
                                    {errors.icon && (
                                        <FormHelperText error id="icon-error">
                                            {errors.icon.message}
                                        </FormHelperText>
                                    )}
                                    {!errors.icon && (
                                        <FormHelperText>
                                            Размер логотипа 500x500 px PNG, JPG, JPEG
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Button
                            disableElevation
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            sx={{flex: 1, height: '40px'}}
                        >
                            <Typography sx={{textTransform: 'none', fontWeight: 500}}>
                                Добавить бренд
                            </Typography>
                        </Button>
                    </Box>
                    <EnhancedTable
                        data={formattedBrandData}
                        tableSetting={[
                            {
                                header: 'Логотип бренда',
                                headerKey: 'icon',
                                editId: editId,
                                editKey: 'icon'
                            },
                            {
                                header: 'Название бренда',
                                headerKey: 'name',
                                editId: editId,
                                editKey: 'name'
                            },
                            {
                                header: '',
                                headerKey: 'editBtn',
                                editId: editId,
                                editKey: 'cancelBtn'
                            },
                            {
                                header: '',
                                headerKey: 'deleteBtn',
                                editId: editId,
                                editKey: 'confirmBtn'
                            }
                        ]}
                    />
                </PageContentHolder>
            </Box>

            <Modal open={openDeleteModal} onClose={closeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '300px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '32px',
                        padding: '40px'
                    }}
                >
                    <Typography sx={{fontSize: '24px', fontWeight: 400, textAlign: 'center'}}>
                        Вы действительно хотите удалить бренд
                    </Typography>
                    <Typography sx={{fontSize: '20px', fontWeight: 400, textAlign: 'center'}}>
                        {currentBrandName}
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        disableElevation
                        onClick={() => handleDeleteBrand(deleteId)}
                    >
                        <Typography sx={{textTransform: 'none', fontWeight: 500}}>
                            Удалить
                        </Typography>
                    </Button>
                    <Typography
                        onClick={closeModal}
                        color="primary"
                        sx={{fontSize: '16px', fontWeight: 500, cursor: 'pointer'}}
                    >
                        Отменить удаление
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
})

export default BrandsPage
