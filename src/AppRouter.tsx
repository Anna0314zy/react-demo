// AppRouter.tsx
import { useRoutes } from 'react-router-dom'
import routes, { RouteConfig } from './routes'
import RequireAuth from './components/RequireAuth'

const generateRoutes = (configs: RouteConfig[]) =>
  configs.map(({ path, element, children, requireAuth }) => ({
    path,
    element: requireAuth ? <RequireAuth>{element}</RequireAuth> : element,
    children: children ? generateRoutes(children) : undefined,
  }))

const AppRouter = () => {
  const element = useRoutes(generateRoutes(routes))
  return element
}

export default AppRouter
