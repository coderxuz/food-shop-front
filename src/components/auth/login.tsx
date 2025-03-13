import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { formatPhoneNumber } from "@/utils/login";
import { useTranslation } from "react-i18next";
import LangSelect from "../lang/Lang";
import { AuthResponse } from "@/types/auth";

const backendUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [phone, setPhone] = useState<string>("+998 ");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneTrimmed = phone.replace(/\s/g, "");

    try {
      const response = await axios.post<AuthResponse>(
        `${backendUrl}/auth/sign`,
        {
          phone: phoneTrimmed,
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <LangSelect className="border m-4 absolute right-0 mt-5 mr-6 border-black p-1"></LangSelect>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-full h-screen flex-col gap-2"
      >
        <input
          type="text"
          value={phone}
          onChange={handleChange}
          maxLength={17}
          placeholder="+998 XX XXX XX XX"
          className="border p-2 rounded"
          inputMode="numeric"
        />
        <p className="text-red-600">{error && t("invalid_credentials")}</p>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default Login;
