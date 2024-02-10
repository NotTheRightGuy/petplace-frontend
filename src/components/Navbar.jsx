import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/clerk-react";
export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-16 flex items-center px-10 justify-between border-b-[1px] shadow-sm">
            <div className="text-xl opacity-90 flex flex-4 items-center">
                <img src={Logo} alt="Logo" className="h-16 " />
                <div
                    className="font-protest"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    PetPlace
                </div>
            </div>
            <div className="flex gap-6 font-roboto font-bold opacity-80">
                <div className="cursor-pointer">Pets</div>
                <div className="cursor-pointer">Service</div>
                <SignedOut>
                    <div
                        className="cursor-pointer opacity-100"
                        onClick={() => {
                            navigate("/auth/login");
                        }}
                    >
                        Login
                    </div>
                </SignedOut>
                <SignedIn>
                    <div
                        className="cursor-pointer opacity-100"
                        onClick={() => {
                            navigate("/user/dashboard");
                        }}
                    >
                        Dashboard
                    </div>
                    <SignOutButton />
                </SignedIn>
            </div>
        </div>
    );
}
