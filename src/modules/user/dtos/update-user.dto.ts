export class UpdateUserDto {
  name: string
  photoUrl?: string
  role: 'owner' | 'admin' | 'employee'
}
