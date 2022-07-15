import {createSlice,configureStore} from "@reduxjs/toolkit";



const slice = createSlice({
    name : "form",
    initialState : {people : [] ,bioDetails : [],eduDetails : []},
    reducers : {
        setPeople(state,action){
            const obj = action.payload;
            state.people = [...state.people,obj];
            console.log(state.people);
        },
        setBioDetails(state,action) {
            const obj = action.payload;
            state.bioDetails = [...state.bioDetails,obj];
            console.log(state.bioDetails);
        },
        setEduDetails(state,action){
            const obj = action.payload;
            state.eduDetails = [...state.eduDetails,obj];
            console.log(state.eduDetails);
        },
        setSendData(state,action){
            const obj = action.payload.id;
            console.log(obj);
            console.log(state.people);
            const data1 = state.people.find((item) => item.id === obj);
            const data2 = state.bioDetails.find((item) => item.id === obj);
            const data3 = state.eduDetails.find((item) => item.id === obj);
            const data = {data1,data2,data3};
            return(data);
        },
        setPeopleLogin(state,action){
            const obj = action.payload;
            const data1 = state.people.find((item) => item.id === obj._id);
            if(!data1){
                const obj1 = {
                        name  :obj.name,
                        username : obj.username,
                        email : obj.email,
                        password : obj.password,
                        confirmPassword : obj.password,
                        id : obj._id
                }
                state.people = [...state.people,obj1];
                console.log(state.people);
            }
        }
    }
});

const store = configureStore({
    reducer : slice.reducer
});

export const actions =  slice.actions;
export default store;
