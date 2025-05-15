import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ShowProductOverlay } from "./productOverlay/ProductOverlay";

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
};
type Props = {
  hat: HatItem;
};

export default function ItemCard({ hat }: Props) {
  //const [dialog, isOpen] = React.useState(false);
  const [overlayActive, setOverlayActive] = React.useState(false);
  return (
    <>
      {overlayActive ? (
        <ShowProductOverlay
          id={hat.id}
          onClose={() => setOverlayActive(false)}
        />
      ) : (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 345,
            height: "100%", // allow full-height layout if inside a grid or container
            border: "border border-[#20c997]"
          }}
        >
          <CardMedia
            component="img"
            height="flex"
            image={hat.img}
            alt={hat.name}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {hat.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {hat.description}
            </Typography>
          </CardContent>
          <CardActions>
            <button className="flex-1 py-2 border border-[#20c997] text-[#20c997] rounded-md hover:bg-[#20c997] hover:text-[#79dfc1] hover:border-[#79dfc1] transition" onClick={() => setOverlayActive(true)}>
              Show hat
            </button>
            <button className="flex-1 py-2 border border-[#20c997] text-[#20c997] rounded-md hover:bg-[#20c997] hover:text-[#79dfc1] hover:border-[#79dfc1] transition">Add to cart</button>
          </CardActions>
        </Card>
        
      )}
    </>
    
  );
}
