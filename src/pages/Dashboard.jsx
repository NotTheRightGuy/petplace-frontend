import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { Card, Grid, Separator } from "@radix-ui/themes";
import { PiDogBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AdoptionCard from "../components/AdoptionCard";
import axios from "axios";
export default function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:3000/adoption")
            .then((res) => {
                console.log(res.data);
                setPetsForAdoption(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [petsForAdoption, setPetsForAdoption] = useState([]);
    return (
        <SignedIn>
            <div className="flex">
                <Sidebar />
                <main className="w-screen">
                    <TopBar />
                    <Grid
                        columns="3"
                        width="auto"
                        className="mt-3 mx-2 gap-10 h-36"
                    >
                        <TopFilter
                            title="Dog"
                            description="Woof! Wagging tails and floppy ears, what's not to love about dogs?"
                        />
                        <TopFilter
                            title="Cat"
                            description="Purr! Cuddles on laps and whiskers that twitch in delight, there's no better pet than a cat!"
                        />
                        <TopFilter
                            title="Fish"
                            description="Swimming gracefully through watery depths and fins that shimmer, fish bring calm to the world!"
                        />
                    </Grid>
                    <Separator size="full" className="mt-4 mx-2" />
                    {petsForAdoption.length === 0 ? (
                        <div className="flex justify-center items-center h-2/3 flex-col font-medium">
                            <PiDogBold className="h-20 w-20" />
                            <span className="opacity-90 mt-4">
                                No Animal up for Adoption
                            </span>
                        </div>
                    ) : (
                        <Grid columns="3" className="gap-10 mt-6 mx-2">
                            {petsForAdoption.map((pet) => {
                                return (
                                    <div key={pet._id}>
                                        <AdoptionCard pet={pet} />
                                    </div>
                                );
                            })}
                        </Grid>
                    )}
                </main>
            </div>
        </SignedIn>
    );

    function TopFilter({ title, description }) {
        return (
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                <div>
                    <h1 className="font-protest text-3xl font-medium opacity-70">
                        {title}
                    </h1>
                    <p className="font-roboto mt-2 text-sm">{description}</p>
                </div>
            </Card>
        );
    }
}
