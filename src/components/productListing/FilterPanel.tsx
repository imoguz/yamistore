import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Divider, Grid } from "@mui/material";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { readProducts } from "../../features/productSlice";

interface IFilterPanelProps {
  topcategory: string | undefined;
  midcategory: string | undefined;
  subcategory: string | undefined;
  search: string | undefined;
  selectedFilters: ISelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<ISelectedFilters>>;
}
interface IFilterOptions {
  title: string;
  options: string[] | [];
}

const FilterPanel: React.FC<IFilterPanelProps> = ({
  topcategory,
  midcategory,
  subcategory,
  search,
  selectedFilters,
  setSelectedFilters,
}) => {
  const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector((state) => state.products);
  const [listedProducts, setListedProducts] = React.useState<IProduct[] | []>(
    []
  );
  const [filterOptions, setFilterOptions] = React.useState<IFilterOptions[]>(
    []
  );

  React.useEffect(() => {
    const query = {
      topcategory,
      midcategory,
      subcategory,
      search,
    };
    const getProducts = async () => {
      const data: any = await dispatch(readProducts(query));
      data && setListedProducts(data?.payload?.data as IProduct[]);
    };
    getProducts();
  }, [dispatch, topcategory, midcategory, subcategory, search]);

  const filterOptionsFn = () => {
    const colors: string[] = [];
    const sizes: string[] = [];
    const brands: string[] = [];
    const discounts: string[] = [];
    let prices: number[] = [];

    listedProducts?.forEach((product) => {
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
        return "$1000 - more";
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
    setFilterOptions([
      { title: "Size", options: filterOptionsFn().sizes },
      { title: "Color", options: filterOptionsFn().colors },
      { title: "Price", options: filterOptionsFn().price },
      { title: "Discount", options: filterOptionsFn().discount },
      { title: "Brand", options: filterOptionsFn().brands },
    ]);
  }, [listedProducts]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    setSelectedFilters({
      ...selectedFilters,
      [title]: event.target.checked
        ? [...selectedFilters[title], event.target.name]
        : [
            ...selectedFilters[title].filter(
              (item) => item !== event.target.name
            ),
          ],
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({
      Size: [],
      Color: [],
      Price: [],
      Discount: [],
      Brand: [],
    });
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
        <Button
          variant="text"
          color="error"
          size="small"
          sx={{ py: 0, mr: 1 }}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </Box>
      <Divider sx={{ height: 0, backgroundColor: "black", ml: 1, mr: 3 }} />
      <Grid>
        {filterOptions &&
          filterOptions.map((item) => (
            <Accordion
              key={item.title}
              disableGutters
              sx={{
                boxShadow: "none",
                width: "90%",
              }}
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
                          onChange={(event) => handleChange(event, item.title)}
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
