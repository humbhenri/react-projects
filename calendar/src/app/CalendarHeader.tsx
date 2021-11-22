import { IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { formatMonth, nextMonth, previousMonth } from "./services/date";

interface ICalendarHeaderProps {
  month: string;
  children: React.ReactNode;
}

export default function CalendarHeader(props: ICalendarHeaderProps) {
  const { month } = props;
  return (
    <Box display="flex" padding="8px 16px">
      <IconButton
        component={Link}
        to={`/calendar/${previousMonth(month ?? "")}`}
      >
        <Icon>chevron_left</Icon>
      </IconButton>
      <IconButton component={Link} to={`/calendar/${nextMonth(month ?? "")}`}>
        <Icon>chevron_right</Icon>
      </IconButton>
      <Box flex="1" textAlign="center">
        <h3>{formatMonth(month ?? "")}</h3>
      </Box>
      <Box display="flex" alignItems="center" justifyItems="center">
        {props.children}
      </Box>
    </Box>
  );
}
