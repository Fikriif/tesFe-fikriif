'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
