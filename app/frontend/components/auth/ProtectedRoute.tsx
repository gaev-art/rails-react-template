import type React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className='flex items-center justify-center min-h-screen'>
          <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
              <CardTitle>Доступ запрещен</CardTitle>
              <CardDescription>
                Для доступа к этой странице необходимо войти в систему
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className='w-full'>Войти в систему</Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      fallback || (
        <div className='flex items-center justify-center min-h-screen'>
          <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
              <CardTitle>Недостаточно прав</CardTitle>
              <CardDescription>
                У вас нет прав для доступа к этой странице
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Требуемая роль: {requiredRole}
              </p>
              <Button variant='outline' className='w-full'>
                Вернуться на главную
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
