import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store"; // Ajuste o caminho conforme necessário
import { switchMode } from "../slices/darkModeSlice"; // Ajuste conforme o caminho do slice

export const useScreenMode = () => {
    const mode = useSelector((state: RootState) => state.screenMode.mode); // Obtém o modo atual do Redux store
    const dispatch = useDispatch();

    const toggleMode = () => {
        dispatch(switchMode()); // Altera o modo entre 'Light' e 'Dark'
    };

    return { mode, toggleMode };
};
