import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  // https://raw.githubusercontent.com/kodewilayah/permendagri-72-2019/main/dist/base.csv
  // https://peraturan.bpk.go.id/Details/196233/permendagri-no-58-tahun-2021
  // https://peraturan.bpk.go.id/Details/137530/permendagri-no-72-tahun-2019

  const csvFilePath = path.join(__dirname, 'seed.csv')

  const records: Array<{ kode: string; nama: string }> = []

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',', columns: true, skip_empty_lines: true }))
    .on('data', (row) => {
      records.push(row)
    })
    .on('end', async () => {
      console.log('CSV file successfully processed')

      for (const record of records) {
        const [provinsiKode, kabupatenKode, kecamatanKode, kelurahanKode] =
          record.kode.split('.')

        if (kelurahanKode) {
          // Insert or Update Kelurahan
          await prisma.kelurahan.upsert({
            where: { kode: kelurahanKode },
            update: {
              nama: record.nama,
              kecamatan: {
                connect: { kode: kecamatanKode },
              },
            },
            create: {
              kode: kelurahanKode,
              nama: record.nama,
              kecamatan: {
                connect: { kode: kecamatanKode },
              },
            },
          })
        } else if (kecamatanKode) {
          // Insert or Update Kecamatan
          await prisma.kecamatan.upsert({
            where: { kode: kecamatanKode },
            update: {
              nama: record.nama,
              kabupaten: {
                connect: { kode: kabupatenKode },
              },
            },
            create: {
              kode: kecamatanKode,
              nama: record.nama,
              kabupaten: {
                connect: { kode: kabupatenKode },
              },
            },
          })
        } else if (kabupatenKode) {
          // Insert or Update Kabupaten
          await prisma.kabupaten.upsert({
            where: { kode: kabupatenKode },
            update: {
              nama: record.nama,
              provinsi: {
                connect: { kode: provinsiKode },
              },
            },
            create: {
              kode: kabupatenKode,
              nama: record.nama,
              provinsi: {
                connect: { kode: provinsiKode },
              },
            },
          })
        } else if (provinsiKode) {
          // Insert or Update Provinsi
          await prisma.provinsi.upsert({
            where: { kode: provinsiKode },
            update: {
              nama: record.nama,
            },
            create: {
              kode: provinsiKode,
              nama: record.nama,
            },
          })
        }
      }

      console.log('Data successfully seeded')
      await prisma.$disconnect()
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file', error)
    })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
