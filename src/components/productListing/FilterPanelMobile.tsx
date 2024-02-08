import * as React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { readProducts } from "../../features/productSlice";
import { readColors } from "../../features/colorSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IFilterPanelMobileProps {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
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

const FilterPanelMobile: React.FC<IFilterPanelMobileProps> = ({
  openFilter,
  setOpenFilter,
  topcategory,
  midcategory,
  subcategory,
  search,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleClose = () => {
    setOpenFilter(false);
    setSelectedTempFilters({ ...selectedFilters });
  };

  const handleApplyFilters = () => {
    setSelectedFilters({ ...selectedTempFilters });
    setOpenFilter(false);
  };

  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state) => state.color);
  const [listedProducts, setListedProducts] = React.useState<IProduct[] | []>(
    []
  );
  const [filterOptions, setFilterOptions] = React.useState<IFilterOptions[]>(
    []
  );
  const [selectedTempFilters, setSelectedTempFilters] =
    React.useState<ISelectedFilters>({
      Color: [],
      Size: [],
      Price: [],
      Discount: [],
      Brand: [],
    });

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

  React.useEffect(() => {
    const getColors = async () => {
      await dispatch(readColors());
    };
    getColors();
  }, [dispatch]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listedProducts]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    setSelectedTempFilters({
      ...selectedTempFilters,
      [title]: event.target.checked
        ? [...selectedTempFilters[title], event.target.name]
        : [
            ...selectedTempFilters[title].filter(
              (item) => item !== event.target.name
            ),
          ],
    });
  };

  const handleClearAll = () => {
    setSelectedTempFilters({
      Size: [],
      Color: [],
      Price: [],
      Discount: [],
      Brand: [],
    });

    setSelectedFilters({
      Size: [],
      Color: [],
      Price: [],
      Discount: [],
      Brand: [],
    });
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openFilter}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filter
            </Typography>
            <Box>
              <Button autoFocus color="inherit" onClick={handleClearAll}>
                Clear All
              </Button>
              <Button autoFocus color="inherit" onClick={handleApplyFilters}>
                Apply
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <List>
          <Grid>
            {filterOptions &&
              filterOptions.map((item, index) => (
                <Box>
                  <Typography variant="h5" key={item.title} ml={1} gutterBottom>
                    {item.title}
                  </Typography>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    {item.options.map((option) => (
                      <FormControlLabel
                        key={option}
                        sx={{
                          ml: 3,
                          width: 140,
                          "&:hover": {
                            opacity: 0.7,
                          },
                        }}
                        control={
                          <Checkbox
                            onChange={(event) =>
                              handleChange(event, item.title)
                            }
                            disableRipple
                            sx={{
                              py: 0.5,
                              color:
                                colors.length > 0
                                  ? colors.find(
                                      (color) => color.name === option
                                    )?.hex_code
                                  : "inherit",
                              "&.Mui-checked": {
                                color:
                                  colors.length > 0
                                    ? colors.find(
                                        (color) => color.name === option
                                      )?.hex_code
                                    : "inherit",
                              },
                            }}
                            checked={selectedTempFilters[item.title].includes(
                              option
                            )}
                            name={option}
                          />
                        }
                        label={
                          <Typography variant="body1">{option}</Typography>
                        }
                      />
                    ))}
                  </FormGroup>
                  {index !== filterOptions.length - 1 && (
                    <Divider
                      sx={{
                        height: 0,
                        backgroundColor: "black",
                        my: 2,
                        mx: "auto",
                        width: "95%",
                      }}
                    />
                  )}
                </Box>
              ))}
          </Grid>
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default FilterPanelMobile;
