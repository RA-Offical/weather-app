import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

function Form({ setSearch }) {
	const [input, setInput] = useState("");

	const handleSubmit = (e) => {
		// stop form submission
		e.preventDefault();

		if (!input) {
			alert("Input field is empty");
			return;
		}

		setSearch(input);
	};

	return (
		<div className="form-wrapper">
			<form className="form" onSubmit={handleSubmit}>
				<div className="search-group">
					<div className="control">
						<input
							type="search"
							name="search"
							id="search"
							placeholder="London..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="btn btn--icon form__search--btn"
					>
						<HiMagnifyingGlass />
					</button>
				</div>
			</form>
		</div>
	);
}

export default Form;
