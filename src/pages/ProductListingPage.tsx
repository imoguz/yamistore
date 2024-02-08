import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { readProducts } from "../features/productSlice";
import FilterPanel from "../components/productListing/FilterPanel";
import LoadingSkeleton from "../components/productListing/Skeleton";
import ProductCard from "../components/productListing/ProductCard";
import ErrorPage from "./ErrorPage";
import SortMenu from "../components/productListing/SortMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TuneIcon from "@mui/icons-material/Tune";
import FilterPanelMobile from "../components/productListing/FilterPanelMobile";

const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const [sortMenu, setSortMenu] = useState<ISortMenu>({
    open: false,
    option: "Featured",
    field: "name",
    order: 1,
  });

  const { loading, error } = useAppSelector((state) => state.products);
  const [productData, setProductData] = useState<IProductData | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = process.env.REACT_APP_LIMIT || 10;
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    Color: [],
    Size: [],
    Price: [],
    Discount: [],
    Brand: [],
  });

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("query") || undefined;

  const [topcategory, midcategory, ...remaining] = category
    ? category.split("-")
    : [undefined, undefined, undefined];
  const subcategory = remaining.length > 0 ? remaining.join("-") : undefined;

  const filterOptions = () => {
    const options: ISelectedFilters = {};

    for (const key in selectedFilters) {
      if (selectedFilters[key].length > 0) {
        options[key] = selectedFilters[key];
      }
    }

    return options;
  };

  useEffect(() => {
    const query = {
      topcategory,
      midcategory,
      subcategory,
      search,
      page: page,
      limit: pageSize,
      filteroptions: filterOptions(),
      sort: { [sortMenu.field]: sortMenu.order },
    } as IQuery;

    const fetchProducts = async () => {
      const data = await dispatch(readProducts(query));
      data.payload && setProductData({ ...(data.payload as IProductData) });
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    topcategory,
    midcategory,
    subcategory,
    search,
    page,
    selectedFilters,
    sortMenu.option,
  ]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (page === value) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(value);
  };

  return (
    <Grid
      container
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
    >
      <Grid
        item
        sx={{
          width: 250,
          flexShrink: 0,
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <FilterPanel
          {...{
            topcategory,
            midcategory,
            subcategory,
            search,
            selectedFilters,
            setSelectedFilters,
          }}
        />
      </Grid>

      <Grid item pt={2} sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
            width: "97%",
            mt: 1,
          }}
        >
          <Typography variant="body1" fontSize={{ xs: 16, sm: 18 }}>
            {subcategory &&
              subcategory[0].toUpperCase() + subcategory?.slice(1)}
            <Typography
              component="span"
              variant="body1"
              fontSize={{ xs: 14, sm: 16 }}
              pl={1}
            >
              ({productData && productData.totalRecords} Items)
            </Typography>
          </Typography>
          <Box
            sx={{
              display: { md: "flex" },
              position: "relative",
              width: { xs: 185, md: 220 },
              justifyContent: "right",
              alignItems: "center",
            }}
            onMouseOver={() => setSortMenu({ ...sortMenu, open: true })}
            onMouseLeave={() => setSortMenu({ ...sortMenu, open: false })}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                gap: { xs: 0.5, md: 1 },
                "&:hover": { cursor: "pointer" },
              }}
            >
              <Typography variant="body1" fontSize={{ xs: 14, sm: 17 }}>
                Sort by:
              </Typography>
              <Typography
                variant="body2"
                fontSize={{ xs: 13, sm: 14 }}
                sx={{ color: "#414141" }}
              >
                {sortMenu.option}
              </Typography>
              {sortMenu.open ? (
                <ExpandLessIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              )}
            </Box>
            <SortMenu {...{ sortMenu, setSortMenu }} />
          </Box>
        </Box>
        <Divider
          sx={{ backgroundColor: "black", width: "98%", mx: "auto", mb: 1 }}
        />
        <Grid
          container
          columnSpacing={{ xs: 1 }}
          rowSpacing={{ xs: 2 }}
          mt={1}
          px={0.5}
          justifyContent="space-between"
        >
          {loading ? (
            <Grid item>
              <LoadingSkeleton />
            </Grid>
          ) : (
            productData?.data?.map((product) => (
              <Grid item key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
        <Grid my={4} display="flex" justifyContent="center">
          {productData?.pageSize && productData?.pageSize > 1 ? (
            <Pagination
              count={productData?.pages?.total}
              page={page}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePagination}
            />
          ) : null}
        </Grid>
      </Grid>
      <Box sx={{ position: "fixed", bottom: 0, zIndex: 10 }}>
        <Button
          variant="contained"
          fullWidth
          size="small"
          color="info"
          sx={{
            display: { md: "none" },
            borderRadius: 0,
            opacity: 0.8,
          }}
          startIcon={<TuneIcon />}
          onClick={() => setOpenFilter(true)}
        >
          <Typography id="filter">Filter</Typography>
        </Button>
      </Box>
      <FilterPanelMobile
        {...{
          openFilter,
          setOpenFilter,
          topcategory,
          midcategory,
          subcategory,
          search,
          selectedFilters,
          setSelectedFilters,
        }}
      />
    </Grid>
  );
};

export default ProductListingPage;
