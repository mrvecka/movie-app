import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useId,
  useState,
} from "react";
import { createUseStyles } from "react-jss";

type CustomTextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  onInputChange: (value: string) => void;
};

const CustomTextInput = forwardRef<HTMLInputElement, CustomTextInputProps>(
  ({ label, onInputChange, disabled, required, ...rest }, ref) => {
    const [error, setError] = useState(false);
    const inputId = rest.id ?? useId();
    const classes = useStyles();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onInputChange(value);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setError(!event.target.validity.valid);
    };

    return (
      <div className={classes.formGroup}>
        {label && (
          <label className={classes.formControlLabel} htmlFor={inputId}>
            <span>{label}</span>
            {!disabled && (
              <span className={classes.formControlLabelNecessaryBadge}>
                {required ? "*" : "Optional"}
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          className={`${classes.formControl} ${error && "invalid"} `}
          onBlur={handleBlur}
          onChange={handleChange}
          onInput={() => setError(false)}
          {...rest}
        />
        {error && (
          <div className={classes.formControlError}>Field is required</div>
        )}
      </div>
    );
  }
);

const useStyles = createUseStyles({
  formControlLabel: {
    whiteSpace: "nowrap",
    display: "flex",
    gap: "4px",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: ".16px",
    alignItems: "baseline",
    "&:has(+input:disabled)": {
      color: "#7D7D8A",
    },
  },
  formControlLabelNecessaryBadge: {
    color: "#7D7D8A",
    fontSize: "0.875rem",
    fontWeight: 550,
    lineHeight: "17px",
  },
  formControl: {
    padding: "12px 8px 12px 16px",
    borderRadius: "12px",
    boxShadow: "inset 0 0 0 1px #8C8C9A",
    outline: "none",
    "&.invalid": {
      boxShadow: "inset 0 0 0 3px #DC2828CC",
    },
    "&:focus": {
      boxShadow: "inset 0 0 0 3px #1A1A1ACC",
    },
    "&:disabled": {
      color: "#7D7D8A",
    },
  },
  formControlError: {
    fontSize: "0.75rem",
    color: "#DC2828",
  },
  formGroup: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "10rem",
    alignItems: "flex-start",

    font: "inherit",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: ".16px",
    color: "#2C2C31",
  },
});

export default CustomTextInput;
