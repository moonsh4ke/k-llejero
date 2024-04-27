import NoteForm from "./components/NoteForm"
import List from "./List"
import Tracking from "./Tracking"

export default [
    {
        path: '/trackings',
        element: <List/>
    },
    {
        path: '/trackings/:id',
        element: <Tracking/>
    },
    {
        path: '/trackings/:id/newNote',
        element: <NoteForm/>
    },
    {
        path: '/trackings/:id/editNote/:noteId',
        element: <NoteForm/>
    }
]