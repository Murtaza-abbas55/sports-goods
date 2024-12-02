import { List, ListItem } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";

function FilterPrice({
    products,
    setProducts,
    currentCategory,
    setFilterLoading,
}) {
    const [backupProducts, setBackupProducts] = useState(products);
    console.log("current category " + currentCategory);

    const [value, setValue] = useState("none");

    useEffect(() => {
        const fetchData = async (url) => {
            if (url === "none") {
                setFilterLoading(false);
                return;
            }
            try {
                setFilterLoading(true);
                const params =
                    currentCategory !== "all"
                        ? { category_id: currentCategory }
                        : {};
                const response = await axios.get(`/api/sort/${url}`, {
                    params,
                });
                setProducts(response.data);
                console.log("Filter Price response.data");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setFilterLoading(false);
            }
        };
        fetchData(value);
    }, [value, currentCategory, setProducts]);

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
        if (event.target.value === "none") {
            setProducts(backupProducts);
            return;
        }
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
