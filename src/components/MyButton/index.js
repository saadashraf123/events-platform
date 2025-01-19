
import classes from './MyButton.module.css';

const MyButton = ({
    variants = 'primary',
    label,
    className,
    disabled,
    leftIcon,
    isSelected,
    children,
    onClick = () => { },
    type = 'button',
    list = [],
    onButtonClick = () => { },
    dropdown,
    ...props
}) => {

    let content = children || label;
    if (leftIcon) {
        content = [leftIcon, label && <> {label}</>];
    }
    if (dropdown) {
        content = (
            <span className={classes.withMultipleAction}>
                {leftIcon}{' '}
                <span className={classes.centerLabel} onClick={onButtonClick}>
                    {label}
                </span>

            </span>
        );
    }
    return (
        <button
            disabled={disabled}
            className={[
                classes.button,
                classes[variants],
                className
            ].join(' ')}
            onClick={(e) => {
                onClick();
            }}
            type={type}
            {...props}
        >
            {content}
        </button>
    );
};

export default MyButton;
