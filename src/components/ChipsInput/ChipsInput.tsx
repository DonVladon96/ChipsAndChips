import { useEffect, useState } from 'react';
import './ChipsInput.css';

const ChipsInput = ({ value, onChange }) => {
    const [chips, setChips] = useState([]);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // Индекс редактируемого чипа
    const [editValue, setEditValue] = useState(''); // Значение для редактирования

    useEffect(() => {
        setChips(value.split(',').map(tag => tag.trim()).filter(tag => tag));
    }, [value]);

    const handleKeyDown = (e) => {
        const inputValue = e.target.value;

        if (e.key === '"') {
            setIsQuoteOpen(prev => !prev);
            e.preventDefault();
            e.target.value += '"';
            return;
        }

        if ((e.key === 'Enter' || e.key === ',') && inputValue) {
            const newChip = inputValue.trim();
            if (!isQuoteOpen) {
                if (newChip && !chips.includes(newChip)) {
                    const updatedChips = [...chips, newChip];
                    setChips(updatedChips);
                    onChange(updatedChips.join(', '));
                }
                e.target.value = '';
            } else {
                e.preventDefault();
            }
            e.preventDefault();
        }
    };

    const handleDeleteChip = (chipToDelete) => {
        const updatedChips = chips.filter(chip => chip !== chipToDelete);
        setChips(updatedChips);
        onChange(updatedChips.join(', '));
    };

    const handleEditChip = (index) => {
        setEditIndex(index);
        setEditValue(chips[index]); // Устанавливаем значение для редактирования
    };

    const handleSaveEdit = (e) => {
        if (e.key === 'Enter') {
            const newChip = editValue.trim();
            if (newChip && !chips.includes(newChip)) {
                const updatedChips = [...chips];
                updatedChips[editIndex] = newChip;
                setChips(updatedChips);
                onChange(updatedChips.join(', '));
                setEditIndex(null); // Сбрасываем индекс редактирования
                setEditValue(''); // Очищаем значение редактирования
            }
        }
    };

    return (
        <div className="tags">
            {chips.map((chip, index) => (
                <div key={index} className="tags__tag" onClick={() => handleEditChip(index)}>
                    {editIndex === index ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleSaveEdit}
                            onBlur={() => setEditIndex(null)} // Сбрасываем индекс при потере фокуса
                            className="tags__edit_input"
                        />
                    ) : (
                        <>
                            {chip}
                            <button className='tags__btn' onClick={() => handleDeleteChip(chip)}>X</button>
                        </>
                    )}
                </div>
            ))}
            <input
                type="text"
                placeholder="Введите ключевые слова"
                onKeyDown={handleKeyDown}
                className="tags__new_tag"
            />
        </div>
    );
};

export default ChipsInput;
