import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { useAllEmployeesQuery } from "../api/employee.js";
import { useLazyGetAllSchedulesQuery } from "../api/schedule.js";
import {
  useDeleteVisitMutation,
  useLazyAllVisitsQuery,
  usePostVisitMutation,
} from "../api/visit.js";
import { useUserProfileQuery } from "../api/user.js";
import Schedule from "../components/Schedule.js";

const Home = () => {
  const { data: profile } = useUserProfileQuery();
  const [allVisitsQuery, { data: visits }] = useLazyAllVisitsQuery({
    pollingInterval: 1000,
  });
  const { data: employeeList } = useAllEmployeesQuery();
  const [allSchedulesQuery, { data: schedules }] = useLazyGetAllSchedulesQuery({
    pollingInterval: 1000,
  });
  const [postVisitMutation] = usePostVisitMutation();
  const [deleteVisitMutation] = useDeleteVisitMutation();

  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [selectedVisit, setSelectedVisit] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const chagngeEmployee = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee(event.target.value);
  };

  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const changeStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Date("1 " + event.target.value));
  };

  const addVisit = () => {
    postVisitMutation({
      servicedBy: employee,
      start: `${date}T${startTime?.toISOString().split("T")[1]}`,
    })
      .unwrap()
      .then(() => {
        setStartTime(undefined);
        setEndTime(undefined);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.data.error);
      });
  };

  const deleteVisit = (id: string) => {
    deleteVisitMutation({ id })
      .unwrap()
      .catch((error) => {
        setIsError(true);
        setError(error.data.error);
      });
  };

  const closeSnackbar = () => {
    setIsError(false);
  };

  useEffect(() => {
    if (date) {
      allSchedulesQuery({
        start: new Date(date + " 00:00:00.000").toISOString(),
        end: new Date(date + " 23:59:59.999").toISOString(),
      });
      allVisitsQuery({
        start: new Date(date + " 00:00:00.000").toISOString(),
        end: new Date(date + " 23:59:59.999").toISOString(),
      });
    }
  }, [date]);

  return (
    <Container>
      <LeftPanel>
        <TextField
          select
          fullWidth
          label="Employee"
          value={employee}
          onChange={chagngeEmployee}
          variant="standard"
        >
          {employeeList
            ?.filter((e) => e.role === "employee")
            .map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.firstName} {e.lastName}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          fullWidth
          label="Day"
          type="date"
          defaultValue={date}
          onChange={changeDate}
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <List>
          {visits
            ?.filter((e) => e.bookedById === profile?.id)
            .map((e) => (
              <ListItem
                key={e.id}
                secondaryAction={
                  <IconButton onClick={() => deleteVisit(e.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${e.start.slice(11, 16)} - ${e.end.slice(11, 16)}`}
                />
              </ListItem>
            ))}
        </List>
      </LeftPanel>
      <RightPanel>
        <Schedule
          schedule={schedules?.filter((e) => e.forId === employee)}
          visits={visits?.filter((e) => e.servicedById === employee)}
          userId={profile?.id}
          endTime={startTime && new Date(startTime.getTime() + 60 * 60 * 1000)}
          startTime={startTime}
          setStarTime={setStartTime}
          selectedVisit={selectedVisit}
          setSelectedVisit={setSelectedVisit}
        />

        <TimeContainer>
          <TextField
            label="Start"
            type="time"
            value={
              startTime
                ? `${("0" + startTime?.getHours()).slice(-2)}:${(
                    "0" + startTime?.getMinutes()
                  ).slice(-2)}`
                : ""
            }
            onChange={changeStartTime}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button variant="outlined" onClick={addVisit}>
            Add
          </Button>
        </TimeContainer>
      </RightPanel>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 16px;

  display: flex;
  justify-content: center;
  gap: 16px;
`;

const LeftPanel = styled.div`
  width: 300px;
  height: 800px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightPanel = styled.div`
  width: 1000px;
  height: 800px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 16px;
`;
