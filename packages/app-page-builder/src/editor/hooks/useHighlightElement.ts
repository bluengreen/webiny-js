import { useRecoilState, SetterOrUpdater } from "recoil";
import { highlightElementAtom } from "~/editor/recoil/modules";
import { useElementById } from "~/editor/hooks/useElementById";
import { PbEditorElement } from "~/types";

export function useHighlightElement(): [PbEditorElement, SetterOrUpdater<string>] {
    const [highlightedElementId, setHighlightedElement] = useRecoilState(highlightElementAtom);
    const [element] = useElementById(highlightedElementId);

    return [element, setHighlightedElement];
}
