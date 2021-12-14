import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const show = {
	name:'Stranger',
	summary: "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
	seasons:[
		{
			id:0,
			name:'season1 kind of',
			episodes:[{
				id: 578663,
				url: "https://www.tvmaze.com/episodes/578663/stranger-things-1x02-chapter-two-the-weirdo-on-maple-street",
				name: "Chapter Two: The Weirdo on Maple Street",
				season: 1,
				number: 2,
				type: "regular",
				runtime: 56,
				rating: {
					average: 8.2
				},
				image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855787.jpg",
				summary: "While the search for the missing Will continues, Joyce tells Jim about a call she apparently received from her son. Meanwhile, Jane warns Mike that there are bad people after her, and he realizes that she knows what happened to Will.",
				},
				{
				id: 578666,
				url: "https://www.tvmaze.com/episodes/578666/stranger-things-1x05-chapter-five-the-flea-and-the-acrobat",
				name: "Chapter Five: The Flea and the Acrobat",
				season: 1,
				number: 5,
				type: "regular",
				runtime: 53,
				rating: {
					"average": 8.5
				},
				image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855790.jpg",
				summary: "Jim searches for Will at Hawkins Laboratory, but finds something unexpected. Meanwhile, Lonnie helps Joyce bury Will but reveals an ulterior motive for returning to town, while the boys find a way to locate Will but discover that Jane is opposing them.",
				},
				{
			id: 553946,
			url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
			name: "Chapter One: The Vanishing of Will Byers",
			season: 1,
			number: 1,
			type: "regular",
    runtime: 49,
    rating: {
        "average": 8.2
    },
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
    summary: "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
	}
			],
		},
		{
			id:1,
			name:'season2 f',
			episodes:[],
		}
	]
}

test('renders without errors', ()=>{
	render(<Show />);
});

test('renders Loading component when prop show is null', () => {
	render(<Show show={false}/>);
	const loading = screen.queryByTestId('loading-container');
	expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
	render(<Show show={show} selectedSeason={'none'}/>);
	const options = screen.queryAllByTestId('season-option');
	expect(options).toHaveLength(2);
});

test('handleSelect is called when a season is selected', async () => {
	const handleSelect = jest.fn();
	render(<Show show={show} selectedSeason={'none'} handleSelect={handleSelect}/>);
	const option = screen.queryByLabelText(/Select A Season/i);
	userEvent.selectOptions(option, ['1']);
	expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', async () => {
	const { rerender } = render(<Show show={show} episodes={{}} selectedSeason={'none'}/>);
	
	const piece = screen.queryByText('sucks');
	expect(piece).not.toBeInTheDocument();

	rerender(<Show show={show} episodes={show.seasons[0].episodes} selectedSeason={'0'}/>)
	const wow = screen.queryByText(/Chapter Two: The Weirdo on Maple Street/i);
	expect(wow).toBeInTheDocument();
});
