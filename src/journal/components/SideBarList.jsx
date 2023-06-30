import { List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import SideBarListItem from './SideBarListItem'

const SideBarList = () => {
    const {notes} = useSelector(state => state.journal)

  return (
    <List>
    {
        notes.map( note => (
            <SideBarListItem key={note.id} {...note}/>
        ))
    }
</List>
  )
}

export default SideBarList