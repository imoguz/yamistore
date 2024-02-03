import { Box, Divider, Grid, Pagination, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { readProducts } from "../features/productSlice";
import FilterPanel from "../components/productListing/FilterPanel";
import LoadingSkeleton from "../components/productListing/Skeleton";
import ProductCard from "../components/productListing/ProductCard";
import ErrorPage from "./ErrorPage";

const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);
  const [productData, setProductData] = useState<IProductData | null>(null);
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
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item xs={2} sx={{ position: "sticky", top: 0 }}>
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

      <Grid
        item
        pt={2}
        xs={10}
        sx={{
          overflowY: "auto",
          maxHeight: "100vh",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
            width: "97%",
            mt: 1,
          }}
        >
          <Typography variant="h5">
            {subcategory &&
              subcategory[0].toUpperCase() + subcategory?.slice(1)}
          </Typography>
          <Typography variant="h6" mr={2}>
            {productData && productData.totalRecords} Items
          </Typography>
        </Box>
        <Divider sx={{ height: 0, backgroundColor: "black", mr: 2 }} />
        <Grid container spacing={2} mt={1}>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            productData?.data?.map((product) => (
              <Grid key={product._id} item>
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
    </Grid>
  );
};

export default ProductListingPage;
