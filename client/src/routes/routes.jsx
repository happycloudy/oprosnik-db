import Home from '../pages/Home.jsx';
import Admin from '../pages/Admin.jsx';
import Survey from '../pages/Survey.jsx';
import PassedSurvey from '../pages/PassedSurvey.jsx';

export const routes = [
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/passed',
    element: <PassedSurvey />,
  },
  {
    path: '/survey/:id',
    element: <Survey />,
  },
  {
    path: '/',
    element: <Home />,
  },
];
