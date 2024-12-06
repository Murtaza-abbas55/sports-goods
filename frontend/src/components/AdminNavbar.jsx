import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link as RouterLink } from "react-router-dom";

export default function AdminNavbar() {
    const { Data } = useAuth();

    return (
        <Box mb={5}>
            <AppBar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "black",
                    padding: "1rem",
                }}
                position="static"
            >
                <Button
                    startIcon={<DashboardIcon />}
                    size="large"
                    color="inherit"
                    component={RouterLink}
                    to={"/admin"}
                >
                    Dashboard
                </Button>
                <Button size="large" color="inherit">
                    {Data.admin_username}
                </Button>
            </AppBar>
        </Box>
    );
}
