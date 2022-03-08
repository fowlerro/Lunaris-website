import { Dispatch, SetStateAction } from 'react';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import Header from '@views/Commands/Header';
import userEvent from '@testing-library/user-event';

const categories = ['moderation', 'misc', 'settings'];

describe('CommandsPage Header component', () => {
	let searchInput = '';
	const setSearchInput: Dispatch<SetStateAction<string>> = (value: SetStateAction<string>) => {
		searchInput = value.toString();
	};
	let category = '';
	const setCategory: Dispatch<SetStateAction<string>> = (value: SetStateAction<string>) => {
		category = value.toString();
	};
	it('should render', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		expect(screen.getByRole('heading')).toBeInTheDocument();
	});

	it('should contain Heading 1', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		expect(screen.getByRole('heading', { name: 'common:commands' })).toBeInTheDocument();
	});

	it('should contain Paragraphs', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		expect(screen.getAllByRole('paragraph')).toBeTruthy();
	});

	it('should contain search input', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		expect(screen.getByRole('searchbox', { name: 'commandsPage:searchLabel' })).toBeInTheDocument();
	});

	it('should contain Select input', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		expect(screen.getByRole('button', { name: 'commandsPage:selectLabel ​' })).toBeInTheDocument();
	});

	it('should search commands', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		userEvent.type(screen.getByRole('searchbox', { name: 'commandsPage:searchLabel' }), 'B');
		expect(searchInput).toBe('B');
	});

	it('should select category', () => {
		renderWithTheme(
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
		);
		userEvent.click(screen.getByRole('button', { name: 'commandsPage:selectLabel ​' }));
		userEvent.click(screen.getByRole('option', { name: 'commands:categories.misc' }));
		expect(category).toBe('misc');
	});
});
