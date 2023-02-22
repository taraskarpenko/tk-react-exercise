import { RecipeDetailWrapper, RecipeEditForm, IngredientsFieldSet, IngredientsField } from "./Styles"
import { useState } from "react"
import { createRecipe, updateRecipe } from "../recipeApi"
import { useHistory } from "react-router-dom"
import { v4 as uuid } from "uuid"

const EditRecipe = (props) => {
    const newRecipe = (typeof props.recipe === "undefined")

    const [name, setName] = useState(newRecipe ? "" : props.recipe.name);
    const [description, setDescription] = useState(newRecipe ? "" : props.recipe.description);
    const [ingredients, setIngredients] = useState(
        newRecipe
            ? []
            : props.recipe.ingredients.map(ing => ing.name)
    );
    const history = useHistory()

    const handleNameChange = (evt) => {
        setName(evt.target.value)
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }

    const handleIngredientsChange = (evt) => {
        const idx = parseInt(evt.target.attributes.idx.value)
        let ing_temp = [...ingredients]
        if (idx > ing_temp.length) {
            ing_temp.push(evt.target.value)
        }
        else {
            ing_temp[idx] = evt.target.value
        }
        setIngredients(ing_temp)
    }

    const handleFocusOut = (evt) => {
        if (evt.target.value === "") {
            const idx = parseInt(evt.target.attributes.idx.value)
            let ing_temp = [...ingredients]
            ing_temp.splice(idx, 1)
            setIngredients(ing_temp)
        }
    }

    const renderIngredients = () => {
        let ings = ingredients.map(
            (ing, idx) => {
                return <IngredientsField key={uuid()}><input type="text" idx={idx} value={ing} onChange={handleIngredientsChange} onBlur={handleFocusOut} /></IngredientsField>
            }
        )
        ings.push(<IngredientsField key={uuid()}><input type="text" idx={ings.length} value="" onChange={handleIngredientsChange} /></IngredientsField>)
        return ings
    }

    const handleDiscard = (evt) => {
        evt.preventDefault()
        newRecipe ? history.push('/') : props.editing(false)
    }

    const saveRecipe = async () => {
        const payloadIngredients = ingredients.filter(ing => ing !== "").map((ingredient) => { return { name: ingredient } });
        const payload = {
            name: name,
            description: description,
            ingredients: payloadIngredients
        }
        let response = null;
        const expectedStatus = newRecipe ? 201 : 200
        if (newRecipe) {
            response = await createRecipe(payload)
        } else {
            response = await updateRecipe(props.recipe.id, payload)
        }

        if (response.status === expectedStatus) {
            return response.data.id
        } else {
            throw new Error(response.data)
        }
    }

    const handleSave = async (evt) => {
        evt.preventDefault()
        props.update(true)
        try {
            const recipeId = await saveRecipe();
            if (newRecipe) {
                history.push(`/recipe/${recipeId}`);
            } else {
                props.editing(false)
            }
        } catch (e) {
            alert(`Failed to save recipe ${e}`)
        }
    }

    return (
        <RecipeDetailWrapper>
            <RecipeEditForm>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" value={name} onChange={handleNameChange} />
                <label htmlFor="description">Description</label>
                <input id="description" type="textarea" name="description" value={description} onChange={handleDescriptionChange} />
                <IngredientsFieldSet onChange={handleIngredientsChange}>
                    <legend>Ingredients:</legend>
                    {renderIngredients()}
                </IngredientsFieldSet>
                <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleDiscard}>Discard</button>
                </div>

            </RecipeEditForm>
        </RecipeDetailWrapper>
    )

}

export default EditRecipe