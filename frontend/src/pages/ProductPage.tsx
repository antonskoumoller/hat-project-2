import * as React from "react";
import type { HatItem } from "../components/ItemCard";
import ItemCard2 from "../components/ItemCard2";

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
} from "@mui/material";
//import ItemCard from "../components/ItemCard";


type HatItems = HatItem[];

// type Props = {
//   hats: HatItems;
// };
// { hats }: Props

const hats: HatItems = await fetch('http://localhost:3000/products').then(res => res.json());

export default function ProductPage() {
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
    
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      {/* Filter are applied through dropdown menus */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", marginBottom: 2  }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="brand-select-label">Brands</InputLabel>
          <Select
            labelId="brand-select-label"
            multiple
            value={selectedBrands}
            onChange={(e) => setSelectedBrands(e.target.value as string[])}
            input={<OutlinedInput label="Brands" />}
            renderValue={(selected) => selected.join(", ")}
            color="secondary"
          >
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>
                <Checkbox checked={selectedBrands.includes(brand)} color="primary" />
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

        <button className="px-4 py-2 border border-[#20c997] text-[#20c997] rounded-md hover:bg-[#20c997] hover:text-[#79dfc1] hover:border-[#79dfc1] transition" onClick={clearFilters}>
          Clear Filters
        </button>
      </Box>

      {/* Products */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredHats.map((hat) => (
          <Grid size={4}>
            <ItemCard2 hat={hat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
