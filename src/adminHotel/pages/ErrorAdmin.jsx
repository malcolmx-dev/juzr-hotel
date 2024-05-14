import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function ErrorAdmin() {
    return(
        <div>
            <Header/>
            <div className='d-flex flex-column align-items-center justify-content-center mt-7 '>
                        <p className='fw-bold fs-3'>Vous n'êtes pas authorisé, veuillez vous connectez. Seul les administrateurs peuvent y accéder.</p>
                        <Link className='fw-bold fs-3' to={"/"}>Retourner a la page principale</Link>
            </div>
        </div>
    )
}