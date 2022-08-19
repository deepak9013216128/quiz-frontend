import {
	CountdownCircleTimer,
	useCountdown,
} from "react-countdown-circle-timer";

const Countdown = ({ key, time, onComplete }: any) => (
	<CountdownCircleTimer
		isPlaying
		key={key}
		duration={time}
		colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
		colorsTime={[30, 15, 10, 0]}
		rotation="counterclockwise"
		size={120}
		onComplete={onComplete}
	>
		{({ remainingTime }) => <span className="h1"> {remainingTime}</span>}
	</CountdownCircleTimer>
);

export default Countdown;
