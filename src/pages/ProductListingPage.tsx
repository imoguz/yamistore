import { Box, Divider, Grid, Pagination, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { readProducts } from "../features/productSlice";
import FilterAccordion from "../components/productListing/FilterAccordion";
import LoadingSkeleton from "../components/productListing/Skeleton";
import ProductCard from "../components/productListing/ProductCard";
import ErrorPage from "./ErrorPage";

const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const { mainMenu, subMenu, childMenu } = useParams();
  const { loading, error } = useAppSelector((state) => state.products);
  const [productData, setProductData] = useState<IProductData | null>(null);
  const [page, setPage] = useState<number>(1);
  const pageSize = process.env.REACT_APP_LIMIT || 10;

  useEffect(() => {
    const query = {
      subcategory: childMenu,
      midcategory: subMenu,
      topcategory: mainMenu,
      page: page,
      limit: pageSize,
    } as IQuery;
    const fetchProducts = async () => {
      const data = await dispatch(readProducts(query));
      console.log(data.payload);
      data.payload && setProductData({ ...(data.payload as IProductData) });
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, mainMenu, subMenu, childMenu, page]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  const handlePaginationChange = (
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
        <FilterAccordion />
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
            {childMenu && childMenu[0].toUpperCase() + childMenu?.slice(1)}
          </Typography>
          <Typography variant="h6" mr={2}>
            Items
          </Typography>
        </Box>
        <Divider sx={{ height: 0, backgroundColor: "black", mr: 2 }} />
        <Grid container spacing={2} mt={1}>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            productData?.data?.map((product, index) => (
              <Grid key={product._id} item>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
        <Grid my={4} display="flex" justifyContent="center">
          {productData?.pageSize && productData?.pageSize !== 0 ? (
            <Pagination
              count={productData?.pages?.total}
              page={page}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePaginationChange}
            />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductListingPage;
