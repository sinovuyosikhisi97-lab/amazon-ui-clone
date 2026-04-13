"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Address = {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

type AddressContextType = {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
};

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // LOAD
  useEffect(() => {
    const stored = localStorage.getItem("addresses");
    const selected = localStorage.getItem("selectedAddress");

    if (stored) setAddresses(JSON.parse(stored));
    if (selected) setSelectedAddress(JSON.parse(selected));
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  }, [selectedAddress]);

  const addAddress = (address: Address) => {
    setAddresses((prev) => [...prev, address]);
    setSelectedAddress(address); // auto select
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));

    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  const selectAddress = (id: string) => {
    const found = addresses.find((a) => a.id === id);
    if (found) setSelectedAddress(found);
  };

  return (
    <AddressContext.Provider
      value={{ addresses, selectedAddress, addAddress, deleteAddress, selectAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("Address context missing");
  return ctx;
};