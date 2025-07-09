import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: auto;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  gap: 24px;
  padding: 0 12px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    padding: 0 8px;
  }
`;

const Left = styled.div`
  flex: 0.25;
  min-width: 260px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_primary}33;  /* 20% opacity */
  border-radius: 16px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  background: ${({ theme }) => theme.card};

  @media (max-width: 600px) {
    flex: none;
    width: 100%;
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const Right = styled.div`
  flex: 1;
  min-width: 300px;
  background: ${({ theme }) => theme.bgLight};
  padding: 10px 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 8px;

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const SecTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 6px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-bottom: 80px;

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const Workouts = () => {
  const dispatch = useDispatch();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, date ? `?date=${date}` : "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)} />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Today's Workout</SecTitle>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <CardWrapper>
                {todaysWorkouts.map((workout) => (
                  <WorkoutCard key={workout._id || workout.id} workout={workout} />
                ))}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
