import { IconButton, TextField, Tooltip, Dialog } from "@radix-ui/themes";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    BellIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
    const navigate = useNavigate();
    return (
        <nav className="h-16 w-full border-b-[1px] flex items-center p-4 justify-between top-0 z-10">
            <div className="w-1/2">
                <TextField.Root>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                    <TextField.Input
                        placeholder="Search for pets, services, etc."
                        className="font-roboto"
                    />
                </TextField.Root>
            </div>
            <div className="flex gap-4">
                <Tooltip content="Vet.AI">
                    <IconButton
                        variant="outline"
                        color="gray"
                        onClick={() => {
                            navigate("/chat");
                        }}
                    >
                        <RocketIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Put for Adoption">
                    <IconButton
                        variant="outline"
                        color="gray"
                        onClick={() => {
                            navigate("/pet/adoption");
                        }}
                    >
                        <PlusIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </nav>
    );
}
