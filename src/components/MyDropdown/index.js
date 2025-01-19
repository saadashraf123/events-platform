import React from "react";
import classes from "./MyDropdown.module.css";
import Select from "react-select";

const MyDropdown = ({
    className,
    label,
    value,
    setter,
    options,
    labelClassName,
    placeholder,
    labelStyle,
    isMulti = false,
    isSearchable = false,
    disabled = false,
    required,
    extraStyles,
}) => {
    // Create a state to track whether the Select is focused
    const [isFocused, setIsFocused] = React.useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    // Handle the blur event
    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <>
            <style>
                {`.css-t3ipsp-control {
            height:100%;
              }
              .css-1fdsijx-ValueContainer{
                padding: 10px 15px !important;
                letter-spacing: 1.4px;
              }
              .css-3w2yfm-ValueContainer{
                padding: 10px 15px !important;
                letter-spacing: 1.4px;
              }
              .css-tr4s17-option {
                background-color: rgba(10, 20, 6, 0.22) !important;
              }
              .css-d7l1ni-option {
                background-color: var(--primary-color) !important;
                color: #fff !important;
              }
              .css-1nmdiq5-menu ::-webkit-scrollbar {
                display: none !important;
              }
              .css-3w2yfm-ValueContainer {
                flex-wrap: nowrap !important;
              }
              .css-1nmdiq5-menu {
                position: absolute !important;
                z-index: 999999999 !important;
                -ms-overflow-style: none !important; /* IE and Edge */
                scrollbar-width: none !important; /* Firefox */
              }
              .css-1jqq78o-placeholder {
                color: var(--placeholder-color) !important;
                font-size: 12px !important;
                text-transform: capitalize !important;
              }
              .css-t3ipsp-control:hover {
                border: var(--primary-color) !important;
              }
              .css-13cymwt-control {
                border: none !important;
                border-style: none !important;
              }
              .css-t3ipsp-control:hover {
                border: none !important;
              }
              .css-t3ipsp-control {
                border: none !important;
                box-shadow: none !important;
              }
            `}
            </style>
            <div className={[classes["select-container"], className].join(" ")}>
                {label && (
                    <label
                        htmlFor={`dropdown${label}`}
                        className={`${[
                            classes.label,
                            labelClassName && labelClassName,
                            disabled && classes.disabled,
                        ].join(" ")}`}
                        style={labelStyle}
                    >
                        {label}
                        {required && <span style={{ color: "red" }}>*</span>}
                    </label>
                )}
                <div className={[classes["select-wrapper"], extraStyles].join(" ")}>
                    <Select
                        isSearchable={isSearchable}
                        isMulti={isMulti}
                        id={label}
                        value={value}
                        defaultValue={value}
                        onChange={(e) => {
                            setter(e);
                        }}
                        options={options}
                        placeholder={placeholder}
                        className="custom-select"
                        // styles={customStyles}
                        onFocus={handleFocus}
                        // components={{ Option: CustomOption }}
                        onBlur={handleBlur}
                    />
                </div>
            </div>
        </>
    );
};
export default MyDropdown;
