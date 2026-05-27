import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SellerLogin = () => {

    const {
        isSeller,
        setIsSeller,
        navigate,
        setShowUserLogin
    } = useContext(AppContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSeller(true);
    };

    return !isSeller && (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed top-0 left-0 bottom-0 right-0 z-40 flex items-center justify-center bg-black/50 text-white"
        >

            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={submitHandler}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-white glass rounded-lg shadow-xl border border-white/12"
            >

                <p className="text-2xl font-medium m-auto">
                    <span className="text-indigo-500">
                        Seller
                    </span> Login
                </p>

                <div className="w-full">
                    <p>Email</p>

                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="type here"
                        className="border border-white/12 rounded w-full p-2 mt-1 outline-indigo-500 bg-transparent text-white"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>

                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="type here"
                        className="border border-white/12 rounded w-full p-2 mt-1 outline-indigo-500 bg-transparent text-white"
                        required
                    />
                </div>

                <button
                    className="btn-accent-custom w-full py-2 rounded-md cursor-pointer text-white"
                >
                    Login
                </button>

            </form>

        </div>
    );
};

export default SellerLogin;