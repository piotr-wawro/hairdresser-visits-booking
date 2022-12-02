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

const Time = styled.div<{ n: number }>`
  position: absolute;
  font-size: 12px;

  transform: translate(-50%, 0);

  left: ${(props) => `${(100 / 24) * props.n}%`};
  top: 0px;
`;

const Block = styled.div<{
  start: Date | undefined;
  end: Date | undefined;
  color: string;
  animate?: boolean;
  height?: string;
}>`
  position: absolute;
  height: ${(props) => props.height || "70%"};

  ${(props) =>
    props.start &&
    css`
      left: ${((props.start.getHours() * 60 + props.start.getMinutes()) /
        (24 * 60)) *
      100}%;
    `}

  ${(props) =>
    props.end &&
    css`
      right: ${100 -
      ((props.end.getHours() * 60 + props.end.getMinutes()) / (24 * 60)) *
        100}%;
    `}

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
  schedule?: GetScheduleResponse[] | undefined;
  visits?: GetVisitResponse[] | undefined;
  userId?: string | undefined;
  endTime?: Date | undefined;
  startTime?: Date | undefined;
  setStarTime?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  selectedVisit?: string | undefined;
  setSelectedVisit?: React.Dispatch<React.SetStateAction<string>>;
};

const Schedule = ({
  schedule,
  visits,
  userId,
  endTime,
  startTime,
  setStarTime,
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
    setStarTime?.(newTime);
    setSelectedVisit?.("");
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
              setStarTime?.(undefined);
              setSelectedVisit?.(e.id);
              event.stopPropagation();
            }}
          />
        );
      })}

      <Block start={startTime} end={endTime} color="green" height="50%" />

      {[...Array(23).keys()].map((i) => (
        <div key={i}>
          <Stick n={i + 1} />
          <Time n={i + 1}>{`${i + 1}:00`}</Time>
        </div>
      ))}
    </Container>
  );
};

export default Schedule;
