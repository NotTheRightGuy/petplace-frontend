import { Card, Flex, Avatar } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
export default function Sidebar() {
    const { user } = useUser();
    const navigate = useNavigate();
    return (
        <div className="border-r-[2px] h-screen w-[20%] p-4 flex relative">
            <div className="font-protest text-lg opacity-90">PetPlace</div>
            <div className="absolute bottom-2">
                <Card
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => {
                        navigate("/user/profile");
                    }}
                >
                    <Flex align="center" gap="4">
                        <Avatar
                            src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Abby"
                            alt="Profile picture"
                            height={20}
                            width={20}
                        />
                        <div>
                            <div className="font-roboto text-sm">
                                {user.fullName}
                            </div>
                            <div className="font-roboto text-xs text-slate-500 opacity-75">
                                View profile
                            </div>
                        </div>
                    </Flex>
                </Card>
            </div>
        </div>
    );
}
