import React, { useState } from "react";
import "./styles/table.css";
import casseteBlue from "../assets/casseteBlue.png";
import hiwallBlue from "../assets/hiwallBlue.png";
import pisotetoBlue from "../assets/pisotetoBlue.png";
import ReactModal from "react-modal";
import ArHiwall from "../assets/ArHiwall.png";
import Icon from "../assets/pen";
import Arrow from "../assets/arrow";
import Edit from "../assets/edit";
import CheckMark from "../assets/check";
import Trash from "../assets/trash";
import CurrencyInput from "react-currency-input-field";

ReactModal.setAppElement("#root");

export function Table() {
    const [qtdd, setQtdd] = useState("");
    const [marca, setMarca] = useState("");
    const [tipo, setTipo] = useState("");
    const [nome, setNome] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [consumoProcel, setConsumoProcel] = useState("");
    const [funcionamentoAtual, setFuncionamentoAtual] = useState("");
    const [funcionamentoDesejado, setFuncionamentoDesejado] = useState("");
    const [tarifa, setTarifa] = useState("0.7");
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
        homeDiv.style.height = "15vh";
    };

    // Apagar linha da tabela
    const handleDelete = (index) => {
        const newData = [...tabelaData];
        newData.splice(index, 1);
        setTabelaData(newData);
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
        ).toFixed(2);
        newData[index].faturaDesejada = (
            parseFloat(newData[index].consumoDesejado) * tarifa
        ).toFixed(2);
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
            //!qtdd ||
            !marca ||
            !tipo ||
            !nome ||
            !capacidade ||
            !consumoProcel ||
            !funcionamentoAtual ||
            !funcionamentoDesejado
            //!tarifa
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

        const faturaAtual = (consumoAtual * tarifa).toFixed(2); // decimal
        setFaturaAtual(faturaAtual); // Atualiza o valor de faturaAtual

        const faturaDesejada = (consumoDesejado * tarifa).toFixed(2); // decimal
        setFaturaDesejada(faturaDesejada); // Atualiza o valor de faturaDesejada
        // remover casas decimais depois da virgula na fariavel economia

        const economia = (
            ((consumoAtual - consumoDesejado) / consumoAtual) *
            100
        ).toFixed(1); // decimal
        setEconomia(economia); // Atualiza o valor de economia

        const newData = {
            qtdd: 1,
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
        //setTarifa("");
        //setTipoConsumoProcel("");
    };

    const [editingTariff, setEditingTariff] = useState(false);

    const handleTariffClick = () => {
        setEditingTariff(true);
    };

    const handleTariffChange = (editedTarifaValue) => {
        // se o valor for nulo ou vazio ou undefined, não permitir
        if (
            editedTarifaValue === null ||
            editedTarifaValue === "" ||
            editedTarifaValue === undefined
        ) {
            setTarifa(tarifa);
            return;
        } else {
            setTarifa(editedTarifaValue);
        }
        //atualizar valores da tabela
        const newData = [...tabelaData];
        newData.forEach((item, index) => {
            item.faturaAtual = (
                parseFloat(item.consumoAtual) * editedTarifaValue
            ).toFixed(2);
            item.faturaDesejada = (
                parseFloat(item.consumoDesejado) * editedTarifaValue
            ).toFixed(2);
            //os valores são atualizados na tabela apenas na primeira linha
            if (index === 0) {
                setFaturaAtual(item.faturaAtual);
                setFaturaDesejada(item.faturaDesejada);
            }
        });
        setTabelaData(newData);
    };

    const handleTariffBlur = () => {
        setEditingTariff(false);
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
        //setTarifa("");
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
        <div className="relative overflow-x-auto">
            <div className="containerOptions">
                <div className="options">
                    <div className="button-container">
                        <button
                            className="options-button"
                            // setTipo para ("hi-wall")
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
                        <span className="label">HI-WALL</span>
                    </div>

                    <div className="button-container">
                        <button
                            className="options-button"
                            // setTipo para ("cassete")
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
                                alt="Cassete Button"
                            />
                        </button>
                        <span className="label">CASSETE</span>
                    </div>

                    <div className="button-container">
                        <button
                            className="options-button"
                            // setTipo para ("pisoteto")
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
                                alt="Piso-teto Button"
                            />
                        </button>
                        <span className="label">PISO-TETO</span>
                    </div>
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
                        borderRadius: "0px",
                        background: "#D6DEFA",
                        padding: "0",
                        zIndex: 1000,
                    },
                    overlay: {
                        background: "rgba(0, 0, 0, 0.5)",
                    },
                }}
            >
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
                <div className="modal-conteiner">
                    <div className="bottom">
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
                                        <select
                                            value={capacidade}
                                            onChange={(e) =>
                                                setCapacidade(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione um valor...
                                            </option>
                                            <option value="7.000">
                                                7.000 BTU/h
                                            </option>
                                            <option value="7.500">
                                                7.500 BTU/h
                                            </option>
                                            <option value="8.000">
                                                8.500 BTU/h
                                            </option>
                                            <option value="9.000">
                                                9.000 BTU/h
                                            </option>
                                            <option value="9.500">
                                                9.500 BTU/h
                                            </option>
                                            <option value="10.000">
                                                10.000 BTU/h
                                            </option>
                                            <option value="10.500">
                                                10.500 BTU/h
                                            </option>
                                            <option value="11.000">
                                                11.000 BTU/h
                                            </option>
                                            <option value="12.000">
                                                12.000 BTU/h
                                            </option>
                                            <option value="13.000">
                                                13.000 BTU/h
                                            </option>
                                            <option value="15.000">
                                                15.000 BTU/h
                                            </option>
                                            <option value="16.115">
                                                16.115 BTU/h
                                            </option>
                                            <option value="17.000">
                                                17.000 BTU/h
                                            </option>
                                            <option value="18.000">
                                                18.000 BTU/h
                                            </option>
                                            <option value="19.000">
                                                19.000 BTU/h
                                            </option>
                                            <option value="20.000">
                                                20.000 BTU/h
                                            </option>
                                            <option value="21.000">
                                                21.000 BTU/h
                                            </option>
                                            <option value="21.500">
                                                21.500 BTU/h
                                            </option>
                                            <option value="22.000">
                                                22.000 BTU/h
                                            </option>
                                            <option value="23.000">
                                                23.000 BTU/h
                                            </option>
                                            <option value="24.000">
                                                24.000 BTU/h
                                            </option>
                                            <option value="26.000">
                                                26.000 BTU/h
                                            </option>
                                            <option value="27.000">
                                                27.000 BTU/h
                                            </option>
                                            <option value="28.000">
                                                28.000 BTU/h
                                            </option>
                                            <option value="29.000">
                                                29.000 BTU/h
                                            </option>
                                            <option value="30.000">
                                                30.000 BTU/h
                                            </option>
                                            <option value="31.000">
                                                31.000 BTU/h
                                            </option>
                                            <option value="32.000">
                                                32.000 BTU/h
                                            </option>
                                            <option value="33.000">
                                                33.000 BTU/h
                                            </option>
                                            <option value="34.000">
                                                34.000 BTU/h
                                            </option>
                                            <option value="35.000">
                                                35.000 BTU/h
                                            </option>
                                            <option value="36.000">
                                                36.000 BTU/h
                                            </option>
                                            <option value="37.000">
                                                37.000 BTU/h
                                            </option>
                                            <option value="40.000">
                                                40.000 BTU/h
                                            </option>
                                            <option value="41.000">
                                                41.000 BTU/h
                                            </option>
                                            <option value="42.000">
                                                42.000 BTU/h
                                            </option>
                                            <option value="45.000">
                                                45.000 BTU/h
                                            </option>
                                            <option value="45.500">
                                                45.500 BTU/h
                                            </option>
                                            <option value="46.000">
                                                46.000 BTU/h
                                            </option>
                                            <option value="47.000">
                                                47.000 BTU/h
                                            </option>
                                            <option value="48.000">
                                                48.000 BTU/h
                                            </option>
                                            <option value="51.000">
                                                51.000 BTU/h
                                            </option>
                                            <option value="51500">
                                                51.500 BTU/h
                                            </option>
                                            <option value="52.000">
                                                52.000 BTU/h
                                            </option>
                                            <option value="53.000">
                                                53.000 BTU/h
                                            </option>
                                            <option value="54.000">
                                                54.000 BTU/h
                                            </option>
                                            <option value="55.000">
                                                55.000 BTU/h
                                            </option>
                                            <option value="56.000">
                                                56.000 BTU/h
                                            </option>
                                            <option value="57.000">
                                                57.000 BTU/h
                                            </option>
                                            <option value="58.000">
                                                58.000 BTU/h
                                            </option>
                                            <option value="59.000">
                                                59.000 BTU/h
                                            </option>
                                            <option value="60.000">
                                                60.000 BTU/h
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-bottom">
                                    <h1
                                        className="titleBottom"
                                        id="titleBottomModelo"
                                    >
                                        Modelo:
                                    </h1>

                                    <div className="optionsModal">
                                        <div
                                            className="flex flex-col items-center cursor-pointer"
                                            onClick={() =>
                                                handleSwitchSection("generic")
                                            }
                                        >
                                            <div className="titleButtonModal">
                                                <h1>GENÉRICO</h1>
                                            </div>
                                            <div className="textContainer">
                                                <p className="textButtonModal">
                                                    Ao selecionar o modelo
                                                    “Genérico” o sistema
                                                    utilizará como parametros
                                                    técnicos as médias dos
                                                    consumos dos aparelhos
                                                    obtidos de “Marca X
                                                    Capacidade”.
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex flex-col items-center cursor-pointer"
                                            onClick={() =>
                                                handleSwitchSection("advanced")
                                            }
                                        >
                                            <div className="titleButtonModal">
                                                <h1>AVANÇADO</h1>
                                            </div>
                                            <div className="textContainer">
                                                <p className="textButtonModal">
                                                    Ao selecionar “Avançado”
                                                    você deverá informar o
                                                    código de modelo do seu
                                                    aparelho.
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex flex-col items-center cursor-pointer"
                                            onClick={() =>
                                                handleSwitchSection("custom")
                                            }
                                        >
                                            <div className="titleButtonModal">
                                                <h1>PERSONALIZADO</h1>
                                            </div>
                                            <div className="textContainer">
                                                <p className="textButtonModal">
                                                    Ao selecionar
                                                    “Personalizado” você deverá
                                                    inserir algumas informações
                                                    técnicas do aparelho.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : currentSection === "custom" ? (
                            <>
                                <div className="modal">
                                    <h1 className="titleBottom">
                                        CAPACIDADE DE REFRIGERAÇÃO:
                                    </h1>
                                    <div className="inputOptionsModal">
                                        <select
                                            value={capacidade}
                                            onChange={(e) =>
                                                setCapacidade(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione um valor...
                                            </option>
                                            <option value="7.000">
                                                7.000 BTU/h
                                            </option>
                                            <option value="7.500">
                                                7.500 BTU/h
                                            </option>
                                            <option value="8.000">
                                                8.500 BTU/h
                                            </option>
                                            <option value="9.000">
                                                9.000 BTU/h
                                            </option>
                                            <option value="9.500">
                                                9.500 BTU/h
                                            </option>
                                            <option value="10.000">
                                                10.000 BTU/h
                                            </option>
                                            <option value="10.500">
                                                10.500 BTU/h
                                            </option>
                                            <option value="11.000">
                                                11.000 BTU/h
                                            </option>
                                            <option value="12.000">
                                                12.000 BTU/h
                                            </option>
                                            <option value="13.000">
                                                13.000 BTU/h
                                            </option>
                                            <option value="15.000">
                                                15.000 BTU/h
                                            </option>
                                            <option value="16.115">
                                                16.115 BTU/h
                                            </option>
                                            <option value="17.000">
                                                17.000 BTU/h
                                            </option>
                                            <option value="18.000">
                                                18.000 BTU/h
                                            </option>
                                            <option value="19.000">
                                                19.000 BTU/h
                                            </option>
                                            <option value="20.000">
                                                20.000 BTU/h
                                            </option>
                                            <option value="21.000">
                                                21.000 BTU/h
                                            </option>
                                            <option value="21.500">
                                                21.500 BTU/h
                                            </option>
                                            <option value="22.000">
                                                22.000 BTU/h
                                            </option>
                                            <option value="23.000">
                                                23.000 BTU/h
                                            </option>
                                            <option value="24.000">
                                                24.000 BTU/h
                                            </option>
                                            <option value="26.000">
                                                26.000 BTU/h
                                            </option>
                                            <option value="27.000">
                                                27.000 BTU/h
                                            </option>
                                            <option value="28.000">
                                                28.000 BTU/h
                                            </option>
                                            <option value="29.000">
                                                29.000 BTU/h
                                            </option>
                                            <option value="30.000">
                                                30.000 BTU/h
                                            </option>
                                            <option value="31.000">
                                                31.000 BTU/h
                                            </option>
                                            <option value="32.000">
                                                32.000 BTU/h
                                            </option>
                                            <option value="33.000">
                                                33.000 BTU/h
                                            </option>
                                            <option value="34.000">
                                                34.000 BTU/h
                                            </option>
                                            <option value="35.000">
                                                35.000 BTU/h
                                            </option>
                                            <option value="36.000">
                                                36.000 BTU/h
                                            </option>
                                            <option value="37.000">
                                                37.000 BTU/h
                                            </option>
                                            <option value="40.000">
                                                40.000 BTU/h
                                            </option>
                                            <option value="41.000">
                                                41.000 BTU/h
                                            </option>
                                            <option value="42.000">
                                                42.000 BTU/h
                                            </option>
                                            <option value="45.000">
                                                45.000 BTU/h
                                            </option>
                                            <option value="45.500">
                                                45.500 BTU/h
                                            </option>
                                            <option value="46.000">
                                                46.000 BTU/h
                                            </option>
                                            <option value="47.000">
                                                47.000 BTU/h
                                            </option>
                                            <option value="48.000">
                                                48.000 BTU/h
                                            </option>
                                            <option value="51.000">
                                                51.000 BTU/h
                                            </option>
                                            <option value="51500">
                                                51.500 BTU/h
                                            </option>
                                            <option value="52.000">
                                                52.000 BTU/h
                                            </option>
                                            <option value="53.000">
                                                53.000 BTU/h
                                            </option>
                                            <option value="54.000">
                                                54.000 BTU/h
                                            </option>
                                            <option value="55.000">
                                                55.000 BTU/h
                                            </option>
                                            <option value="56.000">
                                                56.000 BTU/h
                                            </option>
                                            <option value="57.000">
                                                57.000 BTU/h
                                            </option>
                                            <option value="58.000">
                                                58.000 BTU/h
                                            </option>
                                            <option value="59.000">
                                                59.000 BTU/h
                                            </option>
                                            <option value="60.000">
                                                60.000 BTU/h
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-bottom2">
                                    <div className="backArrow1">
                                        {/*Esconder botão quando estiver no currentSection === "buttons"*/}
                                        {currentSection === "buttons" ? null : (
                                            <button
                                                className="pb-4"
                                                onClick={handleBackToButtons}
                                            >
                                                <Arrow />
                                            </button>
                                        )}
                                    </div>
                                    <h1 className="titleBottom">
                                        MODELO (Personalizado):
                                    </h1>
                                    <div className="modal-content text-black">
                                        <div>
                                            <h1>De um nome ao equipamento:</h1>
                                            <input
                                                type="text"
                                                placeholder="Nome"
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
                                            <div className="flex flex-row ">
                                                <CurrencyInput
                                                    decimalSeparator=","
                                                    groupSeparator="."
                                                    placeholder="Consumo"
                                                    allowNegativeValue={false}
                                                    allowDecimals={true}
                                                    onValueChange={(
                                                        valueString
                                                    ) =>
                                                        setConsumoProcel(
                                                            valueString.replace(
                                                                ",",
                                                                "."
                                                            )
                                                        )
                                                    }
                                                />
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
                                            <div className="flex justify-center">
                                                <button
                                                    className="actionButton font-bold py-2 px-12 mt-4"
                                                    onClick={() =>
                                                        handleSwitchSection(
                                                            "custom02"
                                                        )
                                                    }
                                                >
                                                    {" "}
                                                    Feito
                                                </button>
                                            </div>
                                        </div>
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
                                    <div className="inputOptionsModal">
                                        <select
                                            value={funcionamentoAtual}
                                            onChange={(e) =>
                                                setFuncionamentoAtual(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione um valor...
                                            </option>
                                            <option value="1">1 h/dia</option>
                                            <option value="2">2 h/dia</option>
                                            <option value="3">3 h/dia</option>
                                            <option value="4">4 h/dia</option>
                                            <option value="5">5 h/dia</option>
                                            <option value="6">6 h/dia</option>
                                            <option value="7">7 h/dia</option>
                                            <option value="8">8 h/dia</option>
                                            <option value="9">9 h/dia</option>
                                            <option value="10">10 h/dia</option>
                                            <option value="11">11 h/dia</option>
                                            <option value="12">12 h/dia</option>
                                            <option value="13">13 h/dia</option>
                                            <option value="14">14 h/dia</option>
                                            <option value="15">15 h/dia</option>
                                            <option value="16">16 h/dia</option>
                                            <option value="17">17 h/dia</option>
                                            <option value="18">18 h/dia</option>
                                            <option value="19">19 h/dia</option>
                                            <option value="20">20 h/dia</option>
                                            <option value="21">21 h/dia</option>
                                            <option value="22">22 h/dia</option>
                                            <option value="23">23 h/dia</option>
                                            <option value="24">24 h/dia</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal">
                                    <h1 className="titleBottom">
                                        Funcionamento desejado (Horas/Dia):
                                    </h1>

                                    <div className="inputOptionsModal">
                                        <select
                                            value={funcionamentoDesejado}
                                            onChange={(e) =>
                                                setFuncionamentoDesejado(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" disabled>
                                                Selecione um valor...
                                            </option>
                                            <option value="1">1 h/dia</option>
                                            <option value="2">2 h/dia</option>
                                            <option value="3">3 h/dia</option>
                                            <option value="4">4 h/dia</option>
                                            <option value="5">5 h/dia</option>
                                            <option value="6">6 h/dia</option>
                                            <option value="7">7 h/dia</option>
                                            <option value="8">8 h/dia</option>
                                            <option value="9">9 h/dia</option>
                                            <option value="10">10 h/dia</option>
                                            <option value="11">11 h/dia</option>
                                            <option value="12">12 h/dia</option>
                                            <option value="13">13 h/dia</option>
                                            <option value="14">14 h/dia</option>
                                            <option value="15">15 h/dia</option>
                                            <option value="16">16 h/dia</option>
                                            <option value="17">17 h/dia</option>
                                            <option value="18">18 h/dia</option>
                                            <option value="19">19 h/dia</option>
                                            <option value="20">20 h/dia</option>
                                            <option value="21">21 h/dia</option>
                                            <option value="22">22 h/dia</option>
                                            <option value="23">23 h/dia</option>
                                            <option value="24">24 h/dia</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            className="actionButton font-bold py-2 px-12 mt-4"
                                            onClick={handleSubmit}
                                        >
                                            Feito
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>Nova Seção</h1>
                                <button onClick={handleBackToButtons}>
                                    Voltar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </ReactModal>
            {tabelaData.length > 0 ? (
                <div
                    className="flex justify-center items-center mb-96 px-5"
                    onLoad={handlerBanner()}
                >
                    <table className="tableView text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    EDIT.
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    QTDD.
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    MARCA
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    TIPO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    MODELO <br /> (Un. Interna)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    CAPACIDADE <br /> (BTU/h)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    CONSUMO PROCEL <br /> (kWh/mês)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    FUNCIONAMENTO ATUAL <br /> (Horas/Dia)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    FUNCIONAMENTO DESEJADO <br /> (Horas/Dia)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    CONSUMO ATUAL <br /> (kW/mês)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    CONSUMO DESEJADO <br /> (kW/mês)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    FATURA ATUAL <br /> (R$)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    FATURA DESEJADA <br /> (R$)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 border border-gray-400"
                                >
                                    ECONOMIA <br /> (%)
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
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-400 cursor-pointer">
                                        <div
                                            className="flex items-center justify-center"
                                            onClick={handleDelete}
                                        >
                                            <Trash />
                                        </div>
                                    </td>
                                    <td
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer flex items-center"
                                        onClick={() =>
                                            handleQtddChange(
                                                index,
                                                prompt(
                                                    "Editar quantidade: "
                                                ).slice(0, 7)
                                            )
                                        }
                                    >
                                        <Icon />
                                        {item.qtdd}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.marca}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.tipo}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.nome}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.capacidade}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.convertedConsumoProcel
                                            .replace(".", ",")
                                            .replace(/,0$/, "")}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.funcionamentoAtual}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.funcionamentoDesejado}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.consumoAtual
                                            .replace(".", ",")
                                            .replace(/,0$/, "") || 0}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.consumoDesejado
                                            .replace(".", ",")
                                            .replace(/,0$/, "") || 0}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.faturaAtual
                                            .replace(".", ",")
                                            .replace(/,00$/, "") || 0}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.faturaDesejada
                                            .replace(".", ",")
                                            .replace(/,00$/, "") || 0}
                                    </td>
                                    <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap border border-gray-400">
                                        {item.economia
                                            .replace(".", ",")
                                            .replace(/,0$/, "") + "%"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/*MENU*/}

                    <div id="menu">
                        <h3 className="text-gray-800 font-bold absolute">
                            TOTAL ESTIMADO
                        </h3>
                        <div
                            className="flex flex-row justify-between text-black m-4"
                            id="menuInfo"
                        >
                            <div
                                className="cursor-pointer"
                                onClick={handleTariffClick}
                            >
                                <h1 className="text-markGrey">Tarifa</h1>
                                {editingTariff ? (
                                    <div className="relative">
                                        <CurrencyInput
                                            defaultValue={tarifa}
                                            intlConfig={{
                                                locale: "pt-BR",
                                                currency: "BRL",
                                            }}
                                            decimalSeparator=","
                                            groupSeparator="."
                                            decimalsLimit={2}
                                            allowNegativeValue={false}
                                            allowDecimals={true}
                                            maxLength="7"
                                            onValueChange={(valueString) => {
                                                if (valueString !== undefined) {
                                                    handleTariffChange(
                                                        valueString.replace(
                                                            ",",
                                                            "."
                                                        )
                                                    );
                                                }
                                            }}
                                            onBlur={handleTariffBlur}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    handleTariffBlur();
                                                }
                                            }}
                                            className="menuTariffInput"
                                            autoFocus
                                        />
                                        <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                                            <CheckMark />
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                onClick={handleTariffBlur}
                                            ></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <span className="text-blue-600 font-bold text-3xl">
                                            R$ {tarifa.replace(".", ",")}
                                        </span>
                                        <Edit />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-markGrey">Consumo Atual</h1>
                                <span className="text-lightGrey font-bold text-3xl">
                                    {somaConsumoAtual
                                        .replace(".", ",")
                                        .replace(/,0$/, "")}
                                    kW/mês
                                </span>
                            </div>
                            <div>
                                <h1 className="text-markGrey">
                                    Consumo desejado
                                </h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    {somaConsumoDesejado
                                        .replace(".", ",")
                                        .replace(/,0$/, "")}
                                    kW/mês
                                </span>
                            </div>
                            <div>
                                <h1 className="text-markGrey">Fatura Atual</h1>
                                <span className="text-lightGrey font-bold text-3xl">
                                    R$ {somaFaturaAtual.replace(".", ",")}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-markGrey">
                                    Fatura Desejada
                                </h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    R$ {somaFaturaDesejada.replace(".", ",")}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-markGrey">Economia</h1>
                                <span className="text-blue-600 font-bold text-3xl">
                                    {economiaTotal
                                        .replace(".", ",")
                                        .replace(/,0$/, "")}
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-black font-thin text-center  p-8 mb-8 infoOptions">
                    <p>Selecione acima para adicionar um equipamento</p>
                </div>
            )}
        </div>
    );
}
