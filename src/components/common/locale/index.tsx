import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Locale: React.FC = () => {
  return (
    <Select>
      <SelectTrigger className='w-[40px] h-fit px-0 py-0 border-none text-[15px]'>
        <SelectValue placeholder='EN' />
      </SelectTrigger>
      <SelectContent className="bg-[white]">
        <SelectItem value='uz'>UZ</SelectItem>
        <SelectItem value='en'>EN</SelectItem>
        <SelectItem value='ru'>RU</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Locale;
