import prisma from '@/lib/db'

export async function deleteProvinsi(id: string) {
  await prisma.provinsi.delete({ where: { id } })
}
