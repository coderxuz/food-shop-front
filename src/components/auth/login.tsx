import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import LangSelect from "../lang/Lang";
import { AuthResponse } from "@/types/auth";
import DarkModeToggle from "../darmode/DarkModeToggle";

const backendUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digits (0-9)

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    console.log(fullCode);

    try {
      const response = await axios.post<AuthResponse>(
        `${backendUrl}/auth/login`,
        {
          code: fullCode,
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
    <div className="relative p-5">
      <div className="flex w-full justify-between">
        <DarkModeToggle className=" border-black border-1 p-1" />
        <LangSelect className="border-black dark:border-white border-1 p-2" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-full h-screen flex-col gap-4"
      >
        <p className="w-full text-center leading-8 font-medium text-base flex justify-center flex-col items-center">
          <a
            className="block w-fit border-b-2 border-black pb-1 text-xl dark:border-white"
            href="https://t.me/food_kungrad_shop_bot"
          >
            @food_kungrad_shop_bot
          </a>
          {t("enter_bot")}
        </p>
        <div className="flex gap-4">
          {code.map((num, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={num}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-10 h-10 text-center border-black border-2 dark:border-white rounded"
            />
          ))}
        </div>
        <p className="text-red-600">{error && t("invalid_credentials")}</p>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
