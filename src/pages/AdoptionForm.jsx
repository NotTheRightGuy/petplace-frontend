import { Card, TextField, TextArea, Button } from "@radix-ui/themes";
import { SiReasonstudios } from "react-icons/si";
import { MdOutlinePets } from "react-icons/md";
import { GoNumber } from "react-icons/go";
import axios from "axios";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

function Spinner() {
    return (
        <div
            style={{
                width: "16px",
                height: "16px",
                border: "2px solid #ccc",
                borderRadius: "50%",
                borderTopColor: "#000",
                animation: "spin 1s infinite linear",
            }}
        ></div>
    );
}

export default function AdoptionForm() {
    const navigate = useNavigate();

    const imageRef = useRef();
    const db_url = "http://localhost:3000/adoption";

    const nameRef = useRef();
    const ageRef = useRef();
    const speciesRef = useRef();
    const breedRef = useRef();
    const reasonRef = useRef();

    const [imageUrl, setImageUrl] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    const [documentUploading, setDocumentUploading] = useState(false);

    async function uploadImage() {
        setImageUploading(true);
        console.log("Upload Image");
        const formData = new FormData();
        formData.append("file", imageRef.current.files[0]);
        formData.append("upload_preset", "fdjmv1o0"); // Replace "your_upload_preset_here" with your Cloudinary upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/ddtz2tmd9/image/upload",
                formData
            );
            console.log(response.data.secure_url);
            setImageUrl(response.data.secure_url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image");
        } finally {
            setImageUploading(false);
        }
    }

    const { user } = useUser();
    function uploadToDatabase() {
        setDocumentUploading(true);
        const { fullName, primaryPhoneNumber, primaryEmailAddress } = user;
        const parentName = fullName;
        const parentPhone = primaryPhoneNumber.phoneNumber;
        const parentEmail = primaryEmailAddress.emailAddress;
        const name = nameRef.current.value;
        const age = ageRef.current.value;
        const species = speciesRef.current.value;
        const breed = breedRef.current.value;
        const reason = reasonRef.current.value;

        const data = {
            parentName,
            parentPhone,
            parentEmail,
            name,
            age,
            species,
            breed,
            reason,
            imageUrl,
        };

        axios
            .post(db_url, data)
            .then((response) => {
                toast.success(
                    "Document uploaded successfully, Redirecting to dashboard"
                );
                setTimeout(() => {
                    navigate("/user/dashboard");
                }, 2000);

                console.log(response);
            })
            .catch((error) => {
                toast.error("Error uploading to database");
                console.error("Error uploading to database:", error);
            });

        setDocumentUploading(false);
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <ToastContainer />
            <Card className=" h-[90vh] w-[90vw] p-4 bg-slate-100 grid grid-cols-2 relative">
                <div>
                    <section>
                        <h1 className="text-3xl font-protest opacity-90">
                            Put your Pet for Adoption
                        </h1>
                        <div className="text-sm font-poppins opacity-70 mt-2">
                            It's not easy saying goodbye to your furry family
                            member, but we understand. We'll do our best to find
                            them the perfect forever home. Make sure to fill
                            this form to the best of your knowledge.
                        </div>
                    </section>
                    <section>
                        <div className="text-sm font-poppins mt-5 mb-2">
                            Name
                        </div>
                        <TextField.Root className="w-2/3">
                            <TextField.Slot>
                                <MdOutlinePets height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input
                                placeholder="People would love to know what you call him"
                                ref={nameRef}
                            />
                        </TextField.Root>
                        <div className="text-sm font-poppins mt-5 mb-2">
                            Age
                        </div>
                        <TextField.Root className="w-2/3">
                            <TextField.Slot>
                                <GoNumber height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input
                                placeholder="How young is your kiddo?"
                                ref={ageRef}
                            />
                        </TextField.Root>
                        <div className="text-sm font-poppins mt-5 mb-2">
                            Species
                        </div>
                        <TextField.Root className="w-2/3">
                            <TextField.Slot>
                                <GoNumber height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input
                                placeholder="Is it Dog? Is it a Cat? No it's a unicorn"
                                ref={speciesRef}
                            />
                        </TextField.Root>
                        <TextField.Root className="w-2/3">
                            <TextField.Slot>
                                <SiReasonstudios height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input
                                placeholder="What breed is your pet"
                                ref={breedRef}
                            />
                        </TextField.Root>
                    </section>
                    <div className="text-sm font-poppins mt-5 mb-2">
                        Reason to put for Adoption
                    </div>
                    <TextField.Root className="w-2/3">
                        <TextField.Slot>
                            <SiReasonstudios height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input
                            placeholder="Don't worry we won't judge"
                            ref={reasonRef}
                        />
                    </TextField.Root>

                    <div className="text-sm font-poppins mt-5 mb-2">
                        Share the cutest picture of your pet. We won't mind
                        snooping
                    </div>
                    <input
                        type="file"
                        className="font-roboto text-sm"
                        ref={imageRef}
                    />
                </div>
                <br />

                <Button color="gray" onClick={uploadImage}>
                    <ArrowTopRightIcon width="16" height="16" />
                    {imageUploading ? <Spinner /> : "Upload Image"}
                </Button>
                <Button onClick={uploadToDatabase} className="ml-2">
                    {documentUploading ? <Spinner /> : "Submit"}
                </Button>
            </Card>
            <div className="h-[450px] w-[450px] bg-slate-50 border-black border-dotted border-4 absolute right-[150px] top-1/2] flex justify-center items-center text-center text-sm p-10">
                {imageUrl.length == 0 ? (
                    <>
                        Your Pet Picture will be shown here once uploaded.
                        Please make sure to hit submit button after the image
                        has been uploaded
                    </>
                ) : (
                    <img
                        src={imageUrl}
                        alt="PetImage"
                        className=" h-full w-full"
                    />
                )}
            </div>
        </div>
    );
}
