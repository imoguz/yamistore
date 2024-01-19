import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import FilterAccordion from "../components/productListing/FilterAccordion";
import { useEffect } from "react";
import LoadingSkeleton from "../components/productListing/Skeleton";
import ProductCard from "../components/productListing/ProductCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { readProducts } from "../features/productSlice";
import ErrorPage from "./ErrorPage";

const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const { mainMenu, subMenu, childMenu } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    const query: IQuery = {
      subcategory: childMenu,
      category: subMenu,
      topcategory: mainMenu,
    };

    dispatch(readProducts(query));
  }, [dispatch, mainMenu, subMenu, childMenu]);

  if (loading) {
    return (
      <Box minHeight={500}>
        <LoadingSkeleton />
      </Box>
    );
  }
  if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <Grid container spacing={2} minHeight={"80vh"} my={1}>
      <Grid item xs={2}>
        <FilterAccordion />
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          {products?.map((product, index) => (
            <Grid key={index} item>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductListingPage;
