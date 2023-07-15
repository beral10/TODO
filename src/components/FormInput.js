import React from 'react';
import close from '../assets/svg/imagen_close.svg';

export const FormInput = ({ dispatch, isFormOpen, setIsFormOpen }) => {
	
	const statusState = [2, 0, 1];

	const handleSubmit = (e) => {
		e.preventDefault();
	
		if(e.target.title.value.length <= 3){
			return alert('Your task must contain more than three characters to be successfully saved!')
		};

		const newTodo = {
			id: new Date().getTime(),
			title: e.target.title.value,
			status: +e.target.statusOption.value,
			date: new Date(),
		};

		const action = {
			type: 'add_todo',
			payload: newTodo,
		};

		dispatch(action);
		//localStorage.setItem(`${newTodo.title}`, JSON.stringify(newTodo))

		e.target.title.value = '';
	};

	return (
		<div className='fixed right-0 top-0 left-0 bottom-0 flex justify-center items-center backdrop-blur-sm z-50 px-4'>
			<form 
				className='relative w-full sm:w-3/4 md:w-2/3 lg:w-3/6 bg-gray-200 flex flex-col p-3 rounded-lg' 
				onSubmit={handleSubmit}
			>
				<div 
					className='absolute right-0 -top-10 bg-gray-200 rounded-md p-1 cursor-pointer' 
					onClick={() => setIsFormOpen(!isFormOpen)}
				>
					<img src={close} alt='Imagen close' className='w-7 hover:scale-110 duration-200' />
				</div>
				<h3 className='text-center font-semibold text-2xl mb-3 shadow-text'>Add TODO</h3>
				<label htmlFor='title' className='font-medium'>
					Title
				</label>
				<input 
					type='text' 
					id='title' 
					className='rounded-md py-1 px-2 text-sky-900 outline-none focus:border-sky-700 border-b-2 border-gray-500' 
					placeholder='Enter your task here.' 
				/>

				<label htmlFor='checkSelet' className='font-medium mt-5'>
					Status
				</label>
				<select 
					id='statusOption' 
					className='rounded-md py-1 px-2 text-sky-900 outline-none focus:border-sky-700 border-b-2 border-gray-500 capitalize' 					
				>
					{statusState.map((option) => {
						return (
							<option value={option} key={option} disabled={option === 2}>
								{option === 0 ? 'completed' : option === 1 ? 'incomplete' : 'select status'}
							</option>
						);
					})}
				</select>

				<div className='flex justify-between mt-8'>
					<button 
						className='border rounded-md py-2 px-3 font-medium text-white w-40 bg-sky-700 hover:bg-sky-600' 
						type='submit'
					>
						Add Task
					</button>
					<button 
						className='border rounded-md py-2 px-3 font-medium text-white w-40 bg-gray-500 hover:bg-gray-400'
						type='button'
						onClick={() => setIsFormOpen(!isFormOpen)}
					>Cancel</button>
				</div>
			</form>
		</div>
	);
};
