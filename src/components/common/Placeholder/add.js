export const AddItem  = ({inputHandle}) => {
    return (
        <>
        <div className="AddItem">
            <button onClick={() => inputHandle('ADD')}>
                Add
            </button>
        </div>
        </>
    )
}