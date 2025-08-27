document.addEventListener('DOMContentLoaded', () => {
    // Simple "router" based on which page is loaded
    if (document.getElementById('topics-container')) {
        renderLandingPage();
    } else if (document.getElementById('cards-container')) {
        renderTopicPage();
    }
});

/**
 * Renders the content for the landing page (index.html), including search functionality.
 */
function renderLandingPage() {
    const topicsContainer = document.getElementById('topics-container');
    const searchBar = document.getElementById('search-bar');
    const searchResultsContainer = document.getElementById('search-results-container');
    const topicsHeader = document.querySelector('main h2');

    // Initial render of topic cards
    const topics = [...new Set(todos.map(todo => todo.topic))].sort();
    let topicContent = `
        <a href="topic.html?topic=all" class="topic-card">
            <h3>All TODOs</h3>
            <p>View all tasks sorted by due date.</p>
        </a>
    `;
    topics.forEach(topic => {
        const topicUrl = `topic.html?topic=${encodeURIComponent(topic)}`;
        topicContent += `<a href="${topicUrl}" class="topic-card"><h3>${topic}</h3></a>`;
    });
    topicsContainer.innerHTML = topicContent;

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm.length > 0) {
            // Hide topics and show search results
            topicsContainer.style.display = 'none';
            topicsHeader.textContent = 'Search Results';
            searchResultsContainer.style.display = 'grid';

            const searchResults = todos
                .filter(todo => todo.title.toLowerCase().includes(searchTerm))
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

            if (searchResults.length > 0) {
                searchResultsContainer.innerHTML = searchResults.map(createTodoCardHtml).join('');
            } else {
                searchResultsContainer.innerHTML = '<p>No results found.</p>';
            }
        } else {
            // Show topics and hide search results
            searchResultsContainer.style.display = 'none';
            topicsContainer.style.display = 'grid';
            topicsHeader.textContent = 'Topics';
        }
    });
}

/**
 * Renders the content for the topic page (topic.html).
 */
function renderTopicPage() {
    const cardsContainer = document.getElementById('cards-container');
    const pageTitle = document.getElementById('page-title');
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');

    let filteredTodos;
    if (topic === 'all') {
        pageTitle.textContent = 'All TODOs';
        filteredTodos = [...todos];
    } else {
        pageTitle.textContent = topic;
        filteredTodos = todos.filter(todo => todo.topic === topic);
    }

    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (filteredTodos.length === 0) {
        cardsContainer.innerHTML = '<p>No TODOs found for this topic.</p>';
        return;
    }

    cardsContainer.innerHTML = filteredTodos.map(createTodoCardHtml).join('');
}

/**
 * REUSABLE FUNCTION: Creates the HTML for a single TODO card.
 * @param {object} todo - The todo item object.
 * @returns {string} The HTML string for the card.
 */
function createTodoCardHtml(todo) {
    const today = new Date('2025-08-27T23:59:59'); // Using current context date
    const isOverdue = new Date(todo.dueDate) < today && !todo.isDone;
    const cardClasses = `todo-card ${todo.isDone ? 'is-done' : ''} ${isOverdue ? 'is-overdue' : ''}`;

    const deliverablesHtml = todo.deliverables.length > 0
        ? '<ul>' + todo.deliverables.map(d =>
            `<li>${d.link ? `<a href="${d.link}" target="_blank" rel="noopener noreferrer">${d.name}</a>` : d.name}</li>`
          ).join('') + '</ul>'
        : '<p>No deliverables listed.</p>';

    return `
        <div class="${cardClasses}">
            <div class="card-header">
                <h3>${todo.title}</h3>
                <span class="due-date">Due: ${new Date(todo.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="card-body">
                <label class="checkbox-container">
                    <input type="checkbox" ${todo.isDone ? 'checked' : ''} disabled>
                    <span>${todo.topic}</span>
                </label>
                <h4>Goal</h4>
                <p>${todo.goal}</p>
                <h4>Deliverables</h4>
                ${deliverablesHtml}
            </div>
        </div>
    `;
}
