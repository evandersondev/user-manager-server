export class CreateUserDto {
  name: string
  email: string
  password: string
  photoUrl?: string
  role: 'owner' | 'admin' | 'employee'
}
