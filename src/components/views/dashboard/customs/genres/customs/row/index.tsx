import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/helpers";
import { GenreRowPropsI } from "./interface";
import { GiFlowerPot } from "react-icons/gi";
import useGenresService from "@/services/genres";

const GenreRow: React.FC<GenreRowPropsI> = ({ genre, index }) => {
  const { deleteGenreById } = useGenresService();

  const { t } = useTranslation();
  return (
    <TableRow key={genre._id}>
      <TableCell className='font-medium'>{index + 1}</TableCell>
      <TableCell className='flex items-center gap-2'>
        <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex items-center justify-center bg-[#BC8E5B] text-white'>
          {genre?.imgUrl ? (
            <PhotoProvider>
              <PhotoView src={genre.imgUrl}>
                <img
                  src={genre.imgUrl}
                  className='w-full h-full object-cover'
                  alt={genre.name}
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            <GiFlowerPot />
          )}
        </div>
        {genre.name}
      </TableCell>
      <TableCell>{genre?.audioBookCount || 0}</TableCell>
      <TableCell>{genre?.bookCount || 0}</TableCell>
      <TableCell>{genre?.ebookCount || 0}</TableCell>
      <TableCell>
        {genre?.createdAt ? formatDate(genre?.createdAt) : "..."}
      </TableCell>
      <TableCell className='flex items-center justify-end gap-2'>
        <Link to={`edit/${genre?._id}`}>
          <Button variant='secondary'>
            <FaUserEdit className='text-[22px]' />
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='secondary'>
              <MdDelete className='text-[22px] text-[crimson]' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("dashboard.genres.are_you_sure")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("dashboard.genres.are_you_sure_description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {t("dashboard.genres.cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteGenreById.mutate(genre._id)}
                className='bg-[crimson] hover:bg-[crimson]'
              >
                {t("dashboard.genres.continue")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
export default GenreRow;
