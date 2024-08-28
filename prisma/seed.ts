import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  // https://raw.githubusercontent.com/kodewilayah/permendagri-72-2019/main/dist/base.csv
  // https://peraturan.bpk.go.id/Details/196233/permendagri-no-58-tahun-2021
  // https://peraturan.bpk.go.id/Details/137530/permendagri-no-72-tahun-2019

  const data = JSON.parse(fs.readFileSync('prisma/data.json', 'utf-8'))

  for (const provinsiKey in data['INDONESIA']['Provinces']) {
    const provinsi = data['INDONESIA']['Provinces'][provinsiKey]

    // Upsert Provinsi
    const createdProvinsi = await prisma.provinsi.upsert({
      where: { kode: provinsi['Code'] },
      update: {},
      create: {
        kode: provinsi['Code'],
        nama: provinsi['Name'],
      },
    })

    for (const kabupatenKey in provinsi['Cities']) {
      const kabupaten = provinsi['Cities'][kabupatenKey]

      // Upsert Kabupaten
      const createdKabupaten = await prisma.kabupaten.upsert({
        where: {
          kode_provinsiId: {
            kode: kabupaten['Code'],
            provinsiId: createdProvinsi.id,
          },
        },
        update: {},
        create: {
          kode: kabupaten['Code'],
          nama: kabupaten['Name'],
          provinsiId: createdProvinsi.id,
        },
      })

      for (const kecamatanKey in kabupaten['Districts']) {
        const kecamatan = kabupaten['Districts'][kecamatanKey]

        // Upsert Kecamatan
        const createdKecamatan = await prisma.kecamatan.upsert({
          where: {
            kode_kabupatenId: {
              kode: kecamatan['Code'],
              kabupatenId: createdKabupaten.id,
            },
          },
          update: {},
          create: {
            kode: kecamatan['Code'],
            nama: kecamatan['Name'],
            kabupatenId: createdKabupaten.id,
          },
        })

        for (const kelurahanKey in kecamatan['Neighborhoods']) {
          const kelurahan = kecamatan['Neighborhoods'][kelurahanKey]

          // Upsert Kelurahan
          await prisma.kelurahan.upsert({
            where: {
              kode_kecamatanId: {
                kode: kelurahan['Code'],
                kecamatanId: createdKecamatan.id,
              },
            },
            update: {},
            create: {
              kode: kelurahan['Code'],
              nama: kelurahan['Name'],
              kecamatanId: createdKecamatan.id,
            },
          })
        }
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
