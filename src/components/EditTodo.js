import React from 'react';
import close from '../assets/svg/imagen_close.svg';

export const EditTodo = ({ setTodoToEdit, todoToEdit, dispatch, }) => {

	const tarea = todoToEdit.title;

	const handleSubmitEditTodo = (e) => {
		e.preventDefault();	

		if(e.target.taskEdit.value.length <= 3){
			return alert('Make sure your new task contains at least more than three characters.')
		};

		const editTodo = {
			title: e.target.taskEdit.value,
			date: new Date(), 
			id: todoToEdit.id,
			edit: 'The task has been edited'
		};

		dispatch({
			type: 'edit_task',
			payload: editTodo
		});
		
		e.target.taskEdit.value = '';

		setTodoToEdit({});
	};

	return (
		<div className='fixed right-0 top-0 left-0 bottom-0 flex justify-center items-center backdrop-blur-sm z-50 px-4 md-px-0'>
			<form 
				className='relative bg-gray-200 w-full sm:w-3/4 md:w-2/3 lg:w-3/6 p-7 rounded-md' 
				onSubmit={ handleSubmitEditTodo }
			>
				<div 
					className='absolute right-0 -top-10 bg-gray-200 rounded-md p-1 cursor-pointer' 
					onClick={ () => setTodoToEdit({})}
				>
					<img src={close} alt='Imagen close' className='w-7 hover:scale-110 duration-200' />
				</div>

				<h3 className='text-center font-semibold text-2xl mb-3 shadow-text'>Edit TODO</h3>

				<label htmlFor='taskEdit' className='font-medium'>
					Task to edit
				</label>
				<input 
					type='text' 
					id='taskEdit' 
					defaultValue={tarea} 
					className='rounded-md py-1 px-2 text-sky-900 outline-none focus:border-sky-700 border-b-2 border-gray-500 w-full' 
					placeholder='Post your new task!'
				/>
				<div className='flex justify-between mt-8'>
					<button 
						className='border rounded-md py-2 px-3 font-medium text-white w-40 bg-sky-700 hover:bg-sky-600' 
						type='submit'
					>
						Add Task
					</button>
					<button 
						className='border rounded-md py-2 px-3 font-medium text-white w-40 bg-gray-500 hover:bg-gray-400' 
						onClick={ () => setTodoToEdit({})}
					>Cancel</button>
				</div>
			</form>
		</div>
	);
};
