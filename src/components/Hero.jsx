import "../stylesheets/Hero.css";
import Typewriter from "typewriter-effect";
export default function Hero() {
    const typewriterClass = "text-7xl font-bold font-poppins opacity-90";
    return (
        <main className="p-10 grid grid-cols-2">
            <section className="mt-10">
                <div className="font-roboto font-medium">
                    <span className="font-protest text-9xl" id="hero-find">
                        Find
                    </span>{" "}
                    <br />
                    <div className="text-7xl font-bold font-poppins opacity-90">
                        your new
                    </div>
                    <div className="text-5xl font-poppins mt-10 text-bold opacity-80">
                        <Typewriter
                            options={{
                                strings: [
                                    "Best Friend",
                                    "Soulmate",
                                    "Companion",
                                    "Partner",
                                ],
                                delay: 80,
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                </div>
                <button className="mt-20 bg-blue-500 px-10 py-3 font-roboto text-white font-bold rounded-full">
                    Get Started
                </button>
            </section>
            <section></section>
        </main>
    );
}
