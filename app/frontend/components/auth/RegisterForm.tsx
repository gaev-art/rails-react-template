import type React from 'react'
import { useId, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const { register, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const passwordConfirmationId = useId()

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Имя обязательно'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Некорректный формат email'
    }

    if (!formData.password) {
      errors.password = 'Пароль обязателен'
    } else if (formData.password.length < 8) {
      errors.password = 'Пароль должен содержать минимум 8 символов'
    }

    if (!formData.passwordConfirmation) {
      errors.passwordConfirmation = 'Подтверждение пароля обязательно'
    } else if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = 'Пароли не совпадают'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setValidationErrors({})

    if (!validateForm()) {
      return
    }

    try {
      await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        formData.passwordConfirmation,
      )
      onSuccess?.()
    } catch (_error) {
      // Error is handled by the context
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Создайте новый аккаунт для входа в систему
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && <Alert variant='destructive'>{error}</Alert>}

          <div className='space-y-2'>
            <Label htmlFor={nameId}>Имя</Label>
            <Input
              id={nameId}
              name='name'
              type='text'
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder='Введите ваше имя'
            />
            {validationErrors.name && (
              <p className='text-sm text-destructive'>
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder='Введите ваш email'
            />
            {validationErrors.email && (
              <p className='text-sm text-destructive'>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor={passwordId}>Пароль</Label>
            <Input
              id={passwordId}
              name='password'
              type='password'
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder='Введите пароль'
            />
            {validationErrors.password && (
              <p className='text-sm text-destructive'>
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor={passwordConfirmationId}>Подтверждение пароля</Label>
            <Input
              id={passwordConfirmationId}
              name='passwordConfirmation'
              type='password'
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder='Подтвердите пароль'
            />
            {validationErrors.passwordConfirmation && (
              <p className='text-sm text-destructive'>
                {validationErrors.passwordConfirmation}
              </p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>

          {onSwitchToLogin && (
            <div className='text-center text-sm'>
              <span className='text-muted-foreground'>Уже есть аккаунт? </span>
              <button
                type='button'
                onClick={onSwitchToLogin}
                className='text-primary hover:underline'
                disabled={isLoading}
              >
                Войти
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
