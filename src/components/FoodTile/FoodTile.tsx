import React, { ChangeEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/styles";

import { CustomTheme } from "../../style/theme";

type ClassNames =
  | "container"
  | "nameContainer"
  | "name"
  | "controls"
  | "value"
  | "button"
  | "input"
  | "image";
interface OwnProps {
  classes: Record<ClassNames, string>;
  imgSrc: string;
  name: string;
  onChange?: (n: number) => void;
  value: number;
}

type Props = OwnProps;

export const FoodTile: React.FC<Props> = (props: Props) => {
  const { classes, imgSrc, name, value, onChange } = props;

  const handleChange = (value: number) => () => {
    if (value < 0) {
      value = 0;
    }
    if (onChange) {
      onChange(value);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(Number(event.target.value))();
  };

  return (
    <div className={classes.container}>
      <img src={imgSrc} alt={name} className={classes.image} />
      <div className={classes.nameContainer}>
        <span className={classes.name}>{name}</span>

        <div className={classes.controls}>
          <button className={classes.button} onClick={handleChange(value - 1)}>
            -
          </button>
          {/* <span className={classes.value}>{value || 0}</span> */}
          <input
            value={value}
            onChange={handleInputChange}
            type="number"
            className={classes.input}
          />
          <button className={classes.button} onClick={handleChange(value + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = (theme: CustomTheme): Record<ClassNames, CSSProperties> => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: 200
  },
  nameContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1),
    width: "100%"
  },
  name: {
    color: "black",
    fontWeight: "bold"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      color: "grey"
    }
  },
  button: {
    color: "grey",
    padding: "2px 2px 2px 2px",
    border: "1px solid black",
    borderRadius: "2px",
    backgroundColor: "red",
  },
  image: {
    height: 100
  },
  input: {
    border: "none",
    outline: "none",
    mozAppearance: "textfield",
    width: 30,
    textAlign: "center"
  },
  value: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }
});

export default withStyles(styles)(FoodTile);
