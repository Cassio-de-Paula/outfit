import { useBreadcrumbs, useAddBreadcrumbs, useRemoveBreadcrumbs } from "../store/hooks/breadcrumbHooks"; // Ajuste o caminho conforme necessário
import { Breadcrumb } from "../store/slices/breadcrumbSlice";

export const useSetBreadcrumbs = () => {
    const breadcrumbList = useBreadcrumbs();
    const addBreadcrumb = useAddBreadcrumbs();
    const removeBreadcrumbs = useRemoveBreadcrumbs();

    // Função para adicionar ou remover breadcrumb
    const setBreadcrumb = (item: Breadcrumb) => {
        // Se o item não está na lista, adiciona
        if (!breadcrumbList.some(breadcrumb => breadcrumb.label === item.label && breadcrumb.path === item.path)) {
            addBreadcrumb(item);
        } else {
            // Se o item está na lista mas não é o último, remove os breadcrumbs após esse item
            const index = breadcrumbList.findIndex(breadcrumb => breadcrumb.label === item.label && breadcrumb.path === item.path);
            if (index < breadcrumbList.length - 1) {
                removeBreadcrumbs(index);
            }
        }
    };

    return setBreadcrumb;
};
