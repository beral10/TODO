import React, { useEffect, useRef, useState } from 'react';
import search from '../assets/svg/imagen_search.svg';
import more from '../assets/svg/imagen_expand_more.svg';
import less from '../assets/svg/imagen_expand_less.svg';

export const TodoListFilter = (props) => {
	const { setIsFormOpen, state } = props;

	const [ showSelect, setShowSelect ] = useState( false );
	const dropdownRef = useRef();

	const sortSelect = [
		{ value: 2, name: 'all' },
		{ value: 0, name: 'complete' },
		{ value: 1, name: 'incomplete' },
		{ value: 3, name: 'notFunctional1' },
		{ value: 4, name: 'notFunctional2' },
		{ value: 5, name: 'notFunctional3' },
	];

	const handleOptionSelect = (e) => {
		props.onFilter(e.target.attributes.value.value);
	};
	
	const handleInputFilter = (e) => {		
		
		const filtered = state.filter( todo => todo.title.toLowerCase().includes(e.target.value.toLowerCase()));
		props.setFilteredList(filtered)
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if( showSelect && dropdownRef.current && !dropdownRef.current.contains(e.target)){
				setShowSelect( false );
			}
		};
		
		document.addEventListener('mousedown', handleClickOutside);
		
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		
	}, [showSelect]);
	
	
	const handleFilterTodo = () => {
		setShowSelect(!showSelect);
	};

	return (
		<div className='flex justify-between w-full md:w-3/4 xl:w-2/3'>
			<button 
				className='py-1 px-4 bg-sky-700 hover:bg-sky-600 rounded-lg text-white font-semibold' 
				onClick={() => setIsFormOpen(true)}
			>
				Add Task
			</button>

			<div 
				className='relative flex flex-col gap-2 w-48 sm:w-64' 
				ref={ dropdownRef }				
			>
				<div 
					className='flex justify-between items-center p-2 cursor-pointer rounded-md border' 
					onClick={ handleFilterTodo }
				>
					<div className='w-6'>
						<img src={search} alt='search_icon' className='w-5' />
					</div>
					<p className='flex-1 font-semibold text-center'>Filter TODO</p>
					<div className='flex items-center justify-center w-6'>
						{
							showSelect ? (<img src={less} alt='less_icon' className='w-5' />) : (<img src={more} alt='more_icon' className='w-5' />)
						}						
					</div>
				</div>
				{
					showSelect && (
						<div className='absolute lef-0 top-0 rigth-0 botton-0 bg-gray-100 p-1 w-full mt-11 flex flex-col gap-1 rounded-md'>
							<input 
								type='text' 
								className='px-2 py-1 w-full outline-none rounded-md focus:shadow-md' 
								placeholder='Search TODO'
								onChange={ handleInputFilter }
							/>
							<div 
								className='flex flex-col gap-1 w-full h-36 py-1 rounded-md cursor-pointer overflow-auto'								
							>
								{
									sortSelect.map((option) => {
										return (											
											<span 
												className='w-full hover:shadow-lg shadow-none px-5 capitalize' 
												key={option.value} 
												value={option.value}
												onClick={ handleOptionSelect}
											>
												{option.name}
											</span>
											
										);
									})
								}
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
};



/* import React from 'react';

export const TodoListFilter = (props) => {
	const { setIsFormOpen } = props;

	const sortSelect = [
		{value: 2, name: 'all'}, 
		{value: 0, name: 'complete'}, 
		{value: 1, name: 'incomplete'}, 
		{value: 3, name: 'personalized'}
	];

	const optionHandler = (e) => {
		props.onFilter(e.target.value);
	}

	return (
		<div className='flex justify-between w-3/4'>
			<button className='py-2 px-4 bg-sky-700 hover:bg-sky-600 rounded-lg text-white font-semibold' onClick={() => setIsFormOpen(true)}>
				Add Task
			</button>
			<select 
				name='select' 
				className='py-2 px-4 rounded-md border border-slate-900 cursor-pointer'
				onChange={(e) => optionHandler(e)} 
			>
				{
					sortSelect.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						);
					})
				}
			</select>
		</div>
	);
}; */
