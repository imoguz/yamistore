import { Grid, Pagination } from "@mui/material";
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
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [paginationCount, setPaginationCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const fetchProducts = async (page: number) => {
    const query = {
      subcategory: childMenu,
      midcategory: subMenu,
      topcategory: mainMenu,
      page: page,
      limit: pageSize,
    };
    const data = await dispatch(readProducts(query));
    setProductList(data.payload as IProduct[]);
  };

  const fetchAllProducts = async () => {
    const query = {
      subcategory: childMenu,
      midcategory: subMenu,
      topcategory: mainMenu,
    };
    const data = await dispatch(readProducts(query));
    setPaginationCount(
      Math.ceil((data.payload as IProduct[]).length / pageSize)
    );
  };

  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, mainMenu, subMenu, childMenu]);

  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          <LoadingSkeleton />
        </Grid>
      </Grid>
    );
  }
  if (error) {
    return <ErrorPage error={error} />;
  }

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchProducts(value);
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        <Grid container spacing={2}>
          {productList?.map((product, index) => (
            <Grid key={index} item>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Grid my={3} display="flex" justifyContent="center">
          <Pagination
            count={paginationCount}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductListingPage;
