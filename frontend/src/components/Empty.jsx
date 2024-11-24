import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Empty({ message, size }) {
    const navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SearchOffOutlinedIcon sx={{ fontSize: size }} />
                <h1>{"Nothing To See Here"}</h1>
                <p>{message}</p>
                <Button onClick={goBack}>Back</Button>
            </div>
        </>
    );
}
export default Empty;
