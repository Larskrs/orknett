import { InputField } from "@/components";

export default function Contact() {
    return (
        <div style={{background: "var(--background)", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div>
                <h1>Contact Page</h1>
                <form>
                    <InputField  placeholder={"Email"} />
                    <InputField  placeholder={"Name"} />
                </form>
            </div>
        </div>
    );
}