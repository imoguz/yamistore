import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
interface ILinearProgressComp {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const LinearProgressComp: React.FC<ILinearProgressComp> = ({
  page,
  setPage,
}) => {
  const footerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage(page + 1);
        }
      });
    });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box sx={{ width: "15%", mx: "auto", my: 3 }} ref={footerRef}>
      <LinearProgress />
    </Box>
  );
};

export default LinearProgressComp;
