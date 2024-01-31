import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider, Grid } from "@mui/material";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { readProducts } from "../../features/productSlice";

interface IFilterPanel {
  topcategory: string | undefined;
  midcategory: string | undefined;
  subcategory: string | undefined;
  search: string | undefined;
}
interface IFilteringOptions {
  title: string;
  options: string[] | [];
}
const FilterPanel: React.FC<IFilterPanel> = ({
  topcategory,
  midcategory,
  subcategory,
  search,
}) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const [filteringOptions, setFilteringOptions] = React.useState<
    IFilteringOptions[]
  >([]);

  React.useEffect(() => {
    const query = {
      topcategory,
      midcategory,
      subcategory,
      search,
    };
    const getProducts = async () => {
      await dispatch(readProducts(query));
    };
    getProducts();
  }, [dispatch, topcategory, midcategory, subcategory, search]);

  const setFilterOptions = () => {
    const colors: string[] = [];
    const sizes: string[] = [];
    const brands: string[] = [];
    const discounts: string[] = [];
    let prices: number[] = [];

    products.forEach((product) => {
      brands.push(product.brand.name);
      prices.push(product.price);
      discounts.push(product.discount.amount + "% off");
      product.variants.forEach((variant) => {
        colors.push(variant.color_id.name);
        sizes.push(variant.size_id.name);
      });
    });

    prices = [...new Set(prices)];

    const priceOptions = prices.map((price) => {
      if (price > 0 && price < 250) {
        return "$0 - $250";
      } else if (price >= 250 && price < 500) {
        return "$250 - $500";
      } else if (price >= 500 && price < 750) {
        return "$500 - $750";
      } else if (price >= 750 && price < 1000) {
        return "$750 - $1000";
      } else {
        return "over $1000";
      }
    });

    return {
      colors: [...new Set(colors)],
      sizes: [...new Set(sizes)],
      brands: [...new Set(brands)],
      price: [...new Set(priceOptions)],
      discount: [...new Set(discounts)],
    };
  };

  React.useEffect(() => {
    setFilteringOptions([
      { title: "Size", options: setFilterOptions().sizes },
      { title: "Color", options: setFilterOptions().colors },
      { title: "Price", options: setFilterOptions().price },
      { title: "Discount", options: setFilterOptions().discount },
      { title: "Brand", options: setFilterOptions().brands },
    ]);
  }, [products]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    console.log(event.target.name);
  };

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          mx: "auto",
          width: "90%",
          mt: 3,
        }}
      >
        <Typography variant="h6">Filters</Typography>
        <Typography variant="body1" color="error" mr={2}>
          Clear All
        </Typography>
      </Box>
      <Divider sx={{ height: 0, backgroundColor: "black", ml: 1, mr: 3 }} />
      <Grid>
        {filteringOptions &&
          filteringOptions.map((item) => (
            <Accordion
              key={item.title}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "none",
                width: "90%",
              }}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> {item.title}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <FormGroup>
                  {item.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      sx={{
                        "&:hover": {
                          color: "gray",
                        },
                        ml: 2,
                      }}
                      control={
                        <Checkbox
                          onChange={handleChange}
                          disableRipple
                          size="small"
                          sx={{
                            py: 0.5,
                          }}
                          name={option}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          ))}
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
