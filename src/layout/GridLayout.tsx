
import { Grid } from "@chakra-ui/react";
import React from "react";

export const CONTAINER_WIDTH = 74.625;
interface GridLayoutProps {
  children: React.ReactNode;
}

export const Container = ({ children }: GridLayoutProps) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(4, 72px)", // ≤576px
        sm: "repeat(6, 72px)", // ≤768px
        md: "repeat(8, 72px)", // ≤992px
        lg: "repeat(12, 72px)", // ≤1200px
        xl: "repeat(12, 72px)", // >1200px
      }}
      gap="30px"
      width="74.625rem" // 1194px
      margin="0 auto"
     minHeight="100vh"   
   justifyItems="stretch"
      position="relative"
    >
      {children}
    </Grid>
  );
};