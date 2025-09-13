import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addBreadcrumb, removeBreadcrumbs } from "../slices/breadcrumbSlice";
import { Breadcrumb } from "../slices/breadcrumbSlice";

export const useBreadcrumbs = () => {
    return useSelector((state: RootState) => state.breadcrumbs.breadcrumbs);
};

export const useAddBreadcrumbs = () => {
    const dispatch = useDispatch();
    return (newBreadcrumb: Breadcrumb) => {
        dispatch(addBreadcrumb(newBreadcrumb));
    };
};

export const useRemoveBreadcrumbs = () => {
    const dispatch = useDispatch();
    return (index: number) => {
        dispatch(removeBreadcrumbs(index));
    };
};
