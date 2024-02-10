import { IconButton, TextField, Tooltip, Dialog, Card } from "@radix-ui/themes";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    BellIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import axios from "axios";

import { CiChat1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TopBar() {
    const navigate = useNavigate();

    return (
        <nav className="h-16 w-full border-b-[1px] flex items-center p-4 justify-between">
            <div
                className="w-1/2 font-protest cursor-pointer ml-6"
                onClick={() => {
                    navigate("/user/dashboard");
                }}
            >
                PetPlace
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

export default function ChatBot() {
    const [messages, setMessages] = useState([
        {
            role: "system",
            content:
                "You are an expert Veterinary Doctor who excels in treating every kind of animal. Users will come to you asking for help regarding their pets. You may diagnoise what they might be suffering, how they can help them. If the issue looks serious to you, prompt the user to visit a nearby doctor. Be concise and upto point. Only provide accurate points and if you think your advice might cause more harm, let them know. Don't repeat yourself",
        },
        {
            role: "assistant",
            content:
                "Hello! I am Vet.AI, your personal veterinary assistant. How can I help you today?",
        },
    ]);

    function sendToAI(e) {
        const userData = {
            role: "user",
            content: e.target.value,
        };
        setMessages([...messages, userData]);
        axios
            .post("http://localhost:1234/v1/chat/completions", {
                messages: [...messages, userData],
            })
            .then((res) => {
                const aiResponse = res.data.choices[0].message;
                console.log(aiResponse);
                setMessages([
                    ...messages,
                    userData,
                    {
                        role: "assistant",
                        content: aiResponse.content,
                    },
                ]);
            });
    }

    return (
        <main className="relative h-screen">
            <TopBar />

            <div className="flex justify-center h-[90vh] items-center">
                <Card className="h-[86vh] w-[90vw] p-4 bg-slate-100 relative">
                    <div className="h-[80%] overflow-y-auto">
                        {messages.map((message, index) => {
                            if (message.role !== "system") {
                                return (
                                    <div
                                        key={index}
                                        className={`${
                                            message.role === "assistant"
                                                ? "flex justify-start mt-2"
                                                : "flex justify-end mt-2"
                                        }`}
                                    >
                                        <div
                                            className={`${
                                                message.role === "assistant"
                                                    ? "bg-slate-200 font-poppins opacity-90 text-sm mt-2"
                                                    : "bg-slate-400 text-white font-poppins opacity-90 text-sm mt-2"
                                            } p-2 rounded-lg`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <TextField.Root className="absolute bottom-0 w-[98%]">
                        <TextField.Slot>
                            <CiChat1 height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input
                            placeholder="Chat with Vet.AI"
                            className="font-roboto text-center"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendToAI(e);

                                    e.target.value = "";
                                }
                            }}
                        />
                    </TextField.Root>
                </Card>
            </div>
        </main>
    );
}
