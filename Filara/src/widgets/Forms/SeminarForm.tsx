import {
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    FormHelperText,
    IconButton,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material'
import {DatePicker, TimePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {ruRU} from '@mui/x-date-pickers/locales'
import dayjs, {Dayjs} from 'dayjs'
import 'dayjs/locale/ru'
import '../../shared/global.css'
import InputStyles from '../../shared/styles/Inputs.module.css'
import {useGetCitiesQuery} from '../../redux/citiesApi'
import {useState, type ChangeEvent} from 'react'
import {Controller, useForm, type FieldError, type SubmitHandler} from 'react-hook-form'
import {useGetSpeakersQuery} from '../../redux/speakersApi'
import {useDebounce} from '../../shared/hooks/useDebounce'
import {DeleteOutline} from '@mui/icons-material'
import {useCreateSeminarMutation, useGetSeminarsQuery} from '../../redux/seminarsApi'
import type {Seminar} from '../../shared/types/seminar.types'

interface SeminarFormProps {
    open: boolean
    toggleForm: (toggle: boolean) => void
}

interface SeminarInput {
    title: string
    description: string
    speaker: string
    speakerSpeciality: string
    city: string
    date: Dayjs
    time: Dayjs
    photo: string
}

const SeminarForm = ({open, toggleForm}: SeminarFormProps) => {
    const [createSeminar] = useCreateSeminarMutation()
    const {data: cityData = [], isSuccess} = useGetCitiesQuery()
    const {data: speakerData = []} = useGetSpeakersQuery()
    const {data: seminarData = [], refetch: refetchSeminars} = useGetSeminarsQuery()
    const [photoLinkIsEntered, setPhotoLinkIsEntered] = useState(false)
    const [photoLink, setPhotoLink] = useState('')

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: {errors}
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            speaker: '',
            speakerSpeciality: '',
            city: '',
            date: dayjs(),
            time: dayjs(),
            photo: ''
        }
    })

    const onPhotoLinkChange = useDebounce(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, error?: FieldError) => {
            const urlRegex =
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
            if (!error && urlRegex.test(e.target.value)) {
                setPhotoLink(e.target.value)
                setPhotoLinkIsEntered(true)
            } else {
                setPhotoLink('')
                setPhotoLinkIsEntered(false)
            }
        },
        2000
    )

    const resetFormAndClose = () => {
        reset()
        setPhotoLink('')
        setPhotoLinkIsEntered(false)
        toggleForm(false)
    }

    const onSubmit: SubmitHandler<SeminarInput> = async (data) => {
        const userId = speakerData.find((speaker) => speaker.fullName === data.speaker)?.id
        if (!userId) {
            setError('speaker', {type: 'custom', message: 'Спикера с таким ФИО не существует!'})
            return
        }

        if (seminarData.length) {
            const newSeminarData: Seminar = {
                id: seminarData.at(seminarData.length - 1)!.id + 1,
                title: data.title,
                description: data.description,
                date: data.date.format('DD.MM.YYYY'),
                time: data.time.format('hh:mm'),
                photo: data.photo,
                userId: userId,
                status: 'upcoming'
            }

            try {
                await createSeminar(newSeminarData).unwrap()
            } catch (error: any) {
                console.error(error)
            }
        }

        refetchSeminars()
        resetFormAndClose()
    }

    return (
        <Drawer open={open} onClose={resetFormAndClose}>
            <Box
                sx={{
                    padding: '26px 40px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px'
                }}
            >
                <Button
                    className="whiteButton"
                    variant="contained"
                    disableElevation
                    onClick={resetFormAndClose}
                    sx={{flex: 1}}
                >
                    <Typography sx={{textTransform: 'none', fontWeight: 500}}>
                        Отменить
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSubmit(onSubmit)}
                    sx={{flex: 1}}
                >
                    <Typography sx={{textTransform: 'none', fontWeight: 500}}>Создать</Typography>
                </Button>
            </Box>
            <Divider />
            <Box
                sx={{padding: '16px 40px', display: 'flex', flexDirection: 'column', gap: '8px'}}
            >
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: 'Введите название'
                    }}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{gap: '4px'}}>
                            <Typography sx={{fontSize: 14, fontWeight: 500}}>
                                Название*
                            </Typography>
                            <OutlinedInput
                                className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                id="seminar-title"
                                required
                                value={value}
                                onChange={onChange}
                                error={!!errors.title}
                            />
                            {errors.title && (
                                <FormHelperText error id="title-error">
                                    {errors.title.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    rules={{
                        required: 'Введите описание'
                    }}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{gap: '4px'}}>
                            <Typography sx={{fontSize: 14, fontWeight: 500}}>
                                Описание*
                            </Typography>
                            <OutlinedInput
                                className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                id="seminar-description"
                                required
                                placeholder="Опишите семинар"
                                multiline
                                rows={2}
                                value={value}
                                onChange={onChange}
                                error={!!errors.description}
                                sx={{minHeight: '60px'}}
                            />
                            {errors.description && (
                                <FormHelperText error id="description-error">
                                    {errors.description.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                <Controller
                    name="speaker"
                    control={control}
                    rules={{
                        required: 'Введите спикера'
                    }}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{gap: '4px'}}>
                            <Typography sx={{fontSize: 14, fontWeight: 500}}>Спикер*</Typography>
                            <OutlinedInput
                                className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                id="seminar-speaker"
                                required
                                value={value}
                                onChange={onChange}
                                error={!!errors.speaker}
                            />
                            {errors.speaker && (
                                <FormHelperText error id="speaker-error">
                                    {errors.speaker.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                <Controller
                    name="speakerSpeciality"
                    control={control}
                    rules={{
                        required: 'Введите специальность спикера'
                    }}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{gap: '4px'}}>
                            <Typography sx={{fontSize: 14, fontWeight: 500}}>
                                Специальнось спикера*
                            </Typography>
                            <OutlinedInput
                                className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                id="seminar-speaker-speciality"
                                required
                                value={value}
                                onChange={onChange}
                                error={!!errors.speakerSpeciality}
                            />
                            {errors.speakerSpeciality && (
                                <FormHelperText error id="speaker-speciality-error">
                                    {errors.speakerSpeciality.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    rules={{
                        required: 'Выберите город'
                    }}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{gap: '4px'}}>
                            <Typography sx={{fontSize: 14, fontWeight: 500}}>Город*</Typography>
                            <Select
                                className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                id="seminar-city"
                                required
                                value={value}
                                onChange={onChange}
                                error={!!errors.city}
                            >
                                <MenuItem disabled value="">
                                    Выберите город
                                </MenuItem>
                                {isSuccess &&
                                    cityData.map((item) => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                            </Select>
                            {errors.city && (
                                <FormHelperText error id="city-error">
                                    {errors.city.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                <Box sx={{display: 'flex', gap: '8px'}}>
                    <Controller
                        name="date"
                        control={control}
                        rules={{
                            required: 'Выберите дату'
                        }}
                        render={({field: {onChange, value}}) => (
                            <FormControl sx={{gap: '4px'}}>
                                <Typography sx={{fontSize: 14, fontWeight: 500}}>Дата</Typography>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale="ru"
                                    localeText={
                                        ruRU.components.MuiLocalizationProvider.defaultProps
                                            .localeText
                                    }
                                >
                                    <DatePicker value={dayjs(value)} onChange={onChange} />
                                </LocalizationProvider>
                                {errors.date && (
                                    <FormHelperText error id="date-error">
                                        {errors.date.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="time"
                        control={control}
                        rules={{
                            required: 'Выберите время'
                        }}
                        render={({field: {onChange, value}}) => (
                            <FormControl sx={{gap: '4px'}}>
                                <Typography sx={{fontSize: 14, fontWeight: 500}}>
                                    Время
                                </Typography>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale="ru"
                                    localeText={
                                        ruRU.components.MuiLocalizationProvider.defaultProps
                                            .localeText
                                    }
                                >
                                    <TimePicker value={dayjs(value)} onChange={onChange} />
                                </LocalizationProvider>
                                {errors.time && (
                                    <FormHelperText error id="time-error">
                                        {errors.time.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>
                <Controller
                    name="photo"
                    control={control}
                    rules={{
                        pattern: {
                            value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                            message: 'Неверный формат ссылки'
                        }
                    }}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{gap: '4px'}}>
                            <Typography sx={{fontSize: 14, fontWeight: 500}}>Фото</Typography>
                            {!photoLinkIsEntered && (
                                <OutlinedInput
                                    className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
                                    id="seminar-photo"
                                    placeholder="Вставьте ссылку на Google Drive"
                                    value={value}
                                    onChange={(value) => {
                                        onChange(value)
                                        onPhotoLinkChange(value, errors.photo)
                                    }}
                                    error={!!errors.photo}
                                />
                            )}
                            {photoLinkIsEntered && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '8px'
                                    }}
                                >
                                    <img src={photoLink} height="80px" />
                                    <Typography
                                        sx={{fontSize: 14, fontWeight: 400}}
                                        noWrap
                                        maxWidth={400}
                                    >
                                        {photoLink}
                                    </Typography>
                                    <IconButton onClick={() => setPhotoLinkIsEntered(false)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </Box>
                            )}
                            <FormHelperText>Размер фото 750x750 px PNG, JPG, JPEG</FormHelperText>
                            {errors.photo && (
                                <FormHelperText error id="photo-error">
                                    {errors.photo.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
            </Box>
        </Drawer>
    )
}

export default SeminarForm
