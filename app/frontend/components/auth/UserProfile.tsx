import type React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  const getRoleBadgeVariant = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'moderator':
        return 'default'
      case 'user':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getRoleLabel = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'Администратор'
      case 'moderator':
        return 'Модератор'
      case 'user':
        return 'Пользователь'
      default:
        return 'Не назначена'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <Avatar>
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className='text-lg font-semibold'>{user.name}</div>
            <div className='text-sm text-muted-foreground'>{user.email}</div>
          </div>
        </CardTitle>
        <CardDescription>Информация о вашем профиле</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium'>Роль:</span>
          <Badge variant={getRoleBadgeVariant(user.role)}>
            {getRoleLabel(user.role)}
          </Badge>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium'>Статус:</span>
          <Badge variant={user.verified ? 'default' : 'secondary'}>
            {user.verified ? 'Подтвержден' : 'Не подтвержден'}
          </Badge>
        </div>

        <div className='text-sm text-muted-foreground'>
          <div>
            Дата регистрации:{' '}
            {new Date(user.created_at).toLocaleDateString('ru-RU')}
          </div>
          <div>
            Последнее обновление:{' '}
            {new Date(user.updated_at).toLocaleDateString('ru-RU')}
          </div>
        </div>

        <Button onClick={logout} variant='outline' className='w-full'>
          Выйти
        </Button>
      </CardContent>
    </Card>
  )
}
