"use client";

import { useState, useRef } from "react";
import { useAddress } from "@/context/AddressContext";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

export default function AddressPage() {
  const { addresses, addAddress, deleteAddress, selectAddress } = useAddress();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC-7X17F8sF_OMRDbJhVF_k7BylgrwbDrQ", // 🔥 replace this
    libraries,
  });

  const autocompleteRef = useRef<any>(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    let street = "";
    let city = "";
    let province = "";
    let postalCode = "";

    place.address_components.forEach((comp: any) => {
      if (comp.types.includes("route")) street = comp.long_name;
      if (comp.types.includes("locality")) city = comp.long_name;
      if (comp.types.includes("administrative_area_level_1"))
        province = comp.long_name;
      if (comp.types.includes("postal_code"))
        postalCode = comp.long_name;
    });

    setForm((prev) => ({
      ...prev,
      street,
      city,
      province,
      postalCode,
    }));
  };

  const handleAdd = () => {
    if (!form.fullName || !form.street) return;

    addAddress({
      id: `addr-${Date.now()}`,
      ...form,
    });

    setForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
    });
  };

  if (!isLoaded) return <p className="p-6">Loading address search...</p>;

  return (
    <div className="p-6 max-w-[800px] mx-auto">

      <h1 className="text-xl font-bold mb-4">Your Addresses</h1>

      {/* 🔥 GOOGLE SEARCH */}
      <div className="bg-white p-4 mb-4 shadow">
        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            placeholder="Search your address..."
            className="border p-2 w-full"
          />
        </Autocomplete>
      </div>

      {/* FORM */}
      <div className="bg-white p-4 mb-6 grid gap-2 shadow">

        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
          className="border p-2"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border p-2"
        />

        <input
          placeholder="Street"
          value={form.street}
          onChange={(e) =>
            setForm({ ...form, street: e.target.value })
          }
          className="border p-2"
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          className="border p-2"
        />

        <input
          placeholder="Province"
          value={form.province}
          onChange={(e) =>
            setForm({ ...form, province: e.target.value })
          }
          className="border p-2"
        />

        <input
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={(e) =>
            setForm({ ...form, postalCode: e.target.value })
          }
          className="border p-2"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white py-2"
        >
          Add Address
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {addresses.map((a) => (
          <div key={a.id} className="bg-white p-4 shadow">

            <p className="font-semibold">{a.fullName}</p>
            <p className="text-sm">{a.street}</p>
            <p className="text-sm">
              {a.city}, {a.province}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => selectAddress(a.id)}
                className="bg-blue-500 text-white px-2 py-1 text-sm"
              >
                Deliver Here
              </button>

              <button
                onClick={() => deleteAddress(a.id)}
                className="bg-red-500 text-white px-2 py-1 text-sm"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}