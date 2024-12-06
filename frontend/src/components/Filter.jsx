import { List, ListItem } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState, useEffect } from "react";
import FilterPrice from "./FilterPrice";

function Filter({ setFilterLoading, products, setProducts, category_id }) {
    const [backupProducts, setBackupProducts] = useState(products);
    const {
        products: categories,
        loading,
        error,
    } = useFetch("/api/categories");
    console.log(categories);

    console.log("backup new");
    console.log(backupProducts);

    const fetchData = async (id) => {
        try {
            setFilterLoading(true);
            const response = await axios.get(`/api/category-products/${id}`);
            setProducts(response.data);
            console.log("Categories Products response.data");
            console.log(response.data);
        } catch (error) {
            // setFilterLoading(false);
            console.error("Error fetching products:", error);
        } finally {
            // setFilterLoading(false);
        }
    };

    const [value, setValue] = useState("all");
    useEffect(() => {
        if (category_id !== null) {
            fetchData(category_id);
            setValue(category_id);
        }
    }, [category_id]); // Runs only when category_id changes

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
                    Category
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio size="small" />}
                        label="All"
                    />
                    {categories.map((category) => (
                        <FormControlLabel
                            key={category.category_id}
                            value={category.category_id}
                            control={<Radio size="small" />}
                            label={category.name}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <FilterPrice
                products={products}
                setProducts={setProducts}
                currentCategory={value}
                setFilterLoading={setFilterLoading}
            />
        </>
    );
}
export default Filter;
