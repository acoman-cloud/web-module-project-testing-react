import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
	render(<Episode episode={{}}/>)
});

test("renders the summary test passed as prop", ()=>{
	render(<Episode episode={{
		name:'Chapter One: MADMAX',
		season: 1,
		number: 1,
		runtime: 48,
		summary: "One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there's a new player in town, and Jim pays a visit to El.",
		image: 'https://static.tvmaze.com/uploads/images/medium_landscape/342/855794.jpg',
	}}/>)

	const summary = screen.queryByText(/One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there's a new player in town, and Jim pays a visit to El./i)

	expect(summary).toBeInTheDocument();
	expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", ()=>{
	render(<Episode episode={{
		name:'Chapter One: MADMAX',
		season: 1,
		number: 1,
		runtime: 48,
		summary: "One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there's a new player in town, and Jim pays a visit to El.",
		image: '',
	}}/>)

	const image = screen.queryByRole('img');
	expect(image).toHaveProperty('src','https://i.ibb.co/2FsfXqM/stranger-things.png');
});
