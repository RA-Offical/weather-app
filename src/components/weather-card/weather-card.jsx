import { MdThunderstorm } from "react-icons/md";
import {
	BsCloudDrizzleFill,
	BsFillCloudsFill,
	BsFillCloudFog2Fill,
} from "react-icons/bs";
import { GiRaining } from "react-icons/gi";
import React from "react";
import { useCallback } from "react";

function WeatherCard({ data }) {
	const convertKelvinToCelcius = useCallback((kelvinTemperature) => {
		return (kelvinTemperature - 273.15).toFixed(2);
	}, []);

	const getWeatherIcon = useCallback((condition) => {
		if (condition === "Thunderstorm") {
			return <MdThunderstorm className="icon" />;
		} else if (condition === "Drizzle") {
			return <BsCloudDrizzleFill className="icon" />;
		} else if (condition === "Rain") {
			return <GiRaining className="icon" />;
		} else if (condition === "Snow") {
			return <FaSnowflake className="icon" />;
		} else if (condition === "Clouds") {
			return <BsFillCloudsFill className="icon" />;
		}
		return <BsFillCloudFog2Fill className="icon" />;
	}, []);

	const getDate = useCallback(() => {
		const date = new Date();

		const DATE = date.getDate();
		const YEAR = date.getFullYear();
		const DAY = date.toLocaleString("default", { weekday: "long" });
		const MONTH = date.toLocaleString("default", { month: "long" });

		return { DATE, YEAR, DAY, MONTH };
	}, []);

	const getTime = useCallback(() => {
		const date = new Date();

		return date.toLocaleString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	}, []);

	if (!data) {
		return <h1>Loading ...</h1>;
	}

	const {
		name,
		main: {
			temp: kelvinTemperature,
			temp_min: kelvinTemperatureMin,
			temp_max: kelvinTemperatureMax,
		},
		weather,
	} = data;

	const lead = weather[0].main;
	const { DAY, MONTH, YEAR, DATE } = getDate();
	const TIME = getTime();

	return (
		<div className="card">
			<header className="card-header">
				<h2 className="fw-bold card__title">{name}</h2>
				<div className="fw-light card-date-container">
					<span>{DAY}</span>
					{", "}
					<span>{MONTH}</span>
					<span>{DATE}</span>
					{", "}
					<span>{YEAR}</span>
				</div>

				<div className="card-time-container">{TIME}</div>
			</header>

			<div className="card-body">
				{/* components for showing cloud, rain, sunny */}
				{getWeatherIcon(lead)}

				<p className="fw-bold card__temperature">
					{convertKelvinToCelcius(kelvinTemperature)} &deg;C
				</p>

				<div className="card-haze-container">
					<h3 className="fw-bold card__haze">{lead}</h3>

					<div className="card-temperature-container">
						<span>
							{convertKelvinToCelcius(kelvinTemperatureMin)}{" "}
							&deg;C
						</span>
						{" | "}
						<span>
							{convertKelvinToCelcius(kelvinTemperatureMax)}{" "}
							&deg;C
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WeatherCard;
