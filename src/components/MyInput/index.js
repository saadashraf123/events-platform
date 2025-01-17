import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import classes from './MyInput.module.css';

export const MyInput = ({
    type = 'text',
    label,
    label2,
    value,
    setter,
    noBorder = false,
    placeholder = 'Search Here',
    disabled = false,
    parentCustomStyle,
    customStyle,
    inputStyle,
    labelStyle,
    id,
    errorText = '',
    leftIcon,
    rightIcon,
    onKeyPress,
    regexType,
    isOptional = false,
    counter,
    className,
    children,
    ...props
}) => {
    const [passToggle, setPassToggle] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (regexType === 'number' || type === 'number') {
            setter(inputValue.replace(/[^\d]/g, ''));
        } else {
            setter(inputValue);
        }
    };

    return (
        <div
            className={clsx(classes.wrapper, {
                [classes.error]: errorText,
                [className]: className
            })}
            style={parentCustomStyle}>
            {label && (
                <div className={classes.labelWrapper}>
                    <label
                        htmlFor={`input-${id || label}`}
                        className={clsx(classes.labelText, { [classes.disabled]: disabled })}
                        style={labelStyle}>
                        {label} {!isOptional && <span className={clsx('steric')}>*</span>}
                    </label>
                    {counter && <span className={classes.counter}>{counter}</span>}
                </div>
            )}
            <div
                className={clsx(classes.container, {
                    [classes.noBorder]: noBorder
                })}
                style={{ ...customStyle, ...(leftIcon && { paddingLeft: '20px' }) }}>
                {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
                <input
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={(e) =>
                        onKeyPress && ['Enter', 'NumpadEnter'].includes(e.code) && onKeyPress()
                    }
                    onBlur={() => {
                        if (typeof value != 'number') {
                            setter(value.trim());
                        }
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={passToggle ? 'text' : type}
                    id={`input-${id || label}`}
                    className={clsx(classes.inputBox)}
                    style={inputStyle}
                    {...props}
                />
                {rightIcon ||
                    (type === 'password' && (
                        <span className={classes.iconContainer}>
                            {rightIcon && <span className={classes.rightIcon}>{rightIcon}</span>}
                            {type === 'password' &&
                                (passToggle ? (
                                    <IoEyeOutline
                                        color="var(--icon-color)"
                                        size={21}
                                        className={classes.passwordIcon}
                                        onClick={() => setPassToggle(!passToggle)}
                                    />
                                ) : (
                                    <IoEyeOffOutline
                                        color="var(--icon-color)"
                                        size={21}
                                        className={classes.passwordIcon}
                                        onClick={() => setPassToggle(!passToggle)}
                                    />
                                ))}
                        </span>
                    ))}
                {children && <div className={classes.children}>{children}</div>}
            </div>
            <p className={classes.errorText}>{errorText}</p>
        </div>
    );
};

MyInput.propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'number']).isRequired,
    label: PropTypes.string,
    label2: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    setter: PropTypes.func.isRequired,
    noBorder: PropTypes.bool,
    disabled: PropTypes.bool,
    parentCustomStyle: PropTypes.object,
    customStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    errorText: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onKeyPress: PropTypes.func,
    regexType: PropTypes.string,
    isOptional: PropTypes.bool
};

MyInput.defaultProps = {
    type: 'text',
    placeholder: 'Search Here',
    value: '',
    noBorder: false,
    disabled: false,
    error: false,
    errorText: '',
    setter: () => { }
};
