import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromSessionStorage } from "../../utils/loadFromSessionStorage";

export interface Breadcrumb {
    label: string
    path: string
}

export interface BreadcrumbState {
    breadcrumbs: Breadcrumb[]
}

const initialState: BreadcrumbState = loadFromSessionStorage('breadcrumb') as BreadcrumbState

const breadcrumbSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        setBreadcrumbs: (state, action: PayloadAction<Breadcrumb[]>) => {
            state.breadcrumbs = action.payload;
            sessionStorage.setItem('breadcrumb', JSON.stringify(state))
        },
        addBreadcrumb: (state, action: PayloadAction<Breadcrumb>) => {
            state.breadcrumbs.push(action.payload);
            sessionStorage.setItem('breadcrumb', JSON.stringify(state))

            breadcrumbSlice.caseReducers.resetBreadCrumbs(state)
        },
        removeBreadcrumbs: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.breadcrumbs.splice(index + 1);
            sessionStorage.setItem('breadcrumb', JSON.stringify(state))
        },
        resetBreadCrumbs: (state) => {
            if (state.breadcrumbs.length === 5) {
                state.breadcrumbs = initialState.breadcrumbs
            }
        }
    }
})

export const { setBreadcrumbs, addBreadcrumb, removeBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;