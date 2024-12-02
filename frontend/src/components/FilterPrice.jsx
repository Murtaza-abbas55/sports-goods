import { List, ListItem } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

function FilterPrice({ products, setProducts, currentCategory }) {
    const [backupProducts, setBackupProducts] = useState(products);

    const fetchData = async (url) => {
        try {
            const response = await axios.get(`/api/sort/${url}`, {
                category_id: currentCategory,
            });
            setProducts(response.data);
            console.log("Filter Price response.data");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const [value, setValue] = useState("none");

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
        if (event.target.value === "all") {
            setProducts(backupProducts);
            return;
        }
        fetchData(event.target.value);
    };

    return (
        <>
            <FormControl sx={{ marginLeft: "2rem" }} focused={false}>
                <FormLabel
                    sx={{
                        fontSize: "20px",
                        color: "black",
                        fontWeight: "bold",
                    }}
                    id="demo-controlled-radio-buttons-group"
                >
                    Filter
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="none"
                        control={<Radio size="small" />}
                        label="None"
                    />
                    <FormControlLabel
                        value="most-popular"
                        control={<Radio size="small" />}
                        label="Most Popular"
                    />
                    <FormControlLabel
                        value="price-high-to-low"
                        control={<Radio size="small" />}
                        label="Price (High To Low)"
                    />
                    <FormControlLabel
                        value="price-low-to-high"
                        control={<Radio size="small" />}
                        label="Price (Low To High)"
                    />
                </RadioGroup>
            </FormControl>
        </>
    );
}
export default FilterPrice;
