import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    Link,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material'
import {useNavigate} from 'react-router'
import {Controller, useForm, type SubmitHandler} from 'react-hook-form'
import {useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {useLoginUserMutation} from '../redux/usersApi'
import {useAppDispatch} from '../redux/store'
import {storeUser} from '../redux/userSlice'

interface AuthInput {
    email: string
    password: string
    rememberMe: boolean
}

const AuthPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [loginUser, {isError}] = useLoginUserMutation()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    })

    const onSubmit: SubmitHandler<AuthInput> = async (data) => {
        const authData = {
            email: data.email,
            password: data.password
        }

        const response = await loginUser(authData).unwrap()

        localStorage.setItem('AccessToken', response.access_token)
        dispatch(storeUser(response.user_data))
        navigate('/requests')
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    marginBottom: '70px'
                }}
            >
                <img src="src/shared/assets/logo.svg" />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '500px',
                    height: '400px',
                    backgroundColor: '#FFFFFF',
                    padding: '32px 24px',
                    borderRadius: '8px',
                    boxShadow: '0px 8px 4px 0px #4C5D704D'
                }}
            >
                <Typography fontSize={24}>Вход в учётную запись</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}
                    >
                        <Typography>E-mail</Typography>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Введите email'
                            }}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    size="small"
                                    helperText={
                                        errors.email
                                            ? errors.email.message
                                            : null
                                    }
                                    error={!!errors.email}
                                    onChange={onChange}
                                    value={value}
                                    id="user-email"
                                    placeholder="Введите свой e-mail"
                                    sx={{height: '40px'}}
                                />
                            )}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}
                    >
                        <Typography>Пароль</Typography>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Введите пароль'
                            }}
                            render={({field: {onChange, value}}) => (
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        size="small"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        error={!!errors.password}
                                        onChange={onChange}
                                        value={value}
                                        placeholder="Введите пароль"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {!!errors.password && (
                                        <FormHelperText error>
                                            {errors.password.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Box>

                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={onChange}
                                        value={value}
                                    />
                                }
                                label="Запомнить меня"
                            />
                        )}
                    />
                </Box>

                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSubmit(onSubmit)}
                >
                    Войти
                </Button>

                <Link href="#" underline="hover" sx={{alignSelf: 'center'}}>
                    {'Забыли пароль?'}
                </Link>
            </Box>
        </Box>
    )
}

export default AuthPage
