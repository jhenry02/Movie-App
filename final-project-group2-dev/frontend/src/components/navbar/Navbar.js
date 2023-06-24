import 'bootstrap/dist/css/bootstrap.css';
import NavbarBody from './NavbarBody';
import MyRoute from "./Route";



export default function MyNavbar() {
    return (
        <>
        <NavbarBody /> {/* This component just loads the content of the NavbarBody. */}
        <MyRoute /> {/* This component just loads the content of Routes. */}
        </>
    )
}
