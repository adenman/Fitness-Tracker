import './App.css';
import './index.css';
import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WorkoutProvider } from './components/context';

// Construct our main GraphQL API endpoint


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <WorkoutProvider>
      <>
        <Nav />
        <main className="flex-column justify-center align-center min-100-vh g mx-3">
          <Outlet />
        </main>
      </>
      </WorkoutProvider>
    </ApolloProvider>
  );
}

export default App;