import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, BrowserRouter } from "react-router-dom";
import App from '../App';
import RecipeDetails from '../Recipe/RecipeDetails';
import { createMemoryHistory } from 'history'

import { fetchRecipesList, fetchREcipeDetails, deleteRecipe } from '../recipeApi';

jest.mock("../recipeApi");

describe('test main view', () => {
    const recipes = [
        { id: 1, name: "Pizza", description: "", ingredients: [] },
        { id: 2, name: "Pasta carbonara", description: "", ingredients: [] },
        { id: 3, name: "Blutwurst", description: "", ingredients: [] },
    ]
    beforeEach(async () => {
        jest.clearAllMocks();
        fetchRecipesList.mockResolvedValue({ data: recipes, status: 200 })
        await waitFor(() => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        })


    })

    it('displays recipes list', async () => {
        for (const recipe of recipes) {
            await waitFor(() => {
                const element = screen.getByText(recipe.name);
                expect(element).toBeInTheDocument();
            });

        }

    })

    it('filters recipes list', async () => {
        await waitFor(() => {
            const searchInput = screen.getByTestId('recipe-search-field')
            expect(searchInput).toBeInTheDocument();
            userEvent.type(searchInput, '234')
        })


        expect(fetchRecipesList).toBeCalledTimes(4)
        expect(fetchRecipesList).toBeCalledWith("")
        expect(fetchRecipesList).toBeCalledWith("2")
        expect(fetchRecipesList).toBeCalledWith("23")
        expect(fetchRecipesList).toBeCalledWith("234")

    })

    it('opens NewRecipe page', async () => {
        await waitFor(() => {
            const newRecipeBtn = screen.getByTestId('new-recipe-btn')
            expect(newRecipeBtn).toBeInTheDocument();
            userEvent.click(newRecipeBtn)
        })

        await waitFor(() => {
            expect(screen.getByLabelText('Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Description')).toBeInTheDocument();
            const ingredientsFieldset = screen.getByText("Ingredients:", { selector: 'legend' }).closest('fieldset');
            const ingredient = within(ingredientsFieldset).getByRole('textbox')
            expect(ingredient).toBeInTheDocument();
        })

    })
})

describe('test recipe details', () => {
    const recipe = {
        id: "1",
        name: "Recipe name",
        description: "Recipe description",
        ingredients: [
            { name: "Ingredient 1" },
            { name: "Ingredient 2" },
        ]
    }


    beforeEach(async () => {

        jest.clearAllMocks();
        fetchRecipesList.mockResolvedValue({ data: [], status: 200 })
        fetchREcipeDetails.mockResolvedValue({ data: recipe, status: 200 })
        deleteRecipe.mockResolvedValue({ status: 204 })

        confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => true));

        const history = createMemoryHistory()
        history.push('/recipe/1')
        await waitFor(() => {
            render(
                <Router history={history}>
                    <App />
                </Router>,
            );
        })


    })

    it('displays recipe details', async () => {
        await waitFor(() => {
            expect(screen.getByText("Recipe name")).toBeInTheDocument();
            expect(screen.getByText("Recipe description")).toBeInTheDocument();
            const ingredientsFieldset = screen.getByText("Ingredients:").closest('div');
            expect(within(ingredientsFieldset).getByText("Ingredient 1")).toBeInTheDocument();
            expect(within(ingredientsFieldset).getByText("Ingredient 2")).toBeInTheDocument();
        })
    })

    it('deletes recipe', async () => {
        await waitFor(() => {
            const deleteBtn = screen.getByText('Delete');
            expect(deleteBtn).toBeInTheDocument();
            userEvent.click(deleteBtn);

        })
        expect(deleteRecipe).toBeCalledTimes(1);
        expect(deleteRecipe).toBeCalledWith("1");
    })

    it('edits recipe', async () => {
        await waitFor(() => {
            const editBtn = screen.getByText('Edit');
            expect(editBtn).toBeInTheDocument();
            userEvent.click(editBtn);
        })

        const nameInput = screen.getByLabelText('Name')
        expect(nameInput).toBeInTheDocument();
        expect(nameInput.value).toBe("Recipe name")

        const descriptionInput = screen.getByLabelText('Description')
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput.value).toBe("Recipe description")

        const ingredientsFieldset = screen.getByText("Ingredients:", { selector: 'legend' }).closest('fieldset');
        const ingredients = within(ingredientsFieldset).getAllByRole('textbox')
        expect(ingredients.length).toBe(3)
        expect(ingredients[0].value).toBe("Ingredient 1")
        expect(ingredients[1].value).toBe("Ingredient 2")
        expect(ingredients[2].value).toBe("")

    })
})