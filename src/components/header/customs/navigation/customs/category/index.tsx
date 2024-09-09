import React from "react";

const categories = [
  { label: "Kitoblar", path: "/kitoblar" },
  { label: "To'plamlar", path: "/toplamlar" },
  { label: "Mualliflar", path: "/mualliflar" },
  { label: "Chegirmalar", path: "/chegirmalar" },
];

const Category: React.FC<{ className: string }> = ({ className }) => {
  return (
    <ul className={className}>
      {categories.map((category) => (
        <li key={category.path}>
          <a
            href={category.path}
            className='text-[#000] text-[16px] font-normal'
          >
            {category.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Category;
