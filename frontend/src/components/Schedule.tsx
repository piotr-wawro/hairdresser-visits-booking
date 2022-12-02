import styled, { css } from "styled-components";
import { GetScheduleResponse } from "../api/schedule";
import { GetVisitResponse } from "../api/visit";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 50px;
  background-color: gray;
  user-select: none;
`;

const Stick = styled.div<{ n: number }>`
  position: absolute;
  height: 80%;
  width: 1px;

  left: ${(props) => `${(100 / 24) * props.n}%`};
  bottom: 0px;
  background-color: black;
`;

const ChosenTime = styled.div<{ t?: Date | undefined }>`
  position: absolute;
  height: 50%;
  width: ${100 / 24}%;

  ${(props) =>
    props.t
      ? css`
          left: ${((props.t?.getHours() * 60 + props.t?.getMinutes()) /
            (24 * 60)) *
          100}%;
        `
      : css`
          display: none;
        `};
  bottom: 0px;
  background-color: green;
`;

const Time = styled.div<{ n: number }>`
  position: absolute;
  font-size: 12px;

  transform: translate(-50%, 0);

  left: ${(props) => `${(100 / 24) * props.n}%`};
  top: 0px;
`;

const Block = styled.div<{
  start: Date;
  end: Date;
  color: string;
  animate?: boolean;
}>`
  position: absolute;
  height: 70%;

  left: ${(props) =>
    `${
      ((props.start.getHours() * 60 + props.start.getMinutes()) / (24 * 60)) *
      100
    }%`};
  right: ${(props) =>
    `${
      100 -
      ((props.end.getHours() * 60 + props.end.getMinutes()) / (24 * 60)) * 100
    }%`};
  bottom: 0px;
  background-color: ${(props) => props.color};

  ${(props) =>
    props.animate &&
    css`
      animation: blink-animation 1s linear 0s infinite alternate;
    `}

  @keyframes blink-animation {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.25;
    }
  }
`;

type ScheduleProps = {
  schedule: GetScheduleResponse[] | undefined;
  visits: GetVisitResponse[] | undefined;
  userId: string | undefined;
  time: Date | undefined;
  setTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
  selectedVisit: string | undefined;
  setSelectedVisit: React.Dispatch<React.SetStateAction<string>>;
};

const Schedule = ({
  schedule,
  visits,
  userId,
  time,
  setTime,
  selectedVisit,
  setSelectedVisit,
}: ScheduleProps) => {
  const getTime = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    const minutes = 24 * 60 * percentage;

    const newTime = new Date();
    newTime.setHours(Math.floor(minutes / 60));
    newTime.setMinutes(Math.floor(minutes % 60));
    setTime(newTime);
    setSelectedVisit("");
  };

  return (
    <Container onClick={getTime}>
      {schedule?.map((e, i) => (
        <Block
          key={i}
          start={new Date(e.start)}
          end={new Date(e.end)}
          color="white"
        />
      ))}

      {visits?.map((e, i) => {
        return (
          <Block
            key={i}
            start={new Date(e.start)}
            end={new Date(e.end)}
            color={e.bookedById === userId ? "yellow" : "red"}
            animate={selectedVisit === e.id}
            onClick={(event) => {
              setTime(undefined);
              setSelectedVisit(e.id);
              event.stopPropagation();
            }}
          />
        );
      })}

      <ChosenTime t={time} />

      {[...Array(23).keys()].map((i) => (
        <>
          <Stick n={i + 1} />
          <Time n={i + 1}>{`${i + 1}:00`}</Time>
        </>
      ))}
    </Container>
  );
};

export default Schedule;
