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
    }
]