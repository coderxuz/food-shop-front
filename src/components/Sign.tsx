import React, { useState } from "react";
import { Button } from "./ui/button";

import axios from "axios";
Telegram.WebApp.ready();

const backendUrl = import.meta.env.VITE_API_URL;
const userData = Telegram.WebApp.initDataUnsafe;

const Sign = () => {
  const [phone, setPhone] = useState<string>("+998 ");

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digit characters except +
    let digits = value.replace(/[^\d+]/g, "");

    // Ensure it starts with +998
    if (!digits.startsWith("+998")) {
      digits = "+998 ";
    }
    // Apply phone number formatting
    digits = digits
      .replace(/(\+998)(\d{2})?(\d{3})?(\d{2})?(\d{2})?/, "$1 $2 $3 $4 $5")
      .trim();

    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(backendUrl);
    try {
      const response = await axios.post(`${backendUrl}/auth/sign`, {
        phone: phone,
        tg_id: userData.user?.id,
        full_name: `${userData.user?.first_name} ${userData.user?.last_name}`,
      });
      console.log(response.data);
    } catch (error) {
      console.error("POST request error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-full h-screen flex-col"
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
      <p>{userData.user?.first_name}</p>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Sign;
