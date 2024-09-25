import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
const LoadingRows: React.FC = () => (
  <>
    {Array.from({ length: 10 }).map((_, idx) => (
      <TableRow key={idx}>
        {Array.from({ length: 7 }).map((__, cellIdx) => (
          <TableCell key={cellIdx}>
            <Skeleton className='w-full h-[24px]' />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
export default LoadingRows;
