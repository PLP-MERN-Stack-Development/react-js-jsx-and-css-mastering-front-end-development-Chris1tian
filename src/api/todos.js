const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  /**
   * Fetch todos from the API
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of todos to fetch
   * @param {number} params.page - Page number for pagination
   * @returns {Promise} - Promise that resolves to the todos data
   */
  async getTodos({ limit = 10, page = 1 } = {}) {
    const start = (page - 1) * limit;
    const response = await fetch(
      `${BASE_URL}/todos?_start=${start}&_limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    const total = response.headers.get('x-total-count');
    const data = await response.json();
    
    return {
      data,
      total: parseInt(total, 10),
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  /**
   * Search todos by title
   * @param {string} query - Search query
   * @returns {Promise} - Promise that resolves to the search results
   */
  async searchTodos(query) {
    const response = await fetch(
      `${BASE_URL}/todos?q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search todos');
    }
    
    return response.json();
  },
};