import * as React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';


export type HatItem = {
    id: number;
    name: string;
    img: string;
    description: string;
    fullDescription: string;
    category: string;
    popular: boolean;
    price: number;
    brand: string;
}
type Props = {
    hat: HatItem;
};

export default function ItemCard({hat}:Props){
    //const [dialog, isOpen] = React.useState(false);
    
    return(
        <Card sx={{
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 345,
    height: '100%', // allow full-height layout if inside a grid or container
  }}>
  <CardMedia
    component="img"
    height="flex"
    image={hat.img}
    alt={hat.name} />
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography gutterBottom variant="h5" component="div">
      {hat.name}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {hat.description}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Show hat</Button>
    <Button size="small">Add to cart</Button>
  </CardActions>
</Card>
    );
}