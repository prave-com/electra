import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteProvinsi(id: string) {
  try {
    await prisma.provinsi.delete({ where: { id } })
    revalidatePath('/administrator/provinsi')
    return { message: 'Deleted Provinsi.' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Provinsi.',
    }
  }
}
