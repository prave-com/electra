import { deleteProvinsi } from '@/actions/provinsi'
import Link from 'next/link'
import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'

export function CreateProvinsi() {
  return (
    <Link
      href="/administrator/provinsi/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Provinsi</span>{' '}
      <HiOutlinePlus className="h-5 md:ml-4" />
    </Link>
  )
}

export function UpdateProvinsi({ id }: { id: string }) {
  return (
    <Link
      href={`/administrator/provinsi/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <HiOutlinePencil className="w-5" />
    </Link>
  )
}

export function DeleteProvinsi({ id }: { id: string }) {
  const deleteProvinsiWithId = deleteProvinsi.bind(null, id)

  return (
    <form action={deleteProvinsiWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <HiOutlineTrash className="w-5" />
      </button>
    </form>
  )
}
