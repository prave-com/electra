import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  // https://raw.githubusercontent.com/kodewilayah/permendagri-72-2019/main/dist/base.csv
  // https://peraturan.bpk.go.id/Details/196233/permendagri-no-58-tahun-2021
  // https://peraturan.bpk.go.id/Details/137530/permendagri-no-72-tahun-2019

  const data = JSON.parse(fs.readFileSync('prisma/data.json', 'utf-8'))

  for (const provinsiCode in data['62']['provinces']) {
    const provinsi = data['62']['provinces'][provinsiCode]

    // Upsert Provinsi
    const createdProvinsi = await prisma.provinsi.upsert({
      where: { kode: provinsiCode },
      update: {
        nama: provinsi.name,
      },
      create: {
        kode: provinsiCode,
        nama: provinsi.name,
      },
    })

    for (const kabupatenCode in provinsi['cities']) {
      const kabupaten = provinsi['cities'][kabupatenCode]

      // Upsert Kabupaten
      const createdKabupaten = await prisma.kabupaten.upsert({
        where: {
          kode_provinsiId: {
            kode: kabupatenCode,
            provinsiId: createdProvinsi.id,
          },
        },
        update: {
          nama: kabupaten.name,
        },
        create: {
          kode: kabupatenCode,
          nama: kabupaten.name,
          provinsiId: createdProvinsi.id,
        },
      })

      for (const kecamatanCode in kabupaten['districts']) {
        const kecamatan = kabupaten['districts'][kecamatanCode]

        // Upsert Kecamatan
        const createdKecamatan = await prisma.kecamatan.upsert({
          where: {
            kode_kabupatenId: {
              kode: kecamatanCode,
              kabupatenId: createdKabupaten.id,
            },
          },
          update: {
            nama: kecamatan.name,
          },
          create: {
            kode: kecamatanCode,
            nama: kecamatan.name,
            kabupatenId: createdKabupaten.id,
          },
        })

        for (const kelurahanCode in kecamatan['neighborhoods']) {
          const kelurahan = kecamatan['neighborhoods'][kelurahanCode]

          // Upsert Kelurahan
          await prisma.kelurahan.upsert({
            where: {
              kode_kecamatanId: {
                kode: kelurahanCode,
                kecamatanId: createdKecamatan.id,
              },
            },
            update: {},
            create: {
              kode: kelurahanCode,
              nama: kelurahan.name,
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
