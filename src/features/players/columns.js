import { format } from "date-fns";

export default function prepareColumns() {
  const columns = [
    {
      Header: "Week",
      accessor: "week",
      disableFilters: true,
      sticky: "left",
    },
    {
      Header: "Game Date",
      accessor: "gameDate",
      sticky: "left",
      Cell: ({ value }) => {
        return format(new Date(value), "MM/dd/yyyy");
      },
    },
    { Header: "Opponent", accessor: "opponent", sticky: "left" },
    { Header: "Attempts", accessor: "Att" },
    { Header: "Completions", accessor: "Cmp" },
    { Header: "Interceptions", accessor: "Int" },
    { Header: "Passing Touchdowns", accessor: "PsTD" },
    { Header: "Passing Yards", accessor: "PsYds" },
    { Header: "Sacks", accessor: "Sack" },
    { Header: "Rushes", accessor: "Rush" },
    { Header: "Rushing Yards", accessor: "RshYds" },
    { Header: "Rushing Touchdowns", accessor: "RshTD" },
    { Header: "Yds/Att", accessor: "Yd/Att" },
    { Header: "Cmp%", accessor: "Cmp%" },
  ];
  return columns;
}
