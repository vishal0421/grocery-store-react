import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {

  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { navigate } = useContext(AppContext);

  const handleChange = (e) => {

    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });

  };


  const submitHanlder = (e) => {

    e.preventDefault();

    toast.success(
      "Address Saved Successfully"
    );

    navigate("/cart");

  };


  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md">

      <div className="flex-1 bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Address Details
        </h2>

        <form
          onSubmit={submitHanlder}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={address.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={address.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={address.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md col-span-2"
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleChange}
            className="w-full p-2 border rounded-md col-span-2"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="zipCode"
            placeholder="Zip Code"
            value={address.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={address.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md col-span-2"
            required
          />

          <button
            type="submit"
            className="w-full col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
          >
            Save Address
          </button>

        </form>

      </div>


      <div className="flex-1 flex items-center justify-center">

        <img
          src={assets.add_address_iamge}
          alt=""
          className="w-full max-w-xs rounded-lg shadow-md"
        />

      </div>

    </div>
  );
};

export default Address;