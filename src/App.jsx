import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { WeatherCard, Form, SkeltonLoader } from "./components";

function App() {
	const [search, setSearch] = useState("London");
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const getWeatherData = useCallback(async (city) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=157cc963625396049b1ef33b0a6b98a4`;

		try {
			const response = await axios({
				method: "GET",
				url,
			});

			return response;
		} catch (error) {
			throw error;
		}
	}, []);

	useEffect(() => {
		let isCurrent = true;
		setIsLoading(true);
		getWeatherData(search)
			.then((result) => {
				if (isCurrent) {
					setData(result.data);
					setIsLoading(false);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				setData(null);
			});

		return () => {
			isCurrent = false;
		};
	}, [search]);

	return (
		<div className="app">
			<main>
				<div className="container">
					<Form setSearch={setSearch} />
					{isLoading ? (
						<SkeltonLoader />
					) : (
						<WeatherCard data={data} />
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
