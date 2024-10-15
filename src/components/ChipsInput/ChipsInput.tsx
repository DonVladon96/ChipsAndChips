import { useEffect, useState } from 'react';
import './ChipsInput.css';

interface ChipsInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const ChipsInput = ({ value, onChange } : ChipsInputProps) => {
    const [chips, setChips] = useState([]);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // Индекс редактируемого чипа
    const [editValue, setEditValue] = useState(''); // Значение для редактирования
    const [errorMessage, setErrorMessage] = useState(''); // Сообщение об ошибке

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
                setErrorMessage(''); // Сбрасываем сообщение об ошибке
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

    const handleSaveEdit = () => {
        const newChip = editValue.trim();
        if (newChip && !chips.includes(newChip)) {
            const updatedChips = [...chips];
            updatedChips[editIndex] = newChip;
            setChips(updatedChips);
            onChange(updatedChips.join(', '));
        }
        setEditIndex(null); // Сбрасываем индекс редактирования
        setEditValue(''); // Очищаем значение редактирования
    };

    const handleInputBlur = () => {
        const inputValue = document.querySelector('.tags__new_tag').value.trim();
        if (inputValue) {
            if (isQuoteOpen) {
                setErrorMessage('Закройте кавычку перед добавлением чипса.');
            } else {
                const updatedChips = [...chips, inputValue];
                setChips(updatedChips);
                onChange(updatedChips.join(', '));
                document.querySelector('.tags__new_tag').value = ''; // Очищаем поле ввода
                setErrorMessage('');
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
                            onBlur={handleSaveEdit}
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
                onBlur={handleInputBlur}
                className="tags__new_tag"
            />
            {errorMessage && <div className="tags__error-message">{errorMessage}</div>}
        </div>
    );
};

export default ChipsInput;
