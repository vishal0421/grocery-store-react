import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

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

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Address Saved Successfully");
    navigate("/cart");
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Add Delivery Address</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
          </div>
          <p className="text-white/85 mt-4">Enter your delivery details below</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <Card className="flex-1 p-6 md:p-8 shadow-xl border border-white/12 glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Address Details</h2>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white/85 mb-2">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={address.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/85 mb-2">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={address.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white/85 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={address.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white/85 mb-2">Street Address</label>
                  <Input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/85 mb-2">City</label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/85 mb-2">State</label>
                  <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/85 mb-2">Zip Code</label>
                  <Input
                    type="number"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={address.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/85 mb-2">Country</label>
                  <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white/85 mb-2">Phone Number</label>
                  <Input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={address.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                    Save Address
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* Image */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-3xl animate-pulse"></div>
              <img
                src={assets.add_address_iamge}
                alt="Delivery"
                className="w-full max-w-sm rounded-3xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;