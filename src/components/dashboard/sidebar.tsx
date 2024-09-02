'use client'

import DashboardIcon from '@mui/icons-material/Dashboard'
import EventIcon from '@mui/icons-material/Event'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export default function Sidebar() {
  const [openRegion, setOpenRegion] = React.useState(false)

  const handleRegionClick = () => {
    setOpenRegion(!openRegion)
  }

  return (
    <div>
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image
              src="/images/logo/electra.svg"
              alt="Logo"
              width={32}
              height={32}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                marginLeft: '0.5rem',
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Electra
            </Typography>
          </Box>
        </Link>
      </Toolbar>

      <List>
        <Link href="/administrator" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/administrator/acara" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Acara" sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/administrator/operator" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary="Operator" sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItemButton onClick={handleRegionClick}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Wilayah" />
          {openRegion ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={openRegion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              href="/administrator/wilayah/provinsi"
              style={{ textDecoration: 'none' }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Provinsi"
                  sx={{ color: 'text.primary' }}
                />
              </ListItemButton>
            </Link>

            <Link
              href="/administrator/wilayah/kabupaten"
              style={{ textDecoration: 'none' }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Kabupaten"
                  sx={{ color: 'text.primary' }}
                />
              </ListItemButton>
            </Link>

            <Link
              href="/administrator/wilayah/kecamatan"
              style={{ textDecoration: 'none' }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Kecamatan"
                  sx={{ color: 'text.primary' }}
                />
              </ListItemButton>
            </Link>

            <Link
              href="/administrator/wilayah/kelurahan"
              style={{ textDecoration: 'none' }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Kelurahan"
                  sx={{ color: 'text.primary' }}
                />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link href="/administrator/tps" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HowToVoteIcon />
              </ListItemIcon>
              <ListItemText primary="TPS" sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/administrator/pengguna" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Pengguna" sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  )
}
