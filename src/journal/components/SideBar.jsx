import { Box, Divider, Drawer, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SideBarList from "./SideBarList";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography
            textTransform={"capitalize"}
            variant="h6"
            noWrap
            component="div"
          >
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        {/**LISTADO DE NOTAS */}
        <SideBarList />
      </Drawer>
    </Box>
  );
};
