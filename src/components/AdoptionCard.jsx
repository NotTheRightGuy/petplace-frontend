import { Card, Grid, Separator } from "@radix-ui/themes";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export default function AdoptionCard({ pet }) {
    const {
        name,
        age,
        species,
        breed,
        reason,
        imageUrl,
        parentName,
        parentPhone,
        parentEmail,
    } = pet;

    return (
        <Card className="max-w-sm mx-auto bg-white rounded-xl shadow-md grid">
            <Grid columns="2">
                <div className="pr-4">
                    <img
                        src={imageUrl}
                        alt="Pet Image"
                        className="rounded-md w-32"
                    />
                </div>
                <div>
                    <h1 className="font-poppins font-bold">{name}</h1>
                    <p className="text-sm font-medium mt-4">{species}</p>
                    <p className="text-xs bg-black text-white rounded-full w-fit p-1 mt-1">
                        {breed}
                    </p>
                    <p className="text-sm mt-4">Hey I'm {age} years old</p>
                    <p className="text-xs mt-1">
                        Have to give for adoption because {reason}
                    </p>
                </div>
            </Grid>
            <Separator />
            <div>
                <h1 className="font-bold font-roboto text-lg">Parent Detail</h1>
                <h2>{parentName}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm">
                    <HiOutlinePhone />
                    <p>{parentPhone}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                    <HiOutlineMail />
                    <p>{parentEmail}</p>
                </div>
            </div>
        </Card>
    );
}
