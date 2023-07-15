import React, { useEffect, useState } from 'react';
import edit from '../assets/svg/pencil_edit.svg';
import trash from '../assets/svg/trash.svg';
import check from '../assets/svg/icon_check.svg';

export const Todo = (props) => {
	const { state, dispatch, isStateFIltered, setTodoToEdit, filteredList } = props;

	const [todoState, setTodoState] = useState([])

	useEffect(() => {		
		if(filteredList.length > 0){
			setTodoState(filteredList)
		}
		else if(!isStateFIltered.length){
			setTodoState(state)
		}
		else {
			setTodoState(isStateFIltered)
		}


	}, [isStateFIltered, state, filteredList]);



	const handleCheckButton = (todo_id) => {
		dispatch({type: 'toggleStatus', idVal: todo_id});	
	};

	const handleRemove = (todoId) => {
		const action = {
			type: 'remove_todo',
			payload: todoId,
		};

		dispatch(action);
	};

	return <div className='w-full md:w-3/4 xl:w-2/3 overflow-y-auto bg-gray-200 rounded-md text-center py-5'>
		{state.length === 0 ? (
		<div className='mx-6 py-3 rounded-md bg-white'>
			<p className='font-medium'>No TODO. Add new task!</p>
		</div>		
	) : (
		<>
			{
				todoState?.map((todo) => (
				<div key={todo.id} className='flex flex-col gap-3 px-4 py-2 w-full'>
					<div className='flex justify-between items-center gap-2 px-3 py-1 rounded-md bg-white'>
						{
							todo.status === 0 ? (
								<div className='bg-green-700 p-1 rounded-full cursor-pointer' onClick={() => handleCheckButton(todo.id)}>
									<img src={check} alt='Done icon' className='h-3 w-3' />
								</div>
							) : (
								<span className='border-solid border border-gray-500 rounded-full p-2 cursor-pointer' onClick={() => handleCheckButton(todo.id)}></span>
							)
						}
						<div className='flex flex-col flex-1 items-start'>
							{
								todo.status === 0 ? <p className='font-medium line-through'> {todo.title} </p> : <p className='font-medium'> {todo.title} </p>
							}
							{
								todo.edited ? <p className='text-xs text-orange-700 shadow-text-edit'>{ todo.edited} on {todo.date.toLocaleString()}</p> : <p className='text-xs'> {todo.date.toLocaleString()} </p>
							}													
						</div>
						<button className='bg-gray-200 hover:bg-gray-300 rounded-md p-1' onClick={() => handleRemove(todo.id)}>
							<img src={trash} alt='Delete' className='w-5' />
						</button>
						<button 
							className='bg-gray-200 hover:bg-gray-300 rounded-md p-1' 
							onClick={() => setTodoToEdit( todo )}
						>
							<img src={edit} alt='Edit' className='w-5' />
						</button>
					</div>
				</div>
			))}
		</>
	)}
	</div>
};
