"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import FormAuth from "../FormAuth";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


type FormValues = {
  username: string;
  password: string;
  role: string;
};

const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        data
      );
      console.log(res);
      setSuccessMessage("Akun berhasil dibuat.");
      setTimeout(() => {
        setErrorMessage("");
        router.push("/");
      }, 3000);
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.error || "Terjadi kesalahan saat login.";
        setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
      }
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
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        {successMessage && (
          <p className="border border-green-500 rounded-md p-2 bg-green-500 text-white text-sm mt-2">
            {successMessage}
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

          <div className="flex flex-col gap-1 text-sm mt-2">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              {...register("role", { required: "Role wajib dipilih" })}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>

          <div className="py-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-sm text-white py-2 rounded"
            >
              <div>{isLoading ? "Loading..." : "Register"}</div>
            </button>
          </div>
          <div className="flex justify-center text-sm">
            <span className="mr-1">Already have an account?</span>{" "}
            <Link href="/" className="underline text-blue-600">
              Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
