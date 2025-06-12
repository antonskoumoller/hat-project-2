import * as React from "react";
import type { HatItem } from "../components/ItemCard";
import ItemCard from "../components/ItemCard";
import {
	Box,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Checkbox,
	ListItemText,
	OutlinedInput
} from "@mui/material";

type ProductGridProps = { hats: HatItem[] };

function ProductGrid({ hats }: ProductGridProps) {
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			justifyContent="center"
			/* no left-padding hack needed once centred */
		>
			{hats.map((hat) => (
				<Grid key={hat.id}>
					<ItemCard hat={hat} />
				</Grid>
			))}
		</Grid>
	);
}

const hats: HatItem[] = await fetch("http://localhost:3000/products").then(
	(res) => res.json()
);

export default function ProductPage() {
	const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = React.useState<
		string[]
	>([]);

	const brands = Array.from(new Set(hats.map((h) => h.brand)));
	const categories = Array.from(new Set(hats.map((h) => h.category)));

	const clearFilters = () => {
		setSelectedBrands([]);
		setSelectedCategories([]);
	};

	const filteredHats = hats.filter((hat) => {
		const brandMatch =
			selectedBrands.length === 0 || selectedBrands.includes(hat.brand);
		const categoryMatch =
			selectedCategories.length === 0 ||
			selectedCategories.includes(hat.category);
		return brandMatch && categoryMatch;
	});

	return (
		<Box sx={{ flexGrow: 1, p: 1 }}>
			<h1>Add filters</h1>

			<Box
				sx={{
					display: "flex",
					gap: 2,
					alignItems: "center",
					flexWrap: "wrap",
					mb: 2,
					p: 4
				}}
			>
				<FormControl sx={{ minWidth: 200 }}>
					<InputLabel id="brand-select-label">Brands</InputLabel>
					<Select
						labelId="brand-select-label"
						multiple
						value={selectedBrands}
						onChange={(e) =>
							setSelectedBrands(e.target.value as string[])
						}
						input={<OutlinedInput label="Brands" />}
						renderValue={(sel) => sel.join(", ")}
						color="secondary"
					>
						{brands.map((brand) => (
							<MenuItem key={brand} value={brand}>
								<Checkbox
									checked={selectedBrands.includes(brand)}
								/>
								<ListItemText primary={brand} />
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl sx={{ minWidth: 200 }}>
					<InputLabel id="category-select-label">
						Categories
					</InputLabel>
					<Select
						labelId="category-select-label"
						multiple
						value={selectedCategories}
						onChange={(e) =>
							setSelectedCategories(e.target.value as string[])
						}
						input={<OutlinedInput label="Categories" />}
						renderValue={(sel) => sel.join(", ")}
					>
						{categories.map((cat) => (
							<MenuItem key={cat} value={cat}>
								<Checkbox
									checked={selectedCategories.includes(cat)}
								/>
								<ListItemText primary={cat} />
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<button
					className="px-4 py-2 btn-secondary"
					onClick={clearFilters}
				>
					Clear Filters
				</button>
			</Box>

			<h1>Products</h1>
			<ProductGrid hats={filteredHats} />
		</Box>
	);
}
