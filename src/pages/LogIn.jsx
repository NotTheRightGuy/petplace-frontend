import { SignIn } from "@clerk/clerk-react";

export default function LogIn() {
    return (
        <div className="h-screen flex justify-center items-center">
            <SignIn />
        </div>
    );
}
