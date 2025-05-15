import * as React from "react";
import type { HatItem } from "../components/ItemCard";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Button
} from "@mui/material";
import ItemCard from "../components/ItemCard";

type HatItems = HatItem[];

type Props = {
  hats: HatItems;
};


//const hats: HatItems = await fetch('http://localhost:3000/products').then(res => res.json());

export default function ProductPage({ hats }: Props) {
  {/* Set up the useStates for filtering functionality, initially load all products (no filters)*/}
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  {/* Find unique brands and categories */}
  const brands = Array.from(new Set(hats.map(h => h.brand)));
  const categories = Array.from(new Set(hats.map(h => h.category)));

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  {/* The hats that are currently fitlered through */}
  const filteredHats = hats.filter(hat => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(hat.brand);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(hat.category);
    return brandMatch && categoryMatch;
  });

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Filter are applied through dropdown menus */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", marginBottom: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="brand-select-label">Brands</InputLabel>
          <Select
            labelId="brand-select-label"
            multiple
            value={selectedBrands}
            onChange={(e) => setSelectedBrands(e.target.value as string[])}
            input={<OutlinedInput label="Brands" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>
                <Checkbox checked={selectedBrands.includes(brand)} />
                <ListItemText primary={brand} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Categories</InputLabel>
          <Select
            labelId="category-select-label"
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value as string[])}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.includes(category)} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={clearFilters} variant="outlined">
          Clear Filters
        </Button>
      </Box>

      {/* Products */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredHats.map((hat) => (
          <Grid size={4}>
            <ItemCard hat={hat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
