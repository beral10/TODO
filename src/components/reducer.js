const initialState = [];

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'add_todo': {
			return [...state, action.payload];
		}
		case 'remove_todo': {
			return state.filter((todo) => todo.id !== action.payload);
		}
		case 'toggleStatus': {
			return state.map((obj) => {
				if (obj.id === action.idVal) {
					const newStatus = obj.status === 1 ? 0 : obj.status === 0 ? 1 : obj.status;
					return { ...obj, status: newStatus };
				}
				return obj;
			});
		}
        case 'edit_task': {            
            return state.map( tarea => {
                if ( tarea.id === action.payload.id ) {
                    return {
                        ...tarea,
                        title: action.payload.title,
						date: action.payload.date,	
						edited: action.payload.edit					
                    };
                }
                return tarea;
            })
        }
		default: {
			return state;
		}
	}
};