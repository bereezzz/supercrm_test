import React, { useState } from 'react';
import "./customCheck.scss"
interface CustomCheckboxProps {
    checked: boolean;
    onChange: (isChecked: boolean) => void;
}

const CustomCheck: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const toggleCheckbox = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState);
    };

    return (
        <div
            className='checkBox'
            style={{float: "left"}}
            onClick={toggleCheckbox}
        >
            {isChecked && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="blue"
                >
                    <path d="M9 16.17L5.83 13 4.41 14.41 9 19 21 7l-1.41-1.42z" />
                </svg>
            )}
        </div >
    );
};

export default CustomCheck;
