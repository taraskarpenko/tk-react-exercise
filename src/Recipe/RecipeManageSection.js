
const RecipeManageSection = (props) => {
    return (
        <div>
            <button onClick={props.deleteFn}>Delete</button>
            <button onClick={() => props.editFn(true)}>Edit</button>
        </div>
    )
}

export default RecipeManageSection