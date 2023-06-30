import { TurnedInNot } from "@mui/icons-material";
import {
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

const SideBarListItem = ({ title, id, body , createdAt, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const handleItemClick = () => {
    dispatch(setActiveNote({ title, body, id, createdAt, imageUrls }));
  };

  const fixTitle = useMemo(() => {
    if (title.length > 20) {
      return title.substring(0, 20) + " ...";
    }
    return title;
  }, [title]);
  return (
    <ListItem key={id} disablePadding onClick={handleItemClick}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={fixTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarListItem;
