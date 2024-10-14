import { useState } from "react";
import "./App.css";
import Hero from './assets/acetone-2023921-133318-608.png'

export default function App() {
    const [tagValue, setTagValue] = useState("");
    const [editTagValue, setEditTagValue] = useState("");
    const [tags, setTags] = useState([]);
    const [suggestedTags, setSuggestedTags] = useState([]);

    const addTags = (e) => {
        if (e.keyCode === 13 && tagValue) {
            if (isSimilarTag(tagValue)) {

                return;
            }

            setTags([...tags, tagValue]);
            setTagValue("");
        }
    };

    const deletTag = (val) => {
        let reaminTags = tags.filter((t) => t !== val);
        setTags(reaminTags);
    };

    const isSimilarTag = (val) => {
        if (tags.includes(val)) {
            return true;
        }
    };

    const editTag = (e) => {
        if (e.keyCode === 13 && editTagValue) {
            if (isSimilarTag(editTagValue)) {

                return;
            }
            let index = tags.findIndex((val) => val === tagValue);
            tags[index] = editTagValue;
            setTags(tags);
            setTagValue("");
            setEditTagValue("");
        }
    };

    const openEditTagInput = (e) => {
        setEditTagValue(e);
        setTagValue(e);
    };

    const onChangeSelect = (e) => {
        let value = e.target.value;
        if (isSimilarTag(value)) {

            return;
        }

        setTags([...tags, value]);
        setSuggestedTags([]);
        setTagValue("");
    };

    const onChange = (e) => {
        let value = e.target.value;
        setTagValue(value);

    };
    return (
        <div className="main">
            <div className="content">
                <div className="content__wrapper">
                 <div className="content__text">
                     <h1 className="content__title">Тестовое задание</h1>
                     <h2 className="content__sub-title">На позицию Frontend разработчик в компанию Тендерплан</h2>
                 </div>
                
                 <img src={ Hero } alt={" Hero" } className="content__img" />
                </div>
               
                {editTagValue && (
                    <input
                        type="text"
                        placeholder="type and enter"
                        value={editTagValue}
                        onChange={(e) => setEditTagValue(e.target.value)}
                        onKeyDown={editTag}
                        className="content__input"
                    />
                )}
                <div className="tagInput">
                    {tags.map((item, index) => {
                        return (
                            <button key={index}>
                                {item}
                                <span onClick={() => deletTag(item)}>X</span>
                                <span
                                    style={{
                                        color: "green",
                                        border: "1px solid gray",
                                    }}
                                    onClick={() => openEditTagInput(item)}
                                >
                  Edit
                </span>
                            </button>
                        );
                    })}

                    <input
                        type="text"
                        placeholder="type and enter"
                        value={tagValue}
                        onChange={(e) => onChange(e)}
                        onKeyDown={addTags}
                        className="content__input"
                    />
                </div>

                {suggestedTags.length > 0 && (
                    <select onChange={onChangeSelect}>
                        <option key="select" value="Select">
                            Select
                        </option>
                        {suggestedTags.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                )}
            </div>
        </div>
    );
}
