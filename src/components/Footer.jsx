import { FaFacebook, FaTwitter, FaInstagram, FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return(
        <div className="container-fluid mt-7">
            <footer className="text-center text-dark bg-secondary" >
                <div className="container">
                <section className="mt-5">
                    <div className="row text-center d-flex justify-content-center pt-5">
                    <div className="col-md-2">
                        <h6 className="text-uppercase font-weight-bold">
                        <a href="#!" className="text-black">About us</a>
                        </h6>
                    </div>

                    <div className="col-md-2">
                        <h6 className="text-uppercase font-weight-bold">
                        <a href="#!" className="text-black">Products</a>
                        </h6>
                    </div>

                    <div className="col-md-2">
                        <h6 className="text-uppercase font-weight-bold">
                        <a href="#!" className="text-black">Awards</a>
                        </h6>
                    </div>

                    <div className="col-md-2">
                        <h6 className="text-uppercase font-weight-bold">
                        <a href="#!" className="text-black">Help</a>
                        </h6>
                    </div>

                    <div className="col-md-2">
                        <h6 className="text-uppercase font-weight-bold">
                        <a href="#!" className="text-black">Contact</a>
                        </h6>
                    </div>
                    </div>
                </section>

                <hr className="my-5" />

                <section className="mb-5">
                    <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                        distinctio earum repellat quaerat voluptatibus placeat nam,
                        commodi optio pariatur est quia magnam eum harum corrupti
                        dicta, aliquam sequi voluptate quas.
                        </p>
                    </div>
                    </div>
                </section>

                <section className="text-center mb-5">
                    <a href="#jh" className="text-black me-4">
                    <FaFacebook/>
                    </a>
                    <a href="#jh" className="text-black me-4">
                    <FaTwitter/>
                    </a>
                    <a href="#jh" className="text-black me-4">
                    <FaGoogle/>
                    </a>
                    <a href="#jh" className="text-black me-4">
                    <FaInstagram/>
                    </a>
                    <a href="#jh" className="text-black me-4">
                    <FaLinkedin/>
                    </a>
                    <a href="#jh" className="text-black me-4">
                    <FaGithub/>
                    </a>
                </section>
                </div>


                <div
                    className="text-center p-3"
                    style={{"backgroundColor": "rgba(0, 0, 0, 0.2)"}}
                    >
                © 2024 Copyright
                </div>

            </footer>

        </div>
        )
    }
