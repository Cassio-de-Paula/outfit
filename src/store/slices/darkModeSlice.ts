import { createSlice } from "@reduxjs/toolkit";

type ScreenModeState = {
    mode: 'dark' | 'light';
};

const initialState: ScreenModeState = {
    mode: 'light'
};

const screenModeSlice = createSlice({
    name: 'screenMode',
    initialState,
    reducers: {
        switchMode: (state) => {
            // Mutação direta do estado usando Immer (funciona corretamente com objetos)
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});

export const { switchMode } = screenModeSlice.actions;
export default screenModeSlice.reducer;
