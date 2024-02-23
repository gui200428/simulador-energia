import React, { useState } from "react";
import "./styles/table.css";
//Teste
import "./styles/options.css";
import casseteBlue from "../assets/casseteBlue.png";
import hiwallBlue from "../assets/hiwallBlue.png";
import pisotetoBlue from "../assets/pisotetoBlue.png";
import ReactModal from "react-modal";
import ArHiwall from "../assets/ArHiwall.png";
import Icon from "../assets/pen";
import Arrow from "../assets/arrow";
import CurrencyInput from "react-currency-input-field";

ReactModal.setAppElement("#root");

export function Table() {
    //const [modalOpen, setModalOpen] = useState(false);
    const [qtdd, setQtdd] = useState("");
    const [marca, setMarca] = useState("");
    const [tipo, setTipo] = useState("");
    const [nome, setNome] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [consumoProcel, setConsumoProcel] = useState("");
    const [funcionamentoAtual, setFuncionamentoAtual] = useState("");
    const [funcionamentoDesejado, setFuncionamentoDesejado] = useState("");
    const [tarifa, setTarifa] = useState("");
    const [tabelaData, setTabelaData] = useState([]);
    const [consumoAtual, setConsumoAtual] = useState("");
    const [consumoDesejado, setConsumoDesejado] = useState("");
    const [faturaAtual, setFaturaAtual] = useState("");
    const [faturaDesejada, setFaturaDesejada] = useState("");
    const [economia, setEconomia] = useState("");
    const [tipoConsumoProcel, setTipoConsumoProcel] = useState("kWh/mes");

    // handler para mudar o tamanho da div home quando a tabela estiver com dados
    const handlerBanner = () => {
        const homeDiv = document.querySelector(".home");
        homeDiv.style.height = "15vh"; // Ou qualquer outro valor que você desejar
    };

    // Atualizar os valores da tabela (QTDD.)
    const handleQtddChange = (index, value) => {
        // Não permite valores negativos ou nulos
        if (value === null || value === "" || value < 0) {
            alert("Valor inválido");
            return;
        }

        const newData = [...tabelaData];
        newData[index].qtdd = value;
        newData[index].consumoAtual = (
            parseFloat(newData[index].convertedConsumoProcel) *
            parseFloat(newData[index].funcionamentoAtual) *
            parseFloat(value)
        ).toFixed(1);
        newData[index].consumoDesejado = (
            parseFloat(newData[index].convertedConsumoProcel) *
            parseFloat(newData[index].funcionamentoDesejado) *
            parseFloat(value)
        ).toFixed(1);
        newData[index].faturaAtual = (
            parseFloat(newData[index].consumoAtual) * tarifa
        ).toFixed(1);
        newData[index].faturaDesejada = (
            parseFloat(newData[index].consumoDesejado) * tarifa
        ).toFixed(1);
        newData[index].economia = (
            ((parseFloat(newData[index].consumoAtual) -
                parseFloat(newData[index].consumoDesejado)) /
                parseFloat(newData[index].consumoAtual)) *
            100
        ).toFixed(1);
        setTabelaData(newData);

        // Atualiza o valor de consumoAtual
        setConsumoAtual(newData[index].consumoAtual);

        // Atualiza o valor de consumoDesejado
        setConsumoDesejado(newData[index].consumoDesejado);

        // Atualiza o valor de faturaAtual
        setFaturaAtual(newData[index].faturaAtual);

        // Atualiza o valor de faturaDesejada
        setFaturaDesejada(newData[index].faturaDesejada);

        // Atualiza o valor de economia
        setEconomia(newData[index].economia);
    };

    const handleSubmit = () => {
        //Não permite campos vazios
        if (
            !qtdd ||
            !marca ||
            !tipo ||
            !nome ||
            !capacidade ||
            !consumoProcel ||
            !funcionamentoAtual ||
            !funcionamentoDesejado ||
            !tarifa
            //!tipoConsumoProcel
        ) {
            alert("Preencha todos os campos");
            return;
        }
        // Fecha o modal se todos os campos estiverem preenchidos
        handleCloseModal();

        // Converter consumo procel se tipoConsumoProcel for kWh/ano para kWh/mes
        const convertedConsumoProcel =
            tipoConsumoProcel === "kWh/anual"
                ? (consumoProcel / 12).toFixed(2)
                : consumoProcel;

        const consumoAtual = (
            parseFloat(convertedConsumoProcel) * parseFloat(funcionamentoAtual)
        ).toFixed(1); // decimal
        setConsumoAtual(consumoAtual); // Atualiza o valor de consumoAtual

        const consumoDesejado = (
            parseFloat(convertedConsumoProcel) *
            parseFloat(funcionamentoDesejado)
        ).toFixed(1); // decimal
        setConsumoDesejado(consumoDesejado); // Atualiza o valor de consumoDesejado

        const faturaAtual = (consumoAtual * tarifa).toFixed(1); // decimal
        setFaturaAtual(faturaAtual); // Atualiza o valor de faturaAtual

        const faturaDesejada = (consumoDesejado * tarifa).toFixed(1); // decimal
        setFaturaDesejada(faturaDesejada); // Atualiza o valor de faturaDesejada
        // remover casas decimais depois da virgula na fariavel economia

        const economia = (
            ((consumoAtual - consumoDesejado) / consumoAtual) *
            100
        ).toFixed(1); // decimal
        setEconomia(economia); // Atualiza o valor de economia

        const newData = {
            qtdd,
            marca,
            tipo,
            nome,
            capacidade,
            convertedConsumoProcel,
            funcionamentoAtual,
            funcionamentoDesejado,
            tarifa,
            consumoAtual,
            consumoDesejado,
            faturaAtual,
            faturaDesejada,
            economia,
            tipoConsumoProcel,
        };

        setTabelaData([...tabelaData, newData]);
        //setModalOpen(false);

        // Limpa os campos do modal
        // Os inputs não
        setQtdd("");
        setMarca("");
        setTipo("");
        setNome("");
        setCapacidade("");
        setConsumoProcel("");
        setFuncionamentoAtual("");
        setFuncionamentoDesejado("");
        //setTarifa(""); TODO: Não limpar o campo tarifa
        //setTipoConsumoProcel("");
    };

    //Calcular soma consumo atual
    const somaConsumoAtual = tabelaData
        .reduce((total, item) => total + parseFloat(item.consumoAtual || 0), 0)
        .toFixed(1);

    //Calcular soma consumo desejado
    const somaConsumoDesejado = tabelaData
        .reduce(
            (total, item) => total + parseFloat(item.consumoDesejado || 0),
            0
        )
        .toFixed(1);

    //Calcular soma fatura atual
    const somaFaturaAtual = tabelaData
        .reduce((total, item) => total + parseFloat(item.faturaAtual || 0), 0)
        .toFixed(2);

    //Calcular soma fatura desejada
    const somaFaturaDesejada = tabelaData
        .reduce(
            (total, item) => total + parseFloat(item.faturaDesejada || 0),
            0
        )
        .toFixed(2);

    //Calcular economia total
    const economiaTotal = (
        ((somaConsumoAtual - somaConsumoDesejado) / somaConsumoAtual) *
        100
    ).toFixed(1);

    //teste

    const [showModal, setShowModal] = useState(false);
    const [hover, setHover] = useState({
        cassete: false,
        hiwall: false,
        pisoteto: false,
    });
    const [currentSection, setCurrentSection] = useState("buttons");

    const handleOpenModal = () => {
        setShowModal(true);

        // Limpa os campos do modal
        setQtdd("");
        setMarca("");
        setTipo("");
        setNome("");
        setCapacidade("");
        setConsumoProcel("");
        setFuncionamentoAtual("");
        setFuncionamentoDesejado("");
        setTarifa("");
        //setTipoConsumoProcel("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentSection("buttons");
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
        //teste
        <div className="relative overflow-x-auto">
            <div className="containerOptions">
                <div className="options">
                    <button
                        className="options-button"
                        //setTipo para ("hi-wall")
                        onClick={() => {
                            handleOpenModal();
                            setTipo("Hi-wall");
                        }}
                        onMouseEnter={() => handleMouseEnter("slowly")}
                        onMouseLeave={() => handleMouseLeave("slowly")}
                    >
                        <img
                            className="Sirv image-main"
                            src={hiwallBlue}
                            alt="Hiwall Button"
                        />
                    </button>
                    <button
                        className="options-button"
                        //setTipo para ("cassete")
                        onClick={() => {
                            handleOpenModal();
                            setTipo("Cassete");
                        }}
                        onMouseEnter={() => handleMouseEnter("hiwall")}
                        onMouseLeave={() => handleMouseLeave("hiwall")}
                    >
                        <img
                            className="Sirv image-main"
                            src={casseteBlue}
                            alt="Hiwall Button"
                        />
                    </button>
                    <button
                        className="options-button"
                        //setTipo para ("pisoteto")
                        onClick={() => {
                            handleOpenModal();
                            setTipo("Piso-teto");
                        }}
                        onMouseEnter={() => handleMouseEnter("hiwall")}
                        onMouseLeave={() => handleMouseLeave("hiwall")}
                    >
                        <img
                            className="Sirv image-main"
                            src={pisotetoBlue}
                            alt="Hiwall Button"
                        />
                    </button>
                </div>
            </div>
            <ReactModal
                isOpen={showModal}
                contentLabel="Hiwall Modal"
                onRequestClose={handleCloseModal}
                style={{
                    content: {
                        width: "50%",
                        height: "93%",
                        margin: "0 auto",
                        borderRadius: "10px",
                        background: "#D6DEFA",
                        padding: "0",
                        zIndex: 1000,
                    },
                    overlay: {
                        background: "rgba(0, 0, 0, 0.5)",
                    },
                }}
            >
                <div className="modal-conteiner">
                    <div className="top">
                        <div className="logoModal">
                            {/*Muda o src de acordo com a variavel "tipo"*/}
                            <img
                                src={
                                    tipo === "Hi-wall"
                                        ? hiwallBlue
                                        : tipo === "Cassete"
                                        ? casseteBlue
                                        : pisotetoBlue
                                }
                                alt="Hiwall Logo"
                            />
                            <h1>{tipo}</h1>
                        </div>
                        <div className="imgAr">
                            <img src={ArHiwall} alt="Hiwall Image" />
                        </div>
                    </div>
                    {/*<div className="blueline"></div>*/}
                    <div className="bottom">
                        <div className="backArrow">
                            {/*Esconder botão quando estiver no currentSection === "buttons"*/}
                            {currentSection === "buttons" ? null : (
                                <button
                                    className="font-bold py-2 px-4 rounded"
                                    onClick={handleBackToButtons}
                                >
                                    <Arrow />
                                </button>
                            )}
                        </div>
                        {currentSection === "buttons" ? (
                            <>
                                <div className="modal">
                                    <h1 className="titleBottom">MARCA:</h1>
                                    <div className="inputOptionsModal">
                                        <select
                                            value={marca}
                                            onChange={(e) =>
                                                setMarca(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma marca...
                                            </option>
                                            <option value="Admiral">
                                                Admiral
                                            </option>
                                            <option value="Agratto">
                                                Agratto
                                            </option>
                                            <option value="AIRSTAGE">
                                                AIRSTAGE
                                            </option>
                                            <option value="Arfree">
                                                Arfree
                                            </option>
                                            <option value="AZ">AZ</option>
                                            <option value="BENOIT">
                                                BENOIT
                                            </option>
                                            <option value="Britânia">
                                                Britânia
                                            </option>
                                            <option value="Carrier">
                                                Carrier
                                            </option>
                                            <option value="Comfee">
                                                Comfee
                                            </option>
                                            <option value="Consul">
                                                Consul
                                            </option>
                                            <option value="Daikin">
                                                Daikin
                                            </option>
                                            <option value="Elbrus">
                                                Elbrus
                                            </option>
                                            <option value="Electrolux">
                                                Electrolux
                                            </option>
                                            <option value="ELGIN">ELGIN</option>
                                            <option value="EMMETI">
                                                EMMETI
                                            </option>
                                            <option value="EOS">EOS</option>
                                            <option value="Equation">
                                                Equation
                                            </option>
                                            <option value="Fontaine">
                                                Fontaine
                                            </option>
                                            <option value="Fujitsu">
                                                Fujitsu
                                            </option>
                                            <option value="GREE">GREE</option>
                                            <option value="HISENSE">
                                                HISENSE
                                            </option>
                                            <option value="Hitachi">
                                                Hitachi
                                            </option>
                                            <option value="HQ">HQ</option>
                                            <option value="Kennedy">
                                                Kennedy
                                            </option>
                                            <option value="Komeco">
                                                Komeco
                                            </option>
                                            <option value="LG">LG</option>
                                            <option value="Maxiflex">
                                                Maxiflex
                                            </option>
                                            <option value="Midea">Midea</option>
                                            <option value="Modernita">
                                                Modernita
                                            </option>
                                            <option value="Novexium">
                                                Novexium
                                            </option>
                                            <option value="Philco">
                                                Philco
                                            </option>
                                            <option value="Pioneer">
                                                Pioneer
                                            </option>
                                            <option value="Pionner">
                                                Pionner
                                            </option>
                                            <option value="Prime Air">
                                                Prime Air
                                            </option>
                                            <option value="PSG">PSG</option>
                                            <option value="Rinetto">
                                                Rinetto
                                            </option>
                                            <option value="Samsung">
                                                Samsung
                                            </option>
                                            <option value="Silvermaxi">
                                                Silvermaxi
                                            </option>
                                            <option value="SIMPLEY">
                                                SIMPLEY
                                            </option>
                                            <option value="Springer">
                                                Springer
                                            </option>
                                            <option value="Springer Midea">
                                                Springer Midea
                                            </option>
                                            <option value="TCL">TCL</option>
                                            <option value="Techfrio">
                                                Techfrio
                                            </option>
                                            <option value="Tempstar">
                                                Tempstar
                                            </option>
                                            <option value="Tesla">Tesla</option>
                                            <option value="Trane">Trane</option>
                                            <option value="Unifrio">
                                                Unifrio
                                            </option>
                                            <option value="VG">VG</option>
                                            <option value="VIX">VIX</option>
                                            <option value="Vogga">Vogga</option>
                                            <option value="York">York</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal">
                                    <h1 className="titleBottom">
                                        CAPACIDADE DE REFRIGERAÇÃO:
                                    </h1>
                                    <div className="inputOptionsModal">
                                        <CurrencyInput
                                            defaultValue={0}
                                            allowNegativeValue={false}
                                            allowDecimals={false}
                                            onValueChange={(value) =>
                                                setCapacidade(value)
                                            }
                                        />
                                        <h1 className="text-blue-600 font-bold text-3xl">
                                            BTU/h
                                        </h1>
                                    </div>
                                </div>

                                <div className="modal">
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
                                                    utilizará como parametros
                                                    técnicos as médias dos
                                                    consumos dos aparelhos
                                                    obtidos de “Marca X
                                                    Capacidade”.{" "}
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
                                                    “Personalizado” você deverá
                                                    inserir algumas informações
                                                    técnicas do aparelho.{" "}
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : currentSection === "custom" ? (
                            <>
                                <div className="modal">
                                    <h1 className="titleBottom">MARCA:</h1>
                                    <div className="inputOptionsModal">
                                        <select
                                            value={marca}
                                            onChange={(e) =>
                                                setMarca(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione uma marca...
                                            </option>
                                            <option value="Admiral">
                                                Admiral
                                            </option>
                                            <option value="Agratto">
                                                Agratto
                                            </option>
                                            <option value="AIRSTAGE">
                                                AIRSTAGE
                                            </option>
                                            <option value="Arfree">
                                                Arfree
                                            </option>
                                            <option value="AZ">AZ</option>
                                            <option value="BENOIT">
                                                BENOIT
                                            </option>
                                            <option value="Britânia">
                                                Britânia
                                            </option>
                                            <option value="Carrier">
                                                Carrier
                                            </option>
                                            <option value="Comfee">
                                                Comfee
                                            </option>
                                            <option value="Consul">
                                                Consul
                                            </option>
                                            <option value="Daikin">
                                                Daikin
                                            </option>
                                            <option value="Elbrus">
                                                Elbrus
                                            </option>
                                            <option value="Electrolux">
                                                Electrolux
                                            </option>
                                            <option value="ELGIN">ELGIN</option>
                                            <option value="EMMETI">
                                                EMMETI
                                            </option>
                                            <option value="EOS">EOS</option>
                                            <option value="Equation">
                                                Equation
                                            </option>
                                            <option value="Fontaine">
                                                Fontaine
                                            </option>
                                            <option value="Fujitsu">
                                                Fujitsu
                                            </option>
                                            <option value="GREE">GREE</option>
                                            <option value="HISENSE">
                                                HISENSE
                                            </option>
                                            <option value="Hitachi">
                                                Hitachi
                                            </option>
                                            <option value="HQ">HQ</option>
                                            <option value="Kennedy">
                                                Kennedy
                                            </option>
                                            <option value="Komeco">
                                                Komeco
                                            </option>
                                            <option value="LG">LG</option>
                                            <option value="Maxiflex">
                                                Maxiflex
                                            </option>
                                            <option value="Midea">Midea</option>
                                            <option value="Modernita">
                                                Modernita
                                            </option>
                                            <option value="Novexium">
                                                Novexium
                                            </option>
                                            <option value="Philco">
                                                Philco
                                            </option>
                                            <option value="Pioneer">
                                                Pioneer
                                            </option>
                                            <option value="Pionner">
                                                Pionner
                                            </option>
                                            <option value="Prime Air">
                                                Prime Air
                                            </option>
                                            <option value="PSG">PSG</option>
                                            <option value="Rinetto">
                                                Rinetto
                                            </option>
                                            <option value="Samsung">
                                                Samsung
                                            </option>
                                            <option value="Silvermaxi">
                                                Silvermaxi
                                            </option>
                                            <option value="SIMPLEY">
                                                SIMPLEY
                                            </option>
                                            <option value="Springer">
                                                Springer
                                            </option>
                                            <option value="Springer Midea">
                                                Springer Midea
                                            </option>
                                            <option value="TCL">TCL</option>
                                            <option value="Techfrio">
                                                Techfrio
                                            </option>
                                            <option value="Tempstar">
                                                Tempstar
                                            </option>
                                            <option value="Tesla">Tesla</option>
                                            <option value="Trane">Trane</option>
                                            <option value="Unifrio">
                                                Unifrio
                                            </option>
                                            <option value="VG">VG</option>
                                            <option value="VIX">VIX</option>
                                            <option value="Vogga">Vogga</option>
                                            <option value="York">York</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal">
                                    <h1 className="titleBottom">
                                        CAPACIDADE DE REFRIGERAÇÃO:
                                    </h1>
                                    <div className="inputOptionsModal">
                                        <CurrencyInput
                                            defaultValue={0}
                                            allowNegativeValue={false}
                                            allowDecimals={false}
                                            onValueChange={(value) =>
                                                setCapacidade(value)
                                            }
                                        />

                                        <h1 className="text-blue-600 font-bold text-3xl">
                                            BTU/h
                                        </h1>
                                    </div>
                                </div>

                                <div className="modal">
                                    <h1 className="titleBottom">
                                        MODELO (Personalizado):
                                    </h1>
                                    <div className="modal-content text-black">
                                        <div>
                                            <h1>
                                                Defina a quantidade de
                                                equipamentos:
                                            </h1>
                                            <CurrencyInput
                                                defaultValue={0}
                                                allowNegativeValue={false}
                                                allowDecimals={false}
                                                onValueChange={(value) =>
                                                    setQtdd(value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h1>De um nome ao equipamento:</h1>
                                            <input
                                                type="text"
                                                value={nome}
                                                onChange={(e) =>
                                                    setNome(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h1>
                                                Qual o consumo do equipamento?
                                                (Inmetro/Procel)
                                            </h1>
                                            <div className="flex flex-row items-center">
                                                <div>
                                                    <CurrencyInput
                                                        defaultValue={0}
                                                        allowNegativeValue={
                                                            false
                                                        }
                                                        allowDecimals={false}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            setConsumoProcel(
                                                                value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="inputOptionsModal">
                                                    <select
                                                        value={
                                                            tipoConsumoProcel
                                                        }
                                                        onChange={(e) =>
                                                            setTipoConsumoProcel(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="kWh/mes">
                                                            kWh/mes
                                                        </option>
                                                        <option value="kWh/anual">
                                                            kWh/anual
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() =>
                                                handleSwitchSection("custom02")
                                            }
                                        >
                                            {" "}
                                            Próximo
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : currentSection === "custom02" ? (
                            <>
                                <div className="modal">
                                    <h1 className="titleBottom">
                                        DISCIPLINA DE FUNCIONAMENTO
                                    </h1>
                                    <div className="modal-content text-black">
                                        <div>
                                            <p>
                                                A economia gerada pelo nosso
                                                sistema se da através da
                                                disciplina de funcionamento
                                                (cronograma) dos aparelhos.
                                                Entendemos que em determinados
                                                locais/instituicoes as vezes as
                                                pessoas esquecem ou deixam seus
                                                equipamentos ligados em momentos
                                                desnecessários (fator humano) e
                                                com isso aumentam o consumo de
                                                energia e fatura do mês.
                                            </p>
                                            <p>
                                                Selecione abaixo a média diária,
                                                que você acredtita, que seu
                                                equipamento passa em
                                                funcionamento e depois selecione
                                                a quantidade de horas que
                                                deveria/deve ser a quantidade de
                                                horas corretas (evitando
                                                desperdicios com a disciplina).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal">
                                    <h1 className="titleBottom">
                                        Funcionamento atual (Horas/Dia):
                                    </h1>
                                    <div className="modal-content text-black">
                                        <div>
                                            <CurrencyInput
                                                defaultValue={0}
                                                suffix=" horas"
                                                allowNegativeValue={false}
                                                allowDecimals={false}
                                                onValueChange={(value) =>
                                                    setFuncionamentoAtual(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal">
                                    <h1 className="titleBottom">
                                        Funcionamento desejado (Horas/Dia):
                                    </h1>
                                    <div className="modal-content text-black">
                                        <div>
                                            <CurrencyInput
                                                defaultValue={0}
                                                suffix=" horas"
                                                allowNegativeValue={false}
                                                allowDecimals={false}
                                                onValueChange={(value) =>
                                                    setFuncionamentoDesejado(
                                                        value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal">
                                    <h1 className="titleBottom">Tarifa: </h1>
                                    <div className="modal-content text-black">
                                        <div>
                                            <CurrencyInput
                                                prefix="R$"
                                                defaultValue={0}
                                                decimalsLimit={2}
                                                // send the value to tarifa
                                                onValueChange={(value) =>
                                                    setTarifa(value)
                                                }
                                            />
                                        </div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleSubmit}
                                        >
                                            {" "}
                                            Feito
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
            {/*Chamar o handlerBanner*/}
            {tabelaData.length > 0 ? (
                <div className="relative mb-96" onLoad={handlerBanner()}>
                    <div id="table bg-slate-600 overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        QTDD.
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        MARCA
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        TIPO
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        MODELO (Un. Interna)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        CAPACIDADE (BTU/h)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        CONSUMO PROCEL kWh/mês
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        FUNCIONAMENTO ATUAL (Horas/Dia)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        FUNCIONAMENTO DESEJADO (Horas/Dia)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        CONSUMO ATUAL (kW/mês)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        CONSUMO DESEJADO (kW/mês)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        FATURA ATUAL (R$)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        FATURA DESEJADA (R$)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border border-gray-400"
                                    >
                                        ECONOMIA (%)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabelaData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-100"
                                        } border border-gray-400 hover:bg-gray-200 group`}
                                    >
                                        <td
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer flex items-center"
                                            onClick={() =>
                                                handleQtddChange(
                                                    index,
                                                    prompt(
                                                        "Editar quantidade: "
                                                    )
                                                )
                                            }
                                        >
                                            <Icon />
                                            {item.qtdd}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.marca}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.tipo}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.nome}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.capacidade}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.convertedConsumoProcel}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.funcionamentoAtual}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.funcionamentoDesejado}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.consumoAtual || 0}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.consumoDesejado || 0}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.faturaAtual || 0}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.faturaDesejada || 0}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                            {item.economia + "%"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/*MEU*/}

                    <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t-4 border-blue-600">
                        <h3 className="text-gray-800 font-bold">
                            TOTAL ESTIMADO
                        </h3>
                        <div className="flex flex-row justify-between text-black m-4">
                            <div>
                                <h1 className="text-gray-500">Tarifa</h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    R$ {tarifa}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-gray-500">Consumo Atual</h1>
                                <span className="text-gray-300 font-bold text-3xl">
                                    {somaConsumoAtual} kW/mês
                                </span>
                            </div>
                            <div>
                                <h1 className="text-gray-500">
                                    Consumo desejado
                                </h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    {somaConsumoDesejado} kW/mês
                                </span>
                            </div>
                            <div>
                                <h1 className="text-gray-500">Fatura Atual</h1>
                                <span className="text-gray-300 font-bold text-3xl">
                                    R$ {somaFaturaAtual}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-gray-500">
                                    Fatura Desejada
                                </h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    R$ {somaFaturaDesejada}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-gray-500">Economia</h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    {economiaTotal} %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-black font-thin text-center  p-8 infoOptions">
                    <p>Selecione acima para adicionar um equipamento</p>
                </div>
            )}
        </div>
    );
}
