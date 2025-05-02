import * as React from 'react';
import type {HatItem} from './ItemCard'
import { Box, Grid } from '@mui/material';
import ItemCard from './ItemCard';

type HatItems = HatItem[];

type Props = {
    hats: HatItems;
}
//const hats: HatItems = await fetch('http://localhost:3001/products').then(res => res.json());

export default function productPage({hats}: Props) {


    return(

      
      
      <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {hats.map((hat) => (
              <Grid size = {4} >
                <ItemCard hat={hat} />
              </Grid>
            ))}
          </Grid>
        </Box>
    )
}