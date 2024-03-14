import { useParams } from "react-router-dom"

export default function Tracking() {
    const { id } = useParams();

    console.log(`ID => ${id}`);

    return (
        <>
            <h1>Licitacion</h1>
        </>
    )
}