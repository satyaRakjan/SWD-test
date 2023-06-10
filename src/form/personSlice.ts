import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Person {
  id: number;
  key: string;
  birthDate: any;
  exSalary: string;
  gender: string;
  idcard1: string;
  idcard2: string;
  idcard3: string;
  idcard4: string;
  idcard5: string;
  nation: string;
  phoneCode: string;
  phoneCode2: string;
  profix: string;
  realname: string;
  surename: number;
}
interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [],
};

const personSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      const {
        id,
        key,
        birthDate,
        exSalary,
        gender,
        idcard1,
        idcard2,
        idcard3,
        idcard4,
        idcard5,
        realname,
        surename,
        phoneCode2,
        nation,
      } = action.payload;
      const person = state.persons.find((p) => p.key === key);
      if (person) {
        person.realname = realname;
        person.gender = gender;
        person.phoneCode2 = phoneCode2;
        person.nation = nation;
      }
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter(
        (person) => person.key !== action.payload
      );
    },
  },
});

export const { addPerson, updatePerson, deletePerson } = personSlice.actions;

export default personSlice.reducer;
