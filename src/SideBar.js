import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SideBarWrapper, SideBarLink, SearchField, NewRecipeButton } from './Styles'
import { fetchRecipesList } from './recipeApi'

const SideBar = (props) => {
    const [recipes, setRecipes] = useState([])
    const [searchString, setSearchString] = useState('')

    const handleSearchChange = (evt) => {
        setSearchString(evt.target.value)
    }

    const history = useHistory()

    useEffect(() => {
        const getRecipesList = async () => {
            const recipesResponse = await fetchRecipesList(searchString);
            if (recipesResponse.status === 200) {
                setRecipes(recipesResponse.data)
            }
        }
        getRecipesList()

    }, [searchString, props.update])

    const sideBarElements = recipes.map(recipe => {
        let to = `/recipe/${recipe.id}`
        return <SideBarLink key={recipe.id} to={to}>{recipe.name}</SideBarLink>
    })

    return (
        <SideBarWrapper>
            <NewRecipeButton data-testid='new-recipe-btn' onClick={() => history.push('/recipe/new')}>Create new recipe</NewRecipeButton>
            <SearchField data-testid='recipe-search-field' type='text' placeholder='&#x1F50D; Search' onChange={handleSearchChange} value={searchString} />
            {sideBarElements}
        </SideBarWrapper>
    )
}

export default SideBar