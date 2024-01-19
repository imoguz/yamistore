import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
interface IRatingsProp {
  rating: number;
}
const Ratings: React.FC<IRatingsProp> = ({ rating }) => {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={rating}
        precision={0.1}
        readOnly
      />
    </Stack>
  );
};
export default Ratings;
