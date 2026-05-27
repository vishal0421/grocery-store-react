import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Auth = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setShowUserLogin, setUser } = useContext(AppContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Name:", name, "Email:", email, "Password:", password);
    }

    return (
        <div onClick={() => setShowUserLogin(false)} className="fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={submitHandler}
                className="w-full max-w-md glass rounded-3xl shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in duration-300"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-white/85">
                        {state === "login" ? "Sign in to continue shopping" : "Join us for exclusive deals"}
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    {state === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-white/85 mb-2">Full Name</label>
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-white/85 mb-2">Email Address</label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/85 mb-2">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Toggle */}
                <div className="mt-6 text-center">
                    {state === "register" ? (
                        <p className="text-white/85">
                            Already have an account?{" "}
                            <span onClick={() => setState("login")} className="text-primary font-semibold cursor-pointer hover:underline">
                                Sign in
                            </span>
                        </p>
                    ) : (
                        <p className="text-white/85">
                            Don't have an account?{" "}
                            <span onClick={() => setState("register")} className="text-primary font-semibold cursor-pointer hover:underline">
                                Sign up
                            </span>
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    onClick={() => {
                        setUser(true);
                        setShowUserLogin(false);
                    }}
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                >
                    {state === "register" ? "Create Account" : "Sign In"}
                </Button>

                {/* Close Button */}
                <button
                    onClick={() => setShowUserLogin(false)}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                    <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default Auth;