import styled from "styled-components";

const RecipeDetailWrapper = styled.div`
display: flex;
flex-basis: 100%;
flex-direction: column;
`;

const RecipeIngredientsWrapper = styled.ul`
flex-basis: 30%;
justify-content: left;
align-items: center;
text-align: justify
`

const RecipeTextWrapper = styled.div`
flex-basis: 70%;
padding: 1em 1em 1em 1em;
`;


const RecipeEditForm = styled.form`
display: flex;
flex-direction: column;
`

const IngredientsFieldSet = styled.fieldset`
display: flex;
flex-direction: column;
margin: 5px;
`

const IngredientsField = styled.div`
margin:5px;
`
export { RecipeDetailWrapper, RecipeIngredientsWrapper, RecipeTextWrapper, RecipeEditForm, IngredientsFieldSet, IngredientsField }