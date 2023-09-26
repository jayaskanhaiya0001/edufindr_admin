export const AddItem  = ({inputHandle , text}) => {
    return (
        <>
        <div className="AddItem" onClick={() => inputHandle('ADD')}>
            <img src ="/icons/add.svg" alt="" className="Add_Placeholder"/>
            <p>{text}</p>
        </div>
        </>
    )
}