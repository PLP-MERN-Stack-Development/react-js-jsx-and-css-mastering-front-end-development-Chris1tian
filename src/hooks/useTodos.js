import { useState, useEffect } from 'react';
import { api } from '../api/todos';

export const useTodos = (initialPage = 1, initialLimit = 10) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, totalPages: total } = await api.getTodos({
          page,
          limit,
        });
        setTodos(data);
        setTotalPages(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [page, limit]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return {
    todos,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    prevPage,
  };
};