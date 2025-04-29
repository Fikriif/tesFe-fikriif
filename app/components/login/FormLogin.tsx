'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import FormAuth from '../FormAuth';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormValues = {
  username: string;
  password: string;
};

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const loginRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data
      );
      localStorage.setItem('token', loginRes.data.token);
      const token = localStorage.getItem('token');
      const profileRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      const role = profileRes.data.role;

      if (role === "Admin") {
        router.push("/pages/admin-dashboard");
      } else if (role === "User") {
        router.push("/pages/user-dashboard");
      } else {
        alert("Role tidak dikenali");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Terjadi kesalahan saat login.";
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        {errorMessage && (
          <p className="border border-red-500 rounded-md p-2 bg-red-500 text-white text-sm mt-2">
            {errorMessage}
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white rounded-md bg-white p-2"
      >
        <div className="flex flex-row justify-center items-center gap-1 py-5 px-20">
          <Image src="/Vector.png" alt="logo" width={20} height={22} />
          <p className="font-semibold text-[#000150]">Logoipsum</p>
        </div>

        <div className="px-2">
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="username">Username</label>
            <FormAuth
              placeholder="input username"
              type="text"
              {...register("username", { required: "Username wajib diisi" })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 text-sm mt-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <FormAuth
                placeholder="input password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password wajib diisi" })}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <Image
                  src={showPassword ? "/eye-off.png" : "/eye.png"}
                  alt="logo"
                  width={16}
                  height={16}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="py-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-sm text-white py-2 rounded"
            >
              <div>{isLoading ? "Loading..." : "Login"}</div>
            </button>
          </div>
          <div className="flex justify-center text-sm py-3">
            <span className='mr-1'>Don't have an account?</span>{" "}
            <Link href="/pages/register" className="underline text-blue-600">
              Register
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
