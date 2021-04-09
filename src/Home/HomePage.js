
import "./homepage.css"
import { AlertBar } from "./Alertbar";

export const HomePage = ()=>{
    return(
    <>
        <AlertBar message={"Start your learning journey with us. "} classname={"alert-box alert-primary text-center"} linkText={"Explore Videos"} linkto={"/explore"} />
        <h1>Welcome</h1>
    </>
    )
}