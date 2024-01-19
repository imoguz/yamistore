import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CarouselCard: React.FC<CarouselCartProps> = ({ item }) => {
  return (
    <Card sx={{ minWidth: 240, maxWidth: 240, height: 240 }}>
      <CardMedia sx={{ height: 160 }} image={item.image} title={item.title} />
      <CardContent sx={{ pt: 0.5 }}>
        <Typography variant="body1" color="text.primary">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {item.description}
        </Typography>
        <Typography component="span" variant="body1" color="text.primary">
          $
          {(item.price - (item.price * (item.discount || 100)) / 100).toFixed(
            2
          )}
        </Typography>
        <Typography
          variant="body1"
          display="inline"
          sx={{ color: "gray", ml: 3, textDecoration: "line-through" }}
        >
          ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarouselCard;
