import React from "react";
import classes from "./MyDatePicker.module.css";
import DatePicker from "react-date-picker";

const MyDatePicker = ({
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
    maxDate = null,
    minDate = new Date(),
}) => {
    return (
        <>
            <style>
                {`.react-date-picker {
                display:flex;
                padding: 7px 10px;
              }
              .react-date-picker__wrapper{
                border: none;
                padding: 7px 15
                
                px;
              }
              .react-date-picker__clear-button{
                display: none !important;
              }
              .react-date-picker__calendar-button>svg{
                stroke: var(--placeholder-color);
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
                <div className={classes["select-wrapper"]}>
                    <DatePicker
                        onChange={(e) => {
                            setter(e);
                        }}
                        value={value}
                        maxDate={maxDate}
                        minDate={minDate}
                    />
                </div>
            </div>
        </>
    );
};
export default MyDatePicker;
