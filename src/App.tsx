import { useState } from "react";
import Hero from "./assets/acetone-2023921-133318-608.png";
import Header from "./components/Header/Header";
import ChipsInput from "./components/ChipsInput/ChipsInput.tsx";

import "./App.css";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="main">
      <Header/>
      <section className="content">
        <div className="content__wrapper">
          <div className="content__text">
            <h1 className="content__title">Тестовое задание</h1>
            <h2 className="content__sub-title">
              На позицию Frontend разработчик в компанию Тендерплан
            </h2>
          </div>

          <img src={Hero} alt={" Hero"} className="content__img" />
        </div>

        <ChipsInput value={value} onChange={setValue} />
      </section>
    </div>
  );
}
