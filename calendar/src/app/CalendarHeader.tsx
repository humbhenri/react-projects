import { IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import React from "react";
import { Link } from "react-router-dom";
import { formatMonth, nextMonth, previousMonth } from "./services/date";
import UserMenu from "./UserMenu";

interface ICalendarHeaderProps {
  month: string;
}

const CalendarHeader = React.memo(function CalendarHeader(
  props: ICalendarHeaderProps
) {
  console.log("CalendarHeader");
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
        <UserMenu />
      </Box>
    </Box>
  );
});

export default CalendarHeader;
