import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantPage from '../pages/RestaurantPage';
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
