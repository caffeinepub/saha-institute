import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CentresPage from './pages/CentresPage';
import ReviewsPage from './pages/ReviewsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import MockTestsPage from './pages/MockTestsPage';
import LoginPage from './pages/LoginPage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';
import SecretForestPage from './pages/SecretForestPage';
import Fake404KickoutPage from './pages/Fake404KickoutPage';

// Root route with layout (no QueryClientProvider here - it's in main.tsx)
const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
  notFoundComponent: NotFoundPage,
});

// Define all routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/courses',
  component: CoursesPage,
});

const centresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/centres',
  component: CentresPage,
});

const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reviews',
  component: ReviewsPage,
});

const announcementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/announcements',
  component: AnnouncementsPage,
});

const mockTestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mock-tests',
  component: MockTestsPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanelPage,
});

// Secret forest route (hidden, not linked in navigation)
const secretForestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forest-of-demons',
  component: SecretForestPage,
});

// Fake 404 kickout route (separate from real NotFound)
const fake404Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kicked-out-404',
  component: Fake404KickoutPage,
});

// Create router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  centresRoute,
  reviewsRoute,
  announcementsRoute,
  mockTestsRoute,
  loginRoute,
  adminRoute,
  secretForestRoute,
  fake404Route,
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
