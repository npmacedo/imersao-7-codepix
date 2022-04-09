import { PropsWithChildren } from "react";
import classes from "./FormButtonActions.module.scss";

const FormButtonActions: React.FunctionComponent<PropsWithChildren<any>> = (props) => {
  return <div className={classes.root}>{props.children}</div>;
};

export default FormButtonActions;