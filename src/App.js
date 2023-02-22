import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import NotFound from './NotFound';
import About from './About';
import SideBar from './SideBar';
import RecipeDetails from './Recipe/RecipeDetails';
import EditRecipe from './Recipe/EditRecipe';
import { AppWraper } from './Styles';

const App = () => {
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setUpdate(false)
  }, [update])

  return (
    <AppWraper >
      <SideBar update={update} />
      <Switch>
        <Route exact path='/' component={About} />
        <Route exact path="/recipe/new" render={() => <EditRecipe update={setUpdate} />} />
        <Route exact path="/recipe/:recipe_id" render={() => <RecipeDetails update={setUpdate} />} />
        <Route path="*" component={NotFound} />
      </Switch>
    </AppWraper >
  );
}

export default App;
