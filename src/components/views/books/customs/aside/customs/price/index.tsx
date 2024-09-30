import Slider from "rc-slider";
import { useTranslation } from "react-i18next";
import { useState, useEffect, type FC } from "react";
import { formatPrice } from "@/helpers";
import useSearchParamsHook from "@/hooks/useSearchParams";

const Price: FC = () => {
  const { t } = useTranslation();
  const { setParams, getParam } = useSearchParamsHook();

  const initialFromPrice = parseInt(getParam('fromPrice') as string, 10) || 0;
  const initialToPrice = parseInt(getParam('toPrice') as string, 10) || 1000000;

  // Set the initial range based on query parameters
  const [range, setRange] = useState<number[]>([
    Math.min(Math.max(initialFromPrice, 0), 1000000), 
    Math.min(Math.max(initialToPrice, 0), 1000000)  
  ]);

  useEffect(() => {
    const fromPrice = +(getParam('fromPrice') as string);
    const toPrice = +(getParam('toPrice') as string);

    console.log(fromPrice, toPrice, '=========')

    if (fromPrice >= 0 && fromPrice <= 1000000 && toPrice >= 0 && toPrice <= 1000000) {
      setParams({ fromPrice: range[0], toPrice: range[1] });
    } else {
      // Reset range to default if invalid values are detected
      setParams({ fromPrice: 0, toPrice: 1000000 });
      setRange([0, 1000000]);
    }
  }, [range]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRange(value);
    }
  };

  console.log(range)

  const formattedFromPrice = formatPrice(range[0]);
  const formattedToPrice = formatPrice(range[1]);

  return (
    <div className='bg-secondary-gray py-[18px] px-4 rounded-[8px] flex flex-col gap-4'>
      <h4 className='text-[16px] font-semibold leading-[24px] text-secondary-black'>
        {t('books.price')}
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
        <span className="text-orange font-bold">{formattedFromPrice}</span> {t('books.sum')} - <span className="text-orange font-bold">{formattedToPrice}</span> {t('books.sum')}
      </p>
    </div>
  );
};

export default Price;
