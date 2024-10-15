import { useEffect, useState, KeyboardEvent } from 'react';
import './ChipsInput.css';

interface ChipsInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const ChipsInput = ({ value, onChange }: ChipsInputProps) => {
    const [chips, setChips] = useState<string[]>(['']);
    const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setChips(value.split(',').map(tag => tag.trim()).filter(tag => tag));
    }, [value]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;

        if (e.key === '"') {
            setIsQuoteOpen(prev => !prev);
            e.preventDefault();
            e.currentTarget.value += '"';
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
                e.currentTarget.value = '';
                setErrorMessage('');
            } else {
                e.preventDefault();
            }
            e.preventDefault();
        }
    };

    const handleDeleteChip = (chipToDelete: string) => {
        const updatedChips = chips.filter(chip => chip !== chipToDelete);
        setChips(updatedChips);
        onChange(updatedChips.join(', '));
    };

    const handleEditChip = (index: number) => {
        setEditIndex(index);
        setEditValue(chips[index]);
    };

    const handleSaveEdit = () => {
        const newChip = editValue.trim();
        if (newChip && !chips.includes(newChip)) {
            const updatedChips = [...chips];
            if (editIndex !== null) {
                updatedChips[editIndex] = newChip;
                setChips(updatedChips);
                onChange(updatedChips.join(', '));
            }
        }
        setEditIndex(null);
        setEditValue('');
    };

    const handleInputBlur = () => {
        const inputElement = document.querySelector('.tags__new_tag') as HTMLInputElement;
        if (inputElement) {
            const inputValue = inputElement.value.trim();
            if (inputValue) {
                if (isQuoteOpen) {
                    setErrorMessage('Закройте кавычку перед добавлением чипса.');
                } else {
                    const updatedChips = [...chips, inputValue];
                    setChips(updatedChips);
                    onChange(updatedChips.join(', '));
                    inputElement.value = '';
                    setErrorMessage('');
                }
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
