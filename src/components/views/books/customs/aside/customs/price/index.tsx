import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import { formatPrice } from "@/helpers";

const Price: FC = () => {
  const { t } = useTranslation();
  
  // Using useSearchParams hook to get and set query params
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial prices from URL or set default values
  const initialFromPrice = searchParams.get("fromPrice") ? parseInt(searchParams.get("fromPrice") as string, 10) : 0;
  const initialToPrice = searchParams.get("toPrice") ? parseInt(searchParams.get("toPrice") as string, 10) : 1000000;

  // State for price range
  const [range, setRange] = useState<number[]>([initialFromPrice, initialToPrice]);

  // Handle slider value changes
  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRange(value);

      // Immediately update URL params without debounce
      if (value[0] !== 0 || value[1] !== 1000000) {
        searchParams.set("fromPrice", value[0].toString());
        searchParams.set("toPrice", value[1].toString());
      } else {
        searchParams.delete("fromPrice");
        searchParams.delete("toPrice");
      }
      setSearchParams(searchParams);
    }
  };

  // Update the state when the query params change
  useEffect(() => {
    const fromPrice = searchParams.get("fromPrice") ? parseInt(searchParams.get("fromPrice") as string, 10) : 0;
    const toPrice = searchParams.get("toPrice") ? parseInt(searchParams.get("toPrice") as string, 10) : 1000000;
    setRange([fromPrice, toPrice]);
  }, [searchParams]);

  // Format prices for display
  const formattedFromPrice = formatPrice(range[0]);
  const formattedToPrice = formatPrice(range[1]);

  return (
    <div className="bg-secondary-gray py-[18px] px-4 rounded-[8px] flex flex-col gap-4">
      <h4 className="text-[16px] font-semibold leading-[24px] text-secondary-black">
        {t("books.price")}
      </h4>
      <div className="px-2">
        <Slider
          range
          min={0}
          max={1000000}
          value={range}
          onChange={handlePriceChange}
        />
      </div>
      <p>
        <span className="text-orange font-bold">{formattedFromPrice}</span>{" "}
        {t("books.sum")} -{" "}
        <span className="text-orange font-bold">{formattedToPrice}</span>{" "}
        {t("books.sum")}
      </p>
    </div>
  );
};

export default Price;
