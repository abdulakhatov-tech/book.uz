import { useCallback, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { BookI, UserI } from "@/types";
import useUsersService from "@/services/users";
import { setUserInfo } from "@/redux/slices/checkout";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toast } from "@/components/ui/use-toast";
import useOrdersService from "@/services/orders";
import { clearCart } from "@/redux/slices/cart";
import { toggleCheckoutSuccessModalVisibility } from "@/redux/slices/modals";
import useAxiosInstance from "@/api";

const useCheckoutFeatures = () => {
  const axios = useAxiosInstance();
  const dispatch = useAppDispatch();
  const user: UserI | null = useAuthUser();
  const { updateUserById } = useUsersService();
  const { cart } = useAppSelector((state) => state.cart);
  const { createOrder } = useOrdersService();
  const { userInfo, couponCode, delivery } = useAppSelector(
    (state) => state.checkout
  );

  const totalDiscount = cart?.reduce((acc, item) => {
    const itemDiscount =
      ((item?.bookPrice * item?.discount) / 100) * item?.amount;
    return acc + itemDiscount;
  }, 0);

  console.log(userInfo);

  // Sync user info with state
  useEffect(() => {
    if (user) {
      const { name, surname, phoneNumber, billingAddress } = user;

      dispatch(
        setUserInfo({
          name,
          surname,
          phoneNumber,
          billingAddress: {
            region: billingAddress?.region || userInfo.billingAddress?.region,
            district:
              billingAddress?.district || userInfo.billingAddress?.district,
            extraAddress:
              billingAddress?.extraAddress ||
              userInfo.billingAddress?.extraAddress,
          },
        })
      );
    }
  }, [user]);

  // Handler to submit updated user info
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Check if user info has changed
      const hasUserInfoChanged =
        user?.name !== userInfo.name ||
        user?.surname !== userInfo.surname ||
        user?.phoneNumber !== userInfo.phoneNumber ||
        user?.billingAddress?.region !== userInfo.billingAddress.region ||
        user?.billingAddress?.district !== userInfo.billingAddress.district ||
        user?.billingAddress?.extraAddress !==
          userInfo.billingAddress.extraAddress;

      if (hasUserInfoChanged && user) {
        updateUserById.mutate({
          _id: user._id,
          name: userInfo?.name,
          surname: userInfo?.surname,
          phoneNumber: userInfo?.phoneNumber,
          billingAddress: {
            region: userInfo?.billingAddress?.region,
            district: userInfo?.billingAddress?.district,
            extraAddress: userInfo?.billingAddress?.extraAddress,
          },
        });
      }

      const {
        name,
        surname,
        phoneNumber,
        billingAddress,
        delivery_method,
        payment_method,
        extra_note,
      } = userInfo;

      if (!name || !surname || !phoneNumber) {
        toast({ title: "Please fill in all required fields" });
        return;
      }

      if (
        !billingAddress?.region ||
        !billingAddress?.district ||
        !billingAddress?.extraAddress
      ) {
        toast({ title: "Please fill in all billing address fields" });
        return;
      }

      if (cart.length === 0) {
        toast({ title: "Cart is empty" });
        return;
      }

      let totalPrice = cart.reduce(
        (acc, item) => acc + item.bookPrice * item.amount,
        0
      );

      totalPrice = totalPrice - totalDiscount;

      // Apply couponCode as a percentage discount if available
      if (couponCode) {
        const discount = (couponCode / 100) * totalPrice;
        totalPrice = totalPrice - discount;
      }

      // Add delivery fee to total price
      const deliveryFee = delivery;
      totalPrice = totalPrice + deliveryFee;

      const books = cart?.map((item: BookI) => ({
        book: item?._id,
        quantity: item.amount,
      }));

      const booksPayload = cart.map((item) => ({
        book: { id: item._id, name: item.name, imgUrl: item.imgUrl }, // Include book name and ID
        quantity: item.amount,
        bookPrice: item.bookPrice, // Ensure you have the price here
      }));

      const orderPayload = {
        user: user?._id,
        books: booksPayload,
        delivery_method,
        payment_method,
        billingAddress: {
          region: billingAddress.region,
          district: billingAddress.district,
          extraAddress: billingAddress.extraAddress,
        },
        extra_note,
        price: totalPrice,
      };
      try {
        if (payment_method !== "cash") {
          const response = await axios.post(
            "/stripe/create-checkout-session",
            orderPayload
          );

          if (response?.data?.url) {
            window.location.href = response.data.url;
          } else {
            toast({
              title: "Error",
              description:
                "An error occurred while creating the checkout session. Please try again later.",
            });
          }
        }
        if (user) {
          await createOrder.mutateAsync(
            {
              user: user._id,
              books,
              delivery_method,
              payment_method,
              billingAddress: {
                region: billingAddress?.region,
                district: billingAddress?.district,
                extraAddress: billingAddress?.extraAddress,
              },
              extra_note,
              price: totalPrice,
            },
            {
              onSuccess: () => {
                dispatch(clearCart());
                dispatch(toggleCheckoutSuccessModalVisibility(true));
              },
            }
          );
        }
      } catch (error) {
        toast({
          title: "Error",
          description:
            "An error occurred while processing your order. Please try again later.",
        });
      }

      // console.log(userInfo)
    },
    [user, userInfo, updateUserById, createOrder, cart]
  );
  return { onSubmit };
};

export default useCheckoutFeatures;
