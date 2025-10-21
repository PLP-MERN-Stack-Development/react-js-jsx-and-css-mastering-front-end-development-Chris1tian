import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';
import Button from './components/Button';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { useTodos } from './hooks/useTodos';
import './index.css';

function App() {
  const { todos, loading, error, page, totalPages, nextPage, prevPage } = useTodos();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
          <Navbar />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="grid gap-8">
              {/* Task Manager Section */}
              <ErrorBoundary>
                <section>
                  <Suspense fallback={<Loading size="lg" />}>
                    <TaskManager />
                  </Suspense>
                </section>
              </ErrorBoundary>

              {/* API Data Section */}
              <ErrorBoundary>
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Todos from API</h2>
                  
                  {error && (
                    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loading size="lg" />
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-2 mb-6">
                        {todos.map((todo) => (
                          <li
                            key={todo.id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start gap-4 group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              readOnly
                              className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                              {todo.title}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex justify-between items-center">
                        <Button
                          variant="secondary"
                          onClick={prevPage}
                          disabled={page === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Page {page} of {totalPages}
                        </span>
                        <Button
                          variant="secondary"
                          onClick={nextPage}
                          disabled={page === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                </section>
              </ErrorBoundary>
            </div>
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 