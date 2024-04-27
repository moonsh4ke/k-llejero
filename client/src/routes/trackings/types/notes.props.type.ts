import { Note } from "./trackingWithNotes.type";

export interface NoteFormProps {
    note?: Note;
    onCreateNote: any;
    showOrHideForm: any;
}
export interface NotesListProps {
    trackingId: string;
}