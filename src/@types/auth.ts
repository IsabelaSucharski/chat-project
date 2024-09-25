export type RoleType = 'Admin' | 'Apontamento' | 'Monitor' | string

export interface UserProps {
  isAdmin: boolean
  roles: RoleType[]
  authenticated?: boolean
  email: string
  name: string
  photo?: string
}
