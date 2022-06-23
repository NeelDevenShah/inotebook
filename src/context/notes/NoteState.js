import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const state={
        "name": "neel",
        "surname": "shah"
    }
    return (
        <NoteContext.Provider value={state}>
            {props.childern}
        </NoteContext.Provider>
    )
}
export default NoteState;