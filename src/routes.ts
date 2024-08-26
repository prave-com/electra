/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = ['/']

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to appropriate route based on role
 */
export const authRoutes = ['/signin']

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The prefix for administrator routes
 * This route is default administrator redirect path after logging in
 * Routes that start with this prefix are used for adminstrator role only
 */
export const administratorRoutePrefix = '/administrator'

/**
 * The prefix for operator routes
 * This route is default operator redirect path after logging in
 * Routes that start with this prefix are used for adminstrator role only
 */
export const operatorRoutePrefix = '/operator'
