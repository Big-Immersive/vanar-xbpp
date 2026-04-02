import { Navigate } from 'react-router-dom';

/**
 * Safety route.
 * If root route resolution ever falls back here, immediately redirect to landing.
 */
export default function Index() {
  return <Navigate to="/" replace />;
}
