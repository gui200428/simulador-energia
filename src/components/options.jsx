import React, { useState } from "react";
import "./styles/options.css";
import casseteBlue from "../assets/casseteBlue.png";
import hiwallBlue from "../assets/hiwallBlue.png";
import pisotetoBlue from "../assets/pisotetoBlue.png";
import ReactModal from "react-modal";
import ArHiwall from "../assets/ArHiwall.png";

ReactModal.setAppElement("#root");

export function Options() {
    const [showModal, setShowModal] = useState({
        cassete: false,
        hiwall: false,
        pisoteto: false,
    });
    const [hover, setHover] = useState({
        cassete: false,
        hiwall: false,
        pisoteto: false,
    });
    const [currentSection, setCurrentSection] = useState("buttons");

    const handleOpenModal = (modal) => {
        setShowModal({ ...showModal, [modal]: true });
    };

    const handleCloseModal = (modal) => {
        setShowModal({ ...showModal, [modal]: false });
        setCurrentSection("buttons"); // Voltar para a seção original ao fechar o modal
    };

    const handleMouseEnter = (modal) => {
        setHover({ ...hover, [modal]: true });
    };

    const handleMouseLeave = (modal) => {
        setHover({ ...hover, [modal]: false });
    };

    const handleSwitchSection = (section) => {
        setCurrentSection(section);
    };

    const handleBackToButtons = () => {
        setCurrentSection("buttons");
    };

    return (
        <>
            <div className="containerOptions">
                <div className="options">
                    <button
                        className="options-button"
                        onClick={() => handleOpenModal("hiwall")}
                        onMouseEnter={() => handleMouseEnter("hiwall")}
                        onMouseLeave={() => handleMouseLeave("hiwall")}
                    >
                        <img
                            className="Sirv image-main"
                            src={hiwallBlue}
                            alt="Hiwall Button"
                        />
                    </button>
                    <ReactModal
                        isOpen={showModal.hiwall}
                        contentLabel="Hiwall Modal"
                        onRequestClose={() => handleCloseModal("hiwall")}
                        style={{
                            content: {
                                width: "50%",
                                height: "83%",
                                margin: "0 auto",
                                borderRadius: "10px",
                                background: "#D6DEFA",
                                padding: "0",
                            },
                            overlay: {
                                background: "transparent",
                            },
                        }}
                    >
                        <div className="modal-conteiner">
                            <div className="top">
                                <div className="logoModal">
                                    <img src={hiwallBlue} alt="Hiwall Logo" />
                                    <h1>SPLIT HI-WALL</h1>
                                </div>
                                <div className="imgAr">
                                    <img src={ArHiwall} alt="Hiwall Image" />
                                </div>
                            </div>
                            <div className="blueline"></div>
                            <div className="bottom">
                                {currentSection === "buttons" ? (
                                    <>
                                        <h1 className="titleBottom">Modelo:</h1>
                                        <div className="buttonOpModal">
                                            <div className="optionsModal">
                                                <button
                                                    className="buttonModal"
                                                    onClick={() =>
                                                        handleSwitchSection(
                                                            "generic"
                                                        )
                                                    }
                                                >
                                                    <h1 className="titleButtonModal">
                                                        GENÉRICO
                                                    </h1>
                                                    <p className="textButtonModal">
                                                        Ao selecionar o modelo
                                                        “Genérico” o sistema
                                                        utilizará como
                                                        parametros técnicos as
                                                        médias dos consumos dos
                                                        aparelhos obtidos de
                                                        “Marca X Capacidade”.{" "}
                                                    </p>
                                                </button>
                                                <button
                                                    className="buttonModal2"
                                                    onClick={() =>
                                                        handleSwitchSection(
                                                            "advanced"
                                                        )
                                                    }
                                                >
                                                    <h1 className="titleButtonModal">
                                                        AVANÇADO
                                                    </h1>
                                                    <p className="textButtonModal">
                                                        Ao selecionar “Avançado”
                                                        você deverá informar o
                                                        código de modelo do seu
                                                        aparelho.{" "}
                                                    </p>
                                                </button>
                                                <button
                                                    className="buttonModal3"
                                                    onClick={() =>
                                                        handleSwitchSection(
                                                            "custom"
                                                        )
                                                    }
                                                >
                                                    <h1 className="titleButtonModal">
                                                        PERSONALIZADO
                                                    </h1>
                                                    <p className="textButtonModal">
                                                        Ao selecionar
                                                        “Personalizado” você
                                                        deverá inserir algumas
                                                        informações técnicas do
                                                        aparelho.{" "}
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1>Nova Seção</h1>
                                        {/* Adicione aqui os TextBoxes e Labels desejados */}
                                        <button onClick={handleBackToButtons}>
                                            Voltar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </ReactModal>

                    <button
                        className="options-button"
                        onClick={() => handleOpenModal("cassete")}
                        onMouseEnter={() => handleMouseEnter("cassete")}
                        onMouseLeave={() => handleMouseLeave("cassete")}
                    >
                        <img
                            className="Sirv image-main"
                            src={casseteBlue}
                            alt="Cassete Button"
                        />
                    </button>
                    <ReactModal
                        isOpen={showModal.cassete}
                        contentLabel="Cassete Modal"
                        onRequestClose={() => handleCloseModal("cassete")}
                        style={{
                            content: {
                                width: "40%",
                                height: "83%",
                                margin: "0 auto",
                                borderRadius: "10px",
                                background: "#D6DEFA",
                                padding: "0",
                            },
                            overlay: {
                                background: "transparent",
                            },
                        }}
                    >
                        <div className="modal-conteiner">
                            <div className="top">
                                <div className="logoModal">
                                    <img src={casseteBlue} alt="Cassete Logo" />
                                    <h1>SPLIT CASSETE</h1>
                                </div>
                            </div>
                        </div>
                    </ReactModal>

                    <button
                        className="options-button"
                        onClick={() => handleOpenModal("pisoteto")}
                        onMouseEnter={() => handleMouseEnter("pisoteto")}
                        onMouseLeave={() => handleMouseLeave("pisoteto")}
                    >
                        <img
                            id="pisoteto"
                            src={pisotetoBlue}
                            alt="Pisoteto Button"
                        />
                    </button>
                    <ReactModal
                        isOpen={showModal.pisoteto}
                        contentLabel="Pisoteto Modal"
                        onRequestClose={() => handleCloseModal("pisoteto")}
                        style={{
                            content: {
                                width: "30%",
                                height: "80%",
                                margin: "0 auto",
                                borderRadius: "10px",
                                background: "lightcoral", // Cor de fundo para o modal pisoteto
                            },
                            overlay: {
                                background: "transparent",
                            },
                        }}
                    >
                        <div className="modal-conteiner">
                            <p>Modal Pisoteto</p>
                        </div>
                    </ReactModal>
                </div>
            </div>
        </>
    );
}
