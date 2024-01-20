import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";

interface IVariantsProps {
  selectedVariant: ISelectedVariant | null;
  setSelectedVariant: React.Dispatch<
    React.SetStateAction<ISelectedVariant | null>
  >;
}
const Variants: React.FC<IVariantsProps> = ({
  selectedVariant,
  setSelectedVariant,
}) => {
  const { product } = useAppSelector((state) => state.products);
  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    if (product?.variants.length) {
      const allSizes = [
        ...new Set(product?.variants?.map((item) => item.size_id.name)),
      ];
      setSizes(allSizes);

      // Find and set the default variant
      const defaultVariant = product?.variants.find((item) => item.isDefault);
      if (!selectedVariant) {
        defaultVariant
          ? setSelectedVariant({
              variantId: defaultVariant._id,
              color: defaultVariant.color_id.hex_code,
              size: defaultVariant.size_id.name,
              colorName: defaultVariant.color_id.name,
              stock: defaultVariant.stock,
              image: defaultVariant.image_url,
            })
          : setSelectedVariant(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleClictSize = (size: string) => {
    const isColor = product?.variants?.filter(
      (item) =>
        item.size_id.name === size &&
        item.color_id.hex_code === selectedVariant?.color
    );
    isColor?.length
      ? setSelectedVariant({
          ...selectedVariant!,
          variantId: isColor[0]._id,
          colorName: isColor[0].color_id.name,
          stock: isColor[0].stock,
          size,
        })
      : setSelectedVariant({
          ...selectedVariant!,
          variantId: null,
          colorName: null,
          stock: null,
          size,
        });
  };

  const handleClickColor = (item: IVariant) => {
    selectedVariant &&
      setSelectedVariant({
        ...selectedVariant,
        variantId: item._id,
        color: item.color_id.hex_code,
        colorName: item.color_id.name,
        stock: item.stock,
        image: item.image_url,
      });
  };

  return (
    <Box>
      <Box>
        <Typography variant="subtitle2" my={1}>
          Selected size:
          <Typography variant="body2" component="span" ml={1}>
            {selectedVariant?.size && selectedVariant.size}
          </Typography>
        </Typography>
        <Grid container spacing={2} sx={{ width: { xs: "100%", md: "80%" } }}>
          {sizes.map((size) => (
            <Grid key={size} item onClick={() => handleClictSize(size)}>
              <Box
                sx={{
                  bgcolor: selectedVariant?.size === size ? "black" : "white",
                  color: selectedVariant?.size === size ? "white" : "black",
                  width: 70,
                  border: 1,
                  py: 1,
                  textAlign: "center",
                  "&:hover": { cursor: "pointer", opacity: 0.8 },
                }}
              >
                <Typography variant="body2">{size}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ border: "1px solid gray", my: 2 }} />
      <Box>
        <Typography variant="body1" gutterBottom>
          Selected color:
          <Typography variant="body2" component="span" ml={1}>
            {selectedVariant?.colorName &&
              selectedVariant?.colorName?.charAt(0).toUpperCase() +
                selectedVariant?.colorName?.slice(1)}
          </Typography>
        </Typography>
        <Grid container spacing={2} sx={{ width: { xs: "100%", md: "80%" } }}>
          {product?.variants.map(
            (item, index) =>
              item.size_id.name === selectedVariant?.size && (
                <Grid key={index} item>
                  <Box
                    sx={{
                      position: "relative",
                      height: 40,
                      width: 40,
                      fontSize: 50,
                      color: item.color_id.hex_code,
                      border: 8,
                      borderRadius: 5,
                      opacity: item.stock < 1 ? 0.6 : 1,
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={() => handleClickColor(item)}
                  >
                    {item.color_id.hex_code === selectedVariant.color &&
                      item.stock > 0 && (
                        <CheckIcon
                          sx={{ position: "absolute", color: "gray" }}
                        />
                      )}
                    {item.color_id.hex_code === selectedVariant.color &&
                      item.stock < 1 && (
                        <RemoveIcon
                          sx={{ position: "absolute", color: "black" }}
                        />
                      )}
                  </Box>
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Variants;
