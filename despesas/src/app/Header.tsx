import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    margin: "1em 4em",
    padding: "6px 16px",
    alignItems: "center",
    justifyContent: "center",
  },
  despesaTotal: {
    marginTop: "16px",
  },
}));

interface IHeaderProps {
  children: React.ReactNode;
}

export default function Header(props: IHeaderProps) {
  const classes = useStyles();
  return <Box className={classes.header}>{props.children}</Box>;
}
