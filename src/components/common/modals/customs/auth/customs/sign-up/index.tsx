import type React from "react";
import useSignUpFeatures from "./features";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SignUp: React.FC = () => {
  const { handleSubmit, loading, phoneError } = useSignUpFeatures();

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='picture'>Ismingiz</Label>
        <Input
          type='text'
          name='name'
          required
          className='w-full'
          disabled={loading} // Disable input while loading
        />
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='picture'>Familiyangiz</Label>
        <Input
          type='text'
          name='surname'
          required
          className='w-full'
          disabled={loading} // Disable input while loading
        />
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='picture'>Telefon raqamingizni kiriting</Label>
        <Input
          type='text'
          name='phoneNumber'
          placeholder='+998 99 --- -- --'
          required
          className='w-full'
          disabled={loading} // Disable input while loading
        />
        {phoneError && (
          <p className='text-crimson text-sm font-normal text-center text-[crimson]'>
            {phoneError}
          </p>
        )}
      </div>

      <Button
        type='submit'
        variant='default'
        className='bg-[#EF7F1A] w-full mt-6'
        disabled={loading} // Disable button while loading
      >
        {loading ? "Loading..." : "Ro'yhatdan o'tish"}
      </Button>
    </form>
  );
};

export default SignUp;
