import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherComponent from './components/TeacherComponent';
import DirectorComponent from './components/DirectorComponent';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/teacher" component={TeacherComponent} />
        <Route path="/director" component={DirectorComponent} />
        {/* Други маршрути */}
      </Switch>
    </Router>
  );
}

export default App;
