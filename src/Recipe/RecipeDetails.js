import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RecipeDetailWrapper, RecipeTextWrapper, RecipeIngredientsWrapper } from './Styles'
import NotFound from '../NotFound'
import EditRecipe from './EditRecipe'
import RecipeManageSection from './RecipeManageSection'
import { deleteRecipe, fetchREcipeDetails } from '../recipeApi'


const RecipeDetails = (props) => {
    const { recipe_id } = useParams();
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [found, setFound] = useState(false)
    const [recipe, setRecipe] = useState({})
    const [ingredients, setIngredients] = useState([])
    const history = useHistory()

    const handleDeleteRecipe = async () => {
        console.log(`RECIPE ID: ${recipe_id}`)
        if (window.confirm("Are you sure you want to delete")) {
            const recipeDeleteResponse = await deleteRecipe(recipe_id);
            if (recipeDeleteResponse.status !== 204) {
                alert("Failed to delete recipe")
            }
            props.update(true)
            history.push("/")
        }
    }

    const getRecipeDetails = async (id) => {
        try {
            const response = await fetchREcipeDetails(id)
            setLoading(false)
            setFound(true)
            setRecipe(response.data)
            setIngredients(response.data.ingredients.map(ingredient => ingredient.name))
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        getRecipeDetails(recipe_id)
    }, [editing, recipe_id]
    )

    if (editing) { return <EditRecipe recipe={recipe} editing={setEditing} update={props.update} /> }
    else if (loading) { return <RecipeDetailWrapper><RecipeTextWrapper><h1>Loading ...</h1> </RecipeTextWrapper> </RecipeDetailWrapper> }
    else if (!found) { return <NotFound /> }
    else return (
        <RecipeDetailWrapper>
            <RecipeTextWrapper>
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
            </RecipeTextWrapper>
            <div>
                <h3>Ingredients:</h3>
                <RecipeIngredientsWrapper>{ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</RecipeIngredientsWrapper>
            </div>
            <div>
                <RecipeManageSection deleteFn={handleDeleteRecipe} editFn={setEditing} />
            </div>
        </RecipeDetailWrapper>
    )
}

export default RecipeDetails