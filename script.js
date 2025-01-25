// Project data configuration
const stackIcons = {
    "lua": "devicon-lua-plain",
    "php": "devicon-php-plain",
    "js": "devicon-javascript-plain",
    "html": "devicon-html5-plain",
    "css": "devicon-css3-plain",
    "sql": "devicon-mysql-plain",
    "figma": "devicon-figma-plain",
};

const projectData = {
    racesim: {
        title: "RaceSim",
        description: "Project which is currently in development, it is a racing simulation advert website that offers realistic racing experiences. Will be build on the same base of PHP, HTMX, JS and CSS, not need to complicate things, as well as scoreboard, and other features. Such as admin panels scoreboards and more.",
        image: "./static/imgs/racesim.jpg",
        link: "https://racesim.sk/",
        stack: ["php", ,"js", "css"],
    },
    nolimithost: {
        title: "Nolimithost",
        description: "Project was purely based as a learning experience focused on the landing page, was build with parts of HTMX for segmenting and for some PHP fetching. The project was made with Figma, and the design was made by me. It was abonded later on because of the lack of time and resources.",
        image: "./static/imgs/nolimithost.jpg",
        link: "https://nolimithost.cc/",
        stack: ["php", ,"figma", "css"],
    },

    loading: {
        title: "Loading Screen",
        description: "Loading screen made to be used in FiveM, with a custom loading screen made in JS. Users have the ability to change music and its easily customizable for any server by any owner or developer. The best way to handle this loading is to add screenshots from the community, there is a built in system for the dev to cicle through them and therefore creating a nice experience for the players.",
        image: "./static/imgs/loading_screen.jpg",
        stack: ["js", "lua", "figma"],
    },
    car_market: {
        title: "Car Market Tablet",
        description: "Car Market Tablet made to be used in FiveM, with a custom tablet made in JS. Users have the ability to buy any cars that are added via the config file, even if they are addon cars or vanilla cars. Players can pay via specialized currency or money if configured.",
        image: "./static/imgs/car_market.png",
        stack: ["js", "lua"],
    },
    resell_tablet: {
        title: "Resell Tablet",
        description: "Resell Tablet made to be used in FiveM, let players advert their items that they need to sell, creates a nice economical cicle on the server where you are able to make money from the items that players sell, adjustable tax during cashout. After a player sells their item, they will recieve a notification or the money will be added to them offline. <br><br> Gives you enough wiggle space for search bar, and sorting options. <br><br> Available for any server, no matter if it's a small or big server. ",
        image: "./static/imgs/resell_tablet.jpg",
        stack: ["js", "lua", "sql"],
    },
};

function openModal(projectId) {
    const project = projectData[projectId];
    const modalContent = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" style="max-width: 100%; margin: 20px 0;">
        <div class="stack">
            ${project.stack ? project.stack.map(stack => `<i class="${stackIcons[stack]}"></i>`).join('') : ''}
        </div>
        <p class="subtext">${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank" class="button primary">Visit Site</a>` : ''}
    `;
    
    document.getElementById('modal-content').innerHTML = modalContent;
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    // Trigger reflow to ensure transition works
    modal.offsetHeight;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    // Wait for animation to finish before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'visible';
    }, 300); // Match this with the CSS transition duration
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add event listeners to all project elements
document.addEventListener('DOMContentLoaded', function() {
    const projectElements = document.querySelectorAll('.project');
    projectElements.forEach(element => {
        element.addEventListener('click', function() {
            const projectId = this.dataset.project;
            if (projectId && projectData[projectId]) {
                openModal(projectId);
            }
        });
    });

    closeModal();
});
