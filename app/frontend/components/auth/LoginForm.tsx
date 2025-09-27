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

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
}) => {
  const { login, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const emailId = useId()
  const passwordId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login(formData.email, formData.password)
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
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Вход в систему</CardTitle>
        <CardDescription>
          Введите свои учетные данные для входа в систему
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && <Alert variant='destructive'>{error}</Alert>}

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
              placeholder='Введите ваш пароль'
            />
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>

          {onSwitchToRegister && (
            <div className='text-center text-sm'>
              <span className='text-muted-foreground'>Нет аккаунта? </span>
              <button
                type='button'
                onClick={onSwitchToRegister}
                className='text-primary hover:underline'
                disabled={isLoading}
              >
                Зарегистрироваться
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
