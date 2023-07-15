import { useEffect, useReducer, useState } from 'react';
import { reducer } from './components/reducer';
import { FormInput } from './components/FormInput';
import { Todo } from './components/Todo';
import { Title } from './components/Title';
import { TodoListFilter } from './components/TodoListFilter';
import { EditTodo } from './components/EditTodo';

/* const initialState = [
	{
		id: new Date().getTime(),
		title: 'Aprender rápido',
		status: 0,
		date: new Date(),
		modify: '',
	},
]; */

const init = () => {
	return JSON.parse(localStorage.getItem('tasks')) || [];
};

function App() {
	const [state, dispatch] = useReducer(reducer, [], init);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(state));
	}, [state]);

	const [stateFilter, setStateFilter] = useState([]); //Entra a filtrados

	const [isFormOpen, setIsFormOpen] = useState(false); // cerrar o abril form

	const [todoToEdit, setTodoToEdit] = useState({}); //Recibe el todo a editar y además, abre y cierra el form de editar

	const [filteredList, setFilteredList] = useState([]);

	const onFilter = (params) => {
		const filteredValues = state.filter((todo) => todo.status === Number(params));

		setStateFilter(filteredValues);
	};

	return (
		<>
			<div className='w-screen h-screen'>
				<div className="bg-[url('/src/assets/svg/waves_wallpaper.svg')] bg-no-repeat bg-cover bg-left w-full h-full m-0 p-0">
					<div className='flex flex-col gap-4 items-center mx-auto py-20 w-5/6 h-full'>
						<Title />
						<TodoListFilter isFormOpen={isFormOpen} onFilter={onFilter} setFilteredList={setFilteredList} setIsFormOpen={setIsFormOpen} state={state} />
						<Todo dispatch={dispatch} filteredList={filteredList} isStateFIltered={stateFilter} setTodoToEdit={setTodoToEdit} state={state} />
					</div>
					{isFormOpen && <FormInput dispatch={dispatch} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}
					{JSON.stringify(todoToEdit) !== '{}' && <EditTodo dispatch={dispatch} setTodoToEdit={setTodoToEdit} todoToEdit={todoToEdit} />}
				</div>
			</div>
		</>
	);
}

export default App;
